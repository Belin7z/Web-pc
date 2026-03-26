import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = process.cwd()
const outputFile = path.join(repoRoot, 'src', 'generated', 'projectTree.ts')

const ignoredNames = new Set([
  '.git',
  'dist',
  'node_modules',
])

function toPosixPath(value) {
  return value.split(path.sep).join('/')
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

async function buildNode(absolutePath, rootLabel, relativePath = '') {
  const fileStats = await stat(absolutePath)
  const relativeFsPath = toPosixPath(relativePath)
  const currentPath = relativeFsPath ? `${rootLabel}/${relativeFsPath}` : rootLabel

  if (fileStats.isDirectory()) {
    const entries = await readdir(absolutePath, { withFileTypes: true })

    const children = await Promise.all(
      entries
        .filter((entry) => !ignoredNames.has(entry.name))
        .filter((entry) => toPosixPath(path.join(relativeFsPath, entry.name)) !== 'src/generated/projectTree.ts')
        .map((entry) =>
          buildNode(
            path.join(absolutePath, entry.name),
            rootLabel,
            path.join(relativePath, entry.name),
          ),
        ),
    )

    children.sort((left, right) => {
      if (left.kind !== right.kind) {
        return left.kind === 'folder' ? -1 : 1
      }

      return left.name.localeCompare(right.name, 'pt-BR', { sensitivity: 'base' })
    })

    return {
      name: relativeFsPath ? path.basename(absolutePath) : rootLabel,
      kind: 'folder',
      path: currentPath,
      updatedAt: fileStats.mtime.toISOString(),
      size: 0,
      children,
    }
  }

  return {
    name: path.basename(absolutePath),
    kind: 'file',
    path: currentPath,
    updatedAt: fileStats.mtime.toISOString(),
    size: fileStats.size,
    extension: path.extname(absolutePath).slice(1),
  }
}

function prefixNodePath(node, prefix) {
  const nextPath = `${prefix}/${node.path}`

  if (node.kind === 'folder') {
    return {
      ...node,
      path: nextPath,
      children: (node.children ?? []).map((child) => prefixNodePath(child, prefix)),
    }
  }

  return {
    ...node,
    path: nextPath,
  }
}

async function main() {
  const projectName = await getProjectName()
  const projectNode = prefixNodePath(await buildNode(repoRoot, projectName), 'Projetos')

  const tree = {
    name: 'Projetos',
    kind: 'folder',
    path: 'Projetos',
    updatedAt: projectNode.updatedAt,
    size: 0,
    children: [projectNode],
  }

  const output = `export type ProjectTreeNode = {
  name: string
  kind: 'folder' | 'file'
  path: string
  updatedAt: string
  size: number
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
