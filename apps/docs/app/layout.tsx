import type { Metadata } from 'next'
import '@yiqi/ui/styles.css'
import './docs.css'
import { YiQiProvider, YiQiThemeScript } from '@yiqi/ui/foundation'

export const metadata: Metadata = {
  title: 'YiQi UI',
  description: 'Catálogo ejecutable del Design System YiQi en React.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <YiQiThemeScript />
      </head>
      <body>
        <YiQiProvider>{children}</YiQiProvider>
      </body>
    </html>
  )
}
