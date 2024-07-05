/** AUTO-SUMMARY **
   Purpose: This file serves as a re-export module for the ChatPage component, facilitating its import into other parts of the application.

   Key Components:
   - `ChatPage`: Imported component from './chat/page'.

   Functional Overview: The file simplifies the import process of the ChatPage component by re-exporting it as a default export, making it easier to integrate into other parts of the application.

   Dependencies and Integrations: Depends on the ChatPage component from the './chat/page' module. It is likely used by other components or modules that require the ChatPage component.

   Additional Context: The use of 'use client' indicates that this module is intended for client-side usage in a web application, ensuring that the ChatPage component is bundled and served in client-facing parts of the application.
*** END-SUMMARY **/
'use client'
import ChatPage from './chat/page'
export default ChatPage
