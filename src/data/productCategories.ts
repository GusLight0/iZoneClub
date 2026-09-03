import { Headphones, Laptop, Smartphone, Tablet, Watch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProductCategory } from "../types/product";

export interface ProductCategoryOption {
  id: string;
  label: ProductCategory;
  description: string;
  icon: LucideIcon;
}

export const productCategories: ProductCategoryOption[] = [
  {
    id: "iphone",
    label: "iPhone",
    description: "iPhones novos com cor, armazenamento e atendimento direto.",
    icon: Smartphone
  },
  {
    id: "ipad",
    label: "iPad",
    description: "Tablets Apple novos quando entrarem no catálogo.",
    icon: Tablet
  },
  {
    id: "macbook",
    label: "MacBook",
    description: "Notebooks Apple novos conforme disponibilidade.",
    icon: Laptop
  },
  {
    id: "apple-watch",
    label: "Apple Watch",
    description: "Relógios Apple novos para compra direta.",
    icon: Watch
  },
  {
    id: "acessorios",
    label: "Acessórios",
    description: "Capas, fones, carregadores e itens compatíveis.",
    icon: Headphones
  }
];

export function getCategoryById(categoryId: string) {
  return productCategories.find((category) => category.id === categoryId);
}
