/** AUTO-SUMMARY **
   Purpose: This file defines a React component named `Banner` that displays a warning message and can be dismissed by the user.

   Key Components:
   - `Banner`: A React functional component.
   - `useState`: React hook used for managing the visibility state of the banner.
   - `handleClick`: Function to handle the click event on the close button, setting the visibility of the banner to false.

   Functional Overview: The `Banner` component displays a dismissible warning message to the user. It uses state management to toggle its visibility and employs a conditional rendering strategy to remove itself from the DOM when dismissed.

   Dependencies and Integrations: The component uses `AiOutlineCloseCircle` from `react-icons` for the close button icon and `IconButton` from `@radix-ui/themes` for styling the button. It is likely used in parts of the application where such warnings are necessary.

   Additional Context: The component is styled specifically for visibility and emphasis, using classes for layout and colors, and is responsive with different padding for smaller screens. The warning message is emphasized with strong text styling.
*** END-SUMMARY **/
'use client'

import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IconButton } from '@radix-ui/themes'
import React, { useState } from 'react'

export const Banner = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="relative isolate flex items-center gap-x-6 overflow-hidden bg-crimson-2 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 light"
      style={{
        backgroundColor: 'var(--crimson-11)'
      }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white">
          <strong>WARNING!</strong> Do not use this system for non-public or sensitive data.
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <IconButton size="2" variant="ghost" color="gray" radius="full" onClick={handleClick}>
          <AiOutlineCloseCircle className="h-5 w-5 text-white" />
        </IconButton>
      </div>
    </div>
  )
}
