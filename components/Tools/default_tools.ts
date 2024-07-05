/** AUTO-SUMMARY **
   Purpose: This file defines a list of default tools that can be used within the project, particularly focusing on functionalities related to weather and jokes.

   Key Components:
   - `DefaultTools`: An array of `Tool` objects, each representing a specific functionality or plugin within the project.

   Functional Overview: The file provides a structured list of tools, each described with properties such as type, display name, and associated function details like name, description, and parameters. The tools include functionalities for fetching current weather and retrieving jokes.

   Dependencies and Integrations: The file imports the `Tool` interface from another module, ensuring that the `DefaultTools` array conforms to a predefined structure expected across the project.

   Additional Context: The tools are currently commented out, suggesting that they might be examples or templates for further development or customization. The file plays a role in centralizing tool definitions which can be utilized by other parts of the application to perform specific actions.
*** END-SUMMARY **/
import { Tool } from '../interface'

export const DefaultTools: Tool[] = [
  // {
  //   type: 'function',
  //   display: 'Get Weather',
  //   function: {
  //     name: 'get_current_weather',
  //     description: 'Get the current weather in a given location',
  //     parameters: {
  //       type: 'object',
  //       properties: {
  //         location: {
  //           type: 'string',
  //           description: 'The city and state, e.g. San Francisco, CA'
  //         },
  //         unit: {
  //           type: 'string',
  //           enum: ['celsius', 'fahrenheit']
  //         }
  //       },
  //       required: ['location']
  //     }
  //   }
  // },
  // {
  //   type: 'function',
  //   display: 'get_joke',
  //   plugin: 'CAS Scenarios',
  //   function: {
  //     name: 'get_joke',
  //     description: 'Get a joke from the joke database',
  //     parameters: {}
  //   }
  // }
]
