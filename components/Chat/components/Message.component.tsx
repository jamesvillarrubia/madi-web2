'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Collapsible from '@radix-ui/react-collapsible'
import { Avatar, Flex, IconButton } from '@radix-ui/themes'
import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi'
import { SiOpenai } from 'react-icons/si'
import { ChatMessage } from '../../interface'
import { ActionBubble } from './ActionBubble'
import { Markdown } from './Markdown'
import { Symbol, Wordmark } from '../../Header/Logo'


export interface MessageProps {
  message: ChatMessage
  index: number
}
function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch {
    return false
  }
  return true
}
const Message = (props: MessageProps) => {
  // const { currentChat } = useContext(ChatContext)
  const { role, content, name } = props.message
  const isUser = role === 'user'
  const [open, setOpen] = useState(false)
  const messageIndex = props.index

  if (content) {
    if (role === 'tool' && isJsonString(content)) {
      return (
        <Flex gap="4" className="-mt-5 mb-5 ml-20 text-xs	" style={{ color: 'var(--accent-a10)' }}>
          <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Collapsible.Trigger asChild className="mr-3 text-md">
                <button className="IconButton">{open ? <FaAngleUp /> : <FaAngleDown />}</button>
              </Collapsible.Trigger>
              <span>Tool: {name}</span>
            </div>
            <Collapsible.Content>
              <pre
                style={{
                  whiteSpace: 'pre-wrap' /* Since CSS 2.1 */,
                  wordWrap: 'break-word' /* Internet Explorer 5.5+ */
                }}
              >
                {JSON.stringify(JSON.parse(content), null, 2)}
              </pre>
            </Collapsible.Content>
          </Collapsible.Root>
        </Flex>
      )
    }
    return (
      <Flex gap="2" className={`mb-5 ${isUser ? 'justify-end' : ''}`}>
        {!isUser ? (
          <Avatar
            fallback={
              isUser ? <HiUser className="h-5 w-5" /> 
                // : <SiOpenai className="h-5 w-5" />
                : <Symbol className="inline-block w-3" />

                }
            size="2"
            radius="full"
            className='mt-1'
            variant='solid'
            color='ruby'
          />
        ) : null}
        <Flex
          direction="column"
          gap="0"
          className={`py-1 px-2 flex-1 break-word rounded-lg role-${role}`}
          style={{
            backgroundColor: isUser ? 'var(--gray-a4)' : '',
            maxWidth: isUser ? '80%' : '85%',
            alignSelf: 'flex-end',
            textAlign: 'left',
            flex: 'none'
          }}
        >
          <Markdown>{content}</Markdown>
          {role === 'assistant' ? (
            <ActionBubble message={content} index={messageIndex} />
          ) : undefined}
        </Flex>
      </Flex>
    )
  }
}

export default Message
