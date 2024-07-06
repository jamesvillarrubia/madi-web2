import { createContext, RefObject, Ref } from 'react'
import { Tool, ChatMessage, Chat, Persona, ChatGPTInstance } from '../../interface'
import { AppState } from '@/components/localStorage'
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
  setStorageState: (state: AppState) => void
  appendMessageById: (id: string, message: ChatMessage) => void
  setChatById: (id: string, chat: Chat) => void
  setChatNameById: (id: string, name: string) => void
  deleteChatById: (id: string) => void
  getChatById: (id: string) => Chat
  setMessagesById: (id: string, messages: ChatMessage[]) => void

  // New fields
  sendMessage: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => void
  regenerateMessage: (cuttoffIndex: number) => void
  setConversation: (messages: ChatMessage[]) => void
  conversationRef: RefObject<ChatMessage[]>
  textAreaRef: RefObject<HTMLTextAreaElement>

  // Additional fields
  conversation: ChatMessage[]
  bottomOfChatRef: RefObject<HTMLDivElement>
  currentMessage: string
  idAtStart: string
  isLoading: boolean
  message: string
  setMessage: (message: string) => void
  cancelSend: () => void
  clearMessages: () => void
}

export const ChatContext = createContext<ChatContextType>(undefined as unknown as ChatContextType)
