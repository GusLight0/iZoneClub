import { supabase } from "./supabase";
import type { Product, ProductCategory } from "../types/product";

export interface StoreVariant {
  id: string;
  attributes: Record<string, string>;
  color_hex: string | null;
  price: number;
  stock: number;
  position: number;
}
export interface StoreImage {
  url: string;
  color_name: string | null;
  position: number;
}
export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  model: string;
  category: ProductCategory;
  condition: "new" | "pre_owned";
  short_description: string;
  description: string;
  featured: boolean;
  published: boolean;
  price_is_estimated: boolean;
  release_order: number;
  tags: string[];
  image_ratio: "default" | "1:1" | "3:4" | "4:3";
  updated_at?: string;
  store_variants: StoreVariant[];
  store_images: StoreImage[];
}
export const placeholderImage = "/images/products/sem-foto.svg";
export const importedAvailableStock = 20;
export const remoteCatalogEnabled =
  import.meta.env.VITE_CATALOG_SOURCE === "supabase";
export function client() {
  if (!supabase)
    throw new Error("Configure a URL e a chave pública do Supabase.");
  return supabase;
}
export function errorMessage(error: unknown) {
  const message =
    error && typeof error === "object" && "message" in error
      ? String(error.message)
      : "";
  if (
    message.includes("invalid input syntax for type integer") &&
    /\d+\.\d+/.test(message)
  )
    return "O banco ainda está com a coluna release_order como integer. Execute supabase/003_ordem_decimal.sql no SQL Editor do Supabase e repita a importação; produtos já importados serão preservados.";
  return message || "Não foi possível concluir. Tente novamente.";
}
export async function fetchStoreProducts(
  admin = false,
): Promise<StoreProduct[]> {
  const rows: StoreProduct[] = [];
  for (let from = 0; ; from += 100) {
    let query = client()
      .from("store_products")
      .select("*, store_variants(*), store_images(*)")
      .order("id")
      .range(from, from + 99);
    if (!admin) query = query.eq("published", true);
    const { data, error } = await query;
    if (error) throw error;
    rows.push(...(data as StoreProduct[]));
    if (data.length < 100) break;
  }
  return rows;
}
export function toProduct(row: StoreProduct): Product {
  const variants = [...row.store_variants].sort(
    (a, b) => a.position - b.position,
  );
  const colorNames = [...new Set(variants.map((v) => v.attributes.Cor ?? ""))];
  const optionKeys = [
    ...new Set(
      variants.flatMap((v) =>
        Object.keys(v.attributes).filter((k) => k !== "Cor"),
      ),
    ),
  ];
  const images = [...row.store_images].sort((a, b) => a.position - b.position);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    model: row.model,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description,
    featured: row.featured,
    isNew: row.condition === "new",
    priceIsEstimated: row.price_is_estimated,
    releaseOrder: row.release_order,
    tags: row.tags,
    imageAspectRatio: row.image_ratio,
    variantLabel: optionKeys.join(" / ") || "Versão",
    hasColorOptions: colorNames.some(Boolean),
    hasVariantOptions: optionKeys.length > 0,
    colors: colorNames.map((name) => {
      const group = variants.filter((v) => (v.attributes.Cor ?? "") === name);
      const urls = images
        .filter((i) => !i.color_name || i.color_name === name)
        .map((i) => i.url);
      return {
        id: name || "default",
        name,
        hex: group[0]?.color_hex || "#CBD5E1",
        images: urls.length ? urls : [placeholderImage],
        variants: group.map((v) => ({
          storage: v.id,
          label:
            optionKeys
              .map((k) => v.attributes[k])
              .filter(Boolean)
              .join(" / ") || "Única",
          price: Number(v.price),
          stock: v.stock,
        })),
      };
    }),
  };
}
export function fromLocalProduct(p: Product): StoreProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    model: p.model,
    category: p.category,
    condition: p.isNew ? "new" : "pre_owned",
    short_description: p.shortDescription,
    description: p.description,
    featured: p.featured,
    published: true,
    price_is_estimated: p.priceIsEstimated,
    release_order: p.releaseOrder,
    tags: p.tags,
    image_ratio:
      p.imageAspectRatio === "portrait-3-4"
        ? "3:4"
        : (p.imageAspectRatio ?? "default"),
    store_variants: p.colors.flatMap((c) =>
      c.variants.map((v, position) => ({
        id: crypto.randomUUID(),
        attributes: {
          ...(c.id === "consultar" ? {} : { Cor: c.name }),
          ...(v.storage === "unique"
            ? {}
            : { [p.variantLabel || "Armazenamento"]: v.label || v.storage }),
        },
        color_hex: c.hex,
        price: v.price,
        stock: v.stock > 0 ? importedAvailableStock : 0,
        position,
      })),
    ),
    store_images: p.colors.flatMap((c) =>
      c.images.map((url, position) => ({
        url,
        position,
        color_name: c.id === "consultar" ? null : c.name,
      })),
    ),
  };
}
export function validateProduct(p: StoreProduct) {
  if (!Number.isFinite(p.release_order))
    throw new Error("A ordem de novidade deve ser um número válido.");
  if (!p.name.trim() || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug))
    throw new Error(
      "Preencha o nome e uma URL válida (letras minúsculas, números e hífens).",
    );
  if (!p.store_variants.length)
    throw new Error("Cadastre pelo menos um preço e estoque.");
  const seen = new Set<string>();
  const keys = Object.keys(p.store_variants[0].attributes).sort().join("|");
  for (const v of p.store_variants) {
    if (
      !Number.isFinite(v.price) ||
      v.price < 0 ||
      v.price > 9999999999.99 ||
      !Number.isInteger(v.stock) ||
      v.stock < 0 ||
      v.stock > 2147483647
    )
      throw new Error(
        "Preços devem ser positivos ou zero; estoque deve ser um número inteiro válido.",
      );
    if (
      Object.keys(v.attributes).sort().join("|") !== keys ||
      Object.entries(v.attributes).some(
        ([k, value]) => !k.trim() || !value.trim(),
      )
    )
      throw new Error("Preencha as mesmas opções em todas as combinações.");
    const identity = JSON.stringify(
      Object.entries(v.attributes).sort(([a], [b]) => a.localeCompare(b)),
    );
    if (seen.has(identity))
      throw new Error(
        "Há combinações repetidas. Um produto sem variações deve ter apenas uma linha.",
      );
    seen.add(identity);
  }
  const colors = new Set(
    p.store_variants.map((v) => v.attributes.Cor).filter(Boolean),
  );
  if (p.store_images.some((i) => i.color_name && !colors.has(i.color_name)))
    throw new Error(
      "Há uma foto vinculada a uma cor removida. Escolha outra cor ou Todas as cores.",
    );
}
export async function saveProduct(p: StoreProduct, insertOnly = false) {
  validateProduct(p);
  const { data, error } = await client().rpc("save_store_product", {
    payload: p,
    expected_updated_at: p.updated_at ?? null,
    insert_only: insertOnly,
  });
  if (error) throw error;
  return data as boolean;
}
