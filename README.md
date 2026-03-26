# Web PC

Web PC em React + TypeScript + Vite, com visual inspirado no Windows e deploy pronto para GitHub Pages.

## O que tem no projeto

- Desktop no estilo Windows 11
- Taskbar centralizada
- Menu iniciar com apps fixados e recomendados
- Janelas com arrastar, minimizar e maximizar
- Explorador, navegador, terminal e configuracoes
- Workflow automatico para publicar no GitHub Pages

## Rodando localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

O projeto ja esta preparado para publicar no Pages do repositorio `Belin7z/Web-pc`.

- `vite.config.ts` usa `base: "/Web-pc/"`
- `.github/workflows/deploy.yml` gera e publica o `dist`

Para ativar no GitHub:

1. Abra `Settings > Pages`
2. Em `Source`, selecione `GitHub Actions`
3. Faça push no branch `main`

URL esperada:

`https://belin7z.github.io/Web-pc/`
