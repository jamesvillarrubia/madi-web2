'use client'
import React, { ReactNode } from 'react';
import { Flex } from '@radix-ui/themes'
import { SideBar } from '@/components'

import { Toaster, Banner } from '@/components'
import { Header } from '@/components/Header/Header'


interface Props {
  children: ReactNode;
}

const Wrapper = ({children}:Props)=>{
  return (
    <>
        <Banner />
        <Header />
        <Flex className="relative chat-flex">
            <SideBar />
            <div className="flex-1 relative">
                {children}
            </div>
        </Flex>
        {/* <PersonaModal /> */}
        <Toaster />
    </>
  )
}

export default Wrapper
