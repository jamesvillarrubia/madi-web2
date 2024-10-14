import { ThemeProvider } from '@/components/Themes'
import { Theme } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

export const ThemesProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <Theme accentColor="blue" style={{ height: '100%' }} className="h-full">
        {children}
      </Theme>
    </ThemeProvider>
  )
}

export default ThemesProvider
