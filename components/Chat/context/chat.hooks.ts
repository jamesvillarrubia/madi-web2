'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ChatGPTInstance } from '../Chat.component'
import { useSearchParams } from 'next/navigation'
import { ChatMessage, Chat, Persona, Tool } from '../../interface'
import { usePersonaContext } from '../../Persona/persona.context'
import { ChatContext } from '../chat.context'
import { DefaultTools } from './default_tools'

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

  const searchParams = useSearchParams()
  const debug = searchParams.get('debug') === 'true'
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)
  const [currentTool, setCurrentTool] = useState<string>('auto')
  const [currentChat, setCurrentChat] = useState<Chat | undefined>(undefined)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [toolList, setToolList] = useState<Tool[]>(DefaultTools)
  const [messagesMap, setMessagesMap] = useState<Map<string, ChatMessage[]>>(
    new Map<string, ChatMessage[]>()
  )

  const chatRef = useRef<ChatGPTInstance>(null)

  useEffect(() => {
    const chatList = JSON.parse(localStorage.getItem(StorageKeys.Chats) || '[]') as Chat[]
    const currentChat = JSON.parse(
      localStorage.getItem(StorageKeys.CurrentChat) || 'null'
    ) as Chat | null

    if (chatList.length > 0) {
      setChatList(chatList)
      chatList.forEach((chat) => {
        messagesMap.current.set(chat.id, chat)
      })
      setCurrentChat(currentChat || chatList[0])
    } else {
      createDefaultChat()
    }

    return () => {
      document.body.removeAttribute('style')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // onChangeChat is a memoized callback that handles changing the currently active chat.
  // It saves any existing messages from the previous chat, loads messages for the new chat,
  // updates the current chat state, and gives focus to the chat input.
  const onChangeChat = useCallback(
    (chat: Chat) => {
      const oldMessages = chatRef.current?.getConversation() || []
      setMessagesMap((prevMap) => new Map(prevMap.set(currentChat?.id!, oldMessages)))
      const newMessages = messagesMap.get(chat.id) || []
      chatRef.current?.setConversation(newMessages)
      chatRef.current?.focus()
      setCurrentChat(chat)
    },
    [currentChat?.id, messagesMap]
  )
  // const onChangeChat = useCallback(
  //   (chat: Chat) => {
  //     let id = chat.id || currentChat?.id
  //     const newChat = messagesMap.current?.get(id)
  //     setCurrentChat(newChat)
  //   },
  //   [setChatList, onChangeChat, onClosePersonaPanel]
  // );

  // Update messagesMap in updateMessagesById
  const updateMessagesById = useCallback(
    (chatId: string | undefined, newMessages: ChatMessage[], overwrite: boolean = false) => {
      if (chatId && newMessages) {
        setMessagesMap((prevMap) => {
          const oldMessages = prevMap.get(chatId) || []
          const updatedMessages = overwrite ? newMessages : [...oldMessages, ...newMessages]
          return new Map(prevMap.set(chatId, updatedMessages))
        })
      }
    },
    []
  )

  // onCreateChat is a memoized callback that creates a new chat associated with a given persona.
  // It generates a unique ID for the new chat, updates the chat list, sets the new chat as the current chat,
  // and closes the persona panel.
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

      updateChatList((state) => [...state, newChat])

      setCurrentChat(newChat) // directly set the new chat as the current chat
      onClosePersonaPanel() // closes the persona window if open

      return newChat
    },
    [updateChatList, setCurrentChat, onClosePersonaPanel]
  )

  const createDefaultChat = useCallback(() => {
    const newChat = onCreateChat(DefaultPersonas[0])
    setCurrentChat(newChat)
  }, [onCreateChat, DefaultPersonas])

  // onToggleSidebar is a memoized callback that toggles the state of the sidebar visibility.
  const onToggleSidebar = useCallback(() => {
    setToggleSidebar((state) => !state)
  }, [])

  const onDeleteChat = (chat: Chat) => {
    const index = chatList.findIndex((item) => item.id === chat.id)
    const updatedChatList = [...chatList]
    updatedChatList.splice(index, 1)
    updateChatList(updatedChatList)
    if (currentChat?.id === chat.id) {
      setCurrentChat(updatedChatList[0])
    }
    if (updatedChatList.length === 0) {
      onOpenPersonaPanel('chat')
    }
  }

  const saveChatName = (name: string) => {
    const updatedChatList = chatList.map((chat) => {
      if (chat.id === currentChat?.id) {
        chat.name = name
      }
      return chat
    })
    setChatList(updatedChatList)
    localStorage.setItem(StorageKeys.Chat_List, JSON.stringify(updatedChatList))
  }

  const saveMessages = () => {
    messagesMap.current.forEach((messages, chatId) => {
      if (messages.length > 0) {
        localStorage.setItem(`ms_${chatId}`, JSON.stringify(messages))
      } else {
        localStorage.removeItem(`ms_${chatId}`)
      }
    })
  }

  // This effect initializes chat data from local storage and sets up the default chat, if necessary.
  // It runs once on component mount due to the empty dependency array.
  useEffect(() => {
    // Retrieve chat list and current chat ID from local storage
    const chatList = JSON.parse(localStorage.getItem(StorageKeys.Chat_List) || '[]') as Chat[]
    const currentChatId = localStorage.getItem(StorageKeys.Chat_Current_ID)

    if (chatList.length > 0) {
      // Find the current chat based on the current chat ID and set the chat list
      const currentChat = chatList.find((chat) => chat.id === currentChatId)
      setChatList(chatList)

      // Load messages for all chats from local storage and store them in a map for quick access
      chatList.forEach((chat) => {
        const messages = JSON.parse(localStorage.getItem(`ms_${chat?.id}`) || '[]') as ChatMessage[]
        messagesMap.current.set(chat.id!, messages)
      })

      // Change the current chat to either the found one or the first one in the list
      onChangeChat(currentChat || chatList[0])
    } else {
      // Create a new chat with the default persona if the chat list is empty
      onCreateChat(DefaultPersonas[0])
    }

    // Clean up function that runs on component unmount
    return () => {
      document.body.removeAttribute('style')
      // Save the current chat list to local storage
      localStorage.setItem(StorageKeys.Chat_List, JSON.stringify(chatList))
      saveMessages()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This effect persists the current chat ID to local storage whenever the current chat changes.
  useEffect(() => {
    if (currentChat?.id) {
      localStorage.setItem(StorageKeys.Chat_Current_ID, currentChat.id)
    }
  }, [currentChat?.id])

  // This effect persists the entire chat list to local storage whenever the chat list changes.
  useEffect(() => {
    localStorage.setItem(StorageKeys.Chat_List, JSON.stringify(chatList))
  }, [chatList])

  // This effect initializes the personas from local storage and assigns them UUIDs if necessary.
  // It runs once on component mount due to the empty dependency array.
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

  // This effect persists the personas to local storage whenever the personas state changes.
  useEffect(() => {
    localStorage.setItem('Personas', JSON.stringify(personas))
  }, [personas])

  // This effect ensures that a default chat is created if the chat list is empty and the persona
  // panel is not open. It also sets the `isInit` flag to prevent the default chat from being
  // created on initial render. It runs whenever the chat list length or the openPersonaPanel state changes.
  useEffect(() => {
    if (isInit && !openPersonaPanel && chatList.length === 0) {
      createDefaultChat()
    }
    isInit = true
  }, [chatList.length, openPersonaPanel, createDefaultChat])
}
