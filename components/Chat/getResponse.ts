import { API_CHAT_PATH, API_HOST, API_PORT, API_TOOL_PATH } from '../../constants'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { ChatMessage, Chat, Persona, Tool, ToolCall, ResponseSet } from './interface'
import { json, text } from 'stream/consumers'
import { read } from 'fs'


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

export function messageReducer(previous={}, item:any) {
  const reduce = (acc:any, delta:any) => {
    if (!delta) return acc; // Return accumulated value if delta is not provided

    acc = { ...acc };
    for (const [key, value] of Object.entries(delta)) {
      if (acc[key] === undefined || acc[key] === null) {
        acc[key] = value;
        if (Array.isArray(acc[key])) {
          for (const arr of acc[key]) {
            delete arr.index;
          }
        }
      } else if (typeof acc[key] === 'string' && typeof value === 'string') {
        acc[key] += value;
      } else if (typeof acc[key] === 'number' && typeof value === 'number') {
        acc[key] = value;
      } else if (Array.isArray(acc[key]) && Array.isArray(value)) {
        const accArray = acc[key];
        for (let i = 0; i < value.length; i++) {
          const { index, ...chunkTool } = value[i];
          if (index - accArray.length > 1) {
            throw new Error(
              `Error: An array has an empty value when tool_calls are constructed. tool_calls: ${accArray}; tool: ${value}`,
            );
          }
          accArray[index] = reduce(accArray[index], chunkTool);
        }
      } else if (typeof acc[key] === 'object' && typeof value === 'object') {
        acc[key] = reduce(acc[key], value);
      }
    }
    return acc;
  };
  return reduce(previous, item?.choices?.[0]?.delta);
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

export const convertChunktoJsonArray = (string:string)=>{
  try{
    let a = string.replace('data: [DONE]','')
    let b = a.split('data: ')
    let c = b.filter(c=>c.length)
    let d = c.map(c=>JSON.parse(c))
    return d
  }catch(e){
    console.log(string)
    console.log(e)
  }
}

const convertStreamtoJsonArray = async (stream:ReadableStream)=>{
  const decoder = new TextDecoder('utf-8');
  const reader = stream.getReader();
  const { value: chunk } = await reader.read();
  const fullString = decoder.decode(chunk);
  return convertChunktoJsonArray(fullString)
}


export const postChat = async (
  systemPrompt:string, 
  messageArray: any[], 
  newMessage?: string, 
  currentTool?: string, 
  tools?:Tool[]
) : Promise<ResponseSet> => {
  const url = `${API_HOST}:${API_PORT}${API_CHAT_PATH}`

  if(newMessage){
    messageArray = [...messageArray,{"role": "user", "content": newMessage}]
  }  

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
        stream:true,
        messages: [
          {"role": "system", "content": systemPrompt},
          ...messageArray!
        ],
        tools:(tools)?tools:undefined,
        tool_choice: (tools)? {"name":currentTool}:undefined
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
  return {
    currentStream: res.body,
    additionalMessages: []
  }
}


export const postTools = async (tool_calls:ToolCall[]): Promise<ChatMessage[]> => {
  const url = `${API_HOST}:${API_PORT}${API_TOOL_PATH}`

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      tool_calls:tool_calls
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

  return res.json()
}




export const postRunner = async (  
  systemPrompt:string, 
  messageArray: any[], 
  newMessage?: string, 
  currentTool?:string, 
  tools?:Tool[]
): Promise<ResponseSet> =>{

  let chatResponses = [] as ChatMessage[]
  // send message to postChat
  let { currentStream, additionalMessages } = await postChat(systemPrompt, messageArray, newMessage, currentTool, tools)

  if(currentStream instanceof ReadableStream){
    let [checkStream, textStream] = currentStream.tee()

    // Determine if there are any tool calls
    let checkChunks = await convertStreamtoJsonArray(checkStream)
    let first = (checkChunks||[])[0]
    if (first.choices[0].delta.tool_calls) {
      
      // Process the textStream for the remaining data
      let message = {} as ChatMessage
      //@ts-ignore
      for await (const textChunk of textStream) {
        const decoder = new TextDecoder('utf-8');
        let textArray = convertChunktoJsonArray(decoder.decode(textChunk)) || []
        for(const bit of textArray){
          message = messageReducer(message, bit)
        }
      }
      console.log(message)


      // Iterate through the tool calls
      if(message.tool_calls){
        let toolResponse = await postTools(message.tool_calls)
        chatResponses.push(...toolResponse); // extend conversation with function response
        console.log('tool message', message)
      }

      messageArray = [...messageArray, message, ...chatResponses]
      
      let { currentStream } = await postChat(systemPrompt, messageArray, null, currentTool, tools)


      return {
        currentStream: currentStream,
        additionalMessages: [message, ...chatResponses]
      }
    }
    return {
      currentStream: textStream,
      additionalMessages: chatResponses
    }
  }else{
    console.error(currentStream)
    throw new Error(
      `There has been an error with your request.`
    )
  }



}




// async function streamToText(res:Response){
//   const encoder = new TextEncoder()
//   const decoder = new TextDecoder()

//   return new ReadableStream({
//     async start(controller) {
//       const onParse = (event: ParsedEvent | ReconnectInterval) => {
//         if (event.type === 'event') {
//           const data = event.data
//           if (data.trim() === '[DONE]') {
//             controller.close()
//             return
//           }
  
//           try {
//             const json = JSON.parse(data)
//             console.log('json',json)
//             const text = json.choices[0].delta.content
//             const queue = encoder.encode(text)
//             controller.enqueue(queue)
          
//           } catch (e) {
//             controller.error(e)
//           }
//         }
//       }
  
//       const parser = createParser(onParse)
  
//       for await (const chunk of res.body as any) {
//         // An extra newline is required to make AzureOpenAI work.
//         const str = decoder.decode(chunk)
//         parser.feed(str)
//       }
//     }
//   })
// }

