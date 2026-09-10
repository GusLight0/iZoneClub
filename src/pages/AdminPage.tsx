import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type ReactElement,
} from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import {
  client,
  errorMessage,
  fetchStoreProducts,
  fromLocalProduct,
  placeholderImage,
  remoteCatalogEnabled,
  saveProduct,
  validateProduct,
  type StoreProduct,
} from "../lib/store";
import { useCatalog } from "../contexts/CatalogContext";
import { allProducts } from "../data/catalog";
import { formatCurrency } from "../utils/currency";
import "../styles/admin.css";

const categories = [
  "iPhone",
  "iPad",
  "MacBook",
  "Apple Watch",
  "Acessórios",
] as const;
const suggestions: Record<string, string[]> = {
  iPhone: ["Cor", "Armazenamento"],
  iPad: ["Cor", "Armazenamento"],
  MacBook: ["Cor", "RAM", "Armazenamento"],
  "Apple Watch": ["Cor", "Tamanho"],
  Acessórios: [],
};
const emptyVariant = () => ({
  id: crypto.randomUUID(),
  attributes: {} as Record<string, string>,
  color_hex: "#CBD5E1",
  price: 0,
  stock: 0,
  position: 0,
});
function newProduct(): StoreProduct {
  return {
    id: crypto.randomUUID(),
    slug: "",
    name: "",
    model: "",
    category: "Acessórios",
    condition: "new",
    short_description: "",
    description: "",
    featured: false,
    published: false,
    price_is_estimated: false,
    release_order: 0,
    tags: [],
    image_ratio: "1:1",
    store_variants: [emptyVariant()],
    store_images: [],
  };
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  return (
    <div className="admin-field">
      <label htmlFor={id}>{label}</label>
      {Children.map(children, (child) =>
        isValidElement(child) &&
        ["input", "select", "textarea"].includes(String(child.type))
          ? cloneElement(child as ReactElement<{ id: string }>, { id })
          : child,
      )}
    </div>
  );
}
export default function AdminPage() {
  const { refresh } = useCatalog();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState<StoreProduct[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState<StoreProduct | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("");
  const [importConfirmed, setImportConfirmed] = useState(false);
  useEffect(() => {
    if (!supabase) {
      setUser(null);
      setChecking(false);
      return;
    }
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (user === undefined) return;
    setAllowed(false);
    setRows([]);
    setLoaded(false);
    setEditing(null);
    if (!user) {
      setChecking(false);
      return;
    }
    let current = true;
    setChecking(true);
    void client()
      .rpc("is_store_admin")
      .then(({ data, error }) => {
        if (!current) return;
        if (error)
          setError(
            "Não foi possível verificar o acesso. Confira a conexão e se o SQL 001 foi executado.",
          );
        else {
          setAllowed(data === true);
          if (!data)
            setError("Este usuário não está autorizado como administrador.");
        }
        setChecking(false);
      });
    return () => {
      current = false;
    };
  }, [user?.id, user === undefined]);
  async function load() {
    const result = await fetchStoreProducts(true);
    setRows(result);
    setLoaded(true);
  }
  useEffect(() => {
    if (allowed) void load().catch((e) => setError(errorMessage(e)));
  }, [allowed]);
  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function login(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      const { error } = await client().auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error)
        throw new Error(
          "Não foi possível entrar. Confira e-mail, senha e confirmação do usuário no Supabase.",
        );
      setPassword("");
    });
  }
  async function importProducts() {
    await run(async () => {
      const existing = new Set(
        (await fetchStoreProducts(true)).map((p) => p.id),
      );
      let count = 0;
      for (const p of allProducts) {
        if (existing.has(p.id)) continue;
        setNotice(`Importando: ${p.name}`);
        if (await saveProduct(fromLocalProduct(p), true)) count++;
      }
      await load();
      setNotice(
        `${count} produtos importados. Produtos existentes foram preservados.`,
      );
    });
  }
  const visible = rows
    .filter((p) =>
      `${p.name} ${p.model} ${p.slug}`
        .toLocaleLowerCase("pt-BR")
        .includes(search.toLocaleLowerCase("pt-BR")),
    )
    .filter((p) => !category || p.category === category)
    .filter(
      (p) =>
        filter === "all" ||
        (filter === "published"
          ? p.published
          : filter === "hidden"
            ? !p.published
            : p.store_variants.every((v) => v.stock === 0)),
    );
  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">iZone Club</span>
          <h1>Painel da loja</h1>
        </div>
        <nav>
          <Link to="/">Ver loja</Link>
          {user && !editing && (
            <button
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  const { error } = await client().auth.signOut();
                  if (error) throw error;
                })
              }
            >
              Sair
            </button>
          )}
        </nav>
      </header>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="admin-notice" role="status">
          {notice}
        </p>
      )}
      {!supabase ? (
        <section className="admin-panel">
          Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no
          .env.local e reinicie o servidor.
        </section>
      ) : checking || user === undefined ? (
        <p role="status">Verificando acesso…</p>
      ) : !user ? (
        <form className="admin-panel admin-login" onSubmit={login}>
          <h2>Entrar</h2>
          <p>Use o acesso de administrador da loja.</p>
          <Field label="E-mail">
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Senha">
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <button className="admin-primary" disabled={busy}>
            {busy ? "Entrando…" : "Entrar"}
          </button>
          <p className="admin-muted">
            Se você esqueceu a senha, solicite a recuperação ao responsável pela
            conta Supabase.
          </p>
        </form>
      ) : !allowed ? (
        <section className="admin-panel">
          <p>
            Acesso não autorizado ou indisponível. Saia e entre novamente após
            conferir as permissões.
          </p>
        </section>
      ) : editing ? (
        <ProductEditor
          key={editing.id}
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            setNotice("Produto salvo.");
            await load();
            void refresh().catch(() => {});
          }}
        />
      ) : (
        <>
          <section className="admin-summary">
            <div>
              <strong>{rows.length}</strong>
              <span>Produtos</span>
            </div>
            <div>
              <strong>{rows.filter((p) => p.published).length}</strong>
              <span>Publicados</span>
            </div>
            <div>
              <strong>
                {rows.reduce(
                  (s, p) =>
                    s + p.store_variants.reduce((n, v) => n + v.stock, 0),
                  0,
                )}
              </strong>
              <span>Unidades em estoque</span>
            </div>
          </section>
          {!remoteCatalogEnabled && (
            <p className="admin-notice">
              A loja ainda usa o catálogo local. Após importar e conferir os
              produtos, ative VITE_CATALOG_SOURCE=supabase conforme o guia.
            </p>
          )}
          <section className="admin-panel">
            <div className="admin-toolbar">
              <h2>Produtos</h2>
              <button
                className="admin-primary"
                disabled={busy}
                onClick={() => setEditing(newProduct())}
              >
                Novo produto
              </button>
              <button disabled={busy} onClick={() => void run(load)}>
                Atualizar lista
              </button>
            </div>
            <div className="admin-grid">
              <Field label="Buscar produto">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nome, modelo ou URL"
                />
              </Field>
              <Field label="Categoria">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Todas</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Situação">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="published">Publicados</option>
                  <option value="hidden">Ocultos</option>
                  <option value="out">Sem estoque</option>
                </select>
              </Field>
            </div>
            {!loaded ? (
              <p role="status">Carregando produtos…</p>
            ) : !visible.length ? (
              <p>
                Nenhum produto encontrado. Cadastre um produto ou importe o
                catálogo atual.
              </p>
            ) : (
              <div className="admin-product-list">
                {visible.map((p) => (
                  <button
                    className="admin-product-row"
                    disabled={busy}
                    key={p.id}
                    onClick={() => {
                      setError("");
                      setNotice("");
                      setEditing(structuredClone(p));
                    }}
                  >
                    <img
                      src={p.store_images[0]?.url || placeholderImage}
                      alt=""
                    />
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {p.category} ·{" "}
                        {p.condition === "new" ? "Novo" : "Seminovo"} ·{" "}
                        {p.published ? "Publicado" : "Oculto"}
                      </small>
                    </span>
                    <span>
                      {formatCurrency(
                        Math.min(...p.store_variants.map((v) => v.price)),
                      )}
                      <small>
                        {p.store_variants.reduce((sum, v) => sum + v.stock, 0)}{" "}
                        un. · Editar
                      </small>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>
          <details className="admin-panel">
            <summary>Importar catálogo atual e exportar cópia</summary>
            <p>
              A importação usa os preços atualmente exibidos na loja e preserva
              cadastros já importados. Confira os preços de venda antes de
              ativar o catálogo remoto.
            </p>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={importConfirmed}
                onChange={(e) => setImportConfirmed(e.target.checked)}
              />
              Conferi os preços do catálogo atual e quero importá-los.
            </label>
            <div className="admin-toolbar">
              <button
                disabled={busy || !importConfirmed || !loaded}
                onClick={() => void importProducts()}
              >
                Importar produtos atuais
              </button>
              <button
                disabled={!loaded || busy}
                onClick={() => {
                  const url = URL.createObjectURL(
                    new Blob([JSON.stringify(rows, null, 2)], {
                      type: "application/json",
                    }),
                  );
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `izone-catalogo-${new Date().toISOString().slice(0, 10)}.json`;
                  a.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
              >
                Exportar catálogo JSON
              </button>
            </div>
            <p className="admin-muted">
              A exportação inclui os links das fotos; mantenha também uma cópia
              dos arquivos.
            </p>
          </details>
        </>
      )}
    </main>
  );
}

function ProductEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: StoreProduct;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [draft, setDraft] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [previewWidth, setPreviewWidth] = useState("mobile");
  const blobs = useRef(new Map<string, Blob>());
  const pending = useRef(false);
  useEffect(
    () => () => {
      blobs.current.forEach((_blob, url) => URL.revokeObjectURL(url));
    },
    [],
  );
  useEffect(() => {
    const listener = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [dirty]);
  function change(patch: Partial<StoreProduct>) {
    setDraft((p) => ({ ...p, ...patch }));
    setDirty(true);
  }
  const options = Object.keys(draft.store_variants[0]?.attributes || {});
  const colors = [
    ...new Set(
      draft.store_variants.map((v) => v.attributes.Cor).filter(Boolean),
    ),
  ];
  function addOption(name: string) {
    name = name.trim();
    if (!name || options.includes(name)) return;
    change({
      store_variants: draft.store_variants.map((v) => ({
        ...v,
        attributes: { ...v.attributes, [name]: "" },
      })),
    });
    setNewOption("");
  }
  function removeOption(name: string) {
    if (
      !window.confirm(
        `Remover a opção ${name} de todas as combinações? Confira preços e estoque antes de salvar.`,
      )
    )
      return;
    change({
      store_variants: draft.store_variants.map((v) => ({
        ...v,
        attributes: Object.fromEntries(
          Object.entries(v.attributes).filter(([key]) => key !== name),
        ),
      })),
      ...(name === "Cor"
        ? {
            store_images: draft.store_images.map((i) => ({
              ...i,
              color_name: null,
            })),
          }
        : {}),
    });
  }
  async function addPhotos(files: FileList | null) {
    if (!files) return;
    setBusy(true);
    setError("");
    try {
      const additions = [];
      for (const file of Array.from(files)) {
        if (
          !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
          file.size > 20 * 1024 * 1024
        )
          throw new Error("Use JPEG, PNG ou WebP de até 20 MB por foto.");
        const bitmap = await createImageBitmap(file);
        try {
          const scale = Math.min(
            1,
            1600 / Math.max(bitmap.width, bitmap.height),
          );
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(bitmap.width * scale));
          canvas.height = Math.max(1, Math.round(bitmap.height * scale));
          const context = canvas.getContext("2d");
          if (!context)
            throw new Error("Seu navegador não conseguiu preparar a imagem.");
          context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          const blob = await new Promise<Blob>((resolve, reject) =>
            canvas.toBlob(
              (b) =>
                b ? resolve(b) : reject(new Error("Falha ao otimizar foto.")),
              "image/webp",
              0.82,
            ),
          );
          if (blob.size > 5 * 1024 * 1024)
            throw new Error(
              "A foto otimizada ultrapassa 5 MB. Escolha uma imagem menor.",
            );
          const url = URL.createObjectURL(blob);
          blobs.current.set(url, blob);
          additions.push({
            url,
            color_name: null,
            position: draft.store_images.length + additions.length,
          });
        } finally {
          bitmap.close();
        }
      }
      change({ store_images: [...draft.store_images, ...additions] });
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      validateProduct(draft);
      const images = [];
      for (const [position, img] of draft.store_images.entries()) {
        const blob = blobs.current.get(img.url);
        if (!blob) {
          images.push({ ...img, position });
          continue;
        }
        const path = `${draft.id}/${crypto.randomUUID()}.${blob.type === "image/webp" ? "webp" : "png"}`;
        const { error } = await client()
          .storage.from("product-images")
          .upload(path, blob, {
            contentType: blob.type,
            cacheControl: "31536000",
            upsert: false,
          });
        if (error) throw error;
        const url = client().storage.from("product-images").getPublicUrl(path)
          .data.publicUrl;
        images.push({ ...img, url, position });
        // Reutiliza uploads concluídos caso uma etapa posterior falhe.
        setDraft((p) => ({
          ...p,
          store_images: p.store_images.map((i) =>
            i.url === img.url ? { ...i, url } : i,
          ),
        }));
      }
      await saveProduct({
        ...draft,
        store_images: images,
        store_variants: draft.store_variants.map((v, position) => ({
          ...v,
          position,
        })),
      });
      setDirty(false);
      await onSaved();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  function close() {
    if (!dirty || window.confirm("Descartar as alterações não salvas?"))
      onClose();
  }
  const ratio =
    draft.image_ratio === "default"
      ? "4 / 5"
      : draft.image_ratio.replace(":", " / ");
  return (
    <form onSubmit={submit}>
      <div className="admin-toolbar">
        <h2>{initial.updated_at ? "Editar produto" : "Novo produto"}</h2>
        <button type="button" disabled={busy} onClick={close}>
          Voltar à lista
        </button>
      </div>
      {error && (
        <p role="alert" className="admin-error">
          {error}
        </p>
      )}
      <fieldset disabled={busy} className="admin-fieldset">
        <section className="admin-panel">
          <h3>Informações do produto</h3>
          <div className="admin-grid">
            <Field label="Nome">
              <input
                required
                value={draft.name}
                onChange={(e) => {
                  const name = e.target.value;
                  change({
                    name,
                    ...(!initial.updated_at &&
                    (!draft.slug ||
                      draft.slug ===
                        draft.name
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, ""))
                      ? {
                          slug: name
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, ""),
                        }
                      : {}),
                  });
                }}
              />
            </Field>
            <Field label="URL do produto">
              <input
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                value={draft.slug}
                onChange={(e) => change({ slug: e.target.value })}
              />
              <small>/produto/{draft.slug || "nome-do-produto"}</small>
            </Field>
            <Field label="Modelo">
              <input
                value={draft.model}
                onChange={(e) => change({ model: e.target.value })}
              />
            </Field>
            <Field label="Categoria">
              <select
                value={draft.category}
                onChange={(e) =>
                  change({
                    category: e.target.value as StoreProduct["category"],
                  })
                }
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Condição">
              <select
                value={draft.condition}
                onChange={(e) =>
                  change({
                    condition: e.target.value as StoreProduct["condition"],
                  })
                }
              >
                <option value="new">Novo</option>
                <option value="pre_owned">Seminovo</option>
              </select>
            </Field>
            <Field label="Ordem de novidade (maiores primeiro)">
              <input
                type="number"
                step="any"
                value={draft.release_order}
                onChange={(e) =>
                  change({ release_order: Number(e.target.value) })
                }
              />
            </Field>
          </div>
          <Field label="Descrição curta">
            <input
              value={draft.short_description}
              onChange={(e) => change({ short_description: e.target.value })}
            />
          </Field>
          <Field label="Descrição completa">
            <textarea
              rows={4}
              value={draft.description}
              onChange={(e) => change({ description: e.target.value })}
            />
          </Field>
          <Field label="Palavras para busca (separadas por vírgula)">
            <input
              value={draft.tags.join(",")}
              onChange={(e) => change({ tags: e.target.value.split(",") })}
            />
          </Field>
          <div className="admin-toolbar">
            {(["published", "featured", "price_is_estimated"] as const).map(
              (key, i) => (
                <label className="admin-check" key={key}>
                  <input
                    type="checkbox"
                    checked={draft[key]}
                    onChange={(e) => change({ [key]: e.target.checked })}
                  />
                  {["Publicado na loja", "Em destaque", "Preço estimado"][i]}
                </label>
              ),
            )}
          </div>
        </section>
        <section className="admin-panel">
          <h3>Opções, preço e estoque</h3>
          <p>
            Adicione somente as opções que existem neste produto. Sem opções,
            mantenha uma única linha com preço e estoque.
          </p>
          <div className="admin-toolbar">
            {options.map((name) => (
              <button
                type="button"
                key={name}
                onClick={() => removeOption(name)}
              >
                {name} ×
              </button>
            ))}
          </div>
          <div className="admin-toolbar">
            {suggestions[draft.category]
              .filter((name) => !options.includes(name))
              .map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => addOption(name)}
                >
                  Adicionar {name}
                </button>
              ))}
          </div>
          <div className="admin-toolbar">
            <Field label="Outra opção (ex.: Cor, Conector, Tamanho)">
              <input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
              />
            </Field>
            <button type="button" onClick={() => addOption(newOption)}>
              Adicionar opção
            </button>
          </div>
          <div className="admin-variants">
            {draft.store_variants.map((v, index) => (
              <div className="admin-variant" key={v.id}>
                <h4>
                  {options.length
                    ? `Combinação ${index + 1}`
                    : "Preço e estoque"}
                </h4>
                <div className="admin-grid">
                  {options.map((name) => (
                    <Field label={name} key={name}>
                      <input
                        required
                        value={v.attributes[name] || ""}
                        onChange={(e) =>
                          change({
                            store_variants: draft.store_variants.map((item) =>
                              item.id === v.id
                                ? {
                                    ...item,
                                    attributes: {
                                      ...item.attributes,
                                      [name]: e.target.value,
                                    },
                                  }
                                : item,
                            ),
                          })
                        }
                      />
                    </Field>
                  ))}
                  {options.includes("Cor") && (
                    <Field label="Amostra da cor">
                      <input
                        type="color"
                        value={v.color_hex || "#CBD5E1"}
                        onChange={(e) =>
                          change({
                            store_variants: draft.store_variants.map((item) =>
                              item.attributes.Cor === v.attributes.Cor
                                ? { ...item, color_hex: e.target.value }
                                : item,
                            ),
                          })
                        }
                      />
                    </Field>
                  )}
                  <Field label="Preço de venda (R$)">
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={Number.isNaN(v.price) ? "" : v.price}
                      onChange={(e) =>
                        change({
                          store_variants: draft.store_variants.map((item) =>
                            item.id === v.id
                              ? {
                                  ...item,
                                  price:
                                    e.target.value === ""
                                      ? NaN
                                      : Number(e.target.value),
                                }
                              : item,
                          ),
                        })
                      }
                    />
                  </Field>
                  <Field label="Estoque (unidades)">
                    <input
                      required
                      type="number"
                      min="0"
                      step="1"
                      value={Number.isNaN(v.stock) ? "" : v.stock}
                      onChange={(e) =>
                        change({
                          store_variants: draft.store_variants.map((item) =>
                            item.id === v.id
                              ? {
                                  ...item,
                                  stock:
                                    e.target.value === ""
                                      ? NaN
                                      : Number(e.target.value),
                                }
                              : item,
                          ),
                        })
                      }
                    />
                  </Field>
                </div>
                {draft.store_variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      change({
                        store_variants: draft.store_variants.filter(
                          (item) => item.id !== v.id,
                        ),
                      })
                    }
                  >
                    Remover combinação
                  </button>
                )}
              </div>
            ))}
          </div>
          {options.length > 0 && (
            <button
              type="button"
              onClick={() =>
                change({
                  store_variants: [
                    ...draft.store_variants,
                    {
                      ...emptyVariant(),
                      attributes: Object.fromEntries(
                        options.map((name) => [name, ""]),
                      ),
                    },
                  ],
                })
              }
            >
              Adicionar combinação
            </button>
          )}
          <p className="admin-muted">
            O estoque é manual. Pedidos enviados ao WhatsApp não baixam unidades
            automaticamente.
          </p>
        </section>
        <section className="admin-panel">
          <h3>Fotos e formato</h3>
          <div className="admin-grid">
            <Field label="Formato da imagem">
              <select
                value={draft.image_ratio}
                onChange={(e) =>
                  change({
                    image_ratio: e.target.value as StoreProduct["image_ratio"],
                  })
                }
              >
                <option value="1:1">1:1 — Quadrado</option>
                <option value="3:4">3:4 — Vertical</option>
                <option value="4:3">4:3 — Horizontal</option>
                <option value="default">Padrão atual</option>
              </select>
            </Field>
            <Field label="Adicionar fotos">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => {
                  void addPhotos(e.target.files);
                  e.target.value = "";
                }}
              />
            </Field>
          </div>
          <p>
            As fotos serão otimizadas e exibidas inteiras, sem distorção.
            Selecione uma cor para vincular uma foto àquela opção.
          </p>
          <div className="admin-photos">
            {draft.store_images.map((img, index) => (
              <div key={`${index}-${img.url}`}>
                <img
                  src={img.url}
                  alt={`Foto ${index + 1}`}
                  style={{ aspectRatio: ratio }}
                />
                <Field label="Cor da foto">
                  <select
                    value={img.color_name || ""}
                    onChange={(e) =>
                      change({
                        store_images: draft.store_images.map((item, n) =>
                          n === index
                            ? { ...item, color_name: e.target.value || null }
                            : item,
                        ),
                      })
                    }
                  >
                    <option value="">Todas as cores</option>
                    {[
                      ...new Set([
                        ...colors,
                        ...(img.color_name ? [img.color_name] : []),
                      ]),
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <div className="admin-toolbar">
                  <button
                    type="button"
                    disabled={index === 0}
                    aria-label={`Mover foto ${index + 1} para antes`}
                    onClick={() => {
                      const next = [...draft.store_images];
                      [next[index - 1], next[index]] = [
                        next[index],
                        next[index - 1],
                      ];
                      change({ store_images: next });
                    }}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    disabled={index === draft.store_images.length - 1}
                    aria-label={`Mover foto ${index + 1} para depois`}
                    onClick={() => {
                      const next = [...draft.store_images];
                      [next[index + 1], next[index]] = [
                        next[index],
                        next[index + 1],
                      ];
                      change({ store_images: next });
                    }}
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      change({
                        store_images: draft.store_images.filter(
                          (_, n) => n !== index,
                        ),
                      })
                    }
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h4>Prévia da proporção</h4>
          <div className="admin-toolbar">
            <button
              type="button"
              aria-pressed={previewWidth === "mobile"}
              onClick={() => setPreviewWidth("mobile")}
            >
              Celular
            </button>
            <button
              type="button"
              aria-pressed={previewWidth === "desktop"}
              onClick={() => setPreviewWidth("desktop")}
            >
              Computador
            </button>
          </div>
          <div
            className="admin-preview"
            style={{ maxWidth: previewWidth === "mobile" ? 320 : 720 }}
          >
            <div>
              <small>Card</small>
              <img
                src={draft.store_images[0]?.url || placeholderImage}
                alt="Prévia do card"
                style={{ aspectRatio: ratio }}
              />
              <strong>{draft.name || "Nome do produto"}</strong>
            </div>
            <div>
              <small>Galeria</small>
              <img
                src={draft.store_images[0]?.url || placeholderImage}
                alt="Prévia da galeria"
                style={{ aspectRatio: ratio }}
              />
            </div>
          </div>
        </section>
      </fieldset>
      <footer className="admin-save">
        <span>
          {busy
            ? "Salvando ou preparando fotos…"
            : dirty
              ? "Alterações não salvas"
              : "Cadastro pronto para edição"}
        </span>
        <button type="button" disabled={busy} onClick={close}>
          Cancelar
        </button>
        <button className="admin-primary" disabled={busy} type="submit">
          {busy ? "Aguarde…" : "Salvar produto"}
        </button>
      </footer>
    </form>
  );
}
