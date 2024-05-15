import { useContext, useEffect, useState } from 'react'
import { Box, Table, Flex, Tabs, Text, Heading, IconButton, Container, ScrollArea } from '@radix-ui/themes'
import { AiOutlineClose } from 'react-icons/ai'
import { AdminContext } from './admin.context'
import { ToolPermissionsPanel } from './ToolPermissions'

export const AdminPanel = () => {
  const {
    onCloseAdminPanel
  } = useContext(AdminContext)


  return (
    
    <Flex
      direction="column"
      width="100%"
      height="100%"
      className="absolute top-0 z-10 flex-1"
      style={{ backgroundColor: 'var(--color-page-background)' }}
    >

      <Flex
        justify="between"
        align="center"
        py="3"
        px="4"
        style={{ backgroundColor: 'var(--gray-a2)' }}
      >
            <Tabs.Root defaultValue="user_tool" className='w-full'>
                <Flex direction={"row"} justify={'between'}>
                    <Tabs.List>
                        <Tabs.Trigger value="user_tool">User/Tool Permissions</Tabs.Trigger>
                        <Tabs.Trigger value="tools">Tool Enablement</Tabs.Trigger>
                        <Tabs.Trigger value="user_api">User/API Permissions</Tabs.Trigger>
                    </Tabs.List>
                    <IconButton
                        size="2"
                        variant="ghost"
                        color="gray"
                        radius="full"
                        onClick={onCloseAdminPanel}
                        >
                        <AiOutlineClose className="w-4 h-4" />
                    </IconButton>
                </Flex>  
                <ScrollArea className="flex-1" type="auto" scrollbars="vertical">
                    <Box className='p-4'>
                        <Flex direction="column" className="divide-y">

                            <Tabs.Content value="user_tool">
                                <ToolPermissionsPanel/>
                            </Tabs.Content>

                            <Tabs.Content value="tools">
                                <Text size="2"> Tool Enablement</Text>
                            </Tabs.Content>

                            <Tabs.Content value="user_api">
                                <Text size="2">User/API Permissions</Text>
                            </Tabs.Content>

                        </Flex>
                    </Box>
                </ScrollArea>
            </Tabs.Root>
      </Flex>
    </Flex>
  )
}

const PermissionsTable = ({
  tools, 
  users, 
  handleCheckboxChange
}:{
  tools:string[], 
  users:any[], 
  handleCheckboxChange:(userId: string, tool: string, isChecked: boolean)=>void
}) => {
  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            {tools.map((tool) => (
              <Table.ColumnHeaderCell key={tool}>{tool}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.userId}>
              <Table.Cell>{user.email}</Table.Cell>
              {tools.map((tool) => (
                <Table.Cell key={tool}>
                  <input
                    type="checkbox"
                    checked={user.tools.includes(tool)}
                    onChange={(e) => handleCheckboxChange(user.userId, tool, e.target.checked)}
                  />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default AdminPanel
