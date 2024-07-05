/** AUTO-SUMMARY **
   Purpose: This file defines a ThemesProvider component that wraps its children with theme-related functionality in a React application.

   Key Components:
   - `ThemesProvider`: A React functional component that uses the `ThemeProvider` and `Theme` components to apply theming.

   Functional Overview: The `ThemesProvider` component is responsible for applying a default theme configuration (with an accent color of blue and full height styling) to all child components it wraps. This setup ensures that theming is consistent across all parts of the application that use this provider.

   Dependencies and Integrations: The file imports `ThemeProvider` from a local component module and `Theme` from '@radix-ui/themes', indicating its reliance on these external components for theming functionality. It also uses `PropsWithChildren` from 'react' for typing its props.

   Additional Context: The component includes a commented-out `<ThemePanel />`, suggesting there might be plans to include a theme-switching UI directly within the provider in the future.
*** END-SUMMARY **/
import { ThemeProvider } from '@/components/Themes'
import { Theme } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

export const ThemesProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <Theme accentColor="blue" style={{ height: '100%' }} className="h-full">
        {children}
        {/* <ThemePanel /> */}
      </Theme>
    </ThemeProvider>
  )
}

export default ThemesProvider
