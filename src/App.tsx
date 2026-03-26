import { useEffect, useRef, useState } from 'react'
import './App.css'

type AppId = 'home' | 'explorer' | 'terminal' | 'edge' | 'settings'
type WallpaperId = 'bloom' | 'flow' | 'night'

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

const apps: AppDefinition[] = [
  {
    id: 'home',
    name: 'Inicio',
    summary: 'Resumo do sistema com widgets e status da sessao.',
    iconClass: 'icon-home',
    window: { width: 700, height: 470 },
  },
  {
    id: 'explorer',
    name: 'Explorador',
    summary: 'Arquivos, discos e pastas no estilo do Windows 11.',
    iconClass: 'icon-explorer',
    window: { width: 860, height: 560 },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    summary: 'Console para build, git e publicacao.',
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
    name: 'Configuracoes',
    summary: 'Personalizacao do Web PC e deploy.',
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
    description: 'Wallpaper azul com dobras no estilo padrao do Windows 11.',
  },
  {
    id: 'flow',
    name: 'Flow',
    description: 'Mais brilho e vidro, com contraste ligeiramente mais claro.',
  },
  {
    id: 'night',
    name: 'Night',
    description: 'Versao escura inspirada no tema noturno do Windows.',
  },
]

const quickFolders = [
  { name: 'Desktop', meta: 'Atalhos do sistema' },
  { name: 'Documentos', meta: 'Anotacoes e estrutura' },
  { name: 'Projetos', meta: 'Repositorio Web-pc' },
  { name: 'Downloads', meta: 'Assets e referencias' },
]

const drives = [
  { name: 'Windows (C:)', description: '343 GB livres de 1 TB', usage: 66 },
  { name: 'Workspace (D:)', description: '705 GB livres de 1.2 TB', usage: 41 },
  { name: 'OneDrive', description: 'Sincronizado com GitHub Pages', usage: 83 },
]

const startRecommendations = [
  { title: 'README.md', meta: 'Atualizado ha pouco' },
  { title: 'deploy.yml', meta: 'Workflow de publicacao' },
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
    title: 'Repositorio GitHub',
    href: 'https://github.com/Belin7z/Web-pc',
    description: 'Codigo fonte principal do Web PC.',
  },
  {
    title: 'GitHub Pages',
    href: 'https://pages.github.com/',
    description: 'Hospedagem estatica para publicar o projeto.',
  },
  {
    title: 'Preview',
    href: '#desktop-preview',
    description: 'Usar a propria interface como demonstracao.',
  },
]

const desktopShortcuts: AppId[] = ['home', 'explorer', 'edge', 'terminal', 'settings']
const taskbarApps: AppId[] = ['home', 'edge', 'explorer', 'terminal', 'settings']

const windowSeeds = [
  { x: 108, y: 62 },
  { x: 172, y: 108 },
  { x: 228, y: 148 },
  { x: 144, y: 92 },
  { x: 212, y: 128 },
]

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
  const activeWallpaper = wallpapers.find((item) => item.id === wallpaper)
  const visibleWindows = [...windows]
    .filter((windowState) => !windowState.minimized)
    .sort((left, right) => left.z - right.z)

  const renderWindowBody = (id: AppId) => {
    if (id === 'home') {
      return (
        <div className="content-stack">
          <section className="home-hero" id="desktop-preview">
            <div>
              <p className="eyebrow">Web PC</p>
              <h1>Desktop web com linguagem de Windows 11.</h1>
              <p className="hero-copy">
                Barra centralizada, wallpaper bloom, superficies em mica, janelas
                arredondadas e base pronta para publicar no GitHub Pages.
              </p>
            </div>

            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => openWindow('explorer')}>
                Abrir Explorador
              </button>
              <button type="button" className="secondary-button" onClick={() => openWindow('edge')}>
                Abrir Edge
              </button>
            </div>
          </section>

          <section className="widget-grid">
            <article className="surface-card large-widget">
              <span className="metric-label">Sessao</span>
              <strong>{sessionMinutes} min</strong>
              <p>Relogio ativo, taskbar interativa e janelas com foco dinamico.</p>
            </article>
            <article className="surface-card">
              <span className="metric-label">GitHub Pages</span>
              <strong>Pronto</strong>
              <p>Build Vite com base `/Web-pc/` e workflow para deploy.</p>
            </article>
            <article className="surface-card">
              <span className="metric-label">Tema</span>
              <strong>{activeWallpaper?.name}</strong>
              <p>Papel de parede com variacoes clara, fluida e escura.</p>
            </article>
          </section>

          <section className="split-grid">
            <article className="surface-card">
              <p className="section-title">Recursos</p>
              <ul className="feature-list">
                <li>Taskbar central no estilo Windows 11.</li>
                <li>Start menu com apps fixados e recomendados.</li>
                <li>Apps simulados para Explorer, Edge, Terminal e Configuracoes.</li>
              </ul>
            </article>
            <article className="surface-card">
              <p className="section-title">Proximo passo</p>
              <ul className="feature-list">
                <li>Ativar o GitHub Pages em `Settings &gt; Pages`.</li>
                <li>Adicionar lock screen e boot screen.</li>
                <li>Persistir wallpaper e janelas com localStorage.</li>
              </ul>
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
              <button type="button" className="toolbar-button">Novo</button>
              <button type="button" className="toolbar-button">Copiar</button>
              <button type="button" className="toolbar-button">Colar</button>
            </div>
            <div className="breadcrumb-bar">Este Computador &gt; Projetos &gt; Web-pc</div>
          </div>

          <div className="explorer-layout">
            <aside className="explorer-nav">
              <p className="section-title">Inicio rapido</p>
              <div className="nav-list">
                {quickFolders.map((folder) => (
                  <button key={folder.name} type="button" className="nav-item">
                    <span className="folder-glyph" />
                    <span>
                      <strong>{folder.name}</strong>
                      <small>{folder.meta}</small>
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="content-stack">
              <section className="surface-card">
                <p className="section-title">Dispositivos e unidades</p>
                <div className="drive-list">
                  {drives.map((drive) => (
                    <article key={drive.name} className="drive-row">
                      <div className="card-row">
                        <div>
                          <strong>{drive.name}</strong>
                          <p className="muted-text">{drive.description}</p>
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
                      <small>{folder.meta}</small>
                    </button>
                  ))}
                </div>
              </section>
            </div>
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
            <p className="section-title">Acoes</p>
            <div className="hero-actions">
              <button type="button" className="secondary-button" onClick={() => openWindow('settings')}>
                Abrir configuracoes
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
              <div className="edge-surface">
                <p className="eyebrow">Publicacao</p>
                <h2>Projeto preparado para GitHub Pages.</h2>
                <p className="hero-copy">
                  O build usa Vite com base do repositorio e GitHub Actions para
                  publicar o conteudo de `dist` automaticamente.
                </p>
              </div>

              <div className="link-grid">
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
          <button type="button" className="settings-link active">Personalizacao</button>
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
                <li>Online: {navigator.onLine ? 'sim' : 'nao'}</li>
                <li>Idioma: {navigator.language}</li>
                <li>Wallpaper ativo: {activeWallpaper?.name}</li>
              </ul>
            </article>

            <article className="surface-card">
              <p className="section-title">Deploy</p>
              <ul className="feature-list">
                <li>Repositorio: Belin7z/Web-pc</li>
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
        onPointerDown={() => setStartOpen(false)}
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
                <span className={`app-icon ${app.iconClass}`}>
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span className="icon-label">{app.name}</span>
              </button>
            )
          })}
        </section>

        <aside className="desktop-widgets">
          <article className="widget-card glass-panel weather-widget">
            <span className="widget-title">Widgets</span>
            <strong>26°</strong>
            <p>Sao Paulo</p>
            <small>Desktop Windows-like em execucao</small>
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
        <section className="start-menu glass-panel" onPointerDown={(event) => event.stopPropagation()}>
          <div className="start-search">
            <span className="search-glyph" />
            <span>Pesquisar apps, configuracoes e documentos</span>
          </div>

          <div className="start-section-header">
            <strong>Fixados</strong>
            <span>Todos</span>
          </div>

          <div className="pinned-grid">
            {taskbarApps.map((appId) => {
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
            <span>Recentes</span>
          </div>

          <div className="recommended-list">
            {startRecommendations.map((item) => (
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
            <button type="button" className="power-button" aria-label="Power" />
          </div>
        </section>
      ) : null}

      <footer className="taskbar glass-panel" onPointerDown={(event) => event.stopPropagation()}>
        <div className="taskbar-main">
          <button type="button" className="taskbar-start" onClick={() => setStartOpen((open) => !open)}>
            <span className="windows-glyph">
              <span />
              <span />
              <span />
              <span />
            </span>
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
    </div>
  )
}

export default App
