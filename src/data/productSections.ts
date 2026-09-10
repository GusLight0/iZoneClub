import { Headphones, Laptop, PackageCheck, Smartphone, Tablet, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Product, ProductCategory } from "../types/product";
import {
  accessoryProducts,
  appleWatchProducts,
  ipadProducts,
  iphoneProducts,
  macBookProducts
} from "./products";
import { preOwnedProducts } from "./preOwned";

export type ProductSectionId = "iphones" | "ipads" | "macbooks" | "apple-watch" | "acessorios" | "seminovos";

export interface ProductSection {
  id: ProductSectionId;
  label: string;
  shortLabel: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: LucideIcon;
  products: Product[];
  category?: ProductCategory;
  isPreOwned?: boolean;
}

export const productSections: ProductSection[] = [
  {
    id: "iphones",
    label: "iPhone",
    shortLabel: "iPhone",
    href: "/iphones",
    eyebrow: "iPhone",
    title: "iPhones",
    description: "Aparelhos iPhone em uma seção própria, fora dos filtros de produtos novos.",
    emptyTitle: "Nenhum iPhone cadastrado.",
    emptyDescription: "Adicione produtos no array iphoneProducts em src/data/products.ts.",
    icon: Smartphone,
    products: iphoneProducts,
    category: "iPhone"
  },
  {
    id: "ipads",
    label: "iPad",
    shortLabel: "iPad",
    href: "/ipads",
    eyebrow: "iPad",
    title: "iPads",
    description: "Tablets Apple organizados em uma seção própria da loja.",
    emptyTitle: "Nenhum iPad cadastrado.",
    emptyDescription: "Adicione produtos no array ipadProducts em src/data/products.ts.",
    icon: Tablet,
    products: ipadProducts,
    category: "iPad"
  },
  {
    id: "macbooks",
    label: "Mac",
    shortLabel: "Mac",
    href: "/macbooks",
    eyebrow: "Mac",
    title: "Macs",
    description: "MacBooks, Mac Mini e iMac com suas configurações disponíveis.",
    emptyTitle: "Nenhum Mac cadastrado.",
    emptyDescription: "Adicione produtos no array macBookProducts em src/data/products.ts.",
    icon: Laptop,
    products: macBookProducts,
    category: "MacBook"
  },
  {
    id: "apple-watch",
    label: "Apple Watch",
    shortLabel: "Watch",
    href: "/apple-watch",
    eyebrow: "Apple Watch",
    title: "Apple Watch",
    description: "Relógios Apple em uma seção independente.",
    emptyTitle: "Nenhum Apple Watch cadastrado.",
    emptyDescription: "Adicione produtos no array appleWatchProducts em src/data/products.ts.",
    icon: Watch,
    products: appleWatchProducts,
    category: "Apple Watch"
  },
  {
    id: "acessorios",
    label: "Acessórios",
    shortLabel: "Acess.",
    href: "/acessorios",
    eyebrow: "Acessórios",
    title: "Acessórios",
    description: "Carregadores, fones, capas e outros itens em uma seção própria.",
    emptyTitle: "Nenhum acessório cadastrado.",
    emptyDescription: "Adicione produtos no array accessoryProducts em src/data/products.ts.",
    icon: Headphones,
    products: accessoryProducts,
    category: "Acessórios"
  },
  {
    id: "seminovos",
    label: "Seminovos",
    shortLabel: "Semi",
    href: "/seminovos",
    eyebrow: "Seminovos",
    title: "Produtos seminovos",
    description: "Itens seminovos em uma seção separada dos produtos novos.",
    emptyTitle: "Nenhum seminovo cadastrado.",
    emptyDescription: "Adicione produtos no array preOwnedProducts em src/data/preOwned.ts.",
    icon: PackageCheck,
    products: preOwnedProducts,
    isPreOwned: true
  }
];

export function getProductSectionById(sectionId: ProductSectionId) {
  return productSections.find((section) => section.id === sectionId);
}

export function getProductSectionForProduct(product: Product) {
  if (!product.isNew) {
    return productSections.find((section) => section.isPreOwned);
  }

  return productSections.find((section) => section.category === product.category);
}
