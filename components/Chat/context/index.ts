
import { createContext } from 'react'
import { Tool, ChatMessage, Chat, Persona } from '../../interface'
import { defaultError } from '@/components/helpers'

export { useChatContext } from './chat.context'


type ChatContextType = {
  debug: boolean

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
  currentChatId: string
  onCreateChat: (persona: Persona) => void
  setCurrentChatId: (id: string) => void
  onDeleteChat: (id: string) => void
  onChangeChat: (id: string) => void
  
  // LocalStorage
  setStorageState: (state: any) => void
  appendMessageById: (id: string) => void
  setChatById: (id: string) => void
  setChatNameById: (id: string, name: string) => void
  deleteChatById: (id: string) => void 
  getChatById: (id: string) => Chat
  setMessagesById: (id: string, messages: ChatMessage[]) => void 
}


export const ChatContext = createContext<ChatContextType>({
  debug: false,

  toggleSidebar: false,
  onToggleSidebar: defaultError('onToggleSidebar'),
  
  currentTool: '',
  toolList:[],
  setCurrentTool: defaultError('onToggleSidebar'),
  setToolList: defaultError('onToggleSidebar'),
  
  // Chat specific fields
  chatList: [],
  currentChatId: '',
  onCreateChat: defaultError('onCreateChat'),
  setCurrentChatId: defaultError('setCurrentChatId'),
  onDeleteChat: defaultError('onDeleteChat'),
  onChangeChat: defaultError('onChangeChat'),
  
  // Local Storage Fields
  setStorageState: defaultError('setStorageState'),
  appendMessageById: defaultError('appendMessageById'),
  setMessagesById: defaultError('setMessagesById'),
  getChatById: defaultError('getChatById'),
  setChatById: defaultError('setChatById'),
  setChatNameById: defaultError('setChatNameById'),
  deleteChatById: defaultError('deleteChatById'),
});