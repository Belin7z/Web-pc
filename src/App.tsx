import { useEffect, useRef, useState } from 'react'
import './App.css'

type AppId = 'home' | 'explorer' | 'terminal' | 'edge' | 'settings'
type WallpaperId = 'bloom' | 'flow' | 'night'

interface AppDefinition {
  id: AppId
  name: string
  shortName: string
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

const apps: AppDefinition[] = [
  {
    id: 'home',
    name: 'Inicio',
    shortName: 'IN',
    summary: 'Painel principal do Web PC com status, atalhos e destaque do projeto.',
    iconClass: 'icon-home',
    window: { width: 620, height: 440 },
  },
  {
    id: 'explorer',
    name: 'Explorador',
    shortName: 'EX',
    summary: 'Visual de arquivos no estilo Windows para navegar no projeto.',
    iconClass: 'icon-explorer',
    window: { width: 720, height: 470 },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    shortName: 'TM',
    summary: 'Prompt com comandos do build e fluxo de deploy.',
    iconClass: 'icon-terminal',
    window: { width: 600, height: 380 },
  },
  {
    id: 'edge',
    name: 'Navegador',
    shortName: 'ED',
    summary: 'Hub para GitHub, preview e publicacao do projeto.',
    iconClass: 'icon-edge',
    window: { width: 760, height: 500 },
  },
  {
    id: 'settings',
    name: 'Configuracoes',
    shortName: 'CF',
    summary: 'Personalizacao visual e preparacao para GitHub Pages.',
    iconClass: 'icon-settings',
    window: { width: 560, height: 430 },
  },
]

const appLookup = Object.fromEntries(
  apps.map((app) => [app.id, app]),
) as Record<AppId, AppDefinition>

const wallpaperPresets: Array<{
  id: WallpaperId
  name: string
  description: string
}> = [
  {
    id: 'bloom',
    name: 'Bloom Blue',
    description: 'Lembra o wallpaper padrao do Windows 11 com dobras azuis.',
  },
  {
    id: 'flow',
    name: 'Fluent Glass',
    description: 'Mais brilho e vidro para um look moderno de desktop.',
  },
  {
    id: 'night',
    name: 'Night Mode',
    description: 'Versao escura e limpa para destacar as janelas.',
  },
]

const windowSeeds = [
  { x: 110, y: 78 },
  { x: 160, y: 124 },
  { x: 220, y: 156 },
  { x: 190, y: 102 },
  { x: 250, y: 136 },
]

const pinnedApps: AppId[] = ['home', 'edge', 'explorer', 'terminal', 'settings']

const quickFolders = [
  { name: 'Desktop', detail: 'Atalhos do sistema' },
  { name: 'Documentos', detail: 'Wireframes e notas' },
  { name: 'Projetos', detail: 'Repositorio Web-pc' },
  { name: 'Downloads', detail: 'Imagens e assets' },
]

const driveStats = [
  { name: 'Windows (C:)', usage: 68, detail: '343 GB livres de 1 TB' },
  { name: 'Workspace (D:)', usage: 41, detail: '705 GB livres de 1.2 TB' },
  { name: 'Cloud Sync', usage: 82, detail: 'Sincronizacao GitHub Pages' },
]

const recommendedItems = [
  { title: 'README.md', meta: 'Atualizado agora' },
  { title: 'Deploy Pages', meta: 'Fluxo CI configurado' },
  { title: 'Web PC', meta: 'Repo Belin7z/Web-pc' },
]

const terminalCommands = [
  'npm install',
  'npm run build',
  'git add .',
  'git commit -m "feat: refina web pc estilo windows"',
  'git push origin main',
]

const webLinks = [
  {
    title: 'Repositorio GitHub',
    description: 'Abrir codigo fonte do projeto Web-pc.',
    href: 'https://github.com/Belin7z/Web-pc',
  },
  {
    title: 'GitHub Pages',
    description: 'Publicacao estatica com Vite e workflow automatico.',
    href: 'https://pages.github.com/',
  },
  {
    title: 'Preview interno',
    description: 'Usar a propria UI do desktop como demonstracao.',
    href: '#desktop-preview',
  },
]

const appStartedAt = Date.now()

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function createWindow(id: AppId, index: number, z: number): WindowState {
  const seed = windowSeeds[index % windowSeeds.length]
  const definition = appLookup[id]

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

function App() {
  const desktopRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const nextZIndex = useRef(20)

  const [wallpaper, setWallpaper] = useState<WallpaperId>('bloom')
  const [now, setNow] = useState(() => new Date())
  const [startOpen, setStartOpen] = useState(false)
  const [windows, setWindows] = useState<WindowState[]>([
    createWindow('home', 0, 8),
  ])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

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
          const maxY = Math.max(20, maxHeight - windowState.height - 116)

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

  const bringToFront = (id: AppId) => {
    const z = ++nextZIndex.current

    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id ? { ...windowState, z, minimized: false } : windowState,
      ),
    )
  }

  const openWindow = (id: AppId) => {
    setStartOpen(false)
    setWindows((current) => {
      const existingWindow = current.find((windowState) => windowState.id === id)
      const z = ++nextZIndex.current

      if (existingWindow) {
        return current.map((windowState) =>
          windowState.id === id ? { ...windowState, minimized: false, z } : windowState,
        )
      }

      return [...current, createWindow(id, current.length, z)]
    })
  }

  const closeWindow = (id: AppId) => {
    setWindows((current) => current.filter((windowState) => windowState.id !== id))
  }

  const toggleMinimize = (id: AppId) => {
    setWindows((current) =>
      current.map((windowState) =>
        windowState.id === id
          ? { ...windowState, minimized: !windowState.minimized }
          : windowState,
      ),
    )
  }

  const toggleMaximize = (id: AppId) => {
    const z = ++nextZIndex.current

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
  const activeWallpaper = wallpaperPresets.find((item) => item.id === wallpaper)
  const visibleWindows = [...windows]
    .filter((windowState) => !windowState.minimized)
    .sort((left, right) => left.z - right.z)

  const renderWindowBody = (id: AppId) => {
    if (id === 'home') {
      return (
        <div className="content-stack">
          <section className="hero-panel" id="desktop-preview">
            <div>
              <p className="eyebrow">Windows style</p>
              <h1>Web PC com visual inspirado no Windows.</h1>
              <p className="hero-copy">
                Desktop com barra centralizada, janelas em vidro, menu iniciar,
                explorador, navegador e deploy pronto para GitHub Pages.
              </p>
            </div>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => openWindow('explorer')}>
                Abrir Explorador
              </button>
              <button type="button" className="secondary-button" onClick={() => openWindow('edge')}>
                Ver navegador
              </button>
            </div>
          </section>

          <section className="metric-grid">
            <article className="surface-card">
              <span className="metric-label">Apps</span>
              <strong>{windows.length.toString().padStart(2, '0')}</strong>
              <p>Painel com foco, minimizar e maximizar.</p>
            </article>
            <article className="surface-card">
              <span className="metric-label">Sessao</span>
              <strong>{sessionMinutes} min</strong>
              <p>Relogio ativo e desktop navegavel em tempo real.</p>
            </article>
            <article className="surface-card">
              <span className="metric-label">Hospedagem</span>
              <strong>Pages</strong>
              <p>Base do Vite e workflow prontos para publicar no GitHub.</p>
            </article>
          </section>

          <section className="split-grid">
            <article className="surface-card">
              <p className="section-title">Destaques</p>
              <ul className="feature-list">
                <li>Taskbar central inspirada no Windows 11.</li>
                <li>Start menu com apps fixados e recomendados.</li>
                <li>Janela de Explorador com navegao por pastas e discos.</li>
              </ul>
            </article>
            <article className="surface-card">
              <p className="section-title">Deploy</p>
              <ul className="feature-list">
                <li>Build estatico do Vite pronto para Pages.</li>
                <li>Workflow automatizado para publicar o `dist`.</li>
                <li>Base configurada para `/Web-pc/`.</li>
              </ul>
            </article>
          </section>
        </div>
      )
    }

    if (id === 'explorer') {
      return (
        <div className="explorer-layout">
          <aside className="explorer-sidebar">
            <p className="section-title">Acesso rapido</p>
            <div className="nav-list">
              {quickFolders.map((folder) => (
                <button key={folder.name} type="button" className="nav-item">
                  <span className="folder-glyph" />
                  <span>
                    <strong>{folder.name}</strong>
                    <small>{folder.detail}</small>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="content-stack">
            <section className="surface-card">
              <p className="section-title">Este computador</p>
              <div className="drive-list">
                {driveStats.map((drive) => (
                  <article key={drive.name} className="drive-row">
                    <div className="card-row">
                      <div>
                        <strong>{drive.name}</strong>
                        <p className="muted-text">{drive.detail}</p>
                      </div>
                      <span className="usage-label">{drive.usage}%</span>
                    </div>
                    <div className="storage-bar">
                      <span style={{ width: `${drive.usage}%` }} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="surface-card">
              <p className="section-title">Pastas</p>
              <div className="folder-grid">
                {quickFolders.map((folder) => (
                  <button key={folder.name} type="button" className="folder-card">
                    <span className="folder-icon" />
                    <strong>{folder.name}</strong>
                    <small>{folder.detail}</small>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      )
    }

    if (id === 'terminal') {
      return (
        <div className="content-stack">
          <section className="terminal-screen">
            <p className="terminal-title">PS E:\web pc&gt;</p>
            {terminalCommands.map((command) => (
              <div className="terminal-line" key={command}>
                <span className="prompt">$</span>
                <code>{command}</code>
              </div>
            ))}
          </section>

          <section className="surface-card">
            <p className="section-title">Acao rapida</p>
            <div className="chip-row">
              <button type="button" className="command-chip" onClick={() => openWindow('settings')}>
                abrir configuracoes
              </button>
              <button type="button" className="command-chip" onClick={() => openWindow('edge')}>
                abrir navegador
              </button>
            </div>
          </section>
        </div>
      )
    }

    if (id === 'edge') {
      return (
        <div className="content-stack">
          <section className="browser-shell">
            <div className="browser-tabs">
              <div className="browser-tab active">Web PC</div>
              <div className="browser-tab">GitHub</div>
            </div>
            <div className="browser-bar">
              <div className="browser-actions">
                <span className="browser-arrow left" />
                <span className="browser-arrow right" />
                <span className="browser-refresh" />
              </div>
              <div className="browser-address">https://belin7z.github.io/Web-pc/</div>
            </div>
            <div className="browser-page">
              <p className="eyebrow">Publicacao</p>
              <h2>Site preparado para rodar no GitHub Pages.</h2>
              <p className="hero-copy">
                A configuracao usa Vite com base do repositorio e workflow para gerar
                e publicar o `dist` automaticamente.
              </p>
            </div>
          </section>

          <section className="link-grid">
            {webLinks.map((link) => (
              <a
                key={link.title}
                className="surface-card quick-link"
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <p className="section-title">{link.title}</p>
                <span className="muted-text">{link.description}</span>
              </a>
            ))}
          </section>
        </div>
      )
    }

    return (
      <div className="content-stack">
        <section className="surface-card">
          <p className="section-title">Plano de fundo</p>
          <div className="theme-grid">
            {wallpaperPresets.map((theme) => (
              <button
                key={theme.id}
                type="button"
                className={`theme-button ${wallpaper === theme.id ? 'active' : ''}`}
                onClick={() => setWallpaper(theme.id)}
              >
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
              <li>Online: {navigator.onLine ? 'sim' : 'nao'}</li>
              <li>Idioma: {navigator.language}</li>
              <li>Tema ativo: {activeWallpaper?.name}</li>
            </ul>
          </article>
          <article className="surface-card">
            <p className="section-title">GitHub Pages</p>
            <ul className="feature-list">
              <li>Repositorio: Belin7z/Web-pc</li>
              <li>Base publica: /Web-pc/</li>
              <li>Deploy automatico por GitHub Actions</li>
            </ul>
          </article>
        </section>
      </div>
    )
  }

  return (
    <div className={`webpc wallpaper-${wallpaper}`}>
      <div className="wallpaper-shape shape-left" />
      <div className="wallpaper-shape shape-right" />

      <main
        className="desktop-surface"
        ref={desktopRef}
        onPointerDown={() => setStartOpen(false)}
      >
        <header className="desktop-topbar">
          <div className="desktop-search">
            <span className="search-glyph" />
            <span>Pesquisar no Web PC</span>
          </div>
          <div className="desktop-topbar-info">
            <span>{dateLabel}</span>
            <strong>{timeLabel}</strong>
          </div>
        </header>

        <section className="desktop-icons">
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              className="desktop-icon"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => openWindow(app.id)}
            >
              <span className={`app-icon ${app.iconClass}`}>
                <span />
                <span />
                <span />
                <span />
              </span>
              <span className="icon-label">{app.name}</span>
            </button>
          ))}
        </section>

        <aside className="desktop-widgets">
          <article className="widget-card glass-panel">
            <span className="widget-title">Widgets</span>
            <strong>Web PC</strong>
            <p>UI em estilo Windows pronta para demonstracao.</p>
          </article>
          <article className="widget-card glass-panel">
            <span className="widget-title">GitHub Pages</span>
            <p>Build estatico e deploy automatico.</p>
            <p>Repo: Belin7z/Web-pc</p>
          </article>
        </aside>

        <section className="window-stage">
          {visibleWindows.map((windowState) => {
            const definition = appLookup[windowState.id]
            const inlineStyle = windowState.maximized
              ? { zIndex: windowState.z }
              : {
                  width: windowState.width,
                  height: windowState.height,
                  transform: `translate(${windowState.x}px, ${windowState.y}px)`,
                  zIndex: windowState.z,
                }

            return (
              <article
                key={windowState.id}
                className={`window-frame ${windowState.maximized ? 'maximized' : ''}`}
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
                    <span className={`app-icon small ${definition.iconClass}`}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                    <div>
                      <strong>{definition.name}</strong>
                      <small>{definition.summary}</small>
                    </div>
                  </div>

                  <div className="window-controls">
                    <button type="button" aria-label="Minimizar" onClick={() => toggleMinimize(windowState.id)}>
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
        <section
          className="start-menu glass-panel"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="start-search">
            <span className="search-glyph" />
            <span>Pesquisar aplicativos, arquivos e web</span>
          </div>

          <div className="start-section-header">
            <strong>Fixados</strong>
            <span>Todos os apps</span>
          </div>
          <div className="pinned-grid">
            {pinnedApps.map((appId) => {
              const app = appLookup[appId]

              return (
                <button key={app.id} type="button" className="pinned-app" onClick={() => openWindow(app.id)}>
                  <span className={`app-icon small ${app.iconClass}`}>
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>{app.name}</span>
                </button>
              )
            })}
          </div>

          <div className="start-section-header">
            <strong>Recomendados</strong>
            <span>Mais recentes</span>
          </div>
          <div className="recommended-list">
            {recommendedItems.map((item) => (
              <div key={item.title} className="recommended-item">
                <span className="recommended-doc" />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.meta}</small>
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="taskbar glass-panel" onPointerDown={(event) => event.stopPropagation()}>
        <div className="taskbar-center">
          <button type="button" className="taskbar-start" onClick={() => setStartOpen((open) => !open)}>
            <span className="windows-glyph">
              <span />
              <span />
              <span />
              <span />
            </span>
          </button>

          {pinnedApps.map((appId) => {
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
                    bringToFront(app.id)
                    return
                  }

                  toggleMinimize(app.id)
                }}
              >
                <span className={`app-icon small ${app.iconClass}`}>
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            )
          })}
        </div>

        <div className="taskbar-tray">
          <span>PT-BR</span>
          <span>{navigator.onLine ? 'Wi-Fi' : 'Offline'}</span>
          <strong>{timeLabel}</strong>
        </div>
      </footer>
    </div>
  )
}

export default App
