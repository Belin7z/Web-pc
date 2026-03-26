export type ProjectTreeNode = {
  name: string
  kind: 'folder' | 'file'
  path: string
  updatedAt: string
  size: number
  description?: string
  htmlUrl?: string
  extension?: string
  children?: ProjectTreeNode[]
}

export const projectTree: ProjectTreeNode = {
  "name": "Projetos",
  "kind": "folder",
  "path": "Projetos",
  "updatedAt": "2026-03-26T18:06:35Z",
  "size": 0,
  "description": "Repositórios públicos de Belin7z no GitHub.",
  "htmlUrl": "https://github.com/Belin7z",
  "children": [
    {
      "name": "Belin7z",
      "kind": "folder",
      "path": "Projetos/Belin7z",
      "updatedAt": "2026-03-26T00:38:08Z",
      "size": 31744,
      "description": "Sobre mim",
      "htmlUrl": "https://github.com/Belin7z/Belin7z",
      "children": [
        {
          "name": ".github",
          "kind": "folder",
          "path": "Projetos/Belin7z/.github",
          "updatedAt": "2026-03-26T00:38:08Z",
          "size": 0,
          "description": "Pasta do repositório Belin7z.",
          "htmlUrl": "https://github.com/Belin7z/Belin7z/tree/main/.github",
          "children": [
            {
              "name": "workflows",
              "kind": "folder",
              "path": "Projetos/Belin7z/.github/workflows",
              "updatedAt": "2026-03-26T00:38:08Z",
              "size": 0,
              "description": "Pasta do repositório Belin7z.",
              "htmlUrl": "https://github.com/Belin7z/Belin7z/tree/main/.github/workflows",
              "children": [
                {
                  "name": "jokenpo.yml",
                  "kind": "file",
                  "path": "Projetos/Belin7z/.github/workflows/jokenpo.yml",
                  "updatedAt": "2026-03-26T00:38:08Z",
                  "size": 2867,
                  "extension": "yml",
                  "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/.github/workflows/jokenpo.yml"
                },
                {
                  "name": "snake.yml",
                  "kind": "file",
                  "path": "Projetos/Belin7z/.github/workflows/snake.yml",
                  "updatedAt": "2026-03-26T00:38:08Z",
                  "size": 792,
                  "extension": "yml",
                  "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/.github/workflows/snake.yml"
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
          "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/LICENSE"
        },
        {
          "name": "README.md",
          "kind": "file",
          "path": "Projetos/Belin7z/README.md",
          "updatedAt": "2026-03-26T00:38:08Z",
          "size": 3896,
          "extension": "md",
          "htmlUrl": "https://github.com/Belin7z/Belin7z/blob/main/README.md"
        }
      ]
    },
    {
      "name": "PulseView",
      "kind": "folder",
      "path": "Projetos/PulseView",
      "updatedAt": "2026-03-26T18:05:26Z",
      "size": 68608,
      "description": "usado para testes e estudos.",
      "htmlUrl": "https://github.com/Belin7z/PulseView",
      "children": [
        {
          "name": "css",
          "kind": "folder",
          "path": "Projetos/PulseView/css",
          "updatedAt": "2026-03-26T18:05:26Z",
          "size": 0,
          "description": "Pasta do repositório PulseView.",
          "htmlUrl": "https://github.com/Belin7z/PulseView/tree/main/css",
          "children": [
            {
              "name": "style.css",
              "kind": "file",
              "path": "Projetos/PulseView/css/style.css",
              "updatedAt": "2026-03-26T18:05:26Z",
              "size": 18307,
              "extension": "css",
              "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/css/style.css"
            }
          ]
        },
        {
          "name": "js",
          "kind": "folder",
          "path": "Projetos/PulseView/js",
          "updatedAt": "2026-03-26T18:05:26Z",
          "size": 0,
          "description": "Pasta do repositório PulseView.",
          "htmlUrl": "https://github.com/Belin7z/PulseView/tree/main/js",
          "children": [
            {
              "name": "clock.js",
              "kind": "file",
              "path": "Projetos/PulseView/js/clock.js",
              "updatedAt": "2026-03-26T18:05:26Z",
              "size": 18807,
              "extension": "js",
              "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/js/clock.js"
            },
            {
              "name": "particles.js",
              "kind": "file",
              "path": "Projetos/PulseView/js/particles.js",
              "updatedAt": "2026-03-26T18:05:26Z",
              "size": 4187,
              "extension": "js",
              "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/js/particles.js"
            }
          ]
        },
        {
          "name": "index.html",
          "kind": "file",
          "path": "Projetos/PulseView/index.html",
          "updatedAt": "2026-03-26T18:05:26Z",
          "size": 9407,
          "extension": "html",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/index.html"
        },
        {
          "name": "manifest.json",
          "kind": "file",
          "path": "Projetos/PulseView/manifest.json",
          "updatedAt": "2026-03-26T18:05:26Z",
          "size": 568,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/manifest.json"
        },
        {
          "name": "README.md",
          "kind": "file",
          "path": "Projetos/PulseView/README.md",
          "updatedAt": "2026-03-26T18:05:26Z",
          "size": 1503,
          "extension": "md",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/README.md"
        },
        {
          "name": "sw.js",
          "kind": "file",
          "path": "Projetos/PulseView/sw.js",
          "updatedAt": "2026-03-26T18:05:26Z",
          "size": 1717,
          "extension": "js",
          "htmlUrl": "https://github.com/Belin7z/PulseView/blob/main/sw.js"
        }
      ]
    },
    {
      "name": "Web-pc",
      "kind": "folder",
      "path": "Projetos/Web-pc",
      "updatedAt": "2026-03-26T18:06:35Z",
      "size": 153600,
      "description": "Repositório público de Belin7z.",
      "htmlUrl": "https://github.com/Belin7z/Web-pc",
      "children": [
        {
          "name": ".github",
          "kind": "folder",
          "path": "Projetos/Web-pc/.github",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/.github",
          "children": [
            {
              "name": "workflows",
              "kind": "folder",
              "path": "Projetos/Web-pc/.github/workflows",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/.github/workflows",
              "children": [
                {
                  "name": "deploy.yml",
                  "kind": "file",
                  "path": "Projetos/Web-pc/.github/workflows/deploy.yml",
                  "updatedAt": "2026-03-26T18:06:35Z",
                  "size": 987,
                  "extension": "yml",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/.github/workflows/deploy.yml"
                }
              ]
            }
          ]
        },
        {
          "name": "public",
          "kind": "folder",
          "path": "Projetos/Web-pc/public",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/public",
          "children": [
            {
              "name": "favicon.svg",
              "kind": "file",
              "path": "Projetos/Web-pc/public/favicon.svg",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 9522,
              "extension": "svg",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/public/favicon.svg"
            },
            {
              "name": "icons.svg",
              "kind": "file",
              "path": "Projetos/Web-pc/public/icons.svg",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 5031,
              "extension": "svg",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/public/icons.svg"
            }
          ]
        },
        {
          "name": "scripts",
          "kind": "folder",
          "path": "Projetos/Web-pc/scripts",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/scripts",
          "children": [
            {
              "name": "generate-project-tree.mjs",
              "kind": "file",
              "path": "Projetos/Web-pc/scripts/generate-project-tree.mjs",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 3326,
              "extension": "mjs",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/scripts/generate-project-tree.mjs"
            }
          ]
        },
        {
          "name": "src",
          "kind": "folder",
          "path": "Projetos/Web-pc/src",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 0,
          "description": "Pasta do repositório Web-pc.",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src",
          "children": [
            {
              "name": "assets",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/assets",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src/assets",
              "children": [
                {
                  "name": "hero.png",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/hero.png",
                  "updatedAt": "2026-03-26T18:06:35Z",
                  "size": 44919,
                  "extension": "png",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/assets/hero.png"
                },
                {
                  "name": "react.svg",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/react.svg",
                  "updatedAt": "2026-03-26T18:06:35Z",
                  "size": 4126,
                  "extension": "svg",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/assets/react.svg"
                },
                {
                  "name": "vite.svg",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/vite.svg",
                  "updatedAt": "2026-03-26T18:06:35Z",
                  "size": 8709,
                  "extension": "svg",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/assets/vite.svg"
                }
              ]
            },
            {
              "name": "components",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/components",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src/components",
              "children": [
                {
                  "name": "SystemIcons.tsx",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/components/SystemIcons.tsx",
                  "updatedAt": "2026-03-26T18:06:35Z",
                  "size": 3354,
                  "extension": "tsx",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/components/SystemIcons.tsx"
                }
              ]
            },
            {
              "name": "generated",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/generated",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 0,
              "description": "Pasta do repositório Web-pc.",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/tree/main/src/generated",
              "children": [
                {
                  "name": "projectTree.ts",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/generated/projectTree.ts",
                  "updatedAt": "2026-03-26T18:06:35Z",
                  "size": 8865,
                  "extension": "ts",
                  "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/generated/projectTree.ts"
                }
              ]
            },
            {
              "name": "App.css",
              "kind": "file",
              "path": "Projetos/Web-pc/src/App.css",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 42368,
              "extension": "css",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/App.css"
            },
            {
              "name": "App.tsx",
              "kind": "file",
              "path": "Projetos/Web-pc/src/App.tsx",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 54183,
              "extension": "tsx",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/App.tsx"
            },
            {
              "name": "index.css",
              "kind": "file",
              "path": "Projetos/Web-pc/src/index.css",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 916,
              "extension": "css",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/index.css"
            },
            {
              "name": "main.tsx",
              "kind": "file",
              "path": "Projetos/Web-pc/src/main.tsx",
              "updatedAt": "2026-03-26T18:06:35Z",
              "size": 230,
              "extension": "tsx",
              "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/src/main.tsx"
            }
          ]
        },
        {
          "name": ".gitignore",
          "kind": "file",
          "path": "Projetos/Web-pc/.gitignore",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 253,
          "extension": "",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/.gitignore"
        },
        {
          "name": "eslint.config.js",
          "kind": "file",
          "path": "Projetos/Web-pc/eslint.config.js",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 616,
          "extension": "js",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/eslint.config.js"
        },
        {
          "name": "index.html",
          "kind": "file",
          "path": "Projetos/Web-pc/index.html",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 363,
          "extension": "html",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/index.html"
        },
        {
          "name": "package-lock.json",
          "kind": "file",
          "path": "Projetos/Web-pc/package-lock.json",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 104127,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/package-lock.json"
        },
        {
          "name": "package.json",
          "kind": "file",
          "path": "Projetos/Web-pc/package.json",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 791,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/package.json"
        },
        {
          "name": "README.md",
          "kind": "file",
          "path": "Projetos/Web-pc/README.md",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 866,
          "extension": "md",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/README.md"
        },
        {
          "name": "tsconfig.app.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.app.json",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 732,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/tsconfig.app.json"
        },
        {
          "name": "tsconfig.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.json",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 119,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/tsconfig.json"
        },
        {
          "name": "tsconfig.node.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.node.json",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 653,
          "extension": "json",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/tsconfig.node.json"
        },
        {
          "name": "vite.config.ts",
          "kind": "file",
          "path": "Projetos/Web-pc/vite.config.ts",
          "updatedAt": "2026-03-26T18:06:35Z",
          "size": 181,
          "extension": "ts",
          "htmlUrl": "https://github.com/Belin7z/Web-pc/blob/main/vite.config.ts"
        }
      ]
    }
  ]
} as const
