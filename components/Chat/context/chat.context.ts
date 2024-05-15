import { useCallback, useEffect, useState, useRef } from 'react'
import { createContext } from 'react'
import { v4 as uuid } from 'uuid'
import { useSearchParams } from 'next/navigation'
import { ChatMessage, Chat, Persona, Tool, ChatGPTInstance } from '../../interface'
import { DefaultTools } from '../../Tools/default_tools'
import { useLocalStorageContext } from '../../localStorage'

export const DefaultPersonas: Persona[] = [
  {
    id: 'chatgpt',
    role: 'system',
    name: 'ChatGPT',
    prompt: 'You are an AI assistant that helps people find information.',
    isDefault: true
  }
]

export const useChatContext = () => {
  const {
    state,
    setStorageState,
    appendMessageById,
    setMessagesById,
    getChatById,
    setChatById,
    setChatNameById,
    deleteChatById
  } = useLocalStorageContext()

  const searchParams = useSearchParams()
  const chatRef = useRef<ChatGPTInstance>(null)
  const debug = searchParams.get('debug') === 'true'
  const [chatList, setChatList] = useState<string[]>([])
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const [currentTool, setCurrentTool] = useState<string>('auto')
  const [toolList, setToolList] = useState<Tool[]>(DefaultTools || [])
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(undefined)

  const onChangeChat = useCallback((id: string) => {
    console.log('onChangeChat', id)
    setCurrentChatId(id)
  }, [])

  const onCreateChat = useCallback(
    (persona: Persona) => {
      const id = uuid()
      const newChat: Chat = {
        id,
        name: 'Untitled',
        messages: [],
        persona: persona,
        date: Date.now()
      }
      setChatById(id, newChat)
      setChatList((state) => {
        return [id, ...state]
      })
      setCurrentChatId(id)
    },
    [setChatList, setChatById]
  )

  const onToggleSidebar = useCallback(() => {
    setToggleSidebar((state) => !state)
  }, [])

  const onDeleteChat = (id: string) => {
    deleteChatById(id)
  }

  useEffect(() => {
    let stateKeys = Object.keys(state?.chats)
    stateKeys.sort((a: string, b: string) => {
      const dateA = state.chats[a].date
      const dateB = state.chats[b].date
      return dateB - dateA
    })
    setChatList(stateKeys)
    if (stateKeys.length === 0 && state.appState.loaded === true) {
      onCreateChat(DefaultPersonas[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DefaultPersonas, state])

  useEffect(() => {
    if ((!currentChatId || !chatList.includes(currentChatId)) && chatList.length > 0) {
      setCurrentChatId(chatList[0])
    }
  }, [currentChatId, chatList, setCurrentChatId])

  return {
    debug,
    chatRef,

    onCreateChat,
    onDeleteChat,
    onChangeChat,
    currentChatId,
    chatList,
    setCurrentChatId,

    onToggleSidebar,
    toggleSidebar,

    setCurrentTool,
    currentTool,
    toolList,
    setToolList,

    setStorageState,
    appendMessageById,
    setMessagesById,
    getChatById,
    setChatById,
    setChatNameById,
    deleteChatById
  }
}
