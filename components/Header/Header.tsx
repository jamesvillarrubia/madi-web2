'use client'

// import NextLink from 'next/link'
import { Link } from "react-router-dom";

import { Symbol, Wordmark } from './Logo'
import React from 'react'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  Flex,
  Heading,
  IconButton,
  Select,
  Tooltip,
  Text,
  Button,
  TabNav
} from '@radix-ui/themes'
import * as Collapsible from '@radix-ui/react-collapsible'
import cs from 'classnames'
import { FaAdjust, FaMoon } from 'react-icons/fa'
import { IoSunny } from 'react-icons/io5'

// import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { ChatContext } from '../Chat/context'
import { useTheme } from '../Themes'
import { HeaderUser } from './HeaderUser'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export interface HeaderProps {
  children?: React.ReactNode
  gitHubLink?: string
  ghost?: boolean
}

export const Header = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Collapsible.Root className="relative z-10" open={open} onOpenChange={setOpen}>
      <HeaderBar />
      <CollapsibleDemo />
    </Collapsible.Root>
  )
}

export const HeaderBar = () => {
  const pathname = usePathname()

  const { theme, setTheme } = useTheme()
  const { onToggleSidebar } = useContext(ChatContext)

  return (
    <header
      className={cs(
        'block shadow-sm sticky top-0 dark:shadow-gray-500 pt-2 px-2 md:px-4 z-20 h-12 md:h-16 align-center'
      )}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Flex align="center" gap="3">
        <Link to="/">
          <div className="flex items-center" style={{ marginTop: '-2px' }}>
            <Heading
              as="h1"
              className="ml-2 md:text-4xl sm:text-lg pt-0 font-mono tracking-wider"
            >
              <Text
                color="blue"
                className="pr-2 md:pr-4 md:pl-5 pl-1 inline-block"
                style={{
                  color: 'var(--danger)'
                }}
              >
                <Symbol className="inline-block w-5 md:w-7" />
              </Text>
              <Wordmark className="inline-block pr-3 w-24 md:w-32" />
            </Heading>
          </div>
        </Link>

        <Flex gap="3" className="pl-10 md:flex hidden">
          <TabNav.Root className="shadow-none">
            <TabNav.Link active={pathname === '/chat' || pathname === '/'} asChild>
              <Link to="/chat">
                Chat
              </Link>
            </TabNav.Link>
            <TabNav.Link active={pathname === '/visualization'} asChild>
              <Link to="/visualization">
                Visualization
              </Link>
            </TabNav.Link>
          </TabNav.Root>
        </Flex>

        <Flex align="center" gap="3" className="ml-auto">
          <HeaderUser />
          <Select.Root value={theme} onValueChange={setTheme}>
            <Select.Trigger radius="full" />
            <Select.Content>
              <Select.Item value="light">
                <IoSunny />
              </Select.Item>
              <Select.Item value="dark">
                <FaMoon />
              </Select.Item>
              <Select.Item value="system">
                <FaAdjust />
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Tooltip content="Navigation">
          <Collapsible.Trigger asChild>
            <IconButton size="2" variant="outline" className="md:hidden" onClick={onToggleSidebar}>
              <HamburgerMenuIcon width="16" height="16" className="color-white" />
            </IconButton>
          </Collapsible.Trigger>
        </Tooltip>
      </Flex>
    </header>
  )
}

const CollapsibleDemo = () => {
  return (
    <Collapsible.Content
      className={cs(
        styles.collapsibleContent,
        'absolute top-full left-0 right-0 shadow-md md:hidden p-4 z-50'
      )}
      style={{
        transform: 'translateZ(1px)',
        backgroundColor: 'var(--color-background)'
      }}
    >
      <Flex direction="column" gap="3" className="w-full">
        <Link to="/chat" className="">
          <Button className="w-full" size="4" variant="soft">
            Chat
          </Button>
        </Link>
        <Link to="/visualization" className="">
          <Button className="w-full" size="4" variant="soft">
            Visualization
          </Button>
        </Link>
      </Flex>
    </Collapsible.Content>
  )
}
