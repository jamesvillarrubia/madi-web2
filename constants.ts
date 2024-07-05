/** AUTO-SUMMARY **
   Purpose: This file configures API paths and host settings, and handles specific headers for Google Cloud Platform's Identity-Aware Proxy (IAP) authentication when running locally.

   Key Components:
   - `API_CHAT_PATH`, `API_TOOL_PATH`: Constants defining API endpoints for chats and tools.
   - `API_HOST`: Variable to determine the API host URL based on the environment.
   - `GCP_IAP_HEADERS`: Optional headers for GCP IAP authentication, configured specifically for local development.

   Functional Overview: The file sets up essential API paths and dynamically configures the API host URL and authentication headers based on whether the code is running in a local environment or in production. It ensures that local development can simulate authentication headers that would be provided by GCP IAP in a production environment.

   Dependencies and Integrations: This configuration is likely used by other parts of the application that interact with the backend API, ensuring that requests are routed correctly and authenticated when necessary.

   Additional Context: The use of environment checks (`window.location.hostname.includes('localhost')`) suggests that this setup is critical for developers during local development, allowing them to test functionalities that depend on API interactions and GCP IAP authentication without deploying to a live environment.
*** END-SUMMARY **/
export const API_CHAT_PATH = '/chats'
export const API_TOOL_PATH = '/tools'

let API_HOST: string
let GCP_IAP_HEADERS:
  | {
      'X-Goog-Iap-Jwt-Assertion'?: string
      'X-Goog-Authenticated-User-Email'?: string
      'X-Goog-Authenticated-User-ID'?: string
    }
  | undefined

if (typeof window !== 'undefined') {
  API_HOST = `${window.location.protocol}//${window.location.hostname}/api`
  if (window.location.hostname.includes('localhost')) {
    API_HOST = 'http://localhost:3030'
    GCP_IAP_HEADERS = {
      'X-Goog-Iap-Jwt-Assertion': '',
      'X-Goog-Authenticated-User-Email': 'accounts.google.com:jane@example.com',
      'X-Goog-Authenticated-User-ID': 'accounts.google.com:8675309'
    }
  }
}

export { API_HOST, GCP_IAP_HEADERS }
