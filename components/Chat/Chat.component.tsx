'use client'
import { postRunner, convertChunktoJsonArray } from '../../app/getResponse'
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { Flex, Heading, IconButton, ScrollArea, TextArea, Button, Select } from '@radix-ui/themes'
import { FiSend } from 'react-icons/fi'
import { AiOutlineClear, AiOutlineLoading3Quarters, AiOutlineUnorderedList } from 'react-icons/ai'
import clipboard from 'clipboard'
import { useToast } from '@/components'
import { ChatMessage, Chat, ChatGPTInstance } from '../interface'
import { ChatContext } from './context'
import Message from './components/Message.component'
import EditableText from './components/EditableText'
import { FaRegEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { FaXmark } from 'react-icons/fa6'
import { ToolSelect } from '../Tools/ToolSelect'
import './index.scss'

export interface ChatProps {}

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
    onToggleSidebar
  } = useContext(ChatContext)

  const [idAtStart, setStartId] = useState<string>(currentChatId || '')
  const [isLoading, setIsLoading] = useState(false)

  const conversationRef = useRef<ChatMessage[]>()

  const [conversation, setConversation] = useState<ChatMessage[]>([])

  const [message, setMessage] = useState('')

  const [currentMessage, setCurrentMessage] = useState<string>('')

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const bottomOfChatRef = useRef<HTMLDivElement>(null)

  const cancelledRef = useRef<boolean>(false)

  const cancelSend = () => {
    cancelledRef.current = true
    let updatedConversation = [
      ...conversation!,
      { content: currentMessage, role: 'assistant' }
    ] as ChatMessage[]
    setMessagesById?.(idAtStart, updatedConversation)
    setIsLoading(false)
    setCurrentMessage('')
  }

  const sendMessage = async (e: any) => {
    cancelledRef.current = false // reset the cancelled status before sending a new message

    e.preventDefault()
    const input = textAreaRef.current?.value || ''

    if (input.length < 1) {
      toast({
        title: 'Error',
        description: 'Please enter a message.'
      })
      return
    }
    setMessage('')
    setIsLoading(true)
    let localIdAtStart = currentChatId || ''
    setStartId(localIdAtStart)

    let updatedConversation = [...conversation!, { content: input, role: 'user' }] as ChatMessage[]
    setConversation(updatedConversation)
    localIdAtStart ? setMessagesById(localIdAtStart, updatedConversation) : undefined

    let systemPrompt = getChatById(currentChatId || '')?.persona?.prompt || ''

    // sets the id when the messages start streaming
    try {
      const { currentStream, additionalMessages } = await postRunner(
        systemPrompt,
        conversation,
        input,
        currentTool,
        toolList
      )

      updatedConversation = [
        ...conversation!,
        { content: input, role: 'user' },
        ...additionalMessages
      ] as ChatMessage[]
      setConversation(updatedConversation)
      localIdAtStart ? setMessagesById(localIdAtStart, updatedConversation) : undefined

      let resultContent = ''
      for await (const chunk of currentStream as any) {
        const decoder = new TextDecoder('utf-8')
        console.log('sendMessage Chunks', decoder.decode(chunk))
        const decoded = convertChunktoJsonArray(decoder.decode(chunk)) || []
        const char = decoded.reduce(
          (acc, d) => `${acc}${d?.choices?.[0]?.delta?.content || ''}`,
          ''
        )
        if (char) {
          resultContent += char
          if (!cancelledRef.current) {
            setCurrentMessage(resultContent)
          }
        }
      }

      setTimeout(() => {
        if (localIdAtStart && !cancelledRef.current) {
          updatedConversation = [
            ...conversation!,
            { content: input, role: 'user' },
            ...additionalMessages,
            { content: resultContent, role: 'assistant' }
          ]
          setMessagesById(localIdAtStart, updatedConversation)
          setCurrentMessage('')
          setConversation(updatedConversation)
        }
      }, 1)

      setIsLoading(false)
    } catch (error: any) {
      console.error(error)
      toast({
        title: 'Error',
        description: error.message
      })
      setIsLoading(false)
    }
  }

  const handleKeypress = (e: any) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e)
      e.preventDefault()
    }
  }

  const clearMessages = () => {
    if (currentChatId) setMessagesById(currentChatId, [])
    setConversation([])
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '50px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`
    }
  }, [message, textAreaRef])

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [conversation, currentMessage])

  useEffect(() => {
    if (currentChatId) {
      let chat = getChatById(currentChatId)
      if (chat?.messages) setConversation(chat.messages)
    }
  }, [currentChatId, conversation, getChatById])

  useEffect(() => {
    if (!isLoading) {
      textAreaRef.current?.focus()
    }
  }, [isLoading])

  useImperativeHandle(ref, () => {
    return {
      setConversation(messages: ChatMessage[]) {
        setConversation(messages)
      },
      getConversation() {
        return conversationRef.current
      },
      focus: () => {
        textAreaRef.current?.focus()
      }
    }
  })

  useEffect(() => {
    new clipboard('.copy-btn').on('success', () => {})
  }, [])

  console.log('id matches', currentChatId, idAtStart)

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
        {conversation?.map((item, index) => <Message key={index} message={item} />)}
        {currentMessage && idAtStart === currentChatId && (
          <Message message={{ content: currentMessage, role: 'assistant' }} />
        )}
        <div ref={bottomOfChatRef}></div>
      </ScrollArea>
      <Flex className="px-4 pb-3" gap="3" direction={'column'}>
        <Flex shrink="1">
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
            onChange={(e) => setMessage(e.target.value)}
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
      </Flex>
    </Flex>
  )
}

export default forwardRef<ChatGPTInstance, ChatProps>(ChatBox)
