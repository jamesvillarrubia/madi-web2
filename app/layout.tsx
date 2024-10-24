import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import ThemesProvider from '@/providers/ThemesProvider'
import Contexts from '@/components/Contexts.component'

import '@/styles/globals.scss'
import '@/styles/theme-config.css'

export const metadata = {
  title: {
    default: 'MADI',
    template: `%s - MADI`
  },
  description: 'NASA ARMD AI assistant',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemesProvider>
            <Contexts>{children}</Contexts>
          </ThemesProvider>
        </body>
      </html>
  )
}
