import { PGlite } from "../.tmp/admin-check/node_modules/@electric-sql/pglite/dist/index.js";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { build } from "esbuild";

// Testa o mesmo catálogo e a mesma conversão usados pelo botão de importação.
await build({
  absWorkingDir: process.cwd(),
  stdin: {
    contents: `import { allProducts } from './src/data/catalog';
      import { fromLocalProduct } from './src/lib/store';
      export const catalog = allProducts.map(fromLocalProduct);`,
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "./.tmp/catalog-payloads.mjs",
  define: { "import.meta.env": "{}" },
});
const { catalog } = await import("../.tmp/catalog-payloads.mjs");
const db = new PGlite();
const admin = "00000000-0000-0000-0000-000000000001";
await db.exec(`create role anon; create role authenticated; create schema auth; create schema storage;
create table auth.users(id uuid primary key,email text);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
grant usage on schema public,auth,storage to anon,authenticated;
grant execute on function auth.uid() to anon,authenticated;
create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
alter table storage.objects enable row level security;
grant all on storage.objects to anon,authenticated;
insert into auth.users values ('${admin}','ga2685002@gmail.com'),('00000000-0000-0000-0000-000000000002','viewer@example.test');`);
for (let repeat = 0; repeat < 2; repeat++)
  for (const path of [
    "supabase/001_catalogo_admin.sql",
    "supabase/002_salvar_produto.sql",
    "supabase/003_ordem_decimal.sql",
    "supabase/004_estoque_padrao_20.sql",
  ])
    await db.exec(readFileSync(path, "utf8"));
await db.exec(
  `set role authenticated; select set_config('request.jwt.claim.sub','${admin}',false);`,
);
const p = {
  id: "test-product",
  slug: "test-product",
  name: "Teste",
  model: "",
  category: "Acessórios",
  condition: "new",
  short_description: "",
  description: "",
  featured: false,
  published: true,
  price_is_estimated: false,
  release_order: 0,
  tags: [],
  image_ratio: "1:1",
  store_variants: [{ attributes: {}, price: 99, stock: 3 }],
  store_images: [],
};
const save = (payload, expected = null, insertOnly = false) =>
  db.query(
    "select public.save_store_product($1::jsonb,$2::timestamptz,$3) as saved",
    [JSON.stringify(payload), expected, insertOnly],
  );
await save(p);
assert.equal((await save(p, null, true)).rows[0].saved, false);
const stamp = (await db.query("select updated_at from public.store_products"))
  .rows[0].updated_at;
await assert.rejects(
  save(
    { ...p, store_variants: [{ attributes: {}, price: 1, stock: -1 }] },
    stamp,
  ),
);
assert.equal(
  Number(
    (await db.query("select price from public.store_variants")).rows[0].price,
  ),
  99,
  "failed save must rollback",
);
await assert.rejects(save(p, "2000-01-01T00:00:00Z"));
await save({ ...p, published: false }, stamp);
await db.exec(
  "insert into storage.objects(bucket_id,name) values ('product-images','allowed.webp'); set role anon; select set_config('request.jwt.claim.sub','',false);",
);
assert.equal(
  (await db.query("select * from public.store_products")).rows.length,
  0,
);
assert.equal(
  (await db.query("select * from public.store_variants")).rows.length,
  0,
);
await assert.rejects(save(p));
await assert.rejects(
  db.exec(
    "insert into storage.objects(bucket_id,name) values ('product-images','denied.webp')",
  ),
);
await db.exec(
  "set role authenticated; select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',false)",
);
assert.equal(
  (await db.query("select public.is_store_admin() as allowed")).rows[0].allowed,
  false,
);
await assert.rejects(
  db.exec(
    "insert into public.store_admins values ('00000000-0000-0000-0000-000000000002')",
  ),
);
await assert.rejects(save(p));
await db.exec(
  `reset role; update public.store_products set published=true; set role anon; select set_config('request.jwt.claim.sub','',false);`,
);
assert.equal(
  (await db.query("select * from public.store_products")).rows.length,
  1,
);
assert.equal(
  (await db.query("select * from public.store_variants")).rows.length,
  1,
);

// Reproduz o banco antigo e o erro encontrado na importação real.
await db.exec(`reset role;
  alter table public.store_products alter column release_order type integer using release_order::integer;
  set role authenticated;
  select set_config('request.jwt.claim.sub','${admin}',false);`);
const fractionalProduct = catalog.find((product) => product.release_order === 16.3);
assert.ok(fractionalProduct, "O catálogo deve exercitar a regressão de 16.3");
await assert.rejects(save(fractionalProduct), /invalid input syntax for type integer/);
await db.exec("reset role");
for (let repeat = 0; repeat < 2; repeat++)
  await db.exec(readFileSync("supabase/003_ordem_decimal.sql", "utf8"));
await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${admin}',false);`);
assert.equal((await db.query("select count(*)::integer as total from public.store_products")).rows[0].total, 1, "A correção deve preservar o produto existente");
for (const product of catalog) {
  assert.equal((await save(product, null, true)).rows[0].saved, true, product.slug);
  const stored = (await db.query("select release_order from public.store_products where id=$1", [product.id])).rows[0];
  assert.equal(Number(stored.release_order), product.release_order, product.slug);
}
assert.equal(
  (await db.query("select count(*)::integer as total from public.store_variants where product_id <> 'test-product' and stock <> 20")).rows[0].total,
  0,
  "Produtos disponiveis devem ser importados com estoque 20",
);
// Repetir a importação não duplica nem sobrescreve o catálogo.
for (const product of catalog)
  assert.equal((await save(product, null, true)).rows[0].saved, false);
assert.equal((await db.query("select count(*)::integer as total from public.store_products")).rows[0].total, catalog.length + 1);
const zeroStockProduct = catalog.find((product) => product.id !== fractionalProduct.id);
assert.ok(zeroStockProduct, "O teste precisa de um segundo produto para validar estoque zero");
await db.query("update public.store_variants set stock=1 where product_id=$1", [fractionalProduct.id]);
await db.query("update public.store_variants set stock=0 where product_id=$1", [zeroStockProduct.id]);
await db.exec("reset role");
await db.exec(readFileSync("supabase/004_estoque_padrao_20.sql", "utf8"));
await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${admin}',false);`);
assert.equal(
  (await db.query("select min(stock)::integer as stock from public.store_variants where product_id=$1", [fractionalProduct.id])).rows[0].stock,
  20,
  "SQL 004 deve atualizar itens disponiveis para estoque 20",
);
assert.equal(
  (await db.query("select max(stock)::integer as stock from public.store_variants where product_id=$1", [zeroStockProduct.id])).rows[0].stock,
  0,
  "SQL 004 deve preservar itens indisponiveis",
);
const fractionalStamp = (await db.query("select updated_at from public.store_products where id=$1", [fractionalProduct.id])).rows[0].updated_at;
await save({ ...fractionalProduct, release_order: 17.3 }, fractionalStamp);
assert.equal(Number((await db.query("select release_order from public.store_products where id=$1", [fractionalProduct.id])).rows[0].release_order), 17.3);
await db.close();
console.log(
  `SQL: ${catalog.length} produtos importados pelo salvamento real; correcao de ordem decimal, estoque 20, edicao, repeticao, permissoes e transacoes validadas.`,
);
