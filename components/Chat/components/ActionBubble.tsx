'use client'

import { useContext, useState } from 'react'
import { Avatar, Flex, Box, IconButton, Card } from '@radix-ui/themes'
import * as Tooltip from '@radix-ui/react-tooltip';

import { FaceIcon, ImageIcon, SunIcon, CopyIcon, SymbolIcon } from '@radix-ui/react-icons'
import { FaRegThumbsDown } from "react-icons/fa";
import { TiThumbsDown } from "react-icons/ti";

import { SiOpenai } from 'react-icons/si'
import { HiUser } from 'react-icons/hi'
import { Markdown } from './Markdown'
import { ChatMessage } from '../../interface'
import * as Collapsible from '@radix-ui/react-collapsible'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'

export interface ActionBubbleProps {
  message: string
}

export const ActionBubble = (props: MessageProps) => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.message).then(() => {
            console.log('Message copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy message: ', err);
        });
    };

    return (
        <Box width="max-content">
            <ActionTooltip content="Copy">
                <IconButton 
                    className="mr-2 w-5 h-5" 
                    radius='large' 
                    variant='ghost' 
                    size='1' 
                    onClick={copyToClipboard}
                ><CopyIcon /></IconButton>
            </ActionTooltip>
            <ActionTooltip content="Regenerate - Coming Soon">
                <IconButton className="mr-2 w-5 h-5" radius='large' variant='ghost' size='1' ><SymbolIcon/></IconButton>
            </ActionTooltip>
            <ActionTooltip content="Bad Reponse - Coming Soon">
                <IconButton className="mr-2 w-5 h-5" radius='large' variant='ghost' size='1' ><TiThumbsDown /></IconButton>
            </ActionTooltip>
        </Box>  
    )
}

const ActionTooltip = (props: any) => {
    return(
        <Tooltip.Provider>
        <Tooltip.Root delayDuration={300}>
          <Tooltip.Trigger asChild>
              {props.children}
          </Tooltip.Trigger>
          <Tooltip.Portal >
            <Tooltip.Content className="TooltipContent" side="bottom" sideOffset={5}>
              <Box className="text-white bg-black py-2 px-3 text-sm rounded-lg" >
                {props.content}
              </Box>
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
} 
export default ActionBubble