export type ProjectTreeNode = {
  name: string
  kind: 'folder' | 'file'
  path: string
  updatedAt: string
  size: number
  description?: string
  htmlUrl?: string
  rawUrl?: string
  previewText?: string
  badges?: string[]
  repoMeta?: {
    defaultBranch: string
    visibility: string
    language: string
    pushedAt: string
  }
  extension?: string
  children?: ProjectTreeNode[]
}

export const projectTree: ProjectTreeNode = {
  "name": "Projetos",
  "kind": "folder",
  "path": "Projetos",
  "updatedAt": "2026-03-26T18:52:12Z",
  "size": 0,
  "description": "Repositórios públicos de Belin7z no GitHub.",
  "htmlUrl": "https://github.com/Belin7z",
  "badges": [],
  "children": [
    {
      "name": "Belin7z",
      "kind": "folder",
      "path": "Projetos/Belin7z",
      "updatedAt": "2026-03-26T00:38:08Z",
      "size": 31744,
      "description": "Sobre mim",
      "htmlUrl": "https://github.com/Belin7z/Belin7z",
      "badges": [
        "README",
        "Workflow"
      ],
      "repoMeta": {
        "defaultBranch": "main",
        "visibility": "Público",
        "language": "Sem linguagem principal",
        "pushedAt": "2026-03-26T00:38:08Z"
      },
      "children": [
        {
          "name": ".github",
          "kind": "folder",
          "path": "Projetos/Belin7z/.github",
          "updatedAt": "2026-03-26T00:38:08Z",
          "size": 0,
          "description": "Pasta do repositório Belin7z.",
          "htmlUrl": "https://github.com/Belin7z/Belin7z/tree/main/.github",
          "badges": [],
          "children": [
            {
              "name": "workflows",
              "kind": "folder",
              "path": "Projetos/Belin7z/.github/workflows",
              "updatedAt": "2026-03-26T00:38:08Z",
              "size": 0,
              "description": "Pasta do repositório Belin7z.",
              "htmlUrl": "https://github.com/Belin7z/Belin7z/tree/main/.github/workflows",
              "badges": [],
              "children": [
                {
                  "name": "jokenpo.yml",
                  "kind": "file",
                  "path": "Projetos/Belin7z/.github/workflows/jokenpo.yml",
                  "updatedAt": "2026-03-26T00:38:08Z",
                  "size": 2867,
                  "extension": "yml",
                  "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/.github/workflows/jokenpo.yml",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Belin7z/main/.github/workflows/jokenpo.yml"
                },
                {
                  "name": "snake.yml",
                  "kind": "file",
                  "path": "Projetos/Belin7z/.github/workflows/snake.yml",
                  "updatedAt": "2026-03-26T00:38:08Z",
                  "size": 792,
                  "extension": "yml",
                  "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/.github/workflows/snake.yml",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Belin7z/main/.github/workflows/snake.yml"
                }
              ]
            }
          ]
        },
        {
          "name": "LICENSE",
          "kind": "file",
          "path": "Projetos/Belin7z/LICENSE",
          "updatedAt": "2026-03-26T00:38:08Z",
          "size": 1064,
          "extension": "",
          "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/LICENSE",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Belin7z/main/LICENSE"
        },
        {
          "name": "README.md",
          "kind": "file",
          "path": "Projetos/Belin7z/README.md",
          "updatedAt": "2026-03-26T00:38:08Z",
          "size": 3896,
          "extension": "md",
          "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/README.md",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Belin7z/main/README.md",
          "previewText": "<div align=\"center\">\n\n<img src=\"https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&pause=1000&color=A855F7&center=true&vCenter=true&width=600&lines=Oi%2C+eu+sou+o+Belin7z+%F0%9F%91%8B;Full+Stack+Developer+%F0%9F%9A%80;Bot+%26+Automation+Enthusiast+%F0%9F%A4%96;Sempre+codando+algo+novo...\" alt=\"Typing SVG\" />\n\n<br/>\n\n[![GitHub followers](https://img.shields.io/github/followers/Belin7z?style=for-the-badge&color=A855F7&labelColor=1a1a2e)](https://github.com/Belin7z)\n![Profile views](https://komarev.com/ghpvc/?username=Belin7z&style=for-the-badge&color=A855F7)\n\n</div>\n\n---\n\n## 👤 Sobre mim\n\n```javascript\nconst Belin7z = {\n  nome:     \"Jefferson Alves\",\n  role:     \"Full Stack Developer & Bot automatic\",\n  stack:    [\"JavaScript\", \"Node.js\", \"Python\", \"HTML\", \"CSS\"],\n  foco:     \"Sistemas de Gestão e Automação\",\n  status:   \"🚀 Sempre desenvolvendo algo novo\",\n  contato:  \"Open to Freelance & Collaborations\"\n};\n```\n\n---\n\n## 🛠️ Tecnologias\n\n<div align=\"center\">\n\n![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)\n![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&log"
        }
      ]
    },
    {
      "name": "PulseView",
      "kind": "folder",
      "path": "Projetos/PulseView",
      "updatedAt": "2026-03-26T18:52:12Z",
      "size": 115712,
      "description": "usado para testes e estudos.",
      "htmlUrl": "https://github.com/Belin7z/PulseView",
      "badges": [
        "JavaScript",
        "README",
        "CSS",
        "HTML",
        "JSON"
      ],
      "repoMeta": {
        "defaultBranch": "main",
        "visibility": "Público",
        "language": "JavaScript",
        "pushedAt": "2026-03-26T18:52:12Z"
      },
      "children": [
        {
          "name": "css",
          "kind": "folder",
          "path": "Projetos/PulseView/css",
          "updatedAt": "2026-03-26T18:52:12Z",
          "size": 0,
          "description": "Pasta do repositório PulseView.",
          "htmlUrl": "https://github.com/Belin7z/PulseView/tree/main/css",
          "badges": [],
          "children": [
            {
              "name": "style.css",
              "kind": "file",
              "path": "Projetos/PulseView/css/style.css",
              "updatedAt": "2026-03-26T18:52:12Z",
              "size": 19209,
              "extension": "css",
              "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/css/style.css",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/PulseView/main/css/style.css"
            }
          ]
        },
        {
          "name": "js",
          "kind": "folder",
          "path": "Projetos/PulseView/js",
          "updatedAt": "2026-03-26T18:52:12Z",
          "size": 0,
          "description": "Pasta do repositório PulseView.",
          "htmlUrl": "https://github.com/Belin7z/PulseView/tree/main/js",
          "badges": [],
          "children": [
            {
              "name": "clock.js",
              "kind": "file",
              "path": "Projetos/PulseView/js/clock.js",
              "updatedAt": "2026-03-26T18:52:12Z",
              "size": 18807,
              "extension": "js",
              "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/js/clock.js",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/PulseView/main/js/clock.js"
            },
            {
              "name": "particles.js",
              "kind": "file",
              "path": "Projetos/PulseView/js/particles.js",
              "updatedAt": "2026-03-26T18:52:12Z",
              "size": 4187,
              "extension": "js",
              "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/js/particles.js",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/PulseView/main/js/particles.js"
            }
          ]
        },
        {
          "name": "index.html",
          "kind": "file",
          "path": "Projetos/PulseView/index.html",
          "updatedAt": "2026-03-26T18:52:12Z",
          "size": 9994,
          "extension": "html",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/index.html",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/PulseView/main/index.html"
        },
        {
          "name": "manifest.json",
          "kind": "file",
          "path": "Projetos/PulseView/manifest.json",
          "updatedAt": "2026-03-26T18:52:12Z",
          "size": 568,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/manifest.json",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/PulseView/main/manifest.json"
        },
        {
          "name": "README.md",
          "kind": "file",
          "path": "Projetos/PulseView/README.md",
          "updatedAt": "2026-03-26T18:52:12Z",
          "size": 1503,
          "extension": "md",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/README.md",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/PulseView/main/README.md",
          "previewText": "# PulseView\n\n**[>> demo ao vivo <<](https://belin7z.github.io/PulseView/)**\n\num relógio digital feito do zero com HTML, CSS e JS puro. sem frameworks, sem dependências. só código.\n\n---\n\n## o que é isso\n\ncomecei esse projeto pra praticar e foi crescendo. hoje tem tema, cronômetro, alarme, fuso horário, partículas no fundo, modo PWA... virou uma bagunça boa.\n\na ideia principal é exibir a hora atual com um visual gamer — fundo escuro, neon roxo, fonte monospace, aquele estilo.\n\n---\n\n## funcionalidades\n\n- relógio em tempo real (HH:MM:SS)\n- troca de temas: roxo, ciano, vermelho e verde\n- seletor de fuso horário (Brasília, UTC, Tokyo, NY...)\n- modo 12h/24h\n- cronômetro com milissegundos\n- alarme simples com beep\n- partículas e estrelas no background (pausam quando a aba tá oculta)\n- animação flip nos dígitos\n- efeito glitch no título\n- responsivo e funciona como PWA\n- swipe no mobile\n\n---\n\n## stack\n\n- HTML5\n- CSS3 (variáveis, animações, glassmorphism)\n- JavaScript puro (sem jQuery, sem nada)\n\n---\n\n## rodando local\n\n```bash\ngit clone https://github.com/Belin7z/PulseView.git\ncd PulseView\n# abre o index.html no navegador, só isso\n```\n\nnão precisa instalar nada. abre e roda.\n\n---\n\n## estrutu"
        },
        {
          "name": "sw.js",
          "kind": "file",
          "path": "Projetos/PulseView/sw.js",
          "updatedAt": "2026-03-26T18:52:12Z",
          "size": 1717,
          "extension": "js",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/sw.js",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/PulseView/main/sw.js"
        }
      ]
    },
    {
      "name": "Web-pc",
      "kind": "folder",
      "path": "Projetos/Web-pc",
      "updatedAt": "2026-03-26T18:30:39Z",
      "size": 153600,
      "description": "Repositório público de Belin7z.",
      "htmlUrl": "https://github.com/Belin7z/Web-pc",
      "badges": [
        "TypeScript",
        "README",
        "Workflow",
        "JavaScript",
        "CSS"
      ],
      "repoMeta": {
        "defaultBranch": "main",
        "visibility": "Público",
        "language": "TypeScript",
        "pushedAt": "2026-03-26T18:30:39Z"
      },
      "children": [
        {
          "name": ".github",
          "kind": "folder",
          "path": "Projetos/Web-pc/.github",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/.github",
          "badges": [],
          "children": [
            {
              "name": "workflows",
              "kind": "folder",
              "path": "Projetos/Web-pc/.github/workflows",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/.github/workflows",
              "badges": [],
              "children": [
                {
                  "name": "deploy.yml",
                  "kind": "file",
                  "path": "Projetos/Web-pc/.github/workflows/deploy.yml",
                  "updatedAt": "2026-03-26T18:30:39Z",
                  "size": 987,
                  "extension": "yml",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/.github/workflows/deploy.yml",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/.github/workflows/deploy.yml"
                }
              ]
            }
          ]
        },
        {
          "name": "public",
          "kind": "folder",
          "path": "Projetos/Web-pc/public",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/public",
          "badges": [],
          "children": [
            {
              "name": "favicon.svg",
              "kind": "file",
              "path": "Projetos/Web-pc/public/favicon.svg",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 9522,
              "extension": "svg",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/public/favicon.svg",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/public/favicon.svg"
            },
            {
              "name": "icons.svg",
              "kind": "file",
              "path": "Projetos/Web-pc/public/icons.svg",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 5031,
              "extension": "svg",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/public/icons.svg",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/public/icons.svg"
            }
          ]
        },
        {
          "name": "scripts",
          "kind": "folder",
          "path": "Projetos/Web-pc/scripts",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/scripts",
          "badges": [],
          "children": [
            {
              "name": "generate-project-tree.mjs",
              "kind": "file",
              "path": "Projetos/Web-pc/scripts/generate-project-tree.mjs",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 11238,
              "extension": "mjs",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/scripts/generate-project-tree.mjs",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/scripts/generate-project-tree.mjs"
            }
          ]
        },
        {
          "name": "src",
          "kind": "folder",
          "path": "Projetos/Web-pc/src",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src",
          "badges": [],
          "children": [
            {
              "name": "assets",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/assets",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src/assets",
              "badges": [],
              "children": [
                {
                  "name": "hero.png",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/hero.png",
                  "updatedAt": "2026-03-26T18:30:39Z",
                  "size": 44919,
                  "extension": "png",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/assets/hero.png",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/assets/hero.png"
                },
                {
                  "name": "react.svg",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/react.svg",
                  "updatedAt": "2026-03-26T18:30:39Z",
                  "size": 4126,
                  "extension": "svg",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/assets/react.svg",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/assets/react.svg"
                },
                {
                  "name": "vite.svg",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/vite.svg",
                  "updatedAt": "2026-03-26T18:30:39Z",
                  "size": 8709,
                  "extension": "svg",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/assets/vite.svg",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/assets/vite.svg"
                }
              ]
            },
            {
              "name": "components",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/components",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src/components",
              "badges": [],
              "children": [
                {
                  "name": "SystemIcons.tsx",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/components/SystemIcons.tsx",
                  "updatedAt": "2026-03-26T18:30:39Z",
                  "size": 5305,
                  "extension": "tsx",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/components/SystemIcons.tsx",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/components/SystemIcons.tsx"
                }
              ]
            },
            {
              "name": "generated",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/generated",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src/generated",
              "badges": [],
              "children": [
                {
                  "name": "projectTree.ts",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/generated/projectTree.ts",
                  "updatedAt": "2026-03-26T18:30:39Z",
                  "size": 28244,
                  "extension": "ts",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/generated/projectTree.ts",
                  "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/generated/projectTree.ts"
                }
              ]
            },
            {
              "name": "App.css",
              "kind": "file",
              "path": "Projetos/Web-pc/src/App.css",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 50888,
              "extension": "css",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/App.css",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/App.css"
            },
            {
              "name": "App.tsx",
              "kind": "file",
              "path": "Projetos/Web-pc/src/App.tsx",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 71199,
              "extension": "tsx",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/App.tsx",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/App.tsx",
              "previewText": "import { useEffect, useRef, useState, type CSSProperties } from 'react'\nimport { AppIcon, FileTypeIcon, WindowsLogo } from './components/SystemIcons'\nimport { projectTree, type ProjectTreeNode } from './generated/projectTree'\nimport './App.css'\n\ntype AppId = 'home' | 'explorer' | 'terminal' | 'edge' | 'settings'\ntype WallpaperId = 'bloom' | 'flow' | 'night'\ntype ScreenState = 'boot' | 'lock' | 'desktop'\n\ninterface AppDefinition {\n  id: AppId\n  name: string\n  summary: string\n  iconClass: string\n  window: {\n    width: number\n    height: number\n  }\n}\n\ninterface WindowState {\n  id: AppId\n  x: number\n  y: number\n  width: number\n  height: number\n  z: number\n  minimized: boolean\n  maximized: boolean\n}\n\ninterface DragState {\n  id: AppId\n  offsetX: number\n  offsetY: number\n}\n\ntype WindowAnimation = 'opening' | 'minimizing' | 'maximizing' | 'restoring'\ntype ExplorerSortBy = 'name' | 'updated' | 'type' | 'size'\ntype ExplorerViewMode = 'icons' | 'list' | 'details'\n\ninterface ExplorerTab {\n  id: string\n  title: string\n  rootPath: string\n  currentPath: string\n}\n\ninterface ExplorerContextMenuState {\n  x: number\n  y: number\n  nodePath: string\n}\n\nconst apps: AppDefinition[] = [\n  {\n    id: 'home',\n"
            },
            {
              "name": "index.css",
              "kind": "file",
              "path": "Projetos/Web-pc/src/index.css",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 916,
              "extension": "css",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/index.css",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/index.css"
            },
            {
              "name": "main.tsx",
              "kind": "file",
              "path": "Projetos/Web-pc/src/main.tsx",
              "updatedAt": "2026-03-26T18:30:39Z",
              "size": 230,
              "extension": "tsx",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/main.tsx",
              "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/src/main.tsx"
            }
          ]
        },
        {
          "name": ".gitignore",
          "kind": "file",
          "path": "Projetos/Web-pc/.gitignore",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 253,
          "extension": "",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/.gitignore",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/.gitignore"
        },
        {
          "name": "eslint.config.js",
          "kind": "file",
          "path": "Projetos/Web-pc/eslint.config.js",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 616,
          "extension": "js",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/eslint.config.js",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/eslint.config.js"
        },
        {
          "name": "index.html",
          "kind": "file",
          "path": "Projetos/Web-pc/index.html",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 363,
          "extension": "html",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/index.html",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/index.html"
        },
        {
          "name": "package-lock.json",
          "kind": "file",
          "path": "Projetos/Web-pc/package-lock.json",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 104127,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/package-lock.json",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/package-lock.json"
        },
        {
          "name": "package.json",
          "kind": "file",
          "path": "Projetos/Web-pc/package.json",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 791,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/package.json",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/package.json",
          "previewText": "{\n  \"name\": \"web-pc\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"node scripts/generate-project-tree.mjs && vite\",\n    \"build\": \"node scripts/generate-project-tree.mjs && tsc -b && vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^19.2.4\",\n    \"react-dom\": \"^19.2.4\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.39.4\",\n    \"@types/node\": \"^24.12.0\",\n    \"@types/react\": \"^19.2.14\",\n    \"@types/react-dom\": \"^19.2.3\",\n    \"@vitejs/plugin-react\": \"^6.0.1\",\n    \"eslint\": \"^9.39.4\",\n    \"eslint-plugin-react-hooks\": \"^7.0.1\",\n    \"eslint-plugin-react-refresh\": \"^0.5.2\",\n    \"globals\": \"^17.4.0\",\n    \"typescript\": \"~5.9.3\",\n    \"typescript-eslint\": \"^8.57.0\",\n    \"vite\": \"^8.0.1\"\n  }\n}\n"
        },
        {
          "name": "README.md",
          "kind": "file",
          "path": "Projetos/Web-pc/README.md",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 866,
          "extension": "md",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/README.md",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/README.md",
          "previewText": "# Web PC\n\nWeb PC em React + TypeScript + Vite, com visual inspirado no Windows e deploy pronto para GitHub Pages.\n\n## O que tem no projeto\n\n- Desktop no estilo Windows 11\n- Taskbar centralizada\n- Menu iniciar com apps fixados e recomendados\n- Janelas com arrastar, minimizar e maximizar\n- Explorador, navegador, terminal e configuracoes\n- Workflow automatico para publicar no GitHub Pages\n\n## Rodando localmente\n\n```bash\nnpm install\nnpm run dev\n```\n\n## Build\n\n```bash\nnpm run build\n```\n\n## GitHub Pages\n\nO projeto ja esta preparado para publicar no Pages do repositorio `Belin7z/Web-pc`.\n\n- `vite.config.ts` usa `base: \"/Web-pc/\"`\n- `.github/workflows/deploy.yml` gera e publica o `dist`\n\nPara ativar no GitHub:\n\n1. Abra `Settings > Pages`\n2. Em `Source`, selecione `GitHub Actions`\n3. Faça push no branch `main`\n\nURL esperada:\n\n`https://belin7z.github.io/Web-pc/`\n"
        },
        {
          "name": "tsconfig.app.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.app.json",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 732,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/tsconfig.app.json",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/tsconfig.app.json"
        },
        {
          "name": "tsconfig.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.json",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 119,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/tsconfig.json",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/tsconfig.json"
        },
        {
          "name": "tsconfig.node.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.node.json",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 653,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/tsconfig.node.json",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/tsconfig.node.json"
        },
        {
          "name": "vite.config.ts",
          "kind": "file",
          "path": "Projetos/Web-pc/vite.config.ts",
          "updatedAt": "2026-03-26T18:30:39Z",
          "size": 181,
          "extension": "ts",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/vite.config.ts",
          "rawUrl": "https://raw.githubusercontent.com/Belin7z/Web-pc/main/vite.config.ts"
        }
      ]
    }
  ]
} as const
