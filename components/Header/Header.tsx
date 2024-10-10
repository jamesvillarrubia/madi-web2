'use client'

import NextLink from 'next/link'
import { Symbol, Wordmark } from './Logo'
import React from 'react';

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Flex, Heading, IconButton, Select, Tooltip, Text } from '@radix-ui/themes'
import cs from 'classnames'
import { FaAdjust, FaMoon } from 'react-icons/fa'
import { IoSunny } from 'react-icons/io5'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { ChatContext } from '../Chat/context'
import { useTheme } from '../Themes'
import { HeaderUser } from './HeaderUser'
import D3Visual from './Visual/index.html';



export interface HeaderProps {
  children?: React.ReactNode
  gitHubLink?: string
  ghost?: boolean
}

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const { onToggleSidebar } = useContext(ChatContext)
  const router = useRouter()

  return (
    <header
      className={cs('block shadow-sm sticky top-0 dark:shadow-gray-500 py-2 px-4 z-20')}
      style={{ backgroundColor: 'var(--color-background)', height: 64 }}
    >
      <Flex align="center" gap="3">
        <NextLink href="/">
          <div className="flex items-center">
            <Heading
              as="h1"
              className="ml-2 text-4xl	font-mono tracking-wider	"
              onClick={() => router.push('/')}
            >
              <Text color="blue" className="pr-4 pl-5">
                <Symbol width={25} className="inline-block" />
              </Text>
              <Wordmark width={120} className="inline-block pr-3" />
            </Heading>
          </div>
        </NextLink>
        <h1>
          {/*<a href="./Visual/v1/index.html"><i>Visualization</i></a>*/}
          <nav>
            <ul>
              {/* Other links */}
              <li>
                {/* Link to the D3 visual in the Visual folder */}
                <a href="./Visual/index.html" rel="noopener noreferrer">
                  Visualization
                </a>
              </li>
            </ul>
          </nav>
        </h1>
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
          <IconButton
            size="3"
            variant="ghost"
            color="gray"
            className="md:hidden"
            onClick={onToggleSidebar}
          >
            <HamburgerMenuIcon width="16" height="16" />
          </IconButton>
        </Tooltip>
      </Flex>
    </header>
  )
}
