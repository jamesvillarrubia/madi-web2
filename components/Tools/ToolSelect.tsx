import { useAuthContext } from '@/components/authenticate'
import { getTools } from '@/components/getResponse'
import { Select } from '@radix-ui/themes'
import { Fragment, useContext, useEffect, useCallback } from 'react'
import { ChatContext } from '../Chat/context'
import { Tool } from '../interface'

export const ToolSelect = () => {
  const { toolList, setToolList, currentTool, setCurrentTool } = useContext(ChatContext)
  const { currentUser } = useAuthContext()

  const splitByPlugin = (toolList: Tool[]) => {
    return toolList.reduce((acc: Record<string, Tool[]>, tool: Tool) => {
      const pluginName = tool.plugin || 'Common'
      if (!acc[pluginName]) {
        acc[pluginName] = []
      }
      acc[pluginName].push(tool)
      return acc
    }, {})
  }

  const fetchTools = useCallback(
    async (retries = 3) => {
      try {
        const tools = await getTools()
        console.log('fetchTools:', tools)
        if (setToolList) {
          console.log('setToolList is defined')
          setToolList(tools)
        } else {
          console.warn('setToolList is undefined')
        }
      } catch (error) {
        console.error('Error fetching tools:', error)
        if (retries > 0) {
          console.log(`Retrying... (${retries} retries left)`)
          setTimeout(() => fetchTools(retries - 1), 1000)
        } else {
          console.error('Max retries reached. Failed to fetch tools.')
        }
      }
    },
    [setToolList]
  )

  useEffect(() => {
    console.log('currentUser:', currentUser)
    if (currentUser) {
      fetchTools()
    }
  }, [currentUser, fetchTools, setToolList])

  if (!toolList || toolList.length === 0) {
    return null
  }

  const splitTools = splitByPlugin(toolList || [])

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
        <Select.Item key="off" value="off">
          Off
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
