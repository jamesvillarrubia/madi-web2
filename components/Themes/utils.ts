/** AUTO-SUMMARY **
   Purpose: This file provides utilities for managing color schemes and animations in a web application.

   Key Components:
   - `ColorSchemes`: Array containing available color themes ('light', 'dark').
   - `MEDIA`: Media query string to detect if the user prefers a dark color scheme.
   - `disableAnimation`: Function to disable all CSS transitions and animations temporarily.
   - `getSystemTheme`: Function to determine the system's preferred color theme based on media queries.

   Functional Overview: The file includes functionalities to handle UI preferences related to color schemes and animations. It allows disabling animations for performance or accessibility reasons and provides a method to detect and return the system's preferred theme.

   Dependencies and Integrations: This file interacts with the DOM and browser APIs (like `window.matchMedia`) to manipulate styles and respond to system settings.

   Additional Context: The utilities provided in this file are essential for responsive design, allowing the application to adapt to user preferences and system settings dynamically.
*** END-SUMMARY **/
export const ColorSchemes = ['light', 'dark']

export const MEDIA = '(prefers-color-scheme: dark)'

export const disableAnimation = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

export const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}
