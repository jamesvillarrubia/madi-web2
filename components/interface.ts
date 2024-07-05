/** AUTO-SUMMARY **
   Purpose: This file defines a set of TypeScript interfaces for managing chat functionalities and user interactions within the project.

   Key Components:
   - `ChatMessage`: Interface for chat message details including content, role, and optional tool calls.
   - `User`: Interface for user details like email and Google ID.
   - `ResponseSet`: Interface for handling streaming data and additional chat messages.
   - `Message`: Basic interface for a message with a role and content.
   - `ToolCall`: Interface detailing a tool call within the chat system.
   - `Persona`: Interface for persona details in a chat, including role and optional attributes like avatar and prompt.
   - `ToolObject`: Interface describing a tool with parameters and description.
   - `Tool`: Interface for a tool's type and function details, possibly including plugin and display information.
   - `Chat`: Interface for a chat session including ID, persona, messages, and other metadata.
   - `ChatGPTInstance`: Interface for managing chat conversation states and focus.
   - `ChatRole`: Type definition for various roles in a chat.

   Functional Overview: The file provides structured data interfaces to manage chat sessions, user interactions, tool integrations, and persona management. It supports the handling of messages, user details, tool calls, and chat session metadata.

   Dependencies and Integrations: These interfaces are likely used across the project in components that handle chats, user management, and tool functionality, ensuring type safety and consistency.

   Additional Context: The use of TypeScript interfaces here helps in defining clear contracts for data structures used throughout the chat functionalities of the project, aiding in maintainability and scalability.
*** END-SUMMARY **/
export interface ChatMessage {
  content: string | null
  role: ChatRole
  tool_calls?: ToolCall[]
  tool_call_id?: string
  name?: string
}

export interface User {
  email: string
  googleId: string
}

export interface ResponseSet {
  currentStream: ReadableStream<Uint8Array> | null
  additionalMessages: ChatMessage[]
}

export interface Message {
  role: string
  content: string
}

export interface ToolCall {
  function: {
    arguments: string
    name: string
  }
  type: string
  id: string
}

export interface Persona {
  id?: string
  role: ChatRole
  avatar?: string
  name?: string
  prompt?: string
  key?: string
  isDefault?: boolean
}

export interface ToolObject {
  description: string
  name: string
  parameters: object
}

export interface Tool {
  type: string
  function: ToolObject
  plugin?: string
  display?: string
}

export interface Chat {
  id: string
  persona: Persona
  messages: ChatMessage[]
  name: string
  date: number
}
export interface ChatGPTInstance {
  setConversation: (messages: ChatMessage[]) => void
  getConversation: () => ChatMessage[]
  focus: () => void
}

export type ChatRole = 'assistant' | 'user' | 'system' | 'tool'
