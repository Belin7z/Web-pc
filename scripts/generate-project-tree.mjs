import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = process.cwd()
const outputFile = path.join(repoRoot, 'src', 'generated', 'projectTree.ts')
const githubOwner = 'Belin7z'
const githubApiBase = 'https://api.github.com'

const ignoredLocalNames = new Set([
  '.git',
  'dist',
  'node_modules',
])

const previewTargets = new Set([
  'README.md',
  'package.json',
  'App.tsx',
])

function toPosixPath(value) {
  return value.split(path.sep).join('/')
}

function createFolderNode({
  name,
  currentPath,
  updatedAt,
  description = '',
  size = 0,
  htmlUrl = '',
  badges = [],
  repoMeta,
}) {
  return {
    name,
    kind: 'folder',
    path: currentPath,
    updatedAt,
    size,
    description,
    htmlUrl,
    badges,
    repoMeta,
    children: [],
  }
}

function createFileNode({
  name,
  currentPath,
  updatedAt,
  size,
  extension,
  htmlUrl,
  rawUrl = '',
  previewText,
}) {
  return {
    name,
    kind: 'file',
    path: currentPath,
    updatedAt,
    size,
    extension,
    htmlUrl,
    rawUrl,
    previewText,
  }
}

function sortTree(node) {
  if (node.kind !== 'folder') {
    return node
  }

  node.children = (node.children ?? [])
    .map((child) => sortTree(child))
    .sort((left, right) => {
      if (left.kind !== right.kind) {
        return left.kind === 'folder' ? -1 : 1
      }

      return left.name.localeCompare(right.name, 'pt-BR', { sensitivity: 'base' })
    })

  return node
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'web-pc-builder',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status} for ${url}`)
  }

  return response.json()
}

async function fetchPreviewText(rawUrl) {
  try {
    const response = await fetch(rawUrl, {
      headers: {
        'User-Agent': 'web-pc-builder',
      },
    })

    if (!response.ok) {
      return undefined
    }

    const text = await response.text()
    return text.slice(0, 1200)
  } catch {
    return undefined
  }
}

function collectRepoBadges(repo, treeEntries) {
  const entryPaths = new Set(treeEntries.map((entry) => entry.path))
  const badges = new Set()

  if (repo.language) {
    badges.add(repo.language)
  }

  if ([...entryPaths].some((entryPath) => entryPath.endsWith('README.md'))) {
    badges.add('README')
  }

  if ([...entryPaths].some((entryPath) => entryPath.startsWith('.github/workflows/'))) {
    badges.add('Workflow')
  }

  if ([...entryPaths].some((entryPath) => entryPath.endsWith('.ts') || entryPath.endsWith('.tsx'))) {
    badges.add('TypeScript')
  }

  if ([...entryPaths].some((entryPath) => entryPath.endsWith('.js'))) {
    badges.add('JavaScript')
  }

  if ([...entryPaths].some((entryPath) => entryPath.endsWith('.css'))) {
    badges.add('CSS')
  }

  if ([...entryPaths].some((entryPath) => entryPath.endsWith('.html'))) {
    badges.add('HTML')
  }

  if ([...entryPaths].some((entryPath) => entryPath.endsWith('.json'))) {
    badges.add('JSON')
  }

  return [...badges].slice(0, 5)
}

function ensureFolder(parentNode, folderName, currentPath, updatedAt, htmlUrl, description) {
  const existingFolder = parentNode.children.find(
    (child) => child.kind === 'folder' && child.path === currentPath,
  )

  if (existingFolder) {
    return existingFolder
  }

  const nextFolder = createFolderNode({
    name: folderName,
    currentPath,
    updatedAt,
    description,
    htmlUrl,
  })

  parentNode.children.push(nextFolder)
  return nextFolder
}

async function buildGitHubRepoTree() {
  const repos = await fetchJson(
    `${githubApiBase}/users/${githubOwner}/repos?per_page=100&sort=updated`,
  )

  const rootNode = createFolderNode({
    name: 'Projetos',
    currentPath: 'Projetos',
    updatedAt: new Date().toISOString(),
    description: `Repositórios públicos de ${githubOwner} no GitHub.`,
    htmlUrl: `https://github.com/${githubOwner}`,
  })

  const repoTrees = await Promise.all(
    repos.map(async (repo) => {
      const treeResponse = await fetchJson(
        `${githubApiBase}/repos/${githubOwner}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`,
      )

      const repoNode = createFolderNode({
        name: repo.name,
        currentPath: `Projetos/${repo.name}`,
        updatedAt: repo.pushed_at,
        description: repo.description ?? `Repositório público de ${githubOwner}.`,
        size: Number(repo.size ?? 0) * 1024,
        htmlUrl: repo.html_url,
        badges: collectRepoBadges(repo, treeResponse.tree ?? []),
        repoMeta: {
          defaultBranch: repo.default_branch,
          visibility: repo.private ? 'Privado' : 'Público',
          language: repo.language ?? 'Sem linguagem principal',
          pushedAt: repo.pushed_at,
        },
      })

      for (const entry of treeResponse.tree ?? []) {
        if (typeof entry.path !== 'string') {
          continue
        }

        const entryParts = entry.path.split('/')
        let currentFolder = repoNode
        const currentSegments = []

        for (let index = 0; index < entryParts.length - 1; index += 1) {
          currentSegments.push(entryParts[index])
          const folderPath = `Projetos/${repo.name}/${currentSegments.join('/')}`
          const folderHtmlUrl = `${repo.html_url}/tree/${repo.default_branch}/${currentSegments.join('/')}`

          currentFolder = ensureFolder(
            currentFolder,
            entryParts[index],
            folderPath,
            repo.pushed_at,
            folderHtmlUrl,
            `Pasta do repositório ${repo.name}.`,
          )
        }

        if (entry.type === 'tree') {
          const folderPath = `Projetos/${repo.name}/${entry.path}`
          const folderHtmlUrl = `${repo.html_url}/tree/${repo.default_branch}/${entry.path}`

          ensureFolder(
            currentFolder,
            entryParts.at(-1),
            folderPath,
            repo.pushed_at,
            folderHtmlUrl,
            `Pasta do repositório ${repo.name}.`,
          )

          continue
        }

        if (entry.type !== 'blob') {
          continue
        }

        const filePath = `Projetos/${repo.name}/${entry.path}`
        const extension = path.extname(entry.path).slice(1)
        const fileHtmlUrl = `${repo.html_url}/blob/${repo.default_branch}/${entry.path}`
        const rawUrl = `https://raw.githubusercontent.com/${githubOwner}/${repo.name}/${repo.default_branch}/${entry.path}`
        const previewText = previewTargets.has(entryParts.at(-1))
          ? await fetchPreviewText(rawUrl)
          : undefined

        currentFolder.children.push(
          createFileNode({
            name: entryParts.at(-1),
            currentPath: filePath,
            updatedAt: repo.pushed_at,
            size: Number(entry.size ?? 0),
            extension,
            htmlUrl: fileHtmlUrl,
            rawUrl,
            previewText,
          }),
        )
      }

      return sortTree(repoNode)
    }),
  )

  rootNode.children = repoTrees

  if (repoTrees.length > 0) {
    rootNode.updatedAt = repoTrees[0].updatedAt
  }

  return sortTree(rootNode)
}

function formatProjectName(rawName) {
  if (!rawName) {
    return 'Web-pc'
  }

  return rawName.charAt(0).toUpperCase() + rawName.slice(1)
}

async function getProjectName() {
  try {
    const packageJson = JSON.parse(
      await readFile(path.join(repoRoot, 'package.json'), 'utf8'),
    )

    return formatProjectName(packageJson.name)
  } catch {
    return formatProjectName(path.basename(repoRoot))
  }
}

async function buildLocalNode(absolutePath, rootLabel, relativePath = '') {
  const fileStats = await stat(absolutePath)
  const relativeFsPath = toPosixPath(relativePath)
  const currentPath = relativeFsPath ? `${rootLabel}/${relativeFsPath}` : rootLabel

  if (fileStats.isDirectory()) {
    const entries = await readdir(absolutePath, { withFileTypes: true })

    const children = await Promise.all(
      entries
        .filter((entry) => !ignoredLocalNames.has(entry.name))
        .filter((entry) => toPosixPath(path.join(relativeFsPath, entry.name)) !== 'src/generated/projectTree.ts')
        .map((entry) =>
          buildLocalNode(
            path.join(absolutePath, entry.name),
            rootLabel,
            path.join(relativePath, entry.name),
          ),
        ),
    )

    return {
      name: relativeFsPath ? path.basename(absolutePath) : path.basename(rootLabel),
      kind: 'folder',
      path: currentPath,
      updatedAt: fileStats.mtime.toISOString(),
      size: 0,
      description: `Pasta local do projeto ${path.basename(rootLabel)}.`,
      htmlUrl: `https://github.com/${githubOwner}/${path.basename(rootLabel)}`,
      badges: [],
      children: children.sort((left, right) => {
        if (left.kind !== right.kind) {
          return left.kind === 'folder' ? -1 : 1
        }

        return left.name.localeCompare(right.name, 'pt-BR', { sensitivity: 'base' })
      }),
    }
  }

  const fileName = path.basename(absolutePath)
  const extension = path.extname(absolutePath).slice(1)
  const previewText = previewTargets.has(fileName)
    ? (await readFile(absolutePath, 'utf8')).slice(0, 1200)
    : undefined

  return {
    name: fileName,
    kind: 'file',
    path: currentPath,
    updatedAt: fileStats.mtime.toISOString(),
    size: fileStats.size,
    extension,
    htmlUrl: `https://github.com/${githubOwner}/${path.basename(rootLabel)}`,
    rawUrl: '',
    previewText,
  }
}

async function buildLocalFallbackTree() {
  const projectName = await getProjectName()
  const projectNode = await buildLocalNode(repoRoot, `Projetos/${projectName}`)

  return {
    name: 'Projetos',
    kind: 'folder',
    path: 'Projetos',
    updatedAt: projectNode.updatedAt,
    size: 0,
    description: `Snapshot local do repositório ${projectName}.`,
    htmlUrl: `https://github.com/${githubOwner}`,
    children: [
      {
        ...projectNode,
        name: projectName,
        path: `Projetos/${projectName}`,
        repoMeta: {
          defaultBranch: 'main',
          visibility: 'Local',
          language: 'Sem linguagem principal',
          pushedAt: projectNode.updatedAt,
        },
      },
    ],
  }
}

async function main() {
  let tree

  try {
    tree = await buildGitHubRepoTree()
  } catch (error) {
    console.warn('GitHub snapshot unavailable, using local fallback.', error)
    tree = await buildLocalFallbackTree()
  }

  const output = `export type ProjectTreeNode = {
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

export const projectTree: ProjectTreeNode = ${JSON.stringify(tree, null, 2)} as const
`

  await mkdir(path.dirname(outputFile), { recursive: true })
  await writeFile(outputFile, output)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
