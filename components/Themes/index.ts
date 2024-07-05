/** AUTO-SUMMARY **
   Purpose: This file serves as a central export point for theme-related functionalities within the project.

   Key Components:
   - Exports from `./interface`: Likely includes TypeScript interfaces related to theming.
   - Exports from `./useTheme`: Possibly a custom hook for accessing theme-related values or functions.
   - Exports from `./ThemeProvider`: Exports a context provider component for managing theme state across the application.

   Functional Overview: The file consolidates and re-exports theme-related interfaces, hooks, and providers, facilitating easier and more organized imports throughout the project.

   Dependencies and Integrations: This file depends on the `interface`, `useTheme`, and `ThemeProvider` modules, integrating their functionalities for widespread use across the project.

   Additional Context: The use of 'use client' indicates that this file is intended for client-side operations in a Next.js application, optimizing it for client-side execution.
*** END-SUMMARY **/
'use client'

export * from './interface'
export * from './useTheme'
export * from './ThemeProvider'
