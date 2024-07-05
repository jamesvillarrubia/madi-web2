/** AUTO-SUMMARY **
   Purpose: This file defines a user interface component for the header section of the application, specifically a user avatar dropdown menu.

   Key Components:
   - `HeaderUser`: A functional component that renders a dropdown menu triggered by an avatar icon button.

   Functional Overview: The `HeaderUser` component uses the `DropdownMenu` from `@radix-ui/themes` to create a dropdown menu. The trigger for this menu is an `IconButton` that contains an `Avatar` component. The avatar displays a fallback icon using `SiOpenai` from `react-icons/si` if no image is available.

   Dependencies and Integrations: The component relies on external libraries such as `@radix-ui/themes` for UI components and `react-icons/si` for icons. It is likely used in the main application layout or other UI components that compose the header of the application.

   Additional Context: The use of `Avatar` with a fallback icon suggests that this component is designed to handle user profiles that might not have an associated image. The `IconButton` with a full radius indicates a circular button design, aligning with modern UI aesthetics.
*** END-SUMMARY **/
'use client'

import { Avatar, DropdownMenu, IconButton } from '@radix-ui/themes'
import { SiOpenai } from 'react-icons/si'

export const HeaderUser = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton radius="full">
          <Avatar fallback={<SiOpenai className="h-4 w-4" />} size="2" radius="full" />
        </IconButton>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  )
}

export default HeaderUser
