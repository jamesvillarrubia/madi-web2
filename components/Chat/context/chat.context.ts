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
      setChatList((state) => [id, ...state])
      setCurrentChatId(id)
    },
    [setChatById]
  )

  const onToggleSidebar = useCallback(() => {
    setToggleSidebar((state) => !state)
  }, [])

  const onDeleteChat = useCallback(
    (id: string) => {
      deleteChatById(id)
      setChatList((prevChatList) => prevChatList.filter((chatId) => chatId !== id))
    },
    [deleteChatById]
  )

  useEffect(() => {
    // Set default chat when no chat is selected
    if ((!currentChatId || !chatList.includes(currentChatId)) && chatList.length > 0) {
      setCurrentChatId(chatList[0])
    }
  }, [currentChatId, chatList])

  useEffect(() => {
    // Order chat list by date when changed
    const stateKeys = Object.keys(state.chats).sort(
      (a, b) => state.chats[b].date - state.chats[a].date
    )
    setChatList(stateKeys)
  }, [state.chats])

  useEffect(() => {
    // When chatList is empty and appState is loaded, create default chat
    if (chatList.length === 0 && state.appState.loaded && Object.keys(state.chats).length === 0) {
      onCreateChat(DefaultPersonas[0])
    }
  }, [chatList.length, state.appState.loaded, onCreateChat, state.chats])

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
