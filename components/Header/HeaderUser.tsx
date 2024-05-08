'use client'

import { Avatar, DropdownMenu, IconButton } from '@radix-ui/themes'
import { SiOpenai } from 'react-icons/si'
import { useAuthContext } from '@/app/authenticate'

type AvatarColor = "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky"

const colors: AvatarColor[] = ["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"]

const getColorFromEmailHash = (email: string): AvatarColor => {
  const hash = email.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)
  const colorIndex = hash % colors.length
  return colors[colorIndex] as AvatarColor
}

export const HeaderUser = () => {
  const { currentUser } = useAuthContext()

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  console.log('currentUser', currentUser)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton radius="full">
          <Avatar
            variant="solid"
            color={getColorFromEmailHash(currentUser?.email || '')}
            fallback={currentUser?.email ? getInitials(currentUser?.email) : <SiOpenai className="h-4 w-4" />}
            size="2"
            radius="full"
          />
        </IconButton>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  )
}

export default HeaderUser