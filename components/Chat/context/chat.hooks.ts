'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ChatGPTInstance } from '../Chat.component'
import { useSearchParams } from 'next/navigation'
import { ChatMessage, Chat, Persona, Tool } from '../../interface'
import { usePersonaContext } from '../../Persona/persona.context'
import { ChatContext } from '../chat.context'
import { DefaultTools } from '../../Tools/default_tools'
import { useLocalStorageContext } from '@/components/localStorage'

enum StorageKeys {
  Chats = 'chats',
  CurrentChat = 'currentChat'
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

  const { storage, setStorage, appendMessage, updateMessages, getChatById, createChat, setChatName } = useLocalStorageContext()

  const searchParams = useSearchParams()
  const debug = searchParams.get('debug') === 'true'
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const [currentTool, setCurrentTool] = useState<string>('auto')
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [toolList, setToolList] = useState<Tool[]>(DefaultTools)

  const chatRef = useRef<ChatGPTInstance>(null)



  
  useEffect(() => {
    const chatList = Object.values(storage.chats) // create the chatList based on the conversations (not in order though)
    if (chatList.length > 0) {
      setChatList(chatList)
      setCurrentChat(chatList[0])
    } else {
      createDefaultChat()
    }

    return () => {
      document.body.removeAttribute('style')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const onChangeChat = useCallback(
    (chat: Chat) => {
      setCurrentChat(chat)
    },
    [currentChatId]
  )

  const onCreateChat = useCallback(
    (persona: Persona) => {
      console.log('creating new Chat')
      const id = uuid()
      const newChat: Chat = {
        id,
        persona: persona,
        messages: [],
        name: persona.name || ''
      }

      setAppState((prevState) => ({
        ...prevState,
        chats: {
          ...prevState.chats,
          [id]: newChat
        }
      }))

      setCurrentChat(newChat)
      onClosePersonaPanel()

      return newChat
    },
    [setAppState, setCurrentChat, onClosePersonaPanel]
  )

  const createDefaultChat = useCallback(() => {
    const newChat = onCreateChat(DefaultPersonas[0])
    // setCurrentChat(newChat)
  }, [onCreateChat, DefaultPersonas])

  const onToggleSidebar = useCallback(() => {
    setToggleSidebar((state) => !state)
  }, [])

  const onDeleteChat = (chat: Chat) => {
    const updatedChatList = Object.values(appState.chats).filter((item) => item.id !== chat.id)
    setAppState((prevState) => ({
      ...prevState,
      chats: updatedChatList.reduce((acc, chat) => ({ ...acc, [chat.id]: chat }), {})
    }))

    if (currentChat?.id === chat.id) {
      if (updatedChatList.length > 0) {
        setCurrentChat(updatedChatList[0])
      } else {
        createDefaultChat()
      }
    }
  }

  const saveChatName = (name: string) => {
    setAppState((prevState) => ({
      ...prevState,
      chats: {
        ...prevState.chats,
        [currentChat?.id!]: {
          ...prevState.chats[currentChat?.id!],
          name
        }
      }
    }))
  }

  useEffect(() => {
    const chatList = Object.values(appState.chats)
    if (chatList.length > 0) {
      setChatList(chatList)
      onChangeChat(chatList[0])
    } else {
      onCreateChat(DefaultPersonas[0])
    }

    return () => {
      document.body.removeAttribute('style')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentChat?.id) {
      setAppState((prevState) => ({
        ...prevState,
        appState: {
          ...prevState.appState,
          currentChatId: currentChat.id
        }
      }))
    }
  }, [currentChat?.id, setAppState])

  // useEffect(() => {
  //   const loadedPersonas = Object.values(appState.appState.personas || {})
  //   const updatedPersonas = loadedPersonas.map((persona) => {
  //     if (!persona.id) {
  //       persona.id = uuid()
  //     }
  //     return persona
  //   })
  //   setPersonas(updatedPersonas)
  // }, [setPersonas])

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      appState: {
        ...prevState.appState,
        personas: personas.reduce((acc, persona) => ({ ...acc, [persona.id]: persona }), {})
      }
    }))
  }, [personas, setAppState])

  useEffect(() => {
    if (isInit && !openPersonaPanel && chatList.length === 0) {
      createDefaultChat()
    }
    isInit = true
  }, [chatList.length, openPersonaPanel, createDefaultChat])

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