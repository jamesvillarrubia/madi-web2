/** AUTO-SUMMARY **
   Purpose: This file defines a React component named `ActionBubble` used in a chat application to provide interactive actions for messages.

   Key Components:
   - `ActionBubble`: A React component that displays interactive icons for actions like copying text to clipboard and regenerating messages.
   - `ActionTooltip`: A helper component that wraps icons in tooltips to provide additional information on hover.
   - `ChatContext`: A context imported from the chat components to access chat functionalities like message regeneration.

   Functional Overview: The `ActionBubble` component provides users with interactive options for each chat message, such as copying the message to the clipboard and regenerating the message. It uses tooltips to enhance user experience by displaying helpful information about each action.

   Dependencies and Integrations: 
   - Uses `ChatContext` for accessing chat functionalities.
   - Relies on `@radix-ui/themes`, `@radix-ui/react-tooltip`, and `react-icons` for UI components and icons.
   - Integrates with the clipboard API for copying text.

   Additional Context: The component is designed to enhance interactivity within the chat interface of the application, making it more user-friendly and functional. The use of tooltips and icons from external libraries helps maintain a clean and modern UI design.
*** END-SUMMARY **/
'use client'

import { useContext } from 'react'
import { Box, IconButton } from '@radix-ui/themes'
import * as Tooltip from '@radix-ui/react-tooltip'
import { ChatContext } from '@/components/Chat'
import { CopyIcon, SymbolIcon } from '@radix-ui/react-icons'
import { TiThumbsDown } from 'react-icons/ti'

export interface ActionBubbleProps {
  message: string
  index: number
}

export const ActionBubble = (props: ActionBubbleProps) => {
  const messageIndex = props.index
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(props.message)
      .then(() => {
        console.log('Message copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy message: ', err)
      })
  }

  const { regenerateMessage } = useContext(ChatContext)

  return (
    <Box width="max-content">
      <ActionTooltip content="Copy">
        <IconButton
          className="mr-2 w-5 h-5"
          radius="large"
          variant="ghost"
          size="1"
          onClick={copyToClipboard}
        >
          <CopyIcon />
        </IconButton>
      </ActionTooltip>
      <ActionTooltip content="Regenerate">
        <IconButton
          className="mr-2 w-5 h-5"
          radius="large"
          variant="ghost"
          size="1"
          onClick={() => regenerateMessage(messageIndex)}
        >
          <SymbolIcon />
        </IconButton>
      </ActionTooltip>
      <ActionTooltip content="Bad Reponse - Coming Soon">
        <IconButton className="mr-2 w-5 h-5" radius="large" variant="ghost" size="1">
          <TiThumbsDown />
        </IconButton>
      </ActionTooltip>
    </Box>
  )
}

const ActionTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" side="bottom" sideOffset={5}>
            <Box className="text-white bg-black py-2 px-3 text-sm rounded-lg">{content}</Box>
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
export default ActionBubble
