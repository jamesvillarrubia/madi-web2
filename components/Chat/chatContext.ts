'use client'

import { createContext } from 'react'
import { Chat, ChatMessage, Persona, Tool } from './interface'

const ChatContext = createContext<{
  debug?: boolean
  personaPanelType: string
  DefaultPersonas: Persona[]
  currentChat?: Chat
  chatList: Chat[]
  personas: Persona[]
  isOpenPersonaModal?: boolean
  editPersona?: Persona
  personaModalLoading?: boolean
  openPersonaPanel?: boolean
  toggleSidebar?: boolean
  currentTool?: string
  toolList?: Tool[]
  onOpenPersonaModal?: () => void
  onClosePersonaModal?: () => void
  setCurrentChat?: (chat: Chat) => void
  onCreatePersona?: (persona: Persona) => void
  onDeleteChat?: (chat: Chat) => void
  onDeletePersona?: (persona: Persona) => void
  onEditPersona?: (persona: Persona) => void
  onCreateChat?: (persona: Persona) => void
  onChangeChat?: (chat: Chat) => void
  saveMessages?: (messages: ChatMessage[]) => void
  onOpenPersonaPanel?: (type?: string) => void
  onClosePersonaPanel?: () => void
  onToggleSidebar?: () => void
  saveChatName?: (name: string)=>void
  setCurrentTool?: (tool:string)=>void
  setToolList?: (toolList:Tool[])=>void
}>({
  personaPanelType: 'chat',
  DefaultPersonas: [],
  chatList: [],
  personas: []
})

export default ChatContext
