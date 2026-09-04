# Tutorial: produtos novos

As categorias não ficam mais dentro dos filtros de `/produtos-novos`. Produtos novos são cadastrados por seção em:

```txt
src/data/products.ts
```

Leia o guia completo em:

```txt
src/data/TUTORIAL-SECOES.md
```

Resumo rápido:

- iPhone: edite `iphoneProducts`.
- iPad: edite `ipadProducts`.
- MacBook: edite `macBookProducts`.
- Apple Watch: edite `appleWatchProducts`.
- Acessórios: edite `accessoryProducts`.
- Nomes, rotas e ordem das seções: edite `src/data/productSections.ts`.

Depois de qualquer alteração, rode:

```powershell
npm.cmd test
```
