/** AUTO-SUMMARY **
   Purpose: This file defines a React component `ThemeScript` that dynamically sets the theme of the application based on user preferences or system settings.

   Key Components:
   - `ThemeScript`: A React component that injects a script into the HTML to manage theme settings.
   - `ThemeProviderProps`: Imported type that defines the props for the `ThemeScript` component.
   - `ColorSchemes`, `MEDIA`: Constants imported from utils that help determine valid color schemes and media queries for system preferences.

   Functional Overview: 
   - The component generates a script that is injected into the HTML document to manage the theme.
   - It handles different scenarios such as forced themes, system preferences, and user-saved themes in local storage.
   - The script optimizes DOM updates for setting themes to minimize re-rendering and improve performance.
   - It supports both class-based and attribute-based theme applications.

   Dependencies and Integrations:
   - Uses React's `memo` for performance optimization.
   - Depends on `ColorSchemes` and `MEDIA` from utils for determining valid themes and media queries.
   - Integrates with local storage to retrieve user preferences.

   Additional Context:
   - The component uses several immediately invoked function expressions (IIFEs) to encapsulate and execute theme logic conditionally based on the presence of themes in local storage or system settings.
   - It is designed to be efficient in updating the DOM by reducing the number of style recalculations needed when changing themes.
*** END-SUMMARY **/
import { memo } from 'react'
import { ThemeProviderProps } from './interface'
import { ColorSchemes, MEDIA } from './utils'

const ThemeScript = ({
  forcedTheme,
  storageKey,
  attribute,
  enableSystem,
  enableColorScheme,
  defaultTheme,
  value,
  attrs,
  nonce
}: ThemeProviderProps & { attrs: string[]; defaultTheme: string }) => {
  const defaultSystem = defaultTheme === 'system'

  // Code-golfing the amount of characters in the script
  const optimization = (() => {
    if (attribute === 'class') {
      const removeClasses = `c.remove(${attrs.map((t: string) => `'${t}'`).join(',')})`

      return `var d=document.documentElement,c=d.classList;${removeClasses};`
    } else {
      return `var d=document.documentElement,n='${attribute}',s='setAttribute';`
    }
  })()

  const fallbackColorScheme = (() => {
    if (!enableColorScheme) {
      return ''
    }

    const fallback = ColorSchemes.includes(defaultTheme) ? defaultTheme : null

    if (fallback) {
      return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`
    } else {
      return `if(e==='light'||e==='dark')d.style.colorScheme=e`
    }
  })()

  const updateDOM = (name: string, literal: boolean = false, setColorScheme = true) => {
    const resolvedName = value ? value[name] : name
    const val = literal ? name + `|| ''` : `'${resolvedName}'`
    let text = ''

    // MUCH faster to set colorScheme alongside HTML attribute/class
    // as it only incurs 1 style recalculation rather than 2
    // This can save over 250ms of work for pages with big DOM
    if (enableColorScheme && setColorScheme && !literal && ColorSchemes.includes(name)) {
      text += `d.style.colorScheme = '${name}';`
    }

    if (attribute === 'class') {
      if (literal || resolvedName) {
        text += `c.add(${val})`
      } else {
        text += `null`
      }
    } else {
      if (resolvedName) {
        text += `d[s](n,${val})`
      }
    }

    return text
  }

  const scriptSrc = (() => {
    if (forcedTheme) {
      return `!function(){${optimization}${updateDOM(forcedTheme)}}()`
    }

    if (enableSystem) {
      return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
        'dark'
      )}}else{${updateDOM('light')}}}else if(e){${
        value ? `var x=${JSON.stringify(value)};` : ''
      }${updateDOM(value ? `x[e]` : 'e', true)}}${
        !defaultSystem ? `else{` + updateDOM(defaultTheme, false, false) + '}' : ''
      }${fallbackColorScheme}}catch(e){}}()`
    }

    return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${
      value ? `var x=${JSON.stringify(value)};` : ''
    }${updateDOM(value ? `x[e]` : 'e', true)}}else{${updateDOM(
      defaultTheme,
      false,
      false
    )};}${fallbackColorScheme}}catch(t){}}();`
  })()

  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: scriptSrc }} />
}

export default memo(ThemeScript, () => true)
