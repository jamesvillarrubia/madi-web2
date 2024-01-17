'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createContext } from 'react'

import { v4 as uuid } from 'uuid'
import { ChatGPInstance } from './Chat.component'
import { useSearchParams } from 'next/navigation'

import { ChatMessage, Chat, Persona, Tool } from '../interface'
import { usePersonaContext } from '../Persona/persona.context'




export const DefaultTools: Tool[]=[
    {
        "type":"function",
        "display": "Get Weather",
        "function":{
            "name": "get_current_weather",
            "description": "Get the current weather in a given location",
            "parameters": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string",
                  "description": "The city and state, e.g. San Francisco, CA"
                },
                "unit": {
                  "type": "string",
                  "enum": ["celsius", "fahrenheit"]
                }
              },
              "required": ["location"]
            }
        }    
    },
    {
        "type":"function",
        "display":"get_joke",
        "plugin":"CAS Scenarios",
        "function":{
            "name": "get_joke",
            "description": "Get a joke from the joke database",
            "parameters": {}
        }    
    }
]

enum StorageKeys {
  Chat_List = 'chatList',
  Chat_Current_ID = 'chatCurrentID'
}

let isInit = false

export const useChatContext = () => {
  const {
    personas,
    editPersona,
    isOpenPersonaModal,
    personaModalLoading,
    openPersonaPanel,
    personaPanelType,
    onOpenPersonaModal,
    onClosePersonaModal,
    onCreatePersona,
    onDeletePersona,
    onEditPersona,
    onOpenPersonaPanel,
    onClosePersonaPanel,
    setPersonas,
    DefaultPersonas
  } = usePersonaContext()

  const searchParams = useSearchParams()

  const debug = searchParams.get('debug') === 'true'

  const messagesMap = useRef<Map<string, ChatMessage[]>>(new Map<string, ChatMessage[]>())

  const chatRef = useRef<ChatGPInstance>(null)

  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined)

  const [currentTool, setCurrentTool] = useState<string>('auto')

  const [chatList, setChatList] = useState<Chat[]>([])

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)

  const [toolList, setToolList] = useState<Tool[]>(DefaultTools)


  const onChangeChat = useCallback(
    (chat: Chat) => {
      const oldMessages = chatRef.current?.getConversation() || []
      const newMessages = messagesMap.current.get(chat.id) || []
      chatRef.current?.setConversation(newMessages)
      chatRef.current?.focus()
      messagesMap.current.set(currentChat?.id!, oldMessages)
      setCurrentChat(chat)
    },
    [currentChat?.id]
  )

  const onCreateChat = useCallback(
    (persona: Persona) => {
      const id = uuid()
      const newChat: Chat = {
        id,
        persona: persona
      }

      setChatList((state) => {
        return [...state, newChat]
      })

      onChangeChat(newChat)
      onClosePersonaPanel()
    },
    [setChatList, onChangeChat, onClosePersonaPanel]
  )

  const onToggleSidebar = useCallback(() => {
    setToggleSidebar((state) => !state)
  }, [])

  const onDeleteChat = (chat: Chat) => {
    const index = chatList.findIndex((item) => item.id === chat.id)
    chatList.splice(index, 1)
    setChatList([...chatList])
    if (currentChat?.id === chat.id) {
      setCurrentChat(chatList[0])
    }
    if (chatList.length === 0) {
      onOpenPersonaPanel('chat')
    }
  }



  const saveChatName = (name: string) => {
    const updatedChatList = chatList.map((chat) => {
      if (chat.id === currentChat?.id) {
        chat.name = name;
        // chat.persona.name = name;
      }
      return chat;
    });
    setChatList(updatedChatList);
    localStorage.setItem(StorageKeys.Chat_List, JSON.stringify(updatedChatList));
  }

  const saveMessages = (messages: ChatMessage[]) => {
    if (messages.length > 0) {
      localStorage.setItem(`ms_${currentChat?.id}`, JSON.stringify(messages))
    } else {
      localStorage.removeItem(`ms_${currentChat?.id}`)
    }
  }
  
  useEffect(() => {
    if (currentChat?.id) {
      localStorage.setItem(StorageKeys.Chat_Current_ID, currentChat.id)
    }
  }, [currentChat?.id])


  useEffect(() => {
    const chatList = (JSON.parse(localStorage.getItem(StorageKeys.Chat_List) || '[]') ||
      []) as Chat[]
    const currentChatId = localStorage.getItem(StorageKeys.Chat_Current_ID)
    if (chatList.length > 0) {
      const currentChat = chatList.find((chat) => chat.id === currentChatId)
      setChatList(chatList)

      chatList.forEach((chat) => {
        const messages = JSON.parse(localStorage.getItem(`ms_${chat?.id}`) || '[]') as ChatMessage[]
        messagesMap.current.set(chat.id!, messages)
      })

      onChangeChat(currentChat || chatList[0])
    } else {
      onCreateChat(DefaultPersonas[0])
    }


    return () => {
      document.body.removeAttribute('style')
      localStorage.setItem(StorageKeys.Chat_List, JSON.stringify(chatList))
    }
  }, [onChangeChat, onCreateChat, DefaultPersonas])

  useEffect(() => {
    if (currentChat?.id) {
      localStorage.setItem(StorageKeys.Chat_Current_ID, currentChat.id)
    }
  }, [currentChat?.id])

  useEffect(() => {
    localStorage.setItem(StorageKeys.Chat_List, JSON.stringify(chatList))
  }, [chatList])

  useEffect(() => {
    console.log('load persona from local storage')
    const loadedPersonas = JSON.parse(localStorage.getItem('Personas') || '[]') as Persona[]
    const updatedPersonas = loadedPersonas.map((persona) => {
      if (!persona.id) {
        persona.id = uuid()
      }
      return persona
    })
    setPersonas(updatedPersonas)
  }, [setPersonas])

  useEffect(() => {
    localStorage.setItem('Personas', JSON.stringify(personas))
  }, [personas])

  useEffect(() => {
    if (isInit && !openPersonaPanel && chatList.length === 0) {
      onCreateChat(DefaultPersonas[0])
    }
    isInit = true
  }, [chatList, openPersonaPanel, onCreateChat, DefaultPersonas])

  return {
    debug,
    DefaultPersonas,
    chatRef,
    currentChat,
    chatList,
    personas,
    editPersona,
    isOpenPersonaModal,
    personaModalLoading,
    openPersonaPanel,
    personaPanelType,
    toggleSidebar,
    onOpenPersonaModal,
    onClosePersonaModal,
    setCurrentChat,
    onCreateChat,
    onDeleteChat,
    onChangeChat,
    onCreatePersona,
    onDeletePersona,
    onEditPersona,
    saveMessages,
    onOpenPersonaPanel,
    onClosePersonaPanel,
    onToggleSidebar,
    saveChatName,
    setCurrentTool,
    currentTool,
    toolList,
    setToolList
  }
}








export const ChatContext = createContext<{
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
