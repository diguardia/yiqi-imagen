import type { Metadata } from 'next'
import '@yiqi/ui/styles.css'
import './docs.css'
import { YiQiProvider } from '@yiqi/ui/foundation'

export const metadata: Metadata = {
  title: 'YiQi UI',
  description: 'Catálogo ejecutable del Design System YiQi en React.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-theme="dark">
      <body>
        <YiQiProvider>{children}</YiQiProvider>
      </body>
    </html>
  )
}
