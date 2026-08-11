import type { YiQiTheme } from './provider'

export interface YiQiThemeScriptProps {
  defaultTheme?: YiQiTheme
  nonce?: string
}

export function YiQiThemeScript({ defaultTheme = 'system', nonce }: YiQiThemeScriptProps) {
  const script = `(function(){var fallback=${JSON.stringify(defaultTheme)};var theme=fallback;try{var stored=window.localStorage.getItem('yiqi-theme');if(stored==='dark'||stored==='system'||stored==='light')theme=stored;}catch(e){}var resolved=theme==='system'?((window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark'):theme;document.documentElement.dataset.theme=resolved;})();`

  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: script }} />
}
