import { useEffect, useRef, useState } from 'react'
import './App.css'

type AppId = 'welcome' | 'files' | 'terminal' | 'browser' | 'settings'
type WallpaperId = 'aurora' | 'sunset' | 'midnight'

interface AppDefinition {
  id: AppId
  name: string
  shortName: string
  accent: string
  summary: string
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
    id: 'welcome',
    name: 'Central',
    shortName: 'CT',
    accent: 'from-cyan',
    summary: 'Tela inicial com atalhos, status e visão geral do desktop.',
    window: { width: 520, height: 410 },
  },
  {
    id: 'files',
    name: 'Meu PC',
    shortName: 'PC',
    accent: 'from-amber',
    summary: 'Explorer com unidades, pastas e projetos do ambiente virtual.',
    window: { width: 560, height: 430 },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    shortName: 'SH',
    accent: 'from-lime',
    summary: 'Console estilizado com comandos e deploy checklist.',
    window: { width: 540, height: 360 },
  },
  {
    id: 'browser',
    name: 'Navegador',
    shortName: 'WB',
    accent: 'from-fuchsia',
    summary: 'Janela de navegação para links, preview e integração com GitHub.',
    window: { width: 620, height: 420 },
  },
  {
    id: 'settings',
    name: 'Configurações',
    shortName: 'CFG',
    accent: 'from-sky',
    summary: 'Troca de wallpaper, visual e preferências da sessão.',
    window: { width: 500, height: 390 },
  },
]

const appLookup = Object.fromEntries(
  apps.map((app) => [app.id, app]),
) as Record<AppId, AppDefinition>

const windowSeeds = [
  { x: 90, y: 68 },
  { x: 180, y: 102 },
  { x: 260, y: 144 },
  { x: 140, y: 178 },
  { x: 220, y: 84 },
]

const wallpapers: Array<{
  id: WallpaperId
  name: string
  description: string
}> = [
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Neon frio com brilho de painel futurista.',
  },
  {
    id: 'sunset',
    name: 'Sunset Grid',
    description: 'Mistura quente com vibe synth e reflexos metálicos.',
  },
  {
    id: 'midnight',
    name: 'Midnight Core',
    description: 'Tema escuro com contraste mais técnico e sóbrio.',
  },
]

const storageUnits = [
  { label: 'Disco Sistema', size: '512 GB SSD', used: 62 },
  { label: 'Projetos', size: '1.2 TB NVMe', used: 41 },
  { label: 'Backup Cloud', size: 'Sincronizado', used: 78 },
]

const folders = [
  { name: 'Desktop', meta: '12 atalhos • 4 widgets' },
  { name: 'Workspace', meta: 'Front-end, assets e deploy' },
  { name: 'GitHub', meta: 'Repo conectado: Belin7z/Web-pc' },
  { name: 'Downloads', meta: 'Mockups, logos e referências' },
]

const commandHistory = [
  'git remote add origin https://github.com/Belin7z/Web-pc.git',
  'npm create vite@latest web-pc -- --template react-ts',
  'npm install',
  'npm run build',
  'git add .',
  'git commit -m "feat: cria desktop virtual web"',
]

const quickLinks = [
  {
    title: 'GitHub Repo',
    href: 'https://github.com/Belin7z/Web-pc',
    description: 'Abrir o repositório vinculado para versionamento.',
  },
  {
    title: 'Preview da interface',
    href: '#desktop-preview',
    description: 'Usar a própria área de trabalho como demonstração interativa.',
  },
  {
    title: 'Checklist de entrega',
    href: '#terminal',
    description: 'Revisar estrutura, build e próximo push.',
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

  const [wallpaper, setWallpaper] = useState<WallpaperId>('aurora')
  const [now, setNow] = useState(() => new Date())
  const [startOpen, setStartOpen] = useState(false)
  const [windows, setWindows] = useState<WindowState[]>([
    createWindow('welcome', 0, 8),
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

          const maxX = Math.max(16, maxWidth - windowState.width - 16)
          const maxY = Math.max(16, maxHeight - windowState.height - 112)

          return {
            ...windowState,
            x: clamp(event.clientX - drag.offsetX, 16, maxX),
            y: clamp(event.clientY - drag.offsetY, 16, maxY),
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

  const sessionMinutes = Math.max(
    1,
    Math.floor((now.getTime() - appStartedAt) / 60000),
  )

  const timeLabel = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)

  const dateLabel = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(now)

  const visibleWindows = [...windows]
    .filter((windowState) => !windowState.minimized)
    .sort((left, right) => left.z - right.z)

  const renderWindowBody = (id: AppId) => {
    if (id === 'welcome') {
      return (
        <div className="content-stack">
          <section className="hero-panel" id="desktop-preview">
            <div>
              <p className="eyebrow">Web PC</p>
              <h1>Seu PC virtual rodando no navegador.</h1>
              <p className="hero-copy">
                Ambiente visual com desktop, taskbar, janelas móveis, menu iniciar
                e apps simulados para apresentar um sistema operacional web.
              </p>
            </div>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => openWindow('files')}>
                Abrir Meu PC
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => openWindow('terminal')}
              >
                Ver terminal
              </button>
            </div>
          </section>

          <section className="metric-grid">
            <article className="surface-card">
              <span className="metric-label">Janelas</span>
              <strong>{windows.length.toString().padStart(2, '0')}</strong>
              <p>Apps podem ser minimizados, restaurados e sobrepostos.</p>
            </article>
            <article className="surface-card">
              <span className="metric-label">Sessão</span>
              <strong>{sessionMinutes} min</strong>
              <p>Relógio em tempo real e visual desktop persistente na página.</p>
            </article>
            <article className="surface-card">
              <span className="metric-label">Tema</span>
              <strong>{wallpapers.find((item) => item.id === wallpaper)?.name}</strong>
              <p>Wallpapers trocáveis para variar a atmosfera do sistema.</p>
            </article>
          </section>

          <section className="split-grid">
            <article className="surface-card">
              <p className="section-title">Recursos</p>
              <ul className="feature-list">
                <li>Desktop com atalhos fixos e painel de widgets.</li>
                <li>Janelas arrastáveis com foco, minimizar e maximizar.</li>
                <li>Apps simulados para arquivos, terminal, navegador e ajustes.</li>
              </ul>
            </article>
            <article className="surface-card">
              <p className="section-title">Próximos passos</p>
              <ul className="feature-list">
                <li>Conectar persistência com localStorage.</li>
                <li>Adicionar login inicial ou tela de boot.</li>
                <li>Integrar apps reais, como player, chat ou editor.</li>
              </ul>
            </article>
          </section>
        </div>
      )
    }

    if (id === 'files') {
      return (
        <div className="content-stack">
          <section className="drive-list">
            {storageUnits.map((unit) => (
              <article className="surface-card drive-card" key={unit.label}>
                <div className="card-row">
                  <div>
                    <p className="section-title">{unit.label}</p>
                    <span className="muted-text">{unit.size}</span>
                  </div>
                  <strong>{unit.used}%</strong>
                </div>
                <div className="storage-bar">
                  <span style={{ width: `${unit.used}%` }} />
                </div>
              </article>
            ))}
          </section>

          <section className="surface-card">
            <p className="section-title">Pastas rápidas</p>
            <div className="folder-list">
              {folders.map((folder) => (
                <button type="button" className="folder-row" key={folder.name}>
                  <span className="folder-icon">{folder.name.slice(0, 2).toUpperCase()}</span>
                  <span>
                    <strong>{folder.name}</strong>
                    <small>{folder.meta}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )
    }

    if (id === 'terminal') {
      return (
        <div className="content-stack" id="terminal">
          <section className="terminal-screen">
            <p className="terminal-title">session@webpc:~</p>
            {commandHistory.map((command) => (
              <div className="terminal-line" key={command}>
                <span className="prompt">$</span>
                <code>{command}</code>
              </div>
            ))}
          </section>

          <section className="surface-card">
            <p className="section-title">Ações rápidas</p>
            <div className="chip-row">
              <button type="button" className="command-chip" onClick={() => openWindow('browser')}>
                abrir navegador
              </button>
              <button type="button" className="command-chip" onClick={() => openWindow('settings')}>
                trocar wallpaper
              </button>
              <button type="button" className="command-chip" onClick={() => openWindow('files')}>
                listar arquivos
              </button>
            </div>
          </section>
        </div>
      )
    }

    if (id === 'browser') {
      return (
        <div className="content-stack">
          <section className="browser-shell">
            <div className="browser-bar">
              <span className="browser-dot red" />
              <span className="browser-dot yellow" />
              <span className="browser-dot green" />
              <div className="browser-address">github.com/Belin7z/Web-pc</div>
            </div>
            <div className="browser-page">
              <p className="eyebrow">Navegação rápida</p>
              <h2>Integração pronta para GitHub e apresentação do projeto.</h2>
              <p className="hero-copy">
                Essa janela pode servir como hub de links, documentação, preview de
                deploy e acesso ao repositório.
              </p>
            </div>
          </section>

          <section className="link-grid">
            {quickLinks.map((link) => (
              <a
                className="surface-card quick-link"
                href={link.href}
                key={link.title}
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
          <p className="section-title">Aparência</p>
          <div className="theme-grid">
            {wallpapers.map((theme) => (
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
            <p className="section-title">Sessão</p>
            <ul className="feature-list">
              <li>Online: {navigator.onLine ? 'sim' : 'não'}</li>
              <li>Idioma: {navigator.language}</li>
              <li>Janelas abertas: {windows.length}</li>
            </ul>
          </article>
          <article className="surface-card">
            <p className="section-title">Objetivo</p>
            <p className="muted-text">
              Transformar o site em uma experiência de desktop web com cara de
              sistema operacional.
            </p>
          </article>
        </section>
      </div>
    )
  }

  return (
    <div className={`webpc theme-${wallpaper}`}>
      <div className="backdrop-orb orb-left" />
      <div className="backdrop-orb orb-right" />

      <main
        className="desktop-surface"
        ref={desktopRef}
        onPointerDown={() => setStartOpen(false)}
      >
        <section className="desktop-icons">
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              className="desktop-icon"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => openWindow(app.id)}
            >
              <span className={`icon-badge ${app.accent}`}>{app.shortName}</span>
              <span className="icon-label">{app.name}</span>
            </button>
          ))}
        </section>

        <aside className="desktop-widgets">
          <article className="widget-card glass-panel">
            <span className="widget-title">Status da sessão</span>
            <strong>{timeLabel}</strong>
            <p>{dateLabel}</p>
          </article>
          <article className="widget-card glass-panel">
            <span className="widget-title">Resumo</span>
            <p>{visibleWindows.length} janela(s) visível(is)</p>
            <p>Repo conectado ao GitHub</p>
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
                    <span className={`title-badge ${definition.accent}`}>{definition.shortName}</span>
                    <div>
                      <strong>{definition.name}</strong>
                      <small>{definition.summary}</small>
                    </div>
                  </div>

                  <div className="window-controls">
                    <button type="button" onClick={() => toggleMinimize(windowState.id)}>
                      _
                    </button>
                    <button type="button" onClick={() => toggleMaximize(windowState.id)}>
                      []
                    </button>
                    <button type="button" className="danger" onClick={() => closeWindow(windowState.id)}>
                      X
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
          <div className="start-top">
            <div>
              <p className="eyebrow">Start</p>
              <h2>Web PC</h2>
            </div>
            <span className="start-pill">online</span>
          </div>

          <div className="start-list">
            {apps.map((app) => (
              <button key={app.id} type="button" className="start-item" onClick={() => openWindow(app.id)}>
                <span className={`icon-badge ${app.accent}`}>{app.shortName}</span>
                <span>
                  <strong>{app.name}</strong>
                  <small>{app.summary}</small>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="taskbar glass-panel" onPointerDown={(event) => event.stopPropagation()}>
        <button type="button" className="start-button" onClick={() => setStartOpen((open) => !open)}>
          Start
        </button>

        <div className="taskbar-apps">
          {windows.map((windowState) => {
            const definition = appLookup[windowState.id]

            return (
              <button
                type="button"
                key={windowState.id}
                className={`taskbar-item ${windowState.minimized ? 'inactive' : ''}`}
                onClick={() => {
                  if (windowState.minimized) {
                    bringToFront(windowState.id)
                  } else {
                    toggleMinimize(windowState.id)
                  }
                }}
              >
                <span className={`icon-badge ${definition.accent}`}>{definition.shortName}</span>
                <span>{definition.name}</span>
              </button>
            )
          })}
        </div>

        <div className="taskbar-status">
          <span>{navigator.onLine ? 'NET ON' : 'OFFLINE'}</span>
          <strong>{timeLabel}</strong>
        </div>
      </footer>
    </div>
  )
}

export default App
