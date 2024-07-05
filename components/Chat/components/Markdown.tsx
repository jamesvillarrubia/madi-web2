/** AUTO-SUMMARY **
   Purpose: This file defines a React component for rendering Markdown content with support for various plugins and syntax highlighting.

   Key Components:
   - `MarkdownProps`: TypeScript interface for the component's props.
   - `Markdown`: React component that uses `ReactMarkdown` for rendering Markdown content.
   - `remarkPlugins`: Array of plugins for parsing and transforming Markdown.
   - `rehypePlugins`: Array of plugins for transforming HTML generated from Markdown.
   - `components`: Custom React components for specific Markdown elements, particularly for code blocks with syntax highlighting and copy functionality.

   Functional Overview: The `Markdown` component renders Markdown content with additional features like GitHub Flavored Markdown (GFM), mathematical expressions, and syntax highlighting for code blocks. It also includes a copy button for code snippets.

   Dependencies and Integrations: 
   - Uses `react-markdown` for the base Markdown rendering.
   - Integrates with `remark` and `rehype` libraries for Markdown processing and HTML transformation.
   - Utilizes `react-syntax-highlighter` for syntax highlighting and `react-icons` for the copy button icon.
   - Depends on `@radix-ui/themes` for UI components like `IconButton`.

   Additional Context: The component enhances the readability and functionality of Markdown content in the project, making it suitable for technical documentation or content-rich applications. The syntax highlighting theme used is `vscDarkPlus`, which is based on Visual Studio Code's dark theme.
*** END-SUMMARY **/
import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math'

import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'

import { RxClipboardCopy } from 'react-icons/rx'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { IconButton } from '@radix-ui/themes'

export interface MarkdownProps {
  className?: string
  children: string
}

export const Markdown = ({ className, children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={`prose dark:prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkParse, remarkMath, remarkRehype, remarkGfm]}
      rehypePlugins={[rehypeKatex, rehypeStringify]}
      components={{
        code(props) {
          const { children, className, ref, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          return (
            <>
              <IconButton
                className="absolute right-4 top-4 copy-btn"
                variant="solid"
                data-clipboard-text={children}
              >
                <RxClipboardCopy />
              </IconButton>
              {match ? (
                <SyntaxHighlighter {...rest} style={vscDarkPlus} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code ref={ref} {...rest} className={className}>
                  {children}
                </code>
              )}
            </>
          )
        }
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
