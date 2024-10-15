import { useAuthContext } from '@/components/authenticate'
import { getTools } from '@/components/getResponse'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../Chat/context'
import { Tool } from '../interface'
import { Text, Grid, Checkbox, Flex, Container, ScrollArea, Link, Card } from '@radix-ui/themes'

export const PluginList = () => {
  const { toolList, setToolList } = useContext(ChatContext)
  const { currentUser } = useAuthContext()

  useEffect(() => {
    if (currentUser) {
      // eslint-disable-next-line
      ;(async () => {
        const fetchTools = await getTools()
        if (setToolList) setToolList(fetchTools)
      })()
    }
  }, [currentUser, setToolList])

  if (!toolList || toolList.length === 0) {
    return null
  }

  //   const splitTools = splitByPlugin(toolList || [])

  return (
    <Flex direction="column" height="100%" className="relative" gap="3">
      <ScrollArea
        className="flex-1 px-4"
        type="auto"
        scrollbars="vertical"
        style={{ height: '80%' }}
      >
        <Container size="3" className="max-w-1000px p-4">
          <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
            {toolList.map((plugin, i) => (
              <ToolCard key={i} tool={plugin} disabled={i % 2 === 0} />
            ))}
          </Grid>
        </Container>
      </ScrollArea>
    </Flex>
  )
}

const ToolCard = ({ tool, disabled }: { tool: Tool; disabled: boolean }) => {
  return (
    <Card
      className={`w-full h-full align-start items-start text-sm ${disabled ? 'opacity-50' : ''}`}
    >
      <Flex height={'100%'}>
        <Flex direction="column" width="100%">
          <Flex direction="column" gap="1" className="mb-4">
            <Text weight="bold" className="text-base">
              {tool.display || tool.function.name}
            </Text>
            <Text size="1" className="italic">
              {tool.plugin || 'Common'}
            </Text>
          </Flex>

          <Text className="mb-4">{tool.function.description}</Text>
          <Link href="https://github.com" target="_blank">
            Source
          </Link>
        </Flex>
        <Checkbox className="ml-4 cursor-pointer" disabled={disabled} />
      </Flex>
    </Card>
  )
}
