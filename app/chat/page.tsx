/** AUTO-SUMMARY **
   Purpose: This file defines the ChatPage component, which is responsible for rendering the chat interface in the project.

   Key Components:
   - `ChatPage`: A functional component that integrates various chat-related components.
   - `Chat`: A component imported from '@/components' that displays the chat interface.
   - `useChatContext`: A hook used to access the chat context.
   - `ChatContextType`: A type definition for the chat context.
   - `Wrapper` and `Contexts`: Components that provide styled wrappers and context providers for the chat interface.

   Functional Overview: The ChatPage component uses the `useChatContext` hook to access chat functionalities and renders the `Chat` component within `Wrapper` and `Contexts` components to provide necessary styling and context.

   Dependencies and Integrations: This file depends on several components from '@/components', including `Chat`, `Wrapper`, and `Contexts`, as well as the `useChatContext` hook and `ChatContextType` for managing chat state.

   Additional Context: The use of context and wrapper components suggests a structured approach to state management and UI consistency across the chat feature of the project.
*** END-SUMMARY **/
'use client'
import { Chat } from '@/components'
import { useChatContext } from '@/components'
import { ChatContextType } from '@/components/Chat/context'

import Wrapper from '@/components/Wrapper.component'
import Contexts from '@/components/Contexts.component'

const ChatPage = () => {
  const chatProvider: ChatContextType = useChatContext()

  return (
    <Contexts>
      <Wrapper>
        <Chat ref={chatProvider.chatRef} />
      </Wrapper>
    </Contexts>
  )
}

export default ChatPage
