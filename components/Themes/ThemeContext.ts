/** AUTO-SUMMARY **
   Purpose: This file is responsible for creating and exporting a context for theme-related properties in a React application.

   Key Components:
   - `ThemeContext`: A React context created for managing theme-related properties.

   Functional Overview: The file sets up a React context to allow theme properties to be accessible throughout the component tree without having to pass props down manually at every level.

   Dependencies and Integrations: It imports `createContext` from 'react' and uses the `UseThemeProps` type from a local file './interface' to define the context shape.

   Additional Context: The context is initialized as undefined, which allows for flexibility in providing default or initial values at a higher component level in the application.
*** END-SUMMARY **/
import { createContext } from 'react'
import { UseThemeProps } from './interface'

export const ThemeContext = createContext<UseThemeProps | undefined>(undefined)
