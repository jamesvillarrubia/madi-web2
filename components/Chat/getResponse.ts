import { API_CHAT_PATH, API_HOST, API_PORT } from '../../constants'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { ChatMessage, Chat, Persona} from './interface'
export interface Message {
  role: string
  content: string
}

//@ts-ignore
ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
  const reader = this.getReader()
  try {
    while (true) {
      const {done, value} = await reader.read()
      if (done) return
      yield value
    }
  }
  finally {
    reader.releaseLock()
  }
}
// export async function POST(req: NextRequest) {
//   try {
//     const { prompt, messages, input } = (await req.json()) as {
//       prompt: string
//       messages: Message[]
//       input: string
//     }
//     const messagesWithHistory = [
//       { content: prompt, role: 'system' },
//       ...messages,
//       { content: input, role: 'user' }
//     ]

//     const { apiUrl, apiKey, model } = getApiConfig()
//     return await getOpenAIStream(apiUrl, apiKey, model, messagesWithHistory)
//     // return new NextResponse(stream, {
//     //   headers: { 'Content-Type': 'text/event-stream' }
//     // })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     )
//   }
// }


// export const postChat = async (chat: Chat, messages: any[], input: string) => {
//   const url = `${API_HOST}:${API_PORT}${API_CHAT_PATH}`
//   return await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         stream:true,
//         messages: [
//           {"role": "system", "content": chat?.persona?.prompt},
//           ...messages!,
//           {"role": "user", "content": input}
//         ],
//     })
//   })
// }


export const postChat = async (chat: Chat, messages: any[], input: string) => {
  const url = `${API_HOST}:${API_PORT}${API_CHAT_PATH}`
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
        stream:true,
        messages: [
          {"role": "system", "content": chat?.persona?.prompt},
          ...messages!,
          {"role": "user", "content": input}
        ],
    })
  })

  if (res.status !== 201) {
    const statusText = res.statusText
    const responseBody = await res.text()
    console.error(responseBody)
    throw new Error(
      `The OpenAI API has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`
    )
  }

  return new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data
          if (data.trim() === '[DONE]') {
            controller.close()
            return
          }

          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)

      for await (const chunk of res.body as any) {
        // An extra newline is required to make AzureOpenAI work.
        const str = decoder.decode(chunk)
        parser.feed(str)
      }
    }
  })
}
