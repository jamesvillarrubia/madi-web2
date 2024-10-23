
'use client'
import React, { useContext } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { Drawer } from '@/components/Layout/DrawerDialog.component'
import { Cross2Icon } from '@radix-ui/react-icons'
import { SidebarContext } from '@/components/Layout/Wrapper.component'


export const DrawerComponent = ({ children }: { children: React.ReactNode }) => {
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
