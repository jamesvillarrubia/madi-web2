'use client'
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'

import {
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  TextArea as RtTextArea,
  Button,
  Select,
  Container
} from '@radix-ui/themes'
import { FiSend } from 'react-icons/fi'
import { AiOutlineClear, AiOutlineLoading3Quarters, AiOutlineUnorderedList } from 'react-icons/ai'
import clipboard from 'clipboard'
import { useToast } from '@/components'
import { ChatMessage, Chat, ChatGPTInstance } from '../interface'
import { ChatContext } from './context'
import Message from './components/Message.component'
import { VersionBox } from '@/components/VersionBox'
import EditableText from './components/EditableText'
import { FaRegEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { FaXmark } from 'react-icons/fa6'
import { ToolSelect } from '../Tools/ToolSelect'
import './index.scss'

export interface ChatProps {}

const TextArea = forwardRef((props: any, ref: any) => {
  return <RtTextArea ref={ref} {...props} />
})
TextArea.displayName = 'TextArea'

const ChatBox = (props: ChatProps, ref: any) => {
  const { toast } = useToast()
  // const toastRef = useRef<any>(null)
  const {
    currentChatId,
    getChatById,
    currentTool,
    toolList,
    setMessagesById,
    setChatNameById,
    onToggleSidebar,

    sendMessage,
    regenerateMessage,
    setConversation,
    conversationRef,
    textAreaRef,

    conversation,
    bottomOfChatRef,
    currentMessage,
    idAtStart,
    isLoading,
    message,
    setMessage,
    cancelSend,
    clearMessages
  } = useContext(ChatContext)

  const handleKeypress = (e: any) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e)
      e.preventDefault()
    }
  }

  useEffect(() => {
    new clipboard('.copy-btn').on('success', () => {})
  }, [])

  // console.log('id matches', currentChatId, idAtStart)

  useEffect(() => {
    if (textAreaRef?.current) {
      console.log('textAreaRef is set:', textAreaRef.current)
    } else {
      console.log('textAreaRef is null')
    }
  }, [textAreaRef])

  useImperativeHandle(ref, () => {
    return {
      setConversation(messages: ChatMessage[]) {
        setConversation(messages)
      },
      getConversation() {
        return conversationRef?.current
      },
      focus: () => {
        textAreaRef.current?.focus()
      }
    }
  })

  return (
    <Flex
      direction="column"
      height="100%"
      className="relative"
      gap="3"
      style={{ backgroundColor: 'var(--accent-2)' }}
    >
      <Flex
        justify="between"
        align="center"
        py="3"
        px="4"
        style={{ backgroundColor: 'var(--gray-a3)' }}
      >
        <EditableText
          viewProps={{
            className:
              'w-[24rem] sm:w-[32rem] md:w-[30rem] lg:w-[42rem] xl:w-[56rem] 2xl:w-[72rem] rt-Heading rt-r-weight-bold',
            style: {
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              // width: '400px',
              overflow: 'hidden'
            }
          }}
          submitOnEnter={true}
          validation={(value: string) => value.trim().length > 0}
          showButtonsOnHover={true}
          editOnViewClick={true}
          editButtonContent={FaRegEdit({})}
          cancelButtonContent={FaXmark({})}
          saveButtonContent={FaCheck({})}
          value={
            getChatById?.(currentChatId || '')?.name ||
            getChatById?.(currentChatId || '')?.persona?.name
          }
          type="text"
          onSave={(value: string) => {
            setChatNameById(currentChatId || '', value)
          }}
        />
        <div className="text-xs italic" style={{ color: 'var(--accent-11)' }}>
          {getChatById?.(currentChatId || '')?.persona?.name}
        </div>
      </Flex>
      <ScrollArea
        className="flex-1 px-4"
        type="auto"
        scrollbars="vertical"
        style={{ height: '100%' }}
      >
        <Container size="3" className="max-w-1000px">
          {conversation?.map((item, index) => <Message key={index} message={item} index={index} />)}
          {currentMessage && idAtStart === currentChatId && (
            <Message
              message={{ content: currentMessage, role: 'assistant' }}
              index={conversation.length}
            />
          )}
        </Container>
        <div ref={bottomOfChatRef}></div>
        <div className="h-24"></div>
      </ScrollArea>
      <Flex className="px-4 pb-1" gap="0" direction={'column'}>
        <Container size="3" className="max-w-1000px">
          <Flex shrink="1" className="pb-2">
            <ToolSelect />
          </Flex>
          <Flex align="end" justify="between" gap="3" className="relative">
            <TextArea
              ref={textAreaRef}
              data-id="root"
              variant="surface"
              placeholder="Send a message..."
              size="3"
              style={{
                minHeight: '24px',
                maxHeight: '200px',
                overflowY: 'auto'
              }}
              className="flex-1 rounded-3xl chat-textarea"
              tabIndex={0}
              value={message}
              disabled={isLoading}
              onChange={(e: any) => setMessage(e.target.value)}
              onKeyDown={handleKeypress}
            />
            <Flex gap="3" className="absolute right-0 pr-4 bottom-2 pt">
              {isLoading && (
                <>
                  <Flex
                    width="6"
                    height="6"
                    align="center"
                    justify="center"
                    style={{ color: 'var(--accent-11)' }}
                  >
                    <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
                  </Flex>
                  <Button
                    variant="surface"
                    // disabled={!isLoading}
                    color="crimson"
                    size="2"
                    className="rounded-xl"
                    onClick={cancelSend}
                  >
                    Cancel <FaXmark className="h-4 w-4" />
                  </Button>
                </>
              )}
              <IconButton
                variant="soft"
                disabled={isLoading}
                color="gray"
                size="2"
                className="rounded-xl"
                onClick={sendMessage}
              >
                <FiSend className="h-4 w-4" />
              </IconButton>
              <IconButton
                variant="soft"
                color="gray"
                size="2"
                className="rounded-xl"
                disabled={isLoading}
                onClick={clearMessages}
              >
                <AiOutlineClear className="h-4 w-4" />
              </IconButton>

              <IconButton
                variant="soft"
                color="gray"
                size="2"
                className="rounded-xl md:hidden"
                disabled={isLoading}
                onClick={onToggleSidebar}
              >
                <AiOutlineUnorderedList className="h-4 w-4" />
              </IconButton>
            </Flex>
          </Flex>
        </Container>
        <VersionBox/>
      </Flex>
    </Flex>
  )
}

export default forwardRef<ChatGPTInstance, ChatProps>(ChatBox)
