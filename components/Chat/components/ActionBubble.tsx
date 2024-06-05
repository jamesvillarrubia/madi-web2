'use client'

import { useContext } from 'react'
import {  Box, IconButton } from '@radix-ui/themes'
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

const ActionTooltip = (props: any) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>{props.children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" side="bottom" sideOffset={5}>
            <Box className="text-white bg-black py-2 px-3 text-sm rounded-lg">{props.content}</Box>
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
export default ActionBubble
