import { useContext, useEffect, useState } from 'react'
import { Box, Table, Flex, Heading, IconButton, Container, ScrollArea } from '@radix-ui/themes'
import { AiOutlineClose } from 'react-icons/ai'
import { AdminContext } from '../admin.context'

import axios from 'axios'


let usersSample = {
  "total": 4,
  "limit": 10,
  "skip": 0,
  "data": [
      {
          "id": 2,
          "email": "admin@example.com",
          "googleId": "11111111",
          "role": "admin",
          "tools": ["create_cas_scenario"]
          
      },
      {
          "id": 3,
          "email": "member@example.com",
          "googleId": "22222222",
          "role": "member",
          "tools": ["create_cas_scenario","get_current_weather"]
      },
      {
          "id": 12,
          "email": "jane@example.com",
          "googleId": "8675309",
          "role": "member",
          "tools": ["get_current_weather"]
      },
      {
          "id": 1,
          "email": "superadmin@example.com",
          "googleId": "00000000",
          "role": "superadmin",
          "tools": []
      }
  ]
}

const roles = ['admin', 'member', 'superadmin'];


export const UserRolesPanel = () => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      // const response = await axios.get('/api/users')
      // setUsers(response.data.data)
      setUsers(usersSample.data)
    }

    fetchUsers()
  }, [])

  const handleRoleChange = async (userId: string, role: string) => {
    const user = users.find((user) => user.id === userId);
    user.role = role;

    // await axios.patch(`/api/users/${userId}`, user)
  }

  return (
    <RolesTable users={users} handleRoleChange={handleRoleChange}/>
  )
}

const RolesTable = ({
  users, 
  handleRoleChange
}:{
  users:any[], 
  handleRoleChange:(userId: string, role: string)=>void
}) => {
  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='text-center'>Role</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell className='justify-center items-center text-center'>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default UserRolesPanel
