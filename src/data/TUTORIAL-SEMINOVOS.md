# Tutorial: seminovos

Seminovos ficam em uma seção própria:

```txt
/seminovos
```

Cadastre, edite ou remova produtos seminovos em:

```txt
src/data/preOwned.ts
```

Leia o guia completo em:

```txt
src/data/TUTORIAL-SECOES.md
```

Resumo rápido:

- Use o array `preOwnedProducts`.
- Use `createPreOwnedProduct(...)` para cadastrar novos seminovos.
- Coloque estado do aparelho, bateria, garantia e acessórios inclusos em `description`.
- Use `stock: 1` para item disponível e `stock: 0` para indisponível.

Depois de qualquer alteração, rode:

```powershell
npm.cmd test
```
