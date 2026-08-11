'use client'

import { Tooltip } from 'radix-ui'
import { useEffect, useState, type ReactNode } from 'react'

export type YiQiTheme = 'dark' | 'system' | 'light'

const STORAGE_KEY = 'yiqi-theme'

function resolveTheme(theme: YiQiTheme): 'dark' | 'light' {
  if (theme !== 'system') return theme
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function applyYiQiTheme(theme: YiQiTheme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = resolveTheme(theme)
}

export interface YiQiProviderProps {
  children: ReactNode
  defaultTheme?: YiQiTheme
}

export function YiQiProvider({ children, defaultTheme = 'system' }: YiQiProviderProps) {
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as YiQiTheme | null
    const theme = stored === 'dark' || stored === 'light' || stored === 'system' ? stored : defaultTheme
    applyYiQiTheme(theme)

    const media = window.matchMedia('(prefers-color-scheme: light)')
    const sync = () => {
      const current = (window.localStorage.getItem(STORAGE_KEY) as YiQiTheme | null) ?? defaultTheme
      if (current === 'system') applyYiQiTheme('system')
    }
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [defaultTheme])

  return <Tooltip.Provider delayDuration={350}>{children}</Tooltip.Provider>
}

export function useYiQiTheme(defaultTheme: YiQiTheme = 'system') {
  const [theme, setThemeState] = useState<YiQiTheme>(defaultTheme)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as YiQiTheme | null
    if (stored === 'dark' || stored === 'light' || stored === 'system') setThemeState(stored)
  }, [])

  const setTheme = (next: YiQiTheme) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
    applyYiQiTheme(next)
  }

  return { theme, setTheme }
}
