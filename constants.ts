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
