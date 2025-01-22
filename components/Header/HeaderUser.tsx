'use client'

import { Avatar, DropdownMenu, IconButton } from '@radix-ui/themes'
import { HiUser } from 'react-icons/hi'
import { useAuthContext } from '../authenticate'

export const HeaderUser = () => {
  const { currentUser } = useAuthContext()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton radius="full">
          <Avatar
            fallback={currentUser?.email ? currentUser?.email[0] : <HiUser className="h-5 w-5" /> }
            size="2"
            radius="full"
            variant="solid"
          />
        </IconButton>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  )
}

export default HeaderUser
