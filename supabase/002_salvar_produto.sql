-- Execute após 001_catalogo_admin.sql. Salva produto, variações e fotos
-- em uma única transação; uma falha não deixa um cadastro pela metade.
begin;
create or replace function public.save_store_product(
  payload jsonb, expected_updated_at timestamptz default null,
  insert_only boolean default false
) returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  p public.store_products;
  v jsonb;
  img jsonb;
  saved_id text;
begin
  if not public.is_store_admin() then
    raise exception 'Acesso restrito aos administradores.';
  end if;
  p := jsonb_populate_record(null::public.store_products, payload);
  if jsonb_typeof(payload->'store_variants') is distinct from 'array'
    or jsonb_array_length(payload->'store_variants') < 1 then
    raise exception 'Cadastre ao menos um preço e estoque.';
  end if;
  if jsonb_typeof(payload->'store_images') is distinct from 'array' then
    raise exception 'Lista de imagens inválida.';
  end if;
  if expected_updated_at is null then
    insert into public.store_products
      (id, slug, name, model, category, condition, short_description, description,
       featured, published, price_is_estimated, release_order, tags, image_ratio)
    values (p.id, p.slug, p.name, p.model, p.category, p.condition,
      p.short_description, p.description, p.featured, p.published,
      p.price_is_estimated, p.release_order, p.tags, p.image_ratio)
    on conflict (id) do nothing returning id into saved_id;
    if saved_id is null then
      if insert_only then return false; end if;
      raise exception 'Este produto já existe. Reabra o cadastro antes de salvar.';
    end if;
  else
    update public.store_products set slug=p.slug, name=p.name, model=p.model,
      category=p.category, condition=p.condition, short_description=p.short_description,
      description=p.description, featured=p.featured, published=p.published,
      price_is_estimated=p.price_is_estimated, release_order=p.release_order,
      tags=p.tags, image_ratio=p.image_ratio
    where id=p.id and updated_at=expected_updated_at returning id into saved_id;
    if saved_id is null then
      raise exception 'Produto alterado em outra sessão. Reabra o cadastro para atualizar.';
    end if;
  end if;
  delete from public.store_variants where product_id=p.id;
  for v in select value from jsonb_array_elements(payload->'store_variants') loop
    if exists (select 1 from jsonb_each_text(v->'attributes') a
      where length(trim(a.key))=0 or a.value is null or length(trim(a.value))=0) then
      raise exception 'Preencha o nome e o valor de cada opção.';
    end if;
    insert into public.store_variants(id, product_id, attributes, color_hex, price, stock, position)
    values (coalesce((v->>'id')::uuid, gen_random_uuid()), p.id, v->'attributes',
      nullif(v->>'color_hex',''), (v->>'price')::numeric, (v->>'stock')::integer,
      coalesce((v->>'position')::integer,0));
  end loop;
  delete from public.store_images where product_id=p.id;
  for img in select value from jsonb_array_elements(payload->'store_images') loop
    insert into public.store_images(product_id, color_name, url, position)
    values (p.id, nullif(img->>'color_name',''), img->>'url', coalesce((img->>'position')::integer,0));
  end loop;
  return true;
end;
$$;
revoke all on function public.save_store_product(jsonb,timestamptz,boolean) from public, anon;
grant execute on function public.save_store_product(jsonb,timestamptz,boolean) to authenticated;
commit;
