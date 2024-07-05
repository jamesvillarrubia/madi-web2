/** AUTO-SUMMARY **
   Purpose: This file serves as a central export point for chat-related components and context within the project.

   Key Components:
   - `Chat`: Main chat component.
   - `useChatContext`: Hook for accessing chat context.
   - `ChatContext`: Context provider for chat functionalities.
   - `SideBarChatList`: Component for displaying a list of chats in a sidebar.

   Functional Overview: The file facilitates the importation of chat-related functionalities, such as the main chat interface, context management for chat data, and a sidebar component for listing chats, making them easily accessible throughout the project.

   Dependencies and Integrations: Components and context exported from this file are likely used across various parts of the chat application to maintain a cohesive chat functionality.

   Additional Context: By centralizing the exports of these components and contexts, the file simplifies the management and usage of chat features across the project, promoting consistency and reusability.
*** END-SUMMARY **/
export { default as Chat } from './Chat.component'
export { useChatContext, ChatContext } from './context'
export { SideBarChatList } from './components/SideBarChatList.component'
