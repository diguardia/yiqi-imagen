'use client'

import { useYiQiTheme, type YiQiTheme } from './provider'

const ORDER: YiQiTheme[] = ['dark', 'system', 'light']
const LABEL: Record<YiQiTheme, string> = {
  dark: 'Oscuro',
  system: 'Sistema',
  light: 'Claro',
}

export function YiQiThemeCycle() {
  const { theme, setTheme } = useYiQiTheme()
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]

  return (
    <button
      className="yiqi-button yiqi-button--ghost yiqi-theme-cycle"
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Tema actual: ${LABEL[theme]}. Cambiar a ${LABEL[next]}`}
      title={`Tema: ${LABEL[theme]}`}
    >
      {LABEL[theme]}
    </button>
  )
}
