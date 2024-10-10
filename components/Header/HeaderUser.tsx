'use client'

import { Avatar, DropdownMenu, IconButton } from '@radix-ui/themes'
import { SiOpenai } from 'react-icons/si'

export const HeaderUser = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton radius="full">
          <Avatar fallback={<SiOpenai className="h-5 w-5" />} size="2" radius="full" variant='solid'/>
        </IconButton>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  )
}

export default HeaderUser
