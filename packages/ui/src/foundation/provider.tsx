'use client'

import { Tooltip } from 'radix-ui'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type YiQiTheme = 'dark' | 'system' | 'light'

const STORAGE_KEY = 'yiqi-theme'

function isYiQiTheme(value: string | null): value is YiQiTheme {
  return value === 'dark' || value === 'system' || value === 'light'
}

function resolveTheme(theme: YiQiTheme): 'dark' | 'light' {
  if (theme !== 'system') return theme
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function readStoredTheme(fallback: YiQiTheme): YiQiTheme {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isYiQiTheme(stored) ? stored : fallback
  } catch {
    return fallback
  }
}

function storeTheme(theme: YiQiTheme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // El tema sigue funcionando aunque el navegador bloquee el almacenamiento.
  }
}

export function applyYiQiTheme(theme: YiQiTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.yiqiTheme = resolveTheme(theme)
}

interface YiQiThemeContextValue {
  theme: YiQiTheme
  setTheme: (theme: YiQiTheme) => void
}

const YiQiThemeContext = createContext<YiQiThemeContextValue | null>(null)

export interface YiQiProviderProps {
  children: ReactNode
  defaultTheme?: YiQiTheme
}

export function YiQiProvider({ children, defaultTheme = 'system' }: YiQiProviderProps) {
  const [theme, setThemeState] = useState<YiQiTheme>(defaultTheme)

  useEffect(() => {
    const initialTheme = readStoredTheme(defaultTheme)
    setThemeState(initialTheme)
    applyYiQiTheme(initialTheme)
  }, [defaultTheme])

  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const sync = () => applyYiQiTheme('system')
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [theme])

  const setTheme = useCallback((next: YiQiTheme) => {
    storeTheme(next)
    setThemeState(next)
    applyYiQiTheme(next)
  }, [])

  const contextValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme])

  return (
    <YiQiThemeContext.Provider value={contextValue}>
      <Tooltip.Provider delayDuration={350}>{children}</Tooltip.Provider>
    </YiQiThemeContext.Provider>
  )
}

export function useYiQiTheme() {
  const context = useContext(YiQiThemeContext)
  if (!context) throw new Error('useYiQiTheme debe usarse dentro de YiQiProvider')
  return context
}
