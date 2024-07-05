/** AUTO-SUMMARY **
   Purpose: This file defines a custom Link component that integrates Next.js and Radix UI for consistent link behavior across the project.

   Key Components:
   - `LinkProps`: TypeScript interface defining the props for the Link component.
   - `Link`: A React functional component that renders a link using Next.js's `NextLink` and Radix UI's `RadixLink`.

   Functional Overview: The Link component handles the rendering of hyperlinks within the application, ensuring they are styled and behave consistently. It supports customization through props such as `href`, `className`, `color`, and accepts children elements.

   Dependencies and Integrations: 
   - Uses `NextLink` from Next.js for optimized navigation.
   - Integrates `RadixLink` from Radix UI for UI consistency.
   - Imports `GetPropDefTypes` and `linkPropDefs` from `@radix-ui/themes` to derive TypeScript types for link properties.

   Additional Context: The component is designed to be reusable and maintainable, encapsulating the common pattern of link creation within the project, and ensuring that all links have the potential for consistent styling and behavior.
*** END-SUMMARY **/
import React from 'react'
import { GetPropDefTypes, Link as RadixLink, linkPropDefs } from '@radix-ui/themes'
import NextLink from 'next/link'

type LinkOwnProps = GetPropDefTypes<typeof linkPropDefs>

interface LinkProps {
  href: string
  className?: string
  color?: LinkOwnProps['color']
  children?: React.ReactNode
}

export const Link = ({ href, className, children, color }: LinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink className={className} color={color}>
        {children}
      </RadixLink>
    </NextLink>
  )
}

export default Link
