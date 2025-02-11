import React from 'react'

import { Link as RadixLink } from '@radix-ui/themes'
import { GetPropDefTypes } from '@radix-ui/themes/dist/esm/props/prop-def.js'
import { linkPropDefs } from '@radix-ui/themes/dist/esm/components/link.props.js'

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
