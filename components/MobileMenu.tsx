/** AUTO-SUMMARY **
   Purpose: This file defines components and context for managing a mobile menu in a React application, specifically handling its visibility state and integration with routing.

   Key Components:
   - `MobileMenuProvider`: A context provider component that manages the state of the mobile menu's visibility.
   - `useMenuContext`: A custom hook for accessing the mobile menu's context.
   - `MobileMenu`: A component that renders the mobile menu UI if the menu is open.

   Functional Overview: 
   - `MobileMenuProvider` uses React's `useState` to manage the open state of the menu and `useEffect` to handle side effects related to route changes and media queries.
   - The menu's visibility is automatically toggled off on route changes and when the viewport width exceeds 1024 pixels.
   - `MobileMenu` renders the menu UI using components from `@radix-ui` such as `Portal`, `Theme`, `RemoveScroll`, and `Box`, ensuring the menu is visually and functionally isolated.

   Dependencies and Integrations:
   - Uses `@radix-ui/react-context` for context creation and management.
   - Integrates with Next.js's router (`useRouter`) to listen to route changes.
   - Utilizes `react-remove-scroll` to enhance the UX by preventing background scrolling when the menu is open.
   - Relies on `@radix-ui` components for theming and layout.

   Additional Context: The implementation ensures that the mobile menu is responsive to both user interactions and application state changes, such as route transitions and screen resizing, enhancing the mobile user experience.
*** END-SUMMARY **/
'use client'

import React from 'react'
import { PropsWithChildren, useEffect, useState } from 'react'

import { createContext } from '@radix-ui/react-context'
import { RemoveScroll } from 'react-remove-scroll'
import { Slot } from '@radix-ui/react-slot'
import { Box, Portal, Theme } from '@radix-ui/themes'
import { useRouter } from 'next/router'

const [MenuProvider, useMenuContext] = createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>('MobileMenu')

export const MobileMenuProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Dismiss mobile keyboard if focusing an input (e.g. when searching)
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur()
      }

      setOpen(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router])

  useEffect(() => {
    // Match @media (--md)
    const mediaQueryList = window.matchMedia('(min-width: 1024px)')

    const handleChange = () => {
      setOpen((open) => (open ? !mediaQueryList.matches : false))
    }

    handleChange()
    mediaQueryList.addEventListener('change', handleChange)
    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [])

  return (
    <MenuProvider open={open} setOpen={setOpen}>
      {children}
    </MenuProvider>
  )
}

export { useMenuContext }

export const MobileMenu = ({ children }: PropsWithChildren) => {
  const mobileMenu = useMenuContext('MobileMenu')

  if (!mobileMenu.open) {
    return null
  }

  return (
    <Portal>
      <Theme className="radix-themes-custom-fonts">
        <RemoveScroll as={Slot} allowPinchZoom enabled>
          <Box
            position="fixed"
            inset="0"
            style={{
              zIndex: 1,
              display: 'grid',
              gridTemplateRows: 'auto minmax(0, 1fr)',
              backgroundColor: 'var(--color-background)'
            }}
          >
            {children}
          </Box>
        </RemoveScroll>
      </Theme>
    </Portal>
  )
}
