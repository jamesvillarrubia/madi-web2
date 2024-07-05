/** AUTO-SUMMARY **
   Purpose: This file provides a custom React hook for accessing theme-related context within the project.

   Key Components:
   - `useTheme`: A custom React hook.
   - `defaultContext`: A default context value for theme settings.

   Functional Overview: The `useTheme` hook utilizes the React `useContext` hook to access the `ThemeContext`. If `ThemeContext` is not available, it falls back to a predefined `defaultContext` which provides a basic structure and functionality for theme settings.

   Dependencies and Integrations: This file imports `ThemeContext` from './ThemeContext' and `UseThemeProps` type from './interface', integrating closely with the theme management system of the project.

   Additional Context: The hook is designed to provide a seamless way to access and manage theme settings across the project, ensuring that components can adapt to theme changes effectively.
*** END-SUMMARY **/
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { UseThemeProps } from './interface'

const defaultContext: UseThemeProps = { setTheme: () => {}, themes: [] }

export const useTheme = () => useContext(ThemeContext) ?? defaultContext
