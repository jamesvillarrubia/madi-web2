export const API_CHAT_PATH = '/chats';
export const API_TOOL_PATH = '/tools';

let API_HOST: string
if (typeof window !== 'undefined') {
    API_HOST = `${window.location.protocol}//${window.location.hostname}/api`;
    if (window.location.hostname.includes('localhost')) {
        API_HOST = 'http://localhost:3030';
    }
}

export { API_HOST };