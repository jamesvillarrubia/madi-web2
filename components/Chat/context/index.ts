/** AUTO-SUMMARY **
   Purpose: This file defines and exports a React context specifically tailored for managing chat functionalities within the project.

   Key Components:
   - `ChatContextType`: Type definition for the context, detailing the structure and types of the chat-related functionalities.
   - `ChatContext`: The actual React context created using `createContext`.

   Functional Overview: The file sets up a context to manage various aspects of chat functionalities, including handling chat instances, managing chat tools, toggling sidebars, and manipulating chat messages and states. It provides functions for creating, deleting, updating, and retrieving chat data, as well as managing UI elements related to chat interactions.

   Dependencies and Integrations: 
   - Imports `createContext` from 'react' for context creation.
   - Uses types such as `Tool`, `ChatMessage`, `Chat`, `Persona`, `ChatGPTInstance`, and `AppState` from other parts of the project, indicating integration with data structures and state management defined elsewhere in the application.

   Additional Context: The context is designed to be a central hub for all chat-related interactions and state management, facilitating communication and data flow concerning chat functionalities across the application. This setup helps in maintaining a clean and manageable structure for handling complex chat features.
*** END-SUMMARY **/
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
  sendMessage: (e: React.MouseEvent<HTMLButtonElement>|React.KeyboardEvent) => void
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
