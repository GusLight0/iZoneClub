import { chromium } from "../.tmp/admin-check/node_modules/playwright/index.mjs";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const user = {
    id: "00000000-0000-0000-0000-000000000001",
    email: "admin@example.test",
    aud: "authenticated",
    role: "authenticated",
    app_metadata: { provider: "email" },
    user_metadata: {},
    created_at: new Date().toISOString(),
  };
  const rows = [];
  let saves = 0,
    uploads = 0;
  const photoData = await page.evaluate(() => {
    const c = document.createElement("canvas");
    c.width = 300;
    c.height = 400;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#dbeafe";
    ctx.fillRect(0, 0, 300, 400);
    ctx.fillStyle = "#1e40af";
    ctx.fillRect(75, 80, 150, 240);
    return c.toDataURL("image/png").split(",")[1];
  });
  await context.route("http://localhost:54321/**", async (route) => {
    const request = route.request(),
      url = new URL(request.url());
    let data;
    if (url.pathname === "/auth/v1/token")
      data = {
        access_token: "test-access",
        refresh_token: "test-refresh",
        expires_in: 3600,
        token_type: "bearer",
        user,
      };
    else if (url.pathname === "/auth/v1/user") data = user;
    else if (url.pathname === "/auth/v1/logout") data = {};
    else if (url.pathname === "/rest/v1/rpc/is_store_admin") data = true;
    else if (url.pathname === "/rest/v1/store_products") data = rows;
    else if (url.pathname.startsWith("/storage/v1/object/product-images/")) {
      uploads++;
      data = { Key: url.pathname.split("/object/")[1] };
    } else if (
      url.pathname.startsWith("/storage/v1/object/public/product-images/")
    ) {
      await route.fulfill({
        status: 200,
        contentType: "image/png",
        body: Buffer.from(photoData, "base64"),
      });
      return;
    } else if (url.pathname === "/rest/v1/rpc/save_store_product") {
      const { payload } = request.postDataJSON();
      assert.equal(payload.image_ratio, "4:3");
      assert.equal(payload.store_variants[0].attributes.Cor, "Preto");
      assert.equal(payload.store_variants[0].price, 129.9);
      assert.equal(payload.store_variants[0].stock, 7);
      assert.equal(payload.store_images[0].color_name, "Preto");
      assert.match(
        payload.store_images[0].url,
        /\/storage\/v1\/object\/public\/product-images\//,
      );
      rows.splice(0, rows.length, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      saves++;
      data = true;
    } else {
      await route.fulfill({
        status: 404,
        json: { message: "Unexpected test endpoint" },
      });
      return;
    }
    await route.fulfill({ status: 200, json: data });
  });
  await page.goto("http://127.0.0.1:5174/admin");
  await page.getByLabel("E-mail", { exact: true }).fill("admin@example.test");
  await page.getByLabel("Senha", { exact: true }).fill("test-password");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await page.getByRole("button", { name: "Novo produto", exact: true }).click();
  await page.getByLabel("Nome", { exact: true }).fill("Mouse de teste");
  await page.getByLabel("URL do produto").fill("mouse-de-teste");
  assert.equal(
    await page.getByLabel("Armazenamento", { exact: true }).count(),
    0,
  );
  await page.getByLabel("Outra opção").fill("Cor");
  await page
    .getByRole("button", { name: "Adicionar opção", exact: true })
    .click();
  await page.getByLabel("Cor", { exact: true }).fill("Preto");
  await page.getByLabel("Preço de venda (R$)", { exact: true }).fill("129.90");
  await page.getByLabel("Estoque (unidades)", { exact: true }).fill("7");
  await page
    .getByLabel("Formato da imagem", { exact: true })
    .selectOption("4:3");
  await page
    .getByLabel("Adicionar fotos", { exact: true })
    .setInputFiles({
      name: "produto.png",
      mimeType: "image/png",
      buffer: Buffer.from(photoData, "base64"),
    });
  await page.getByLabel("Cor da foto", { exact: true }).selectOption("Preto");
  await page.getByLabel("Publicado na loja", { exact: true }).check();
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    true,
    "editor must fit mobile",
  );
  await page.screenshot({ path: ".tmp/admin-mobile.png", fullPage: true });
  await page
    .getByRole("button", { name: "Salvar produto", exact: true })
    .click();
  await page.getByText("Produto salvo.", { exact: true }).waitFor();
  assert.equal(saves, 1);
  assert.equal(uploads, 1);
  await page.goto("http://127.0.0.1:5174/produto/mouse-de-teste");
  await page
    .getByRole("heading", { name: "Mouse de teste", exact: true })
    .waitFor();
  assert.equal(
    await page.getByText("Armazenamento", { exact: true }).count(),
    0,
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    true,
  );
  await page.screenshot({ path: ".tmp/product-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:5174/admin");
  await page.getByRole("button", { name: /Mouse de teste/ }).click();
  await page.screenshot({ path: ".tmp/admin-desktop.png", fullPage: true });
  assert.deepEqual(errors, []);
  await context.close();
  console.log(
    "Navegador: login, produto sem armazenamento, cor opcional, preço, estoque, proporção, salvamento e página pública validados em celular e desktop (API simulada).",
  );
} finally {
  await browser.close();
}
