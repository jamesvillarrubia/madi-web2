'use client'
import React, { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
import { SideBar } from '@/components'

import { Toaster, Banner } from '@/components'
import { Header } from '@/components/Header/Header'

interface Props {
  children: ReactNode
  sidebarComponent: ReactNode
}

const Wrapper = ({ children, sidebarComponent }: Props) => {
  if(!sidebarComponent) {
    sidebarComponent = (
      <Flex className="h-full">
      </Flex>
    )
  }
  return (
    <>
      <Banner />
      <Header />
      <Flex className="relative chat-flex">
        <SideBar>
          {sidebarComponent}
        </SideBar>
        <div className="flex-1 relative">{children}</div>
      </Flex>
      <Toaster />
    </>
  )
}

export default Wrapper
