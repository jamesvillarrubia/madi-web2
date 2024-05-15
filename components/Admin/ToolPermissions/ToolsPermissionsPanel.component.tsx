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

let toolsOptions = 
  {
    "skip": 0,
    "limit": 0,
    "total": 4,
    "data": [
        {
            "type": "function",
            "plugin": "CAS Discovery",
            "display": "Scenario Creation",
            "function": {
                "name": "create_cas_scenario",
                "description": "Generate a scenario using CAS's futurist scenario creation tool.  The tool is a complex prompt that goes through several steps in order to output a rich futuristic scenario.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "topic": {
                            "type": "string",
                            "description": "The topic that the futurist scenario should be about. Can be a whole article or simply a few key words."
                        },
                        "timeline": {
                            "type": "string",
                            "description": "How far in the future the scenario should imagine.  Defaults to 2050."
                        },
                        "need": {
                            "type": "string",
                            "description": "The specific need facing humanity or industry that the scenario should be addressing."
                        },
                        "capability": {
                            "type": "string",
                            "description": "The technical capability that is new or emerging or being applied in a new way that the scenario should be focused on."
                        },
                        "trend": {
                            "type": "string",
                            "description": "A macro trend, good or bad, that is pointing towards a future crisis or capability or change that the scenario should also include."
                        }
                    },
                    "required": [
                        "topic"
                    ]
                }
            }
        },
        {
            "type": "function",
            "plugin": "Weather API",
            "display": "Get Weather",
            "function": {
                "name": "get_current_weather",
                "description": "Get the current weather in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city and state, e.g. San Francisco, CA"
                        },
                        "unit": {
                            "type": "string",
                            "enum": [
                                "celsius",
                                "fahrenheit"
                            ]
                        }
                    },
                    "required": [
                        "location"
                    ]
                }
            }
        },
        {
            "type": "function",
            "plugin": "CAS Discovery",
            "display": "Search CAS's Confluence",
            "function": {
                "name": "search_cas_confluence",
                "description": "Search in NASA's CAS Confluence for new opportunity concept reports, problem prompts, and other information related to CAS Discovery and their futurism and wicked problem solutioning",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Search query for papers, e.g. \"covid\""
                        }
                    },
                    "required": [
                        "query"
                    ]
                }
            }
        },
        {
            "type": "function",
            "plugin": "Semantic Scholar",
            "display": "Search Semantic Scholar",
            "function": {
                "name": "search_semantic_scholar",
                "description": "Search for academic papers from Semantic Scholar.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Search query for papers, e.g. 'covid'"
                        },
                        "limit": {
                            "type": "integer",
                            "description": "The maximum number of results to return (must be <= 100).",
                            "default": 100
                        },
                        "publicationDateOrYear": {
                            "type": "string",
                            "description": "Restrict results to the given range of publication dates or years (inclusive). Accepts the format <startDate>:<endDate> where each term is optional, allowing for specific dates, fixed ranges, or open-ended ranges."
                        },
                        "year": {
                            "type": "string",
                            "description": "Restrict results to the given publication year (inclusive)."
                        },
                        "venue": {
                            "type": "string",
                            "description": "Restrict results by venue, including ISO4 abbreviations. Use a comma-separated list to include papers from more than one venue. Example: 'Nature,Radiology'."
                        },
                        "fieldsOfStudy": {
                            "type": "string",
                            "description": "Restrict results to given field-of-study. Available fields include 'Computer Science', 'Medicine', 'Biology', etc."
                        },
                        "offset": {
                            "type": "integer",
                            "description": "When returning a list of results, start with the element at this position in the list.",
                            "default": 0
                        }
                    },
                    "required": [
                        "query"
                    ]
                }
            }
        }
    ]
}


const ToolPermissionsPanel = () => {
  const [users, setUsers] = useState<any[]>([])
  const [tools, setTools] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      // const response = await axios.get('/api/users')
      // setUsers(response.data.data)
      setUsers(usersSample.data)
    }

    const fetchTools = async () => {
      // const response = await axios.get('/api/tools')
      // setTools(response.data)
      setTools(toolsOptions.data)
    }

    fetchUsers()
    fetchTools()
  }, [])

  const handleCheckboxChange = async (userId: string, toolName: string, isChecked: boolean) => {
    const user = users.find((user) => user.id === userId);
    if (isChecked) {
      user.tools.push(toolName);
    } else {
      user.tools = user.tools.filter((t:string) => t !== toolName);
    }

    // await axios.patch(`/api/users/${userId}`, user)
  }

  return (
    <PermissionsTable tools={tools} users={users} handleCheckboxChange={handleCheckboxChange}/>
  )
}

const PermissionsTable = ({
  tools, 
  users, 
  handleCheckboxChange
}:{
  tools:any[], 
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
              <Table.ColumnHeaderCell key={tool.function.name} className='text-center'>{tool.display}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.userId}>
              <Table.Cell>{user.email}</Table.Cell>
              {tools.map((tool) => (
                <Table.Cell key={tool.function.name} className='justify-center items-center text-center'>
                  <input
                    type="checkbox"
                    checked={user.tools.includes(tool.function.name)}
                    onChange={(e) => handleCheckboxChange(user.userId, tool.function.name, e.target.checked)}
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

export default ToolPermissionsPanel
