/** AUTO-SUMMARY **
   Purpose: This file defines the root layout and global metadata for a web application.

   Key Components:
   - `metadata`: Object containing default title, description, and icons for the application.
   - `RootLayout`: React component that serves as the root layout for the application.

   Functional Overview: The file sets up the global metadata used across the application and defines the `RootLayout` component, which incorporates global styles, fonts, and themes. It wraps all child components with a `ThemesProvider` to handle theming across the application.

   Dependencies and Integrations: 
   - Uses the `Inter` font from Google Fonts.
   - Integrates with `ThemesProvider` for theme management.
   - Imports global styles from SCSS and CSS files.

   Additional Context: The `RootLayout` component is likely used in the main entry file of the React application to wrap the entire application, ensuring consistent styling and theming. The metadata object is used to set common properties like the title and description of the application, which are important for SEO and branding.
*** END-SUMMARY **/
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import ThemesProvider from '@/providers/ThemesProvider'

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
        <ThemesProvider>{children}</ThemesProvider>
      </body>
    </html>
  )
}
