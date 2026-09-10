-- Define 20 unidades para todos os itens atualmente disponiveis.
-- Preserva itens com estoque zero como indisponiveis.
-- Execute no SQL Editor depois da importacao dos produtos.
begin;

with changed_products as (
  update public.store_variants
  set stock = 20
  where stock > 0
  returning product_id
)
update public.store_products
set updated_at = now()
where id in (select distinct product_id from changed_products);

commit;

select 'Estoque dos itens disponiveis definido como 20.' as resultado;
