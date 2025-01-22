import ReactMarkdown from 'react-markdown'
import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math'

import rehypeKatex from 'rehype-katex'
// import rehypeStringify from 'rehype-stringify'
// import remarkStringify from 'remark-stringify'

import { RxClipboardCopy } from 'react-icons/rx'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { IconButton, Flex, Theme } from '@radix-ui/themes'
import './markdown.scss'

export interface MarkdownProps {
  className?: string
  children: string
}

export const Markdown = ({ className, children }: MarkdownProps) => {
  // console.log(children)
  return (
    <ReactMarkdown
      className={`markdown-wrapper prose dark:prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkParse, remarkMath, remarkRehype, remarkGfm, 
        // remarkStringify
      ]}
      rehypePlugins={[rehypeKatex]}//, rehypeStringify]}
      components={{
        // pre(props) {
        //   console.log(JSON.stringify(props, null, 2))
        //   return {props.children}
        // },
        code(props) {
          console.log(props) 
          const { children, className, ref, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          const minWidthEm = `${`${children}`.split('\n').length.toString().length}.25em`;
          const containsNewline = `${children}`.includes('\n');
            return (

              <Flex className={containsNewline ? 'flex-col w-full min-w-full':'flex-0 inline'}>
                  {containsNewline ? (
                    <Theme appearance="dark" className="w-full">
                      <Flex className='w-full py-1 px-3 justify-between text-sm'
                      style={{backgroundColor: 'var(--gray-7)'}}>
                        <Flex className=''>
                          {(match?.[1]||'text').toLowerCase()}
                        </Flex>
                        <Flex className=''>
                          <IconButton
                            className="copy-btn"
                            variant="ghost"
                            color='gray'
                            data-clipboard-text={children}
                          >
                            <RxClipboardCopy /> Copy
                          </IconButton>
                        </Flex>
                      </Flex>
                      <Flex className='min-w-full'>
                        <SyntaxHighlighter 
                          {...rest} 
                          className="markdown-syntax m-0 p-0"
                          style={vscDarkPlus} 
                          language={match?.[1] || 'text'} 
                          PreTag="div"
                          showLineNumbers={true}
                          // showInlineLineNumbers={false}
                          lineNumberStyle={{ 
                            color: 'gray' ,
                            minWidth: minWidthEm,
                            paddingRight: '1em',
                            textAlign: 'right',
                            userSelect: 'none'
                          }}>
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </Flex>
                    </Theme>
                    ) : (
                      <code ref={ref} {...rest} className={className}>
                        {children}
                      </code>
                    )}
                  </Flex>
            )
          
        }
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
