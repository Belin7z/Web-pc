import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AppIcon, WindowsLogo } from './components/SystemIcons'
import { projectTree, type ProjectTreeNode } from './generated/projectTree'
import './App.css'

type AppId = 'home' | 'explorer' | 'terminal' | 'edge' | 'settings'
type WallpaperId = 'bloom' | 'flow' | 'night'
type ScreenState = 'boot' | 'lock' | 'desktop'

interface AppDefinition {
  id: AppId
  name: string
  summary: string
  iconClass: string
  window: {
    width: number
    height: number
  }
}

interface WindowState {
  id: AppId
  x: number
  y: number
  width: number
  height: number
  z: number
  minimized: boolean
  maximized: boolean
}

interface DragState {
  id: AppId
  offsetX: number
  offsetY: number
}

type WindowAnimation = 'opening' | 'minimizing' | 'maximizing' | 'restoring'

const apps: AppDefinition[] = [
  {
    id: 'home',
    name: 'Início',
    summary: 'Resumo do sistema com widgets e status da sessão.',
    iconClass: 'icon-home',
    window: { width: 840, height: 560 },
  },
  {
    id: 'explorer',
    name: 'Explorador',
    summary: 'Arquivos, discos e pastas no estilo do Windows 11.',
    iconClass: 'icon-explorer',
    window: { width: 980, height: 620 },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    summary: 'Console para build, git e publicação.',
    iconClass: 'icon-terminal',
    window: { width: 700, height: 430 },
  },
  {
    id: 'edge',
    name: 'Microsoft Edge',
    summary: 'Janela de navegador para GitHub e GitHub Pages.',
    iconClass: 'icon-edge',
    window: { width: 920, height: 590 },
  },
  {
    id: 'settings',
    name: 'Configurações',
    summary: 'Personalização do Web PC e deploy.',
    iconClass: 'icon-settings',
    window: { width: 760, height: 520 },
  },
]

const appLookup = Object.fromEntries(
  apps.map((app) => [app.id, app]),
) as Record<AppId, AppDefinition>

const wallpapers: Array<{
  id: WallpaperId
  name: string
  description: string
}> = [
  {
    id: 'bloom',
    name: 'Bloom',
    description: 'Wallpaper azul com dobras no estilo padrão do Windows 11.',
  },
  {
    id: 'flow',
    name: 'Flow',
    description: 'Mais brilho e vidro, com contraste ligeiramente mais claro.',
  },
  {
    id: 'night',
    name: 'Night',
    description: 'Versão escura inspirada no tema noturno do Windows.',
  },
]

const startRecommendations = [
  { title: 'README.md', meta: 'Atualizado há pouco' },
  { title: 'deploy.yml', meta: 'Workflow de publicação' },
  { title: 'vite.config.ts', meta: 'Base /Web-pc/' },
]

const terminalCommands = [
  'npm install',
  'npm run build',
  'git add .',
  'git commit -m "feat: refina visual para windows 11"',
  'git push origin main',
]

const webLinks = [
  {
    title: 'Repositório GitHub',
    href: 'https://github.com/Belin7z/Web-pc',
    description: 'Código-fonte principal do Web PC.',
  },
  {
    title: 'GitHub Pages',
    href: 'https://pages.github.com/',
    description: 'Hospedagem estática para publicar o projeto.',
  },
  {
    title: 'Preview',
    href: '#desktop-preview',
    description: 'Usar a própria interface como demonstração.',
  },
]

const browserHighlights = [
  {
    title: 'GitHub do projeto',
    meta: 'Belin7z/Web-pc',
    description: 'Abrir o repositório, revisar commits e acompanhar a evolução do Web PC.',
    href: 'https://github.com/Belin7z/Web-pc',
  },
  {
    title: 'GitHub Pages',
    meta: 'Publicação',
    description: 'Visualizar a versão hospedada e validar se o deploy saiu como esperado.',
    href: 'https://pages.github.com/',
  },
  {
    title: 'Painel do sistema',
    meta: 'Desktop local',
    description: 'Continuar navegando pelo desktop virtual usando a própria interface.',
    href: '#desktop-preview',
  },
] as const

const desktopShortcuts: AppId[] = ['explorer', 'edge', 'terminal', 'settings']
const taskbarApps: AppId[] = ['edge', 'explorer', 'terminal', 'settings']
const startMenuApps = apps.filter((app) => app.id !== 'home')

const windowSeeds = [
  { x: 108, y: 62 },
  { x: 172, y: 108 },
  { x: 228, y: 148 },
  { x: 144, y: 92 },
  { x: 212, y: 128 },
]

const storageKeys = {
  wallpaper: 'webpc.wallpaper',
  windows: 'webpc.windows',
}

const appStartedAt = Date.now()

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function createWindow(id: AppId, index: number, z: number): WindowState {
  const definition = appLookup[id]
  const seed = windowSeeds[index % windowSeeds.length]

  return {
    id,
    x: seed.x,
    y: seed.y,
    width: definition.window.width,
    height: definition.window.height,
    z,
    minimized: false,
    maximized: false,
  }
}

function getDefaultWindows() {
  return []
}

function isWallpaperId(value: string): value is WallpaperId {
  return wallpapers.some((wallpaper) => wallpaper.id === value)
}

function isAppId(value: string): value is AppId {
  return apps.some((app) => app.id === value)
}

function loadWallpaper(): WallpaperId {
  if (typeof window === 'undefined') {
    return 'bloom'
  }

  const savedWallpaper = window.localStorage.getItem(storageKeys.wallpaper)

  return savedWallpaper && isWallpaperId(savedWallpaper) ? savedWallpaper : 'bloom'
}

function loadWindows(): WindowState[] {
  if (typeof window === 'undefined') {
    return getDefaultWindows()
  }

  const savedWindows = window.localStorage.getItem(storageKeys.windows)

  if (!savedWindows) {
    return getDefaultWindows()
  }

  try {
    const parsed = JSON.parse(savedWindows)

    if (!Array.isArray(parsed)) {
      return getDefaultWindows()
    }

    const restoredWindows = parsed
      .filter((windowState): windowState is WindowState => {
        return typeof windowState === 'object' && windowState !== null
      })
      .map((windowState, index): WindowState | null => {
        const id = typeof windowState.id === 'string' && isAppId(windowState.id)
          ? windowState.id
          : null

        if (!id || id === 'home') {
          return null
        }

        const definition = appLookup[id]

        return {
          id: id as AppId,
          x: typeof windowState.x === 'number' ? windowState.x : windowSeeds[index % windowSeeds.length].x,
          y: typeof windowState.y === 'number' ? windowState.y : windowSeeds[index % windowSeeds.length].y,
          width: definition.window.width,
          height: definition.window.height,
          z: typeof windowState.z === 'number' ? windowState.z : index + 8,
          minimized: Boolean(windowState.minimized),
          maximized: Boolean(windowState.maximized),
        }
      })
      .filter((windowState): windowState is WindowState => windowState !== null)

    return restoredWindows.length > 0 ? restoredWindows : getDefaultWindows()
  } catch {
    return getDefaultWindows()
  }
}

function isFolderNode(node: ProjectTreeNode): node is ProjectTreeNode & { kind: 'folder'; children: ProjectTreeNode[] } {
  return node.kind === 'folder'
}

function findExplorerNode(targetPath: string, currentNode: ProjectTreeNode = projectTree): ProjectTreeNode | null {
  if (currentNode.path === targetPath) {
    return currentNode
  }

  if (!isFolderNode(currentNode)) {
    return null
  }

  for (const child of currentNode.children) {
    const match = findExplorerNode(targetPath, child)

    if (match) {
      return match
    }
  }

  return null
}

function getExplorerParentPath(pathValue: string) {
  const pathParts = pathValue.split('/')

  return pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : pathValue
}

function getExplorerBreadcrumbs(pathValue: string) {
  const pathParts = pathValue.split('/')
  const breadcrumbs: ProjectTreeNode[] = []

  for (let index = 0; index < pathParts.length; index += 1) {
    const currentPath = pathParts.slice(0, index + 1).join('/')
    const node = findExplorerNode(currentPath)

    if (node) {
      breadcrumbs.push(node)
    }
  }

  return breadcrumbs
}

function getExplorerNodeType(node: ProjectTreeNode) {
  if (node.kind === 'folder') {
    const pathParts = node.path.split('/')

    return pathParts.length === 2 ? 'Repositório' : 'Pasta'
  }

  const extension = node.extension?.toUpperCase()

  return extension ? `Arquivo ${extension}` : 'Arquivo'
}

function formatExplorerDate(dateValue: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateValue))
}

function formatExplorerSize(node: ProjectTreeNode) {
  if (node.kind === 'folder' && node.path.split('/').length === 2 && node.size > 0) {
    if (node.size < 1024 * 1024) {
      return `${(node.size / 1024).toFixed(1)} KB`
    }

    return `${(node.size / (1024 * 1024)).toFixed(1)} MB`
  }

  if (node.kind === 'folder') {
    return `${node.children?.length ?? 0} itens`
  }

  if (node.size < 1024) {
    return `${node.size} B`
  }

  if (node.size < 1024 * 1024) {
    return `${(node.size / 1024).toFixed(1)} KB`
  }

  return `${(node.size / (1024 * 1024)).toFixed(1)} MB`
}

function flattenExplorerFiles(currentNode: ProjectTreeNode): ProjectTreeNode[] {
  if (!isFolderNode(currentNode)) {
    return [currentNode]
  }

  return currentNode.children.flatMap((child) => flattenExplorerFiles(child))
}

function App() {
  const initialExplorerFolder = projectTree
  const desktopRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const animationTimers = useRef<Partial<Record<AppId, number>>>({})
  const nextZIndex = useRef(
    loadWindows().reduce((highestZ, windowState) => Math.max(highestZ, windowState.z), 20),
  )

  const [screen, setScreen] = useState<ScreenState>('boot')
  const [wallpaper, setWallpaper] = useState<WallpaperId>(() => loadWallpaper())
  const [now, setNow] = useState(() => new Date())
  const [startOpen, setStartOpen] = useState(false)
  const [startQuery, setStartQuery] = useState('')
  const [showAllApps, setShowAllApps] = useState(false)
  const [explorerPath, setExplorerPath] = useState(initialExplorerFolder.path)
  const [selectedExplorerPath, setSelectedExplorerPath] = useState(initialExplorerFolder.path)
  const [windows, setWindows] = useState<WindowState[]>(() => loadWindows())
  const [animationStates, setAnimationStates] = useState<Partial<Record<AppId, WindowAnimation>>>({})

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setScreen('lock')
    }, 1800)

    return () => window.clearTimeout(bootTimer)
  }, [])

  useEffect(() => {
    if (screen === 'desktop') {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (screen === 'lock' && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        setScreen('desktop')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [screen])

  useEffect(() => {
    window.localStorage.setItem(storageKeys.wallpaper, wallpaper)
  }, [wallpaper])

  useEffect(() => {
    window.localStorage.setItem(storageKeys.windows, JSON.stringify(windows))
  }, [windows])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current

      if (!drag) {
        return
      }

      const bounds = desktopRef.current?.getBoundingClientRect()
      const maxWidth = bounds?.width ?? window.innerWidth
      const maxHeight = bounds?.height ?? window.innerHeight

      setWindows((current) =>
        current.map((windowState) => {
          if (windowState.id !== drag.id || windowState.maximized) {
            return windowState
          }

          const maxX = Math.max(20, maxWidth - windowState.width - 24)
          const maxY = Math.max(20, maxHeight - windowState.height - 118)

          return {
            ...windowState,
            x: clamp(event.clientX - drag.offsetX, 20, maxX),
            y: clamp(event.clientY - drag.offsetY, 20, maxY),
          }
        }),
      )
    }

    const stopDragging = () => {
      dragRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopDragging)
    }
  }, [])

  useEffect(() => {
    const timers = animationTimers.current

    return () => {
      Object.values(timers).forEach((timer) => {
        if (timer) {
          window.clearTimeout(timer)
        }
      })
    }
  }, [])

  const unlockDesktop = () => {
    setScreen('desktop')
  }

  const closeStartMenu = () => {
    setStartOpen(false)
    setStartQuery('')
    setShowAllApps(false)
  }

  const toggleStartMenu = () => {
    if (startOpen) {
      closeStartMenu()
      return
    }

    setStartQuery('')
    setShowAllApps(false)
    setStartOpen(true)
  }

  const lockDesktop = () => {
    closeStartMenu()
    setScreen('lock')
  }

  const setWindowAnimation = (id: AppId, animation: WindowAnimation) => {
    const existingTimer = animationTimers.current[id]

    if (existingTimer) {
      window.clearTimeout(existingTimer)
    }

    setAnimationStates((current) => ({ ...current, [id]: animation }))

    animationTimers.current[id] = window.setTimeout(() => {
      setAnimationStates((current) => {
        const next = { ...current }
        delete next[id]
        return next
      })
      delete animationTimers.current[id]
    }, animation === 'opening' ? 240 : 180)
  }

  const showWindow = (id: AppId) => {
    const z = ++nextZIndex.current

    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id ? { ...windowState, minimized: false, z } : windowState,
      ),
    )

    setWindowAnimation(id, 'opening')
  }

  const bringToFront = (id: AppId) => {
    const z = ++nextZIndex.current

    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id ? { ...windowState, z, minimized: false } : windowState,
      ),
    )
  }

  const openWindow = (id: AppId) => {
    closeStartMenu()
    setWindows((current) => {
      const existingWindow = current.find((windowState) => windowState.id === id)
      const z = ++nextZIndex.current

      if (existingWindow) {
        setWindowAnimation(id, 'opening')
        return current.map((windowState) =>
          windowState.id === id ? { ...windowState, minimized: false, z } : windowState,
        )
      }

      const nextWindow = createWindow(id, current.length, z)
      window.setTimeout(() => setWindowAnimation(id, 'opening'), 0)
      return [...current, nextWindow]
    })
  }

  const closeWindow = (id: AppId) => {
    setWindows((current) => current.filter((windowState) => windowState.id !== id))
  }

  const minimizeWindow = (id: AppId) => {
    setWindowAnimation(id, 'minimizing')
    window.setTimeout(() => {
      setWindows((current) =>
        current.map((windowState) =>
          windowState.id === id ? { ...windowState, minimized: true } : windowState,
        ),
      )
    }, 150)
  }

  const toggleMaximize = (id: AppId) => {
    const targetWindow = windows.find((windowState) => windowState.id === id)
    const z = ++nextZIndex.current

    if (targetWindow) {
      setWindowAnimation(id, targetWindow.maximized ? 'restoring' : 'maximizing')
    }

    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id
          ? { ...windowState, maximized: !windowState.maximized, minimized: false, z }
          : windowState,
      ),
    )
  }

  const startDragging = (event: React.PointerEvent<HTMLDivElement>, id: AppId) => {
    const targetWindow = windows.find((windowState) => windowState.id === id)

    if (!targetWindow || targetWindow.maximized) {
      return
    }

    dragRef.current = {
      id,
      offsetX: event.clientX - targetWindow.x,
      offsetY: event.clientY - targetWindow.y,
    }

    bringToFront(id)
  }

  const openExplorerFolder = (pathValue: string) => {
    const targetNode = findExplorerNode(pathValue)

    if (!targetNode || !isFolderNode(targetNode)) {
      return
    }

    setExplorerPath(pathValue)
    setSelectedExplorerPath(pathValue)
  }

  const goUpExplorerFolder = () => {
    const parentPath = getExplorerParentPath(explorerPath)

    if (parentPath !== explorerPath) {
      openExplorerFolder(parentPath)
    }
  }

  const timeLabel = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)

  const dateLabel = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(now)

  const sessionMinutes = Math.max(1, Math.floor((now.getTime() - appStartedAt) / 60000))
  const activeWallpaper = wallpapers.find((item) => item.id === wallpaper)
  const normalizedQuery = startQuery.trim().toLocaleLowerCase('pt-BR')
  const filteredApps = startMenuApps.filter((app) => {
    if (!normalizedQuery) {
      return true
    }

    const haystack = `${app.name} ${app.summary}`.toLocaleLowerCase('pt-BR')
    return haystack.includes(normalizedQuery)
  })
  const filteredRecommendations = startRecommendations.filter((item) => {
    if (!normalizedQuery) {
      return true
    }

    const haystack = `${item.title} ${item.meta}`.toLocaleLowerCase('pt-BR')
    return haystack.includes(normalizedQuery)
  })
  const explorerCurrentNode = findExplorerNode(explorerPath) ?? initialExplorerFolder
  const explorerEntries = isFolderNode(explorerCurrentNode) ? explorerCurrentNode.children : []
  const explorerFolderCount = explorerEntries.filter((item) => item.kind === 'folder').length
  const explorerFileCount = explorerEntries.filter((item) => item.kind === 'file').length
  const explorerSelectedNode = findExplorerNode(selectedExplorerPath) ?? explorerCurrentNode
  const isExplorerRoot = explorerCurrentNode.path === projectTree.path
  const explorerBreadcrumbs = getExplorerBreadcrumbs(explorerCurrentNode.path)
  const explorerQuickLinks = [
    projectTree,
    ...(isFolderNode(projectTree)
      ? projectTree.children.filter((item) => item.kind === 'folder').slice(0, 6)
      : []),
  ]
  const explorerRecentFiles = flattenExplorerFiles(projectTree)
    .filter((item) => item.kind === 'file')
    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())
    .slice(0, 4)
  const explorerLargestEntrySize = Math.max(
    1,
    ...explorerEntries.map((item) => item.size || 1),
  )
  const visibleWindows = [...windows]
    .filter(
      (windowState) =>
        !windowState.minimized || animationStates[windowState.id] === 'minimizing',
    )
    .sort((left, right) => left.z - right.z)

  const renderWindowBody = (id: AppId) => {
    if (id === 'home') {
      return (
        <div className="home-layout">
          <section className="home-hero" id="desktop-preview">
            <div className="home-hero-copy">
              <p className="eyebrow">Central do sistema</p>
              <h1>Início com cara de painel principal, não de janela genérica.</h1>
              <p className="hero-copy">
                Área inicial redesenhada para funcionar como hub do Web PC, com
                visão geral da sessão, atalhos rápidos e leitura clara do estado
                atual do desktop.
              </p>
            </div>

            <div className="home-hero-side">
              <div className="home-badge">
                <span className="metric-label">Status</span>
                <strong>Online</strong>
                <p>GitHub Pages pronto para publicar</p>
              </div>
              <div className="hero-actions">
                <button type="button" className="primary-button" onClick={() => openWindow('explorer')}>
                  Abrir Explorador
                </button>
                <button type="button" className="secondary-button" onClick={() => openWindow('edge')}>
                  Abrir Edge
                </button>
              </div>
            </div>
          </section>

          <section className="home-dashboard">
            <article className="surface-card home-profile-card">
              <span className="metric-label">Sessão</span>
              <div className="home-profile-row">
                <span className="profile-avatar large">B</span>
                <div>
                  <strong>Belin7z</strong>
                  <p>{sessionMinutes} min ativos nesta sessão</p>
                </div>
              </div>
              <div className="home-mini-stats">
                <div>
                  <small>Janelas</small>
                  <strong>{windows.length}</strong>
                </div>
                <div>
                  <small>Tema</small>
                  <strong>{activeWallpaper?.name}</strong>
                </div>
                <div>
                  <small>Hora</small>
                  <strong>{timeLabel}</strong>
                </div>
              </div>
            </article>

            <article className="surface-card home-actions-card">
              <span className="metric-label">Acesso rápido</span>
              <div className="home-action-grid">
                <button type="button" className="home-action-tile" onClick={() => openWindow('explorer')}>
                  <AppIcon appId="explorer" className="app-icon small" />
                  <div>
                    <strong>Arquivos</strong>
                    <p>Pastas e discos</p>
                  </div>
                </button>
                <button type="button" className="home-action-tile" onClick={() => openWindow('edge')}>
                  <AppIcon appId="edge" className="app-icon small" />
                  <div>
                    <strong>Navegador</strong>
                    <p>Repositório e Pages</p>
                  </div>
                </button>
                <button type="button" className="home-action-tile" onClick={() => openWindow('terminal')}>
                  <AppIcon appId="terminal" className="app-icon small" />
                  <div>
                    <strong>Terminal</strong>
                    <p>Build e deploy</p>
                  </div>
                </button>
                <button type="button" className="home-action-tile" onClick={() => openWindow('settings')}>
                  <AppIcon appId="settings" className="app-icon small" />
                  <div>
                    <strong>Configurações</strong>
                    <p>Tema e visual</p>
                  </div>
                </button>
              </div>
            </article>
          </section>

          <section className="home-bottom-grid">
            <article className="surface-card">
              <p className="section-title">Recursos ativos</p>
              <ul className="feature-list">
                <li>Taskbar central no estilo Windows 11.</li>
                <li>Start Menu com apps fixados e recomendados.</li>
                <li>Boot screen, lock screen e restauração local da sessão.</li>
              </ul>
            </article>
            <article className="surface-card">
              <p className="section-title">Estado salvo</p>
              <ul className="feature-list">
                <li>Wallpaper salvo com `localStorage`.</li>
                <li>Janelas abertas e posições restauradas ao recarregar.</li>
                <li>Bloqueio da sessão pelo botão de energia do menu Iniciar.</li>
              </ul>
            </article>
            <article className="surface-card">
              <p className="section-title">Publicação</p>
              <div className="home-link-list">
                {webLinks.map((link) => (
                  <a
                    key={link.title}
                    className="home-link-item"
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <strong>{link.title}</strong>
                    <span>{link.description}</span>
                  </a>
                ))}
              </div>
            </article>
          </section>
        </div>
      )
    }

    if (id === 'explorer') {
      return (
        <div className="explorer-shell">
          <div className="explorer-commandbar">
            <div className="command-group">
              <button
                type="button"
                className="toolbar-button icon-only"
                onClick={goUpExplorerFolder}
                disabled={explorerCurrentNode.path === projectTree.path}
              >
                ↑
              </button>
              <button
                type="button"
                className="toolbar-button icon-only"
                onClick={() => setSelectedExplorerPath(explorerCurrentNode.path)}
              >
                i
              </button>
              <button
                type="button"
                className="toolbar-button icon-only"
                onClick={() => openExplorerFolder(initialExplorerFolder.path)}
              >
                ⌂
              </button>
            </div>
            <div className="breadcrumb-bar">
              {explorerBreadcrumbs.map((item, index) => (
                <button
                  key={item.path}
                  type="button"
                  className={`breadcrumb-segment ${item.path === explorerCurrentNode.path ? 'active' : ''}`}
                  onClick={() => {
                    if (item.kind === 'folder') {
                      openExplorerFolder(item.path)
                    }
                  }}
                >
                  {index > 0 ? <span className="breadcrumb-divider">/</span> : null}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="explorer-layout has-details">
            <aside className="explorer-nav">
              <p className="section-title">Projetos</p>
              <div className="nav-list">
                {explorerQuickLinks.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    className={`nav-item ${item.path === explorerCurrentNode.path ? 'active' : ''}`}
                    onClick={() => {
                      if (item.kind === 'folder') {
                        openExplorerFolder(item.path)
                      }
                    }}
                  >
                    <span className="folder-glyph" />
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.kind === 'folder' ? `${item.children?.length ?? 0} itens` : formatExplorerDate(item.updatedAt)}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="explorer-nav-section">
                <p className="section-title">Atualizados recentemente</p>
                <div className="nav-list compact">
                  {explorerRecentFiles.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      className={`nav-item compact ${item.path === explorerSelectedNode.path ? 'active' : ''}`}
                      onClick={() => setSelectedExplorerPath(item.path)}
                    >
                      <span className="recommended-doc small" />
                      <span>
                        <strong>{item.name}</strong>
                        <small>{formatExplorerDate(item.updatedAt)}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="explorer-main">
              <section className="surface-card explorer-folder-summary">
                <div className="explorer-overview-top">
                  <div>
                    <p className="section-title">{isExplorerRoot ? 'GitHub' : 'Pasta atual'}</p>
                    <strong>{explorerCurrentNode.name}</strong>
                    <p className="muted-text">
                      {isExplorerRoot
                        ? 'Repositórios públicos sincronizados do perfil Belin7z.'
                        : 'Navegue pelas pastas e arquivos do projeto como em um PC real.'}
                    </p>
                  </div>
                  <div className="explorer-stat-row">
                    <div className="explorer-stat-card">
                      <small>{isExplorerRoot ? 'Repositórios' : 'Pastas'}</small>
                      <strong>{explorerFolderCount}</strong>
                    </div>
                    <div className="explorer-stat-card">
                      <small>Arquivos</small>
                      <strong>{explorerFileCount}</strong>
                    </div>
                    <div className="explorer-stat-card">
                      <small>Atualizado</small>
                      <strong>{formatExplorerDate(explorerCurrentNode.updatedAt)}</strong>
                    </div>
                  </div>
                </div>
              </section>

              <section className="surface-card explorer-browser">
                <div className="explorer-files-header">
                  <div>
                    <p className="section-title">{isExplorerRoot ? 'Projetos disponíveis' : 'Conteúdo da pasta'}</p>
                    <strong>{explorerEntries.length} itens encontrados</strong>
                  </div>
                  <span className="muted-text">{explorerCurrentNode.path.replaceAll('/', ' > ')}</span>
                </div>

                {isExplorerRoot ? (
                  <div className="repo-drive-grid">
                    {explorerEntries.map((item) => (
                      <button
                        key={item.path}
                        type="button"
                        className={`repo-drive-card ${item.path === explorerSelectedNode.path ? 'active' : ''}`}
                        onClick={() => {
                          if (item.kind === 'folder') {
                            openExplorerFolder(item.path)
                            return
                          }

                          setSelectedExplorerPath(item.path)
                        }}
                      >
                        <div className="repo-drive-top">
                          <span className="folder-icon small" />
                          <strong>{item.name}</strong>
                        </div>
                        <span className="repo-drive-copy">{item.description ?? 'Repositório público no GitHub.'}</span>
                        <div className="repo-drive-bar">
                          <span style={{ width: `${Math.max(18, Math.round((item.size / explorerLargestEntrySize) * 100))}%` }} />
                        </div>
                        <div className="repo-drive-meta">
                          <span>{formatExplorerSize(item)}</span>
                          <span>{formatExplorerDate(item.updatedAt)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="file-table-head browser">
                      <span>Nome</span>
                      <span>Tipo</span>
                      <span>Atualizado em</span>
                      <span>Tamanho</span>
                    </div>

                    <div className="file-table browser-file-table">
                      {explorerEntries.map((item) => (
                        <button
                          key={item.path}
                          type="button"
                          className={`file-row browser ${item.path === explorerSelectedNode.path ? 'active' : ''}`}
                          onClick={() => {
                            if (item.kind === 'folder') {
                              openExplorerFolder(item.path)
                              return
                            }

                            setSelectedExplorerPath(item.path)
                          }}
                        >
                          <div className="file-cell main">
                            {item.kind === 'folder' ? <span className="folder-icon small" /> : <span className="recommended-doc small" />}
                            <span className="file-main-copy">
                              <strong>{item.name}</strong>
                              <small>{item.path}</small>
                            </span>
                          </div>
                          <span className="file-cell meta" data-label="Tipo">{getExplorerNodeType(item)}</span>
                          <span className="file-cell meta" data-label="Atualizado em">{formatExplorerDate(item.updatedAt)}</span>
                          <span className="file-cell meta" data-label="Tamanho">{formatExplorerSize(item)}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </section>

              <div className="explorer-panels">
                <section className="surface-card explorer-group-card">
                  <div className="explorer-section-top">
                    <div>
                      <p className="section-title">{isExplorerRoot ? 'Repositórios principais' : 'Pastas do projeto'}</p>
                      <strong>{isExplorerRoot ? 'Seus projetos públicos' : 'Áreas principais'}</strong>
                    </div>
                    <span className="muted-text">{explorerFolderCount} {isExplorerRoot ? 'repositórios' : 'pastas'}</span>
                  </div>

                  <div className="explorer-favorites single-column">
                    {explorerEntries.filter((item) => item.kind === 'folder').map((item) => (
                      <button
                        key={item.path}
                        type="button"
                        className="favorite-tile"
                        onClick={() => openExplorerFolder(item.path)}
                      >
                        <span className="folder-icon" />
                        <strong>{item.name}</strong>
                        <small>{item.children?.length ?? 0} itens</small>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="surface-card explorer-group-card">
                  <div className="explorer-section-top">
                    <div>
                      <p className="section-title">Arquivos em destaque</p>
                      <strong>Últimos arquivos do repositório</strong>
                    </div>
                    <span className="muted-text">{explorerRecentFiles.length} itens</span>
                  </div>

                  <div className="file-table">
                    {explorerRecentFiles.map((file) => (
                      <button
                        key={file.path}
                        type="button"
                        className={`file-row compact ${file.path === explorerSelectedNode.path ? 'active' : ''}`}
                        onClick={() => setSelectedExplorerPath(file.path)}
                      >
                        <div className="file-cell main">
                          <span className="recommended-doc small" />
                          <span className="file-main-copy">
                            <strong>{file.name}</strong>
                            <small>{file.path}</small>
                          </span>
                        </div>
                        <span className="file-cell meta" data-label="Atualizado em">{formatExplorerDate(file.updatedAt)}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <aside className="surface-card explorer-details">
              <p className="section-title">Painel de detalhes</p>
              <div className="details-preview">
                {explorerSelectedNode.kind === 'folder' ? <span className="folder-icon large" /> : <span className="recommended-doc" />}
              </div>
              <div className="details-copy">
                <strong>{explorerSelectedNode.name}</strong>
                <span>{getExplorerNodeType(explorerSelectedNode)}</span>
              </div>
              <dl className="details-meta">
                <div>
                  <dt>Local</dt>
                  <dd>{explorerSelectedNode.path.replaceAll('/', '\\')}</dd>
                </div>
                <div>
                  <dt>Atualizado em</dt>
                  <dd>{formatExplorerDate(explorerSelectedNode.updatedAt)}</dd>
                </div>
                <div>
                  <dt>Descrição</dt>
                  <dd>
                    {explorerSelectedNode.description
                      ?? (
                        explorerSelectedNode.kind === 'folder'
                          ? `Pasta com ${explorerSelectedNode.children?.length ?? 0} itens do projeto.`
                          : `${getExplorerNodeType(explorerSelectedNode)} disponível dentro do repositório hospedado.`
                      )}
                  </dd>
                </div>
                <div>
                  <dt>Tamanho</dt>
                  <dd>{formatExplorerSize(explorerSelectedNode)}</dd>
                </div>
              </dl>
              <div className="details-actions">
                {explorerSelectedNode.kind === 'folder' ? (
                  <button
                    type="button"
                    className="secondary-button details-action"
                    onClick={() => openExplorerFolder(explorerSelectedNode.path)}
                  >
                    Abrir pasta
                  </button>
                ) : null}
                {explorerSelectedNode.htmlUrl ? (
                  <a
                    className="secondary-button details-action details-link"
                    href={explorerSelectedNode.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir no GitHub
                  </a>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      )
    }

    if (id === 'terminal') {
      return (
        <div className="content-stack">
          <section className="terminal-screen">
            <div className="terminal-topline">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-caption">Windows Terminal</span>
            </div>

            <p className="terminal-title">PS E:\web pc&gt;</p>

            {terminalCommands.map((command) => (
              <div className="terminal-line" key={command}>
                <span className="prompt">$</span>
                <code>{command}</code>
              </div>
            ))}
          </section>

          <section className="surface-card">
            <p className="section-title">Ações</p>
            <div className="hero-actions">
              <button type="button" className="secondary-button" onClick={() => openWindow('settings')}>
                Abrir configurações
              </button>
              <button type="button" className="secondary-button" onClick={() => openWindow('edge')}>
                Abrir navegador
              </button>
            </div>
          </section>
        </div>
      )
    }

    if (id === 'edge') {
      return (
        <div className="content-stack">
          <section className="edge-shell">
            <div className="edge-tabs">
              <div className="edge-tab active">Web PC</div>
              <div className="edge-tab">GitHub</div>
              <div className="edge-tab">Pages</div>
            </div>

            <div className="edge-toolbar">
              <div className="edge-nav">
                <span className="browser-arrow left" />
                <span className="browser-arrow right" />
                <span className="browser-refresh" />
              </div>
              <div className="edge-address">https://belin7z.github.io/Web-pc/</div>
              <div className="edge-avatar">B</div>
            </div>

            <div className="edge-content">
              <div className="edge-home-hero">
                <div className="edge-surface">
                  <p className="eyebrow">Navegador</p>
                  <h2>Abra o projeto, publique e navegue sem sair do Web PC.</h2>
                  <p className="hero-copy">
                    Página inicial redesenhada para parecer mais com um navegador real,
                    com pesquisa, atalhos rápidos e áreas de acesso frequente.
                  </p>
                </div>

                <div className="browser-search-card">
                  <label className="browser-searchbar">
                    <span className="search-glyph" />
                    <input type="text" value="Pesquisar na Web ou digitar uma URL" readOnly />
                  </label>
                  <div className="browser-shortcuts">
                    {browserHighlights.map((item) => (
                      <a
                        key={item.title}
                        className="browser-shortcut"
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        <strong>{item.title}</strong>
                        <small>{item.meta}</small>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="browser-sections">
                <section className="surface-card browser-feed">
                  <div className="browser-section-head">
                    <div>
                      <p className="section-title">Acesso rápido</p>
                      <strong>Links mais usados neste desktop</strong>
                    </div>
                    <span className="muted-text">Sincronizado com o projeto</span>
                  </div>

                  <div className="browser-card-grid">
                    {browserHighlights.map((item) => (
                      <a
                        key={item.title}
                        className="browser-link-card"
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        <span className="browser-card-badge">{item.meta}</span>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </a>
                    ))}
                  </div>
                </section>

                <section className="surface-card browser-sidebar">
                  <p className="section-title">Navegação</p>
                  <div className="browser-sidebar-list">
                    {webLinks.map((link) => (
                      <a
                        key={link.title}
                        className="quick-link browser-rail-link"
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        <strong>{link.title}</strong>
                        <span className="muted-text">{link.description}</span>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      )
    }

    return (
      <div className="settings-shell">
        <aside className="settings-nav">
          <p className="section-title">Categorias</p>
          <button type="button" className="settings-link active">Personalização</button>
          <button type="button" className="settings-link">Sistema</button>
          <button type="button" className="settings-link">Rede</button>
          <button type="button" className="settings-link">Windows Update</button>
        </aside>

        <div className="content-stack">
          <section className="surface-card">
            <p className="section-title">Plano de fundo</p>
            <div className="theme-grid">
              {wallpapers.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-button ${wallpaper === theme.id ? 'active' : ''}`}
                  onClick={() => setWallpaper(theme.id)}
                >
                  <span className={`theme-preview ${theme.id}`} />
                  <strong>{theme.name}</strong>
                  <span>{theme.description}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="split-grid">
            <article className="surface-card">
              <p className="section-title">Ambiente</p>
              <ul className="feature-list">
                <li>Online: {navigator.onLine ? 'sim' : 'não'}</li>
                <li>Idioma: {navigator.language}</li>
                <li>Wallpaper ativo: {activeWallpaper?.name}</li>
              </ul>
            </article>

            <article className="surface-card">
              <p className="section-title">Deploy</p>
              <ul className="feature-list">
                <li>Repositório: Belin7z/Web-pc</li>
                <li>Base: /Web-pc/</li>
                <li>Workflow: GitHub Actions</li>
              </ul>
            </article>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className={`webpc wallpaper-${wallpaper}`}>
      <div className="wallpaper-fold fold-1" />
      <div className="wallpaper-fold fold-2" />
      <div className="wallpaper-fold fold-3" />
      <div className="wallpaper-fold fold-4" />

      <main
        className="desktop-surface"
        ref={desktopRef}
        onPointerDown={closeStartMenu}
      >
        <section className="desktop-icons">
          {desktopShortcuts.map((appId) => {
            const app = appLookup[appId]

            return (
              <button
                key={app.id}
                type="button"
                className="desktop-icon"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => openWindow(app.id)}
              >
                <AppIcon appId={app.id} className="app-icon desktop" />
                <span className="icon-label">{app.name}</span>
              </button>
            )
          })}
        </section>

        <aside className="desktop-widgets">
          <article className="widget-card glass-panel weather-widget">
            <span className="widget-title">Widgets</span>
            <strong>26°C</strong>
            <p>São Paulo</p>
            <small>Desktop inspirado no Windows em execução</small>
          </article>
          <article className="widget-card glass-panel date-widget">
            <span className="widget-title">Hoje</span>
            <strong>{timeLabel}</strong>
            <p>{dateLabel}</p>
          </article>
        </aside>

        <section className="window-stage">
          {visibleWindows.map((windowState) => {
            const definition = appLookup[windowState.id]
            const inlineStyle = {
              width: windowState.maximized ? undefined : windowState.width,
              height: windowState.maximized ? undefined : windowState.height,
              '--window-x': `${windowState.x}px`,
              '--window-y': `${windowState.y}px`,
              zIndex: windowState.z,
            } as CSSProperties

            return (
              <article
                key={windowState.id}
                className={`window-frame ${windowState.maximized ? 'maximized' : ''} ${animationStates[windowState.id] ?? ''}`}
                style={inlineStyle}
                onPointerDown={(event) => {
                  event.stopPropagation()
                  bringToFront(windowState.id)
                }}
              >
                <div
                  className="window-header"
                  onPointerDown={(event) => {
                    event.stopPropagation()
                    startDragging(event, windowState.id)
                  }}
                >
                  <div className="window-title">
                    <AppIcon appId={definition.id} className="app-icon small" />
                    <div>
                      <strong>{definition.name}</strong>
                      <small>{definition.summary}</small>
                    </div>
                  </div>

                  <div className="window-controls">
                    <button type="button" aria-label="Minimizar" onClick={() => minimizeWindow(windowState.id)}>
                      <span className="control-min" />
                    </button>
                    <button type="button" aria-label="Maximizar" onClick={() => toggleMaximize(windowState.id)}>
                      <span className="control-max" />
                    </button>
                    <button
                      type="button"
                      className="danger"
                      aria-label="Fechar"
                      onClick={() => closeWindow(windowState.id)}
                    >
                      <span className="control-close" />
                    </button>
                  </div>
                </div>

                <div className="window-body">{renderWindowBody(windowState.id)}</div>
              </article>
            )
          })}
        </section>
      </main>
      {startOpen ? (
        <section className="start-menu glass-panel" onPointerDown={(event) => event.stopPropagation()}>
          <label className="start-search">
            <span className="search-glyph" />
            <input
              className="start-search-input"
              type="text"
              value={startQuery}
              onChange={(event) => setStartQuery(event.target.value)}
              placeholder="Pesquisar apps, configurações e documentos"
              autoFocus
            />
          </label>

          <div className="start-section-header">
            <strong>{showAllApps || normalizedQuery ? 'Todos os apps' : 'Fixados'}</strong>
            <button
              type="button"
              className="start-toggle-button"
              onClick={() => setShowAllApps((current) => !current)}
            >
              {showAllApps ? 'Voltar' : 'Todos os apps'}
            </button>
          </div>

          {filteredApps.length > 0 ? (
            <div className={showAllApps || normalizedQuery ? 'all-apps-list' : 'pinned-grid'}>
              {(showAllApps || normalizedQuery ? filteredApps : taskbarApps.map((appId) => appLookup[appId])).map((app) => (
                <button
                  key={app.id}
                  type="button"
                  className={showAllApps || normalizedQuery ? 'all-apps-item' : 'pinned-app'}
                  onClick={() => openWindow(app.id)}
                >
                  <AppIcon appId={app.id} className="app-icon small" />
                  <span>
                    <strong>{app.name}</strong>
                    {showAllApps || normalizedQuery ? <small>{app.summary}</small> : null}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="start-empty-state">
              <strong>Nenhum resultado encontrado</strong>
              <span>Tente pesquisar por Explorador, Edge ou Configurações.</span>
            </div>
          )}

          <div className="start-section-header">
            <strong>Recomendados</strong>
            <span>Recentes</span>
          </div>

          <div className="recommended-list">
            {filteredRecommendations.map((item) => (
              <div key={item.title} className="recommended-item">
                <span className="recommended-doc" />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.meta}</small>
                </span>
              </div>
            ))}
          </div>

          <div className="start-footer">
            <div className="profile-chip">
              <span className="profile-avatar">B</span>
              <span>Belin7z</span>
            </div>
            <button type="button" className="power-button" aria-label="Lock screen" onClick={lockDesktop} />
          </div>
        </section>
      ) : null}

      <footer className="taskbar glass-panel" onPointerDown={(event) => event.stopPropagation()}>
        <div className="taskbar-main">
          <button type="button" className="taskbar-start" onClick={toggleStartMenu}>
            <WindowsLogo className="windows-glyph" />
          </button>

          {taskbarApps.map((appId) => {
            const app = appLookup[appId]
            const windowState = windows.find((item) => item.id === appId)
            const isOpen = Boolean(windowState)
            const isMinimized = windowState?.minimized ?? false

            return (
              <button
                key={app.id}
                type="button"
                className={`taskbar-icon ${isOpen && !isMinimized ? 'active' : ''}`}
                onClick={() => {
                  if (!windowState) {
                    openWindow(app.id)
                    return
                  }

                  if (windowState.minimized) {
                    showWindow(app.id)
                    return
                  }

                  minimizeWindow(app.id)
                }}
              >
                <AppIcon appId={app.id} className="app-icon taskbar-icon-svg" />
              </button>
            )
          })}
        </div>

        <div className="taskbar-tray">
          <span className="tray-icon wifi" />
          <span className="tray-icon volume" />
          <span className="tray-icon battery" />
          <div className="tray-clock">
            <strong>{timeLabel}</strong>
            <span>{dateLabel}</span>
          </div>
        </div>

        <div className="show-desktop" />
      </footer>

      {screen === 'boot' ? (
        <section className="boot-screen">
          <div className="boot-center">
            <WindowsLogo className="boot-logo windows-glyph" />
            <p>Iniciando Web PC</p>
            <div className="boot-loader">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>
      ) : null}

      {screen === 'lock' ? (
        <section className="lock-screen" onClick={unlockDesktop}>
          <div className="lock-overlay" />
          <div className="lock-topline">
            <div className="lock-weather">
              <span>26°C</span>
              <small>São Paulo</small>
            </div>
          </div>
          <div className="lock-content" onClick={(event) => event.stopPropagation()}>
            <div className="lock-clock">
              <strong>{timeLabel}</strong>
              <span>{dateLabel}</span>
            </div>

            <div className="lock-card">
              <span className="lock-avatar">B</span>
              <div>
                <strong>Belin7z</strong>
                <span>Web PC</span>
              </div>
              <label className="signin-field">
                <span>PIN</span>
                <input type="password" value="0000" readOnly aria-label="PIN" />
              </label>
              <button type="button" className="signin-button" onClick={unlockDesktop}>
                Entrar
              </button>
              <button type="button" className="signin-alt">Opções de entrada</button>
            </div>

            <p className="lock-hint">Pressione Enter ou clique em Entrar</p>
          </div>
          <div className="lock-footer">
            <span className="tray-icon wifi" />
            <span className="tray-icon battery" />
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default App
