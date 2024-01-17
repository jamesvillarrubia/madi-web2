'use client'
import { postRunner, convertChunktoJsonArray } from '../../app/getResponse'
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { Flex, Heading, IconButton, ScrollArea, TextArea, Button, Select } from '@radix-ui/themes'
import { FiSend } from 'react-icons/fi'
import { AiOutlineClear, AiOutlineLoading3Quarters, AiOutlineUnorderedList } from 'react-icons/ai'
import clipboard from 'clipboard'
import { useToast } from '@/components'
import { ChatMessage } from '../interface'
import { ChatContext } from './chat.context'
import Message from './Message.component'
import EditableText from './EditableText'
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { ToolSelect } from '../Tools/ToolSelect'
import './index.scss'

export interface ChatProps {}

export interface ChatGPInstance {
  setConversation: (messages: ChatMessage[]) => void
  getConversation: () => ChatMessage[]
  focus: () => void
}


const Chat = (props: ChatProps, ref: any) => {
  const { toast } = useToast()
  const toastRef = useRef<any>(null)
  const { currentChat, currentTool, toolList, saveMessages, saveChatName, onToggleSidebar } =
    useContext(ChatContext)

  const [isLoading, setIsLoading] = useState(false)

  const conversationRef = useRef<ChatMessage[]>()

  const [conversation, setConversation] = useState<ChatMessage[]>([])

  const [message, setMessage] = useState('')

  const [currentMessage, setCurrentMessage] = useState<string>('')

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const bottomOfChatRef = useRef<HTMLDivElement>(null)

  const sendMessage = async (e: any) => {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
  
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
    setConversation?.([...conversation!, { content: input, role: 'user' }])


    let systemPrompt = currentChat?.persona?.prompt || ''

    try {
      const {currentStream, additionalMessages} = await postRunner(systemPrompt, conversation, input, currentTool, toolList)

      setConversation?.([
          ...conversation!, 
          { content: input, role: 'user' },
          ...additionalMessages,
      ])

      let resultContent = ''
      for await (const chunk of currentStream as any) {
        const decoder = new TextDecoder('utf-8');
        const decoded = convertChunktoJsonArray(decoder.decode(chunk))||[];
        console.log('decoded',decoded)
        const char = decoded.reduce((acc,d)=>`${acc}${(d?.choices?.[0]?.delta?.content||'')}`,'')
        if (char) {
          setCurrentMessage((state) => {
            resultContent = state + char;
            console.log('content',resultContent)
            return resultContent;
          });
        }
      }
      setTimeout(() => {
        setConversation?.([
          ...conversation!,
          { content: input, role: 'user' },
          ...additionalMessages,
          { content: resultContent, role: 'assistant' }
        ])
        setCurrentMessage('')
      }, 1)
           
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message
      });
      setIsLoading(false);
    }
  }

  const handleKeypress = (e: any) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e)
      e.preventDefault()
    }
  }

  const clearMessages = () => {
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
    conversationRef.current = conversation
    if (currentChat?.id) {
      saveMessages?.(conversation)
    }
  }, [conversation, currentChat?.id, saveMessages])

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
  console.log('currentChat', currentChat)
  return (
    <Flex direction="column" height="100%" className="relative" gap="3"
    style={{    backgroundColor: 'var(--accent-2)'}}
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
            className:"rt-Heading rt-r-weight-bold",
          }}

          submitOnEnter={true}
          validation={(value:string)=>value.trim().length > 0}
          showButtonsOnHover={true}
          editOnViewClick={true}
          editButtonContent={FaRegEdit()}
          cancelButtonContent={FaXmark()}
          saveButtonContent={FaCheck()}
          value={currentChat?.name || currentChat?.persona?.name}
          type="text"
          onSave={saveChatName}
        />
        <div className="text-xs italic" style={{color: 'var(--accent-11)'}}>
          {currentChat?.persona?.name}
        </div>
      </Flex>
      <ScrollArea
        className="flex-1 px-4"
        type="auto"
        scrollbars="vertical"
        style={{ height: '100%' }}
      >
        {conversation?.map((item, index) => <Message key={index} message={item} />)}
        {currentMessage && <Message message={{ content: currentMessage, role: 'assistant' }} />}
        <div ref={bottomOfChatRef}></div>
      </ScrollArea>
      <Flex className="px-4 pb-3" gap="3" direction={'column'} >
        <Flex shrink="1">
          <ToolSelect/>
        </Flex>
        
        {/* <Button
          
          >
            hello
          </Button> */}
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
              <Flex
                width="6"
                height="6"
                align="center"
                justify="center"
                style={{ color: 'var(--accent-11)' }}
              >
                <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
              </Flex>
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

export default forwardRef<ChatGPInstance, ChatProps>(Chat)
