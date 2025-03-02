import { ChatMessage, ResponseSet, Tool, ToolCall } from '../components/interface'
import { API_CHAT_PATH, API_HOST, API_TOOL_PATH, GCP_IAP_HEADERS } from '../constants'
import client from './feathersClient'

// @ts-expect-error - This is a polyfill for ReadableStream
ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
  const reader = this.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) return
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}

type DeltaValue = string | number | Delta | Delta[]
type Delta = {
  [key: string]: DeltaValue // Define a more specific type if possible
}

type Item = {
  choices?: {
    delta?: Delta
  }[]
}

type Accumulator = {
  [key: string]: DeltaValue // Define a more specific type if possible
}

type AsyncTaskInfo = {
  task_id: string
  status: string
  args: string
  result: string
  progress: number
}

export function messageReducer(previous: ChatMessage, item: Item): ChatMessage {
  const reduce = (acc: Accumulator, delta: Delta | undefined): Accumulator => {
    if (!delta) return acc // Return accumulated value if delta is not provided

    acc = { ...acc }
    for (const [key, value] of Object.entries(delta)) {
      if (acc[key] === undefined || acc[key] === null) {
        acc[key] = value
        if (Array.isArray(acc[key])) {
          for (const arr of acc[key] as Delta[]) {
            delete arr.index
          }
        }
      } else if (typeof acc[key] === 'string' && typeof value === 'string') {
        acc[key] += value
      } else if (typeof acc[key] === 'number' && typeof value === 'number') {
        acc[key] = value
      } else if (Array.isArray(acc[key]) && Array.isArray(value)) {
        const accArray = acc[key] as Delta[]
        for (let i = 0; i < value.length; i++) {
          const { index, ...chunkTool } = value[i] as Delta & { index: number }
          if (index - accArray.length > 1) {
            throw new Error(
              `Error: An array has an empty value when tool_calls are constructed. tool_calls: ${accArray}; tool: ${value}`
            )
          }
          accArray[index] = reduce(accArray[index], chunkTool)
        }
      } else if (typeof acc[key] === 'object' && typeof value === 'object') {
        acc[key] = reduce(acc[key] as Delta, value as Delta)
      }
    }
    return acc
  }
  return reduce(
    previous as unknown as Accumulator,
    item?.choices?.[0]?.delta
  ) as unknown as ChatMessage
}

// message:
// role: assistant
// content:
// tool_calls:
// - id: call_k3YLTd4jC5gTFwXneuTakbSv
//   type: function
//   function:
//     name: get_current_weather
//     arguments: '{"location": "San Francisco, CA"}'
// - id: call_RRE9R9AuhtLvqoHEVmywhMiJ
//   type: function
//   function:
//     name: get_current_weather
//     arguments: '{"location": "Tokyo"}'
// - id: call_CQWPfgIyY78pv7VKwA01Sgs1
//   type: function
//   function:
//     name: get_current_weather
//     arguments: '{"location": "Paris"}'
// logprobs:
// finish_reason: tool_calls

// const onParse = (event: ParsedEvent | ReconnectInterval) => {
//   if (event.type === 'event') {
//     const data = event.data
//     if (data.trim() === '[DONE]') {
//       return null
//     }
//     const json = JSON.parse(data)
//     return json
//   }
// }

export const getTools = async (): Promise<Tool[]> => {
  const url = `${API_HOST}${API_TOOL_PATH}`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...GCP_IAP_HEADERS
    },
    method: 'GET'
  })

  const json = await res.json()
  return json.data
}

/**
 *
 * @param systemPrompt
 * @param messageArray
 * @param newMessage
 * @param currentTool
 * @param tools
 * @returns Just return the stream of the response, which may be a tool_call or not
 */
export const postChat = async (
  systemPrompt: string,
  messageArray: ChatMessage[],
  newMessage?: string | null,
  currentTool?: string,
  tools?: Tool[]
): Promise<ResponseSet> => {
  const url = `${API_HOST}${API_CHAT_PATH}`

  if (newMessage) {
    messageArray = [...messageArray, { role: 'user', content: newMessage }]
  }

  let tool_choice = 'auto' as string | undefined | { type: string; function: { name: string } }
  if (tools && currentTool && currentTool !== 'auto') {
    tool_choice = { type: 'function', function: { name: currentTool } }
  }

  if (currentTool === 'off') {
    tools = undefined
    tool_choice = undefined
  }

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...GCP_IAP_HEADERS
    },
    method: 'POST',
    body: JSON.stringify({
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...messageArray!],
      tools: tools?.length ? tools : undefined,
      tool_choice: tools?.length ? tool_choice : undefined
    })
  })

  if (res.status !== 200) {
    const statusText = res.statusText
    const responseBody = await res.text()
    console.error(responseBody)
    throw new Error(
      `The OpenAI API has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`
    )
  }
  return {
    currentStream: res.body,
    additionalMessages: []
  }
}

export const postTools = async (
  tool_calls: ToolCall[], 
  setLoadingMessage?: (message: string) => void
): Promise<ChatMessage[]> => {
  const url = `${API_HOST}${API_TOOL_PATH}`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...GCP_IAP_HEADERS
    },
    method: 'POST',
    body: JSON.stringify({
      tool_calls: tool_calls,
      polling: true
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

  // parse JSON response
  const tool_call_handles = await res.json()

  // now, poll the tool calls until they are all completed
  const result = await new Promise((resolve) => {
    const poll = async () => {
      // get the status of each tool call
      const tool_info = await client.service('tasks').find({ query: { 
        id: {$in: tool_call_handles.map((t:AsyncTaskInfo) => t.task_id) } 
      } });

      // if all tool calls are completed, resolve the promise
      if (tool_info.every((t:AsyncTaskInfo) => t.status === 'Completed')) {
        // clear loading status
        if (setLoadingMessage) setLoadingMessage('');

        resolve(tool_info.map((t:AsyncTaskInfo) => {
          const args = JSON.parse(t.args);
          return {
            tool_call_id: args.id,
            role: "tool",
            name: args.function.name,
            content: t.result,
          };
        }));
      } else {
        // otherwise, set the loading message appropriately and wait some second(s) and poll again
        const messages = tool_info.map((t:AsyncTaskInfo) => t.status );

        if (setLoadingMessage) {
          if (messages.length == 1) {
            setLoadingMessage(messages[0]);
          } else {
            // choose the most incomplete status (minimum of `progress`)
            const most_incomplete = messages.reduce((a:AsyncTaskInfo, b:AsyncTaskInfo) => a.progress < b.progress ? a : b);
            setLoadingMessage(most_incomplete.status);
          }
        }
        setTimeout(poll, 1500);
      }
    };

    poll();
  });

  console.log('Found a result!', result)

  return result as ChatMessage[]
}

export const convertChunktoJsonArray = (string: string) => {
  const a = string.replace('data: [DONE]', '')
  const b = a.split('data: ').map((c) => c.replace(/\n/g, ''))
  const c = b.filter((c) => c.length)
  const d = c.map((c) => {
    try {
      return JSON.parse(c)
    } catch (e) {
      console.error(`${c}`, e)
      return c
    }
  })
  return d
}

const convertStreamtoJsonArray = async (stream: ReadableStream) => {
  const decoder = new TextDecoder('utf-8')
  const reader = stream.getReader()
  const { value: chunk } = await reader.read()
  const fullString = decoder.decode(chunk)
  return convertChunktoJsonArray(fullString)
}

export const postRunner = async (
  systemPrompt: string,
  messageArray: ChatMessage[],
  newMessage?: string,
  currentTool?: string,
  tools?: Tool[],
  setLoadingMessage?: (message: string) => void
): Promise<ResponseSet> => {
  // send message to postChat
  const {
    currentStream
    // additionalMessages
  } = await postChat(systemPrompt, messageArray, newMessage, currentTool, tools)

  // add the new message to the message array
  if (newMessage) {
    messageArray = [
      ...messageArray,
      { role: 'user', content: newMessage },
    ]
  }

  if (currentStream instanceof ReadableStream) {
    const [checkStream, textStream] = currentStream.tee()

    // Determine if there are any tool calls
    const checkChunks = await convertStreamtoJsonArray(checkStream)
    const first = (checkChunks || [])[0]
    if (
      first?.choices?.[0]?.delta?.role === 'assistant' &&
      first.choices[0].delta.content === null
    ) {
      // Process the textStream for the remaining data
      let toolCallMessage = {} as ChatMessage

      //@ts-expect-error - This is a polyfill for ReadableStream
      for await (const textChunk of textStream) {
        const decoder = new TextDecoder('utf-8')
        const textArray = convertChunktoJsonArray(decoder.decode(textChunk)) || []
        for (const bit of textArray) {
          toolCallMessage = messageReducer(toolCallMessage, bit)
        }
      }

      // Iterate through the tool calls
      const toolResponses = [] as ChatMessage[]
      if (toolCallMessage.tool_calls) {
        const toolResponse = await postTools(toolCallMessage.tool_calls, setLoadingMessage)
        toolResponses.push(...toolResponse) // extend conversation with function response
      }

      // now rebuild a message array with the right stuff
      // add the original message

      messageArray = [
        toolCallMessage,
        ...toolResponses
      ];

      const { currentStream } = await postChat(systemPrompt, messageArray, null, 'auto', tools)

      return {
        // returns the final stream after tool calls
        currentStream: currentStream,
        // but should also include the relevant new stuff as appended
        additionalMessages: [toolCallMessage, ...toolResponses]
      }
    }
    return {
      // defaults response, returns the original stream as a new message
      currentStream: textStream,
      additionalMessages: []
    }
  } else {
    console.error(currentStream)
    throw new Error(`There has been an error with your request.`)
  }
}
