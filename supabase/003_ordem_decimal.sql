-- Correção para bancos criados com release_order integer.
-- Preserva os produtos existentes e a ordem fracionária usada pelo catálogo.
-- Execute no SQL Editor após os arquivos 001 e 002.
begin;

alter table public.store_products
  alter column release_order type numeric using release_order::numeric;

commit;

select 'Ordem de exibição corrigida. Pode repetir a importação.' as resultado;
