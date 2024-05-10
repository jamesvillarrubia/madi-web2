'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createContext } from 'react'

import { v4 as uuid } from 'uuid'
import { ChatGPTInstance } from './Chat.component'
import { useSearchParams } from 'next/navigation'

import { ChatMessage, Chat, Persona, Tool } from '../interface'
import { usePersonaContext } from '../Persona/persona.context'
// export { useChatContext } from './context/chat.hooks'
import { DefaultTools } from '../Tools/default_tools'
import { useLocalStorageContext } from '../localStorage'

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



  const {
    // getStorageState,
    state,
    setStorageState,
    appendMessageById,
    setMessagesById,
    getChatById,
    setChatById,
    setChatNameById,
    deleteChatById, // Add the deleteChat function to the returned object
  }  = useLocalStorageContext()


  const searchParams = useSearchParams()

  const debug = searchParams.get('debug') === 'true'
  const chatRef = useRef<ChatGPTInstance>(null)



  const [chatList, setChatList] = useState<string[]>([])






  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)




  const [currentTool, setCurrentTool] = useState<string>('auto')
  const [toolList, setToolList] = useState<Tool[]>(DefaultTools || [])



  // Changes the current chat
  const [currentChatId, setCurrentChatId] = useState<string|undefined>(undefined)


  const onChangeChat = useCallback(
    (id: string) => {
      console.log('onChangeChat', id)
      setCurrentChatId(id) //sets the currentChat
    },
    []
  )

  const onCreateChat = useCallback(
    (persona: Persona) => {
      const id = uuid()
      const newChat: Chat = {
        id,
        name: 'Untitled', //persona.name,
        messages: [],
        persona: persona,
        date: Date.now()
      }
      setChatById(id, newChat) // put it in localstorage
      setChatList((state) => { // update the id list
        return [id, ...state]
      })

      setCurrentChatId(id) // change the currentChat
      onClosePersonaPanel()
    },
    [setChatList, setChatById, onClosePersonaPanel]
  )


  

  const onToggleSidebar = useCallback(() => {
    setToggleSidebar((state) => !state)
  }, [])

  const onDeleteChat = (id: string) => {
    deleteChatById(id)
  }



  // LOAD CHATS FROM LOCALSTORAGE ON PAGE LOAD
  useEffect(() => {
    let stateKeys = Object.keys(state?.chats)
    
    // Sort the stateKeys based on the date of each chat
    stateKeys.sort((a:string, b:string) => {
      const dateA = state.chats[a].date;
      const dateB = state.chats[b].date;
      return dateB - dateA
    });

    setChatList(stateKeys)
    if (stateKeys.length === 0 && state.appState.loaded === true) {
      // Create a new chat using the first persona from DefaultPersonas
      onCreateChat(DefaultPersonas[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);


  // ALWAYS SELECT A CHAT ON PAGE LOAD OR IF CURRENT CHAT IS DELETED
  useEffect(() => {
    // Check if there is no currentChatId set or if the current chat is not in the chatList
    if ((!currentChatId || !chatList.includes(currentChatId)) && chatList.length > 0) {
      // Set the first chat in the chatList as the currentChatId
      setCurrentChatId(chatList[0]);
    }
  }, [currentChatId, chatList, setCurrentChatId]);


  useEffect(() => {
    const loadedPersonas = JSON.parse(localStorage.getItem('Personas') || '[]') as Persona[]
    const updatedPersonas = loadedPersonas.map((persona) => {
      if (!persona.id) {
        persona.id = uuid()
      }
      return persona
    })
    setPersonas(updatedPersonas)
  }, [setPersonas])

 
  return {
    debug,

    // Current Chat Context
    onCreateChat,
    onDeleteChat,
    onChangeChat,
    // --- static
      chatRef,
      currentChatId,
      chatList,
      setCurrentChatId,

    // Sidebar
    onToggleSidebar,
    toggleSidebar,

    setCurrentTool,
    currentTool,
    toolList,
    setToolList,

    // Persona Model
    onOpenPersonaModal,
    onClosePersonaModal,
    onCreatePersona,
    onDeletePersona,
    onOpenPersonaPanel,
    onClosePersonaPanel,
    onEditPersona,
    // --- static
      DefaultPersonas,
      personas,
      editPersona,
      isOpenPersonaModal,
      personaModalLoading,
      openPersonaPanel,
      personaPanelType,

    // LocalStorage
    // getStorageState,
    setStorageState,
    appendMessageById,
    setMessagesById,
    getChatById,
    setChatById,
    setChatNameById,
    deleteChatById, // Add the deleteChat function to the returned object
  }
}

export const ChatContext = createContext<{
  debug?: boolean
  personaPanelType: string
  DefaultPersonas: Persona[]
  chatList: string[]
  personas: Persona[]
  currentChatId?: string
  isOpenPersonaModal?: boolean
  editPersona?: Persona
  personaModalLoading?: boolean
  openPersonaPanel?: boolean
  toggleSidebar?: boolean
  currentTool?: string
  toolList?: Tool[]
  onOpenPersonaModal?: () => void
  onClosePersonaModal?: () => void
  setCurrentChatId?: (id:string) => void
  onCreatePersona?: (persona: Persona) => void
  onDeleteChat?: (id:string) => void
  onDeletePersona?: (persona: Persona) => void
  onEditPersona?: (persona: Persona) => void
  onCreateChat?: (persona: Persona) => void
  onChangeChat?: (id: string) => void
  onOpenPersonaPanel?: (type?: string) => void
  onClosePersonaPanel?: () => void
  onToggleSidebar?: () => void

  setCurrentTool?: (tool: string) => void
  setToolList?: (toolList: Tool[]) => void


  // LocalStorage
  // getStorageState: () => any
  setStorageState: (state:any)=>void
  appendMessageById: (id:string)=>void
  setChatById: (id:string)=>void
  setChatNameById: (id:string, name:string)=>void
  deleteChatById: (id:string)=>void 
  getChatById: (id:string)=>Chat
  setMessagesById: (id:string, messages: ChatMessage[])=>void 
}>({

  // LocalStorage
  // getStorageState: ()=>{},
  setStorageState: ()=>{},
  appendMessageById: ()=>{},
  setMessagesById: ()=>{},
  getChatById: ()=>({} as Chat),
  setChatById: ()=>{},
  setChatNameById: ()=>{},
  deleteChatById: ()=>{},

  personaPanelType: 'chat',
  DefaultPersonas: [],
  chatList: [],
  personas: []
})
export default ChatContext
