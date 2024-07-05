/** AUTO-SUMMARY **
   Purpose: This file defines a React component named `Wrapper` that serves as a layout structure for the application, organizing various UI components.

   Key Components:
   - `Wrapper`: A React functional component that uses other components to create a structured layout.
   - `Props`: An interface to type-check the props passed to the `Wrapper` component, specifically expecting ReactNode children.

   Functional Overview: The `Wrapper` component integrates several UI components such as `Banner`, `Header`, `SideBar`, and `Toaster` into a cohesive layout. It uses the `Flex` component from `@radix-ui/themes` to arrange the `SideBar` and main content area dynamically.

   Dependencies and Integrations: The file imports several components from the project (`Banner`, `Header`, `SideBar`, `Toaster`) and a styling component (`Flex`) from an external library (`@radix-ui/themes`). It is likely used as a higher-order component in other parts of the application to wrap around various pages or sections.

   Additional Context: The commented-out `PersonaModal` suggests there might be plans to include additional components in the layout or it is under conditional usage. The use of `Flex` indicates a responsive design approach.
*** END-SUMMARY **/
'use client'
import React, { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
import { SideBar } from '@/components'

import { Toaster, Banner } from '@/components'
import { Header } from '@/components/Header/Header'

interface Props {
  children: ReactNode
}

const Wrapper = ({ children }: Props) => {
  return (
    <>
      <Banner />
      <Header />
      <Flex className="relative chat-flex">
        <SideBar />
        <div className="flex-1 relative">{children}</div>
      </Flex>
      {/* <PersonaModal /> */}
      <Toaster />
    </>
  )
}

export default Wrapper
