'use client'
import React, { ReactNode, useState, createContext, Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { DrawerComponent } from '@/components/Layout/Drawer.component'
import { Toaster, Banner, SideBar } from '@/components'
import { Header } from '@/components/Header/Header'


interface Props {
  sidebarComponent: ReactNode
  children: ReactNode
}

const Wrapper = ({ sidebarComponent, children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Banner />
      <Header />
      <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <DrawerComponent>{sidebarComponent}</DrawerComponent>
        <Flex className="relative chat-flex z-0">
          <SideBar>
            <Suspense fallback={<div>Loading...</div>}>
              {sidebarComponent}
            </Suspense>
          </SideBar>
          <Flex flexShrink={"1"} className='w-full max-w-full min-w-0'>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
              {children}
            {/* </Suspense> */}
          </Flex>
        </Flex>
      </SidebarContext.Provider>
      <Toaster/>
    </>
  )
}

export default Wrapper

// Create a context for the sidebar state
export const SidebarContext = createContext<{
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {}
})














