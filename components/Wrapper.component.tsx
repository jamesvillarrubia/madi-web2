'use client'
import React, { ReactNode, useState, useContext, createContext } from 'react'
import { Flex, Button, IconButton } from '@radix-ui/themes'
import { Drawer } from './Drawer.component'
// import ThemesProvider from '@/providers/ThemesProvider'

import { Cross2Icon, ArrowRightIcon } from '@radix-ui/react-icons'

import { Toaster, Banner, SideBar } from '@/components'
import { Header } from '@/components/Header/Header'

interface Props {
  children: ReactNode
  sidebarComponent: ReactNode
}

const Wrapper = ({ children, sidebarComponent }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (!sidebarComponent) {
    sidebarComponent = <Flex className="h-full"></Flex>
  }
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <Banner />
      <Header />
      <DrawerComponent>{sidebarComponent}</DrawerComponent>
      <Flex className="relative chat-flex z-0">
        <SideBar>{sidebarComponent}</SideBar>
        <div className="flex-1 relative">{children}</div>
      </Flex>

      <Toaster />
    </SidebarContext.Provider>
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

const DrawerComponent = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)
  return (
    <Drawer.Root open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      {/* <Drawer.Trigger asChild>
            <Button size="1" variant="solid"
            className='
            mt-3
            rounded-l-none
            rounded-r-md
            shadow-md
            md:hidden
            w-8
            absolute
            z-20
            top-28
            '>
              <ArrowRightIcon />  
            </Button>
          </Drawer.Trigger> */}
      <Drawer.Content origin="left" size="300px" visible={isSidebarOpen}>
        <Flex
          className="h-full"
          style={{
            height: '100%',
            backgroundColor: 'var(--color-background)'
          }}
        >
          <Flex direction="column" gap="3" className="w-full p-4 pt-16">
            <Drawer.Close asChild>
              <IconButton
                variant="soft"
                color="gray"
                className="rounded-full absolute top-4 right-4"
                size="3"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Cross2Icon width="18" height="18" />
              </IconButton>
            </Drawer.Close>
            {children}
          </Flex>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  )
}
