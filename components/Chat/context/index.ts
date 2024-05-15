import { createContext, Ref } from 'react'
import { Tool, ChatMessage, Chat, Persona, ChatGPTInstance } from '../../interface'

export * from './chat.context'

export type ChatContextType = {
  debug: boolean
  chatRef: Ref<ChatGPTInstance> | undefined

  // sidebar fields
  toggleSidebar: boolean
  onToggleSidebar: () => void

  // Tool Fields
  currentTool: string
  toolList: Tool[]
  setCurrentTool: (tool: string) => void
  setToolList: (toolList: Tool[]) => void

  // Chat specific fields
  chatList: string[]
  currentChatId: string | undefined
  onCreateChat: (persona: Persona) => void
  setCurrentChatId: (id: string) => void
  onDeleteChat: (id: string) => void
  onChangeChat: (id: string) => void

  // LocalStorage
  setStorageState: (state: any) => void
  appendMessageById: (id: string, message: ChatMessage) => void
  setChatById: (id: string, chat: Chat) => void
  setChatNameById: (id: string, name: string) => void
  deleteChatById: (id: string) => void
  getChatById: (id: string) => Chat
  setMessagesById: (id: string, messages: ChatMessage[]) => void
}

export const ChatContext = createContext<ChatContextType>(undefined as unknown as ChatContextType)
