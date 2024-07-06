'use client'

import { useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { v4 as uuid } from 'uuid'
import { Chat, ChatMessage } from './interface'

export interface AppState {
  loaded: boolean
  sessionId: string // Add sessionId to the AppState interface
  // Define the shape of your application state
}

export interface LocalStorageState {
  appState: AppState
  chats: {
    [uuid: string]: Chat
  }
}

export const useLocalStorageContext = () => {
  let sessionId
  if (typeof window !== 'undefined') {
    sessionId = window.sessionStorage.getItem('sessionId') || uuid()
    window.sessionStorage.setItem('sessionId', sessionId)
  } else {
    sessionId = uuid()
  }

  const [state, setState] = useLocalStorageState<LocalStorageState>('v1.0.0', {
    defaultValue: {
      appState: {
        loaded: false,
        sessionId: sessionId // Initialize sessionId in the default state
      },
      chats: {}
    }
  })

  // Allows us to run know if localStorate has been loaded.
  useEffect(() => {
    const storedSessionId = state.appState.sessionId
    if (storedSessionId !== sessionId) {
      // New session started, set loaded to false
      setState((prevState: LocalStorageState) => ({
        ...prevState,
        appState: {
          ...prevState.appState,
          loaded: false,
          sessionId: sessionId // Update sessionId in the state
        }
      }))
    } else {
      // Same session, set loaded to true
      setState((prevState: LocalStorageState) => ({
        ...prevState,
        appState: {
          ...prevState.appState,
          loaded: true
        }
      }))
    }
  }, [setState, sessionId, state.appState.sessionId])

  const setStorageState = (appState: AppState) => {
    setState((prevState: LocalStorageState) => ({
      ...prevState,
      appState
    }))
  }

  const setChatById = (uuid: string, chat: Chat) => {
    setState((prevState: LocalStorageState) => {
      return {
        ...prevState,
        chats: {
          ...prevState.chats,
          [uuid]: chat
        }
      }
    })
  }

  const setChatNameById = (uuid: string, name: string) => {
    setState((prevState: LocalStorageState) => {
      const conversation = prevState.chats[uuid]
      if (conversation) {
        return {
          ...prevState,
          chats: {
            ...prevState.chats,
            [uuid]: {
              ...conversation,
              name: name
            }
          }
        }
      }
      return prevState
    })
  }

  const setMessagesById = (uuid: string, messages: ChatMessage[]) => {
    setState((prevState: LocalStorageState) => {
      const conversation = prevState.chats[uuid]

      if (conversation) {
        return {
          ...prevState,
          chats: {
            ...prevState.chats,
            [uuid]: {
              ...conversation,
              messages: messages
            }
          }
        }
      }
      return prevState
    })
  }

  const appendMessageById = (uuid: string, message: ChatMessage) => {
    setState((prevState: LocalStorageState) => {
      const conversation = prevState.chats[uuid]

      if (conversation) {
        return {
          ...prevState,
          chats: {
            ...prevState.chats,
            [uuid]: {
              ...conversation,
              messages: [...(conversation.messages || []), message]
            }
          }
        }
      }
      return prevState
    })
  }

  const getChatById = (id: string): Chat => {
    return state.chats[id]
  }

  const deleteChatById = (uuid: string) => {
    setState((prevState: LocalStorageState) => {
      const updatedChats = { ...prevState.chats }
      delete updatedChats[uuid]
      return {
        ...prevState,
        chats: updatedChats
      }
    })
  }

  return {
    state,
    setStorageState,

    appendMessageById,
    setMessagesById,
    getChatById,
    setChatById,
    setChatNameById,
    deleteChatById // Add the deleteChat function to the returned object
  }
}
