type AppId = 'home' | 'explorer' | 'terminal' | 'edge' | 'settings'

interface IconProps {
  appId: AppId
  className?: string
}

interface WindowsLogoProps {
  className?: string
}

interface FileTypeIconProps {
  kind: 'folder' | 'file'
  extension?: string
  className?: string
}

export function WindowsLogo({ className }: WindowsLogoProps) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M3 4.7 10.4 3.7v7.2H3V4.7Zm8.3-1.1L21 2v8.9h-9.7V3.6ZM3 12.1h7.4v7.2L3 18.3v-6.2Zm8.3 0H21V21l-9.7-1.4v-7.5Z" />
      </svg>
    </span>
  )
}

export function AppIcon({ appId, className }: IconProps) {
  if (appId === 'home') {
    return (
      <span className={className ? `${className} ${appId}` : appId} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M3 4.7 10.4 3.7v7.2H3V4.7Zm8.3-1.1L21 2v8.9h-9.7V3.6ZM3 12.1h7.4v7.2L3 18.3v-6.2Zm8.3 0H21V21l-9.7-1.4v-7.5Z" />
        </svg>
      </span>
    )
  }

  if (appId === 'explorer') {
    return (
      <span className={className ? `${className} ${appId}` : appId} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path fill="#ffd766" d="M3 7.2c0-1 .8-1.8 1.8-1.8h4l1.2 1.5h9c1 0 1.8.8 1.8 1.8v1H3v-2.5Z" />
          <path fill="#ffbe0b" d="M3 9.2h18v7.9c0 1-.8 1.8-1.8 1.8H4.8C3.8 18.9 3 18 3 17V9.2Z" />
          <path fill="#5aa9ff" d="M3 11.2h18v2.1H3z" opacity=".8" />
        </svg>
      </span>
    )
  }

  if (appId === 'terminal') {
    return (
      <span className={className ? `${className} ${appId}` : appId} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <rect x="3" y="4" width="18" height="16" rx="3.5" fill="#1a2235" />
          <path d="m7.1 9.1 3 2.9-3 2.9" fill="none" stroke="#66c8ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          <path d="M12.5 15.1h4.4" fill="none" stroke="#66c8ff" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      </span>
    )
  }

  if (appId === 'edge') {
    return (
      <span className={className ? `${className} ${appId}` : appId} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <defs>
            <linearGradient id="edge-a" x1="4" x2="20" y1="20" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0a7cff" />
              <stop offset="1" stopColor="#45d5c8" />
            </linearGradient>
          </defs>
          <path d="M19.6 16.6c-.8 2.8-3.3 4.7-6.7 4.7-4.7 0-8.4-3.1-8.4-7.4 0-3.6 2.8-7.4 8-7.4 3.1 0 5.7 1.3 7.1 3.6-1-.5-2.1-.8-3.4-.8-4 0-6.8 2.4-6.8 5.4 0 1.9 1.3 3.2 3.2 3.2 1.8 0 2.9-.8 3.8-2.2.6-1 1.7-1.6 3.2-1.6Z" fill="url(#edge-a)" />
          <path d="M20 14.6c0 4.1-3 6.7-7.1 6.7-3.6 0-6.4-2.4-6.4-5.6 0-.2 0-.4.1-.6.8 2 2.9 3.3 5.6 3.3 3.2 0 5.5-1.5 7.8-3.8Z" fill="#0aa3b5" />
        </svg>
      </span>
    )
  }

  return (
    <span className={className ? `${className} ${appId}` : appId} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="4" fill="#7a8798" />
        <path d="M12 2.8 13.7 4l2.1-.4.9 1.9 2 .7v2.2l1.6 1.4-1 1.8 1 1.8-1.6 1.4v2.2l-2 .7-.9 1.9-2.1-.4-1.7 1.2-1.7-1.2-2.1.4-.9-1.9-2-.7v-2.2L4.1 13l1-1.8-1-1.8 1.6-1.4V6.8l2-.7.9-1.9 2.1.4L12 2.8Z" fill="none" stroke="#657487" strokeLinejoin="round" strokeWidth="1.4" />
      </svg>
    </span>
  )
}

export function FileTypeIcon({ kind, extension, className }: FileTypeIconProps) {
  const iconClass = className ? `${className} ${kind} ${extension ?? 'generic'}` : `${kind} ${extension ?? 'generic'}`

  if (kind === 'folder') {
    return (
      <span className={iconClass} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path fill="#ffd766" d="M3 7.2c0-1 .8-1.8 1.8-1.8h4l1.2 1.5h9c1 0 1.8.8 1.8 1.8v1H3v-2.5Z" />
          <path fill="#ffbe0b" d="M3 9.2h18v7.9c0 1-.8 1.8-1.8 1.8H4.8C3.8 18.9 3 18 3 17V9.2Z" />
          <path fill="#5aa9ff" d="M3 11.2h18v2.1H3z" opacity=".8" />
        </svg>
      </span>
    )
  }

  const filePalette = {
    ts: { fill: '#3178c6', accent: '#ffffff', label: 'TS' },
    tsx: { fill: '#1d9bf0', accent: '#ffffff', label: 'TSX' },
    js: { fill: '#f7df1e', accent: '#1a1a1a', label: 'JS' },
    json: { fill: '#7b68ee', accent: '#ffffff', label: '{}' },
    md: { fill: '#0f172a', accent: '#ffffff', label: 'MD' },
    yml: { fill: '#ff7a59', accent: '#ffffff', label: 'YML' },
    html: { fill: '#e44d26', accent: '#ffffff', label: 'HTML' },
    css: { fill: '#264de4', accent: '#ffffff', label: 'CSS' },
    generic: { fill: '#dfe8ff', accent: '#3b4d6b', label: 'DOC' },
  } as const

  const palette = filePalette[(extension?.toLowerCase() as keyof typeof filePalette) ?? 'generic'] ?? filePalette.generic

  return (
    <span className={iconClass} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M6 3.5h8.6l3.4 3.4v13.6H6z" fill={palette.fill} />
        <path d="M14.6 3.5v3.4H18" fill="rgba(255,255,255,0.18)" />
        <text x="12" y="16.2" fill={palette.accent} fontFamily="Segoe UI, sans-serif" fontSize="5.3" fontWeight="700" textAnchor="middle">
          {palette.label}
        </text>
      </svg>
    </span>
  )
}
