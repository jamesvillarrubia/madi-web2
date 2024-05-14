import React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { ChatMessage, Chat } from './interface'
import { v4 as uuid } from 'uuid'

interface AppState {
  loaded: boolean
  // Define the shape of your application state
}

interface LocalStorageState {
  appState: AppState
  chats: {
    [uuid: string]: Chat
  }
}

export const useLocalStorageContext = (userId: string = 'shared') => {
  const [state, setState] = useLocalStorageState<LocalStorageState>('v1.0.0', {
    defaultValue: {
      appState: {
        loaded: false
      },
      chats: {}
    }
  })

  // Allows us to run know if localStorate has been loaded.
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      appState: {
        ...prevState.appState,
        loaded: true
      }
    }))
  }, [setState])

  const setStorageState = (appState: AppState) => {
    setState((prevState) => ({
      ...prevState,
      appState
    }))
  }

  const setChatById = (uuid: string, chat: Chat) => {
    setState((prevState) => {
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
    setState((prevState) => {
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
    setState((prevState) => {
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
    setState((prevState) => {
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
    setState((prevState) => {
      const { [uuid]: deletedChat, ...updatedChats } = prevState.chats
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
