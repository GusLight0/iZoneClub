-- Execute no SQL Editor do projeto Supabase da iZone.
-- Pode ser executado novamente. Não apaga produtos existentes.
begin;

create table if not exists public.store_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.store_admins enable row level security;
revoke all on public.store_admins from anon, authenticated;
grant select on public.store_admins to authenticated;
drop policy if exists "admin reads own membership" on public.store_admins;
create policy "admin reads own membership" on public.store_admins
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_store_admin()
returns boolean language sql stable security definer
set search_path = '' as $$
  select exists (
    select 1 from public.store_admins where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_store_admin() from public;
grant execute on function public.is_store_admin() to anon, authenticated;

create table if not exists public.store_products (
  id text primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(trim(name)) > 0),
  model text not null default '',
  category text not null check (category in ('iPhone', 'iPad', 'MacBook', 'Apple Watch', 'Acessórios')),
  condition text not null default 'new' check (condition in ('new', 'pre_owned')),
  short_description text not null default '',
  description text not null default '',
  featured boolean not null default false,
  published boolean not null default false,
  price_is_estimated boolean not null default false,
  release_order numeric not null default 0,
  tags text[] not null default '{}',
  image_ratio text not null default 'default' check (image_ratio in ('default', '1:1', '3:4', '4:3')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Cada linha é uma combinação realmente disponível.
-- Produto sem variações: uma linha com attributes = {}.
-- Exemplos: {"Cor":"Preto","Armazenamento":"128GB"},
-- {"RAM":"16GB","Armazenamento":"512GB"}, {"Tamanho":"44mm"}.
create table if not exists public.store_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.store_products(id) on delete cascade,
  attributes jsonb not null default '{}' check (jsonb_typeof(attributes) = 'object'),
  color_hex text check (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  price numeric(12,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  position integer not null default 0,
  unique (product_id, attributes)
);

create table if not exists public.store_images (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.store_products(id) on delete cascade,
  color_name text,
  url text not null check (url ~ '^https://' or url ~ '^/images/'),
  position integer not null default 0
);
create index if not exists store_images_product_idx on public.store_images(product_id);

create or replace function public.store_touch_product()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists store_touch_product on public.store_products;
create trigger store_touch_product before update on public.store_products
for each row execute function public.store_touch_product();

alter table public.store_products enable row level security;
alter table public.store_variants enable row level security;
alter table public.store_images enable row level security;
revoke all on public.store_products, public.store_variants, public.store_images from anon, authenticated;
grant select on public.store_products, public.store_variants, public.store_images to anon;
grant select, insert, update, delete on public.store_products, public.store_variants, public.store_images to authenticated;

drop policy if exists "read published products" on public.store_products;
create policy "read published products" on public.store_products for select to anon, authenticated
using (published or (select public.is_store_admin()));
drop policy if exists "admin manages products" on public.store_products;
create policy "admin manages products" on public.store_products for all to authenticated
using ((select public.is_store_admin())) with check ((select public.is_store_admin()));

drop policy if exists "read published variants" on public.store_variants;
create policy "read published variants" on public.store_variants for select to anon, authenticated
using (exists (select 1 from public.store_products p where p.id = product_id and p.published) or (select public.is_store_admin()));
drop policy if exists "admin manages variants" on public.store_variants;
create policy "admin manages variants" on public.store_variants for all to authenticated
using ((select public.is_store_admin())) with check ((select public.is_store_admin()));

drop policy if exists "read published images" on public.store_images;
create policy "read published images" on public.store_images for select to anon, authenticated
using (exists (select 1 from public.store_products p where p.id = product_id and p.published) or (select public.is_store_admin()));
drop policy if exists "admin manages images" on public.store_images;
create policy "admin manages images" on public.store_images for all to authenticated
using ((select public.is_store_admin())) with check ((select public.is_store_admin()));

-- Fotos são públicas por URL, inclusive se o produto for ocultado depois.
-- Não enviar documentos ou imagens confidenciais para este bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "store admin manages files" on storage.objects;
create policy "store admin manages files" on storage.objects for all to authenticated
using (bucket_id = 'product-images' and (select public.is_store_admin()))
with check (bucket_id = 'product-images' and (select public.is_store_admin()));

-- A autorização usa o ID do usuário, não metadados editáveis pelo cliente.
do $$
declare admin_id uuid;
begin
  select id into admin_id from auth.users where lower(email) = 'ga2685002@gmail.com';
  if admin_id is null then
    raise exception 'Crie ga2685002@gmail.com em Authentication > Users antes de executar este arquivo.';
  end if;
  insert into public.store_admins(user_id) values (admin_id) on conflict do nothing;
end;
$$;

commit;

select 'Estrutura criada e administrador autorizado.' as resultado;
