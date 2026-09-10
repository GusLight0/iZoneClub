import assert from "node:assert/strict";
import { allProducts } from "../src/data/catalog";
import {
  fromLocalProduct,
  importedAvailableStock,
  toProduct,
  validateProduct,
} from "../src/lib/store";
import { checkCart } from "../src/utils/checkout";
import { formatCurrency } from "../src/utils/currency";

assert.match(formatCurrency(129.9), /129,90/);

for (const local of allProducts) {
  const row = fromLocalProduct(local);
  validateProduct(row);
  const remote = toProduct(row);
  assert.equal(remote.slug, local.slug);
  assert.equal(remote.isNew, local.isNew);
  assert.equal(remote.releaseOrder, local.releaseOrder);
  assert.deepEqual(
    remote.colors.flatMap((c) => c.variants.map((v) => [v.price, v.stock])),
    local.colors.flatMap((c) =>
      c.variants.map((v) => [
        v.price,
        v.stock > 0 ? importedAvailableStock : 0,
      ]),
    ),
  );
}
const row = fromLocalProduct(allProducts[0]);
validateProduct({ ...row, release_order: 16.3 });
assert.throws(() => validateProduct({ ...row, release_order: NaN }), /ordem de novidade/);
row.store_variants = [
  {
    id: crypto.randomUUID(),
    attributes: {},
    price: 99,
    stock: 3,
    position: 0,
    color_hex: null,
  },
];
row.store_images = [];
validateProduct(row);
let product = toProduct(row);
assert.equal(product.hasColorOptions, false);
assert.equal(product.hasVariantOptions, false);
assert.equal(product.colors[0].images.length, 1);
for (const image_ratio of ["1:1", "3:4", "4:3"] as const)
  assert.equal(
    toProduct({ ...row, image_ratio }).imageAspectRatio,
    image_ratio,
  );
row.store_variants = [
  {
    ...row.store_variants[0],
    attributes: { Cor: "Preto", RAM: "16GB", Armazenamento: "512GB" },
  },
];
validateProduct(row);
product = toProduct(row);
assert.equal(product.colors[0].variants[0].label, "16GB / 512GB");
assert.equal(product.hasColorOptions, true);
assert.equal(product.hasVariantOptions, true);
assert.throws(
  () =>
    validateProduct({
      ...row,
      store_variants: [...row.store_variants, ...row.store_variants],
    }),
  /repetidas/,
);
assert.throws(
  () =>
    validateProduct({
      ...row,
      store_variants: [{ ...row.store_variants[0], stock: -1 }],
    }),
  /estoque/,
);
assert.throws(
  () =>
    validateProduct({
      ...row,
      store_variants: [{ ...row.store_variants[0], attributes: { Cor: "" } }],
    }),
  /opções/,
);
const color = product.colors[0],
  variant = color.variants[0];
const item = {
  key: "test",
  productId: product.id,
  productSlug: product.slug,
  productName: product.name,
  colorId: color.id,
  colorName: color.name,
  storage: variant.storage,
  optionValue: variant.label,
  image: color.images[0],
  quantity: 1,
  price: variant.price,
  priceIsEstimated: product.priceIsEstimated,
  maxStock: variant.stock,
};
assert.equal(checkCart([item], [product]).changed, false);
assert.equal(checkCart([{ ...item, price: 1 }], [product]).changed, true);
assert.throws(
  () => checkCart([{ ...item, quantity: 4 }], [product]),
  /quantidade/,
);
assert.throws(() => checkCart([item], []), /disponível/);
assert.throws(
  () => checkCart([{ ...item, storage: "removed" }], [product]),
  /disponível/,
);
console.log(
  `Dados: ${allProducts.length} produtos migráveis; variações, proporções e checkout validados.`,
);
