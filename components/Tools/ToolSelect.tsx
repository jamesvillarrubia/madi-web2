import { Flex, Heading, IconButton, ScrollArea, TextArea, Button, Select } from '@radix-ui/themes'
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  Fragment
} from 'react'
import { ChatMessage, Tool } from '../interface'
import ChatContext from '../Chat/chat.context'
import { getTools } from '@/app/getResponse'
import { useAuthContext } from '@/app/authenticate'

export const ToolSelect = () => {
  let { toolList, setToolList, currentTool, setCurrentTool } = useContext(ChatContext)
  let { currentUser } = useAuthContext()

  const splitByPlugin = (toolList: Tool[]) => {
    return toolList.reduce((acc: any, tool: Tool) => {
      const pluginName = tool.plugin || 'Common'
      if (!acc[pluginName]) {
        acc[pluginName] = []
      }
      acc[pluginName].push(tool)
      return acc
    }, {})
  }
  const splitTools = splitByPlugin(toolList || [])

  useEffect(() => {
    if (currentUser) {
      ;(async () => {
        const fetchTools = await getTools()
        if (setToolList) setToolList(fetchTools)
        console.log('fetchTools', fetchTools)
      })()
    }
  }, [currentUser, setToolList])

  return (
    <Select.Root defaultValue={currentTool} size="2" onValueChange={setCurrentTool}>
      <Select.Trigger
        className="rounded-3xl"
        variant="surface"
        style={{
          minHeight: '24px'
        }}
      />
      <Select.Content>
        {/* <Select.Group> */}
        {/* <Select.Label>Auto</Select.Label> */}
        <Select.Item key="auto" value="auto">
          Auto
        </Select.Item>
        <Select.Separator />

        {Object.keys(splitTools).map((plugin) => (
          <Fragment key={plugin}>
            <Select.Group>
              <Select.Label>{plugin}</Select.Label>
              {splitTools[plugin].map((tool: Tool) => (
                <Select.Item key={tool.function.name} value={tool.function.name}>
                  {tool.display || tool.function.name}
                </Select.Item>
              ))}
            </Select.Group>
            <Select.Separator />
          </Fragment>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
