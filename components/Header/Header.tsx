'use client'

import NextLink from 'next/link'
import Logo from './Logo'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Flex, Heading, IconButton, Select, Tooltip } from '@radix-ui/themes'
import cs from 'classnames'
import { FaAdjust, FaMoon } from 'react-icons/fa'
import { IoSunny } from 'react-icons/io5'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { ChatContext } from '../Chat/context'
import { useTheme } from '../Themes'
import { HeaderUser } from './HeaderUser'

export interface HeaderProps {
  children?: React.ReactNode
  gitHubLink?: string
  ghost?: boolean
}

export const Header = () =>
  /*{ children, gitHubLink, ghost }: HeaderProps*/
  {
    // const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    // const [show, setShow] = useState(false)

    const { onToggleSidebar } = useContext(ChatContext)

    const router = useRouter()

    return (
      <header
        className={cs('block shadow-sm sticky top-0 dark:shadow-gray-500 py-3 px-4 z-20')}
        style={{ backgroundColor: 'var(--color-background)', height: 64 }}
      >
        <Flex align="center" gap="3">
          <NextLink href="/">
            <div className="flex items-center">
              <Logo fill="currentColor" width={45} height={35} />
              <Heading
                as="h1"
                className="ml-4 text-4xl	font-mono tracking-wider	"
                onClick={() => router.push('/')}
              >
                MADI
              </Heading>
              <span className="ml-3 text-sm mt-1 italic" style={{ color: 'var(--accent-a10)' }}>
                ARMD AI Assistant
              </span>
            </div>
          </NextLink>
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
