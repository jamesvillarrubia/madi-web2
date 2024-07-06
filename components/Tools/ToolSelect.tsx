/** AUTO-SUMMARY **
   Purpose: This file defines a React component named `ToolSelect` which is responsible for rendering a dropdown selection of tools, categorized by plugins, for users in a chat application.

   Key Components:
   - `ToolSelect`: A React functional component.
   - `splitByPlugin`: A function to categorize tools by their respective plugins.
   - `useEffect`: React hook used to fetch tools when the current user is available.
   - `Select`: A component from `@radix-ui/themes` used to create the dropdown UI.

   Functional Overview: The `ToolSelect` component interacts with the `ChatContext` to manage the state of tool selections and updates the tool list based on the authenticated user's context. It uses the `splitByPlugin` function to organize tools into categories for display in the dropdown menu. The component fetches tools asynchronously when a user is present and updates the tool list accordingly.

   Dependencies and Integrations:
   - Uses `ChatContext` for accessing and setting the chat-related tool data.
   - Integrates with `useAuthContext` to fetch the current user's authentication status.
   - Relies on `getTools` function from `@/components/getResponse` to fetch the list of tools.
   - Utilizes components from `@radix-ui/themes` for rendering the dropdown UI.

   Additional Context: The component is designed to handle cases where there are no tools available, returning `null` in such scenarios. It also ensures that the tool list is updated only when there is a change in the current user or the tool list setter function, optimizing performance by avoiding unnecessary re-renders.
*** END-SUMMARY **/
import { useAuthContext } from '@/components/authenticate'
import { getTools } from '@/components/getResponse'
import { Select } from '@radix-ui/themes'
import { Fragment, useContext, useEffect } from 'react'
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

  useEffect(() => {
    if (currentUser) {
      (async () => {
        const fetchTools = await getTools()
        if (setToolList) setToolList(fetchTools)
      })()
    }
  }, [currentUser, setToolList])

  if (!toolList || toolList.length === 0) {
    return null
  }

  const splitTools = splitByPlugin(toolList || [])

  // useEffect(() => {
  //   console.log('toolcheck currentUser', currentUser)
  //   if (currentUser) {
  //     ;(async () => {
  //       const fetchTools = await getTools()
  //       if (setToolList) setToolList(fetchTools)
  //       console.log('fetchTools', fetchTools)
  //     })()
  //   }
  // }, [currentUser, setToolList])

  // if (!toolList || toolList.length === 0) {
  //   return null
  //

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
