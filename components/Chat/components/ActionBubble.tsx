'use client'

import { useContext } from 'react'
import { Box, IconButton, Tooltip, Theme } from '@radix-ui/themes'
// import * as Tooltip from '@radix-ui/tooltip'
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
    <Theme>
      <Box width="max-content" className="pt-2">
        <Tooltip content="Copy">
          <IconButton
            className="inline-flex w-[20px] h-[20px] p-2 m-0 mr-1"
            radius="large"
            variant="ghost"
            size="2"
            onClick={copyToClipboard}
            asChild
          >
            <CopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip content="Regenerate">
          <IconButton
            className="inline-flex w-[20px] h-[20px] p-2 m-0 mr-1"
            radius="large"
            variant="ghost"
            size="1"
            onClick={() => regenerateMessage(messageIndex)}
            asChild
          >
            <SymbolIcon />
          </IconButton>
        </Tooltip>
        <Tooltip content="Bad Reponse - Coming Soon">
          <IconButton 
            className="inline-flex w-[20px] h-[20px] p-2 m-0 mr-1"
            radius="large" 
            variant="ghost"
            size="1"
            asChild
            >
            <TiThumbsDown />
          </IconButton>
        </Tooltip>
      </Box>
    </Theme>
  )
}

// const ActionTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
//   return (
//     <Tooltip.Provider>
//       <Tooltip.Root delayDuration={300}>
//         <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
//         <Tooltip.Portal>
//           <Tooltip.Content className="TooltipContent" side="bottom" sideOffset={5}>
//             <Box className="text-white bg-black py-2 px-3 text-sm rounded-lg">{content}</Box>
//             <Tooltip.Arrow className="TooltipArrow" />
//           </Tooltip.Content>
//         </Tooltip.Portal>
//       </Tooltip.Root>
//     </Tooltip.Provider>
//   )
// }
export default ActionBubble
