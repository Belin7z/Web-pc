export type ProjectTreeNode = {
  name: string
  kind: 'folder' | 'file'
  path: string
  updatedAt: string
  size: number
  extension?: string
  children?: ProjectTreeNode[]
}

export const projectTree: ProjectTreeNode = {
  "name": "Projetos",
  "kind": "folder",
  "path": "Projetos",
  "updatedAt": "2026-03-26T18:00:36.253Z",
  "size": 0,
  "children": [
    {
      "name": "Web-pc",
      "kind": "folder",
      "path": "Projetos/Web-pc",
      "updatedAt": "2026-03-26T18:00:36.253Z",
      "size": 0,
      "children": [
        {
          "name": ".github",
          "kind": "folder",
          "path": "Projetos/Web-pc/.github",
          "updatedAt": "2026-03-26T17:02:04.285Z",
          "size": 0,
          "children": [
            {
              "name": "workflows",
              "kind": "folder",
              "path": "Projetos/Web-pc/.github/workflows",
              "updatedAt": "2026-03-26T17:02:04.285Z",
              "size": 0,
              "children": [
                {
                  "name": "deploy.yml",
                  "kind": "file",
                  "path": "Projetos/Web-pc/.github/workflows/deploy.yml",
                  "updatedAt": "2026-03-26T17:02:04.285Z",
                  "size": 987,
                  "extension": "yml"
                }
              ]
            }
          ]
        },
        {
          "name": ".vscode",
          "kind": "folder",
          "path": "Projetos/Web-pc/.vscode",
          "updatedAt": "2026-03-26T16:48:25.017Z",
          "size": 0,
          "children": [
            {
              "name": "settings.json",
              "kind": "file",
              "path": "Projetos/Web-pc/.vscode/settings.json",
              "updatedAt": "2026-03-26T16:48:25.632Z",
              "size": 136,
              "extension": "json"
            }
          ]
        },
        {
          "name": "public",
          "kind": "folder",
          "path": "Projetos/Web-pc/public",
          "updatedAt": "2026-03-26T16:49:44.370Z",
          "size": 0,
          "children": [
            {
              "name": "favicon.svg",
              "kind": "file",
              "path": "Projetos/Web-pc/public/favicon.svg",
              "updatedAt": "2026-03-26T16:49:34.922Z",
              "size": 9522,
              "extension": "svg"
            },
            {
              "name": "icons.svg",
              "kind": "file",
              "path": "Projetos/Web-pc/public/icons.svg",
              "updatedAt": "2026-03-26T16:49:34.976Z",
              "size": 5031,
              "extension": "svg"
            }
          ]
        },
        {
          "name": "scripts",
          "kind": "folder",
          "path": "Projetos/Web-pc/scripts",
          "updatedAt": "2026-03-26T18:00:36.253Z",
          "size": 0,
          "children": [
            {
              "name": "generate-project-tree.mjs",
              "kind": "file",
              "path": "Projetos/Web-pc/scripts/generate-project-tree.mjs",
              "updatedAt": "2026-03-26T18:00:58.167Z",
              "size": 3326,
              "extension": "mjs"
            }
          ]
        },
        {
          "name": "src",
          "kind": "folder",
          "path": "Projetos/Web-pc/src",
          "updatedAt": "2026-03-26T18:00:45.278Z",
          "size": 0,
          "children": [
            {
              "name": "assets",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/assets",
              "updatedAt": "2026-03-26T16:49:44.381Z",
              "size": 0,
              "children": [
                {
                  "name": "hero.png",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/hero.png",
                  "updatedAt": "2026-03-26T16:49:34.768Z",
                  "size": 44919,
                  "extension": "png"
                },
                {
                  "name": "react.svg",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/react.svg",
                  "updatedAt": "2026-03-26T16:49:35.037Z",
                  "size": 4126,
                  "extension": "svg"
                },
                {
                  "name": "vite.svg",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/assets/vite.svg",
                  "updatedAt": "2026-03-26T16:49:35.160Z",
                  "size": 8709,
                  "extension": "svg"
                }
              ]
            },
            {
              "name": "components",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/components",
              "updatedAt": "2026-03-26T17:30:59.131Z",
              "size": 0,
              "children": [
                {
                  "name": "SystemIcons.tsx",
                  "kind": "file",
                  "path": "Projetos/Web-pc/src/components/SystemIcons.tsx",
                  "updatedAt": "2026-03-26T17:33:28.117Z",
                  "size": 3354,
                  "extension": "tsx"
                }
              ]
            },
            {
              "name": "generated",
              "kind": "folder",
              "path": "Projetos/Web-pc/src/generated",
              "updatedAt": "2026-03-26T18:00:45.279Z",
              "size": 0,
              "children": []
            },
            {
              "name": "App.css",
              "kind": "file",
              "path": "Projetos/Web-pc/src/App.css",
              "updatedAt": "2026-03-26T18:03:15.275Z",
              "size": 42862,
              "extension": "css"
            },
            {
              "name": "App.tsx",
              "kind": "file",
              "path": "Projetos/Web-pc/src/App.tsx",
              "updatedAt": "2026-03-26T18:03:43.083Z",
              "size": 54183,
              "extension": "tsx"
            },
            {
              "name": "index.css",
              "kind": "file",
              "path": "Projetos/Web-pc/src/index.css",
              "updatedAt": "2026-03-26T17:13:15.819Z",
              "size": 916,
              "extension": "css"
            },
            {
              "name": "main.tsx",
              "kind": "file",
              "path": "Projetos/Web-pc/src/main.tsx",
              "updatedAt": "2026-03-26T16:49:35.241Z",
              "size": 230,
              "extension": "tsx"
            }
          ]
        },
        {
          "name": ".gitignore",
          "kind": "file",
          "path": "Projetos/Web-pc/.gitignore",
          "updatedAt": "2026-03-26T16:49:34.317Z",
          "size": 253,
          "extension": ""
        },
        {
          "name": "eslint.config.js",
          "kind": "file",
          "path": "Projetos/Web-pc/eslint.config.js",
          "updatedAt": "2026-03-26T16:49:34.456Z",
          "size": 616,
          "extension": "js"
        },
        {
          "name": "index.html",
          "kind": "file",
          "path": "Projetos/Web-pc/index.html",
          "updatedAt": "2026-03-26T16:49:44.367Z",
          "size": 363,
          "extension": "html"
        },
        {
          "name": "package-lock.json",
          "kind": "file",
          "path": "Projetos/Web-pc/package-lock.json",
          "updatedAt": "2026-03-26T16:50:22.809Z",
          "size": 104127,
          "extension": "json"
        },
        {
          "name": "package.json",
          "kind": "file",
          "path": "Projetos/Web-pc/package.json",
          "updatedAt": "2026-03-26T18:00:40.803Z",
          "size": 791,
          "extension": "json"
        },
        {
          "name": "README.md",
          "kind": "file",
          "path": "Projetos/Web-pc/README.md",
          "updatedAt": "2026-03-26T17:02:15.915Z",
          "size": 866,
          "extension": "md"
        },
        {
          "name": "tsconfig.app.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.app.json",
          "updatedAt": "2026-03-26T16:49:34.564Z",
          "size": 732,
          "extension": "json"
        },
        {
          "name": "tsconfig.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.json",
          "updatedAt": "2026-03-26T16:49:34.581Z",
          "size": 119,
          "extension": "json"
        },
        {
          "name": "tsconfig.node.json",
          "kind": "file",
          "path": "Projetos/Web-pc/tsconfig.node.json",
          "updatedAt": "2026-03-26T16:49:34.598Z",
          "size": 653,
          "extension": "json"
        },
        {
          "name": "vite.config.ts",
          "kind": "file",
          "path": "Projetos/Web-pc/vite.config.ts",
          "updatedAt": "2026-03-26T17:01:58.095Z",
          "size": 181,
          "extension": "ts"
        }
      ]
    }
  ]
} as const
