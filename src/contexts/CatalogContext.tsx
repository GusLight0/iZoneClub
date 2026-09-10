import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { allProducts as localProducts } from "../data/catalog";
import type { Product } from "../types/product";
import {
  fetchStoreProducts,
  remoteCatalogEnabled,
  toProduct,
} from "../lib/store";

const CatalogContext = createContext<{
  products: Product[];
  loading: boolean;
  error: boolean;
  refresh: () => Promise<Product[]>;
} | null>(null);
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(
    remoteCatalogEnabled ? [] : localProducts,
  );
  const [loading, setLoading] = useState(remoteCatalogEnabled);
  const [error, setError] = useState(false);
  const pending = useRef<Promise<Product[]> | null>(null);
  const refresh = useCallback((): Promise<Product[]> => {
    if (!remoteCatalogEnabled) return Promise.resolve(localProducts);
    if (pending.current) return pending.current;
    pending.current = fetchStoreProducts()
      .then((rows) => {
        const next = rows.map(toProduct).filter((p) => p.colors.length > 0);
        setProducts(next);
        setError(false);
        return next;
      })
      .catch((error) => {
        setError(true);
        throw error;
      })
      .finally(() => {
        setLoading(false);
        pending.current = null;
      });
    return pending.current;
  }, []);
  useEffect(() => {
    void refresh().catch(() => {});
    const onFocus = () => {
      void refresh().catch(() => {});
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refresh]);
  return (
    <CatalogContext.Provider value={{ products, loading, error, refresh }}>
      {children}
    </CatalogContext.Provider>
  );
}
export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("CatalogProvider ausente");
  return value;
}
