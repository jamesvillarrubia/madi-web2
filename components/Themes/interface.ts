/** AUTO-SUMMARY **
   Purpose: This file defines TypeScript interfaces related to theme management in a React application, facilitating theme switching and system theme preferences.

   Key Components:
   - `ValueObject`: Interface representing a mapping of theme names to string values.
   - `UseThemeProps`: Interface detailing the properties required for a custom hook to manage themes in React.
   - `ThemeProviderProps`: Interface for properties accepted by a ThemeProvider component, which manages theme settings across the application.

   Functional Overview: The interfaces in this file are used to type-check the props and configurations related to theme management, including system theme detection, theme switching, and storing theme preferences. They ensure that components such as theme providers and hooks receive and utilize the correct types and structures of data.

   Dependencies and Integrations: These interfaces are likely used in conjunction with React components and hooks that handle theming within the application. They integrate with React's ecosystem, particularly with state management and context providers.

   Additional Context: The detailed comments in the interfaces help developers understand the expected behavior of theme management, such as handling system preferences and disabling transitions when themes change. This setup is crucial for maintaining a consistent and accessible user interface across the application.
*** END-SUMMARY **/
interface ValueObject {
  [themeName: string]: string
}

export interface UseThemeProps {
  /**
   * List of all available theme names
   */
  themes: string[]
  /**
   * Forced theme name for the current page
   */
  forcedTheme?: string | undefined
  /**
   * Update the theme
   */
  setTheme: React.Dispatch<string>
  /**
   * Active theme name
   */
  theme?: string | undefined
  /**
   * If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme`
   */
  resolvedTheme?: string | undefined
  /**
   * If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is
   */
  systemTheme?: 'dark' | 'light' | undefined
}

export interface ThemeProviderProps {
  children?: React.ReactNode
  /**
   *  List of all available theme names
   */
  themes?: string[] | undefined
  /**
   * Forced theme name for the current page
   */
  forcedTheme?: string | undefined
  /**
   * Whether to switch between dark and light themes based on prefers-color-scheme
   */
  enableSystem?: boolean | undefined
  /**
   * Disable all CSS transitions when switching themes
   */
  disableTransitionOnChange?: boolean | undefined
  /**
   * Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons
   */
  enableColorScheme?: boolean | undefined
  /**
   * Key used to store theme setting in localStorage
   */
  storageKey?: string | undefined
  /**
   * Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light
   */
  defaultTheme?: string | undefined
  /**
   * HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.)
   */
  attribute?: string | 'class' | undefined
  /**
   * Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value
   */
  value?: ValueObject | undefined
  /**
   * Nonce string to pass to the inline script for CSP headers
   */
  nonce?: string | undefined
}
