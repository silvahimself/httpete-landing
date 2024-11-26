"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { Button } from "~/components/ui/button"
import { Bold, Italic, List, ListOrdered, Code, LinkIcon, Eye, Edit, Columns, FileJson2Icon, FileJson, Save } from 'lucide-react'
import { Input } from './ui/input'
import { Endpoint } from '~/model'
import "~/styles/documentation.scss"
import { auth } from '~/server/auth'
type ViewMode = 'edit' | 'preview' | 'both'

type MarkdownEditorProps = {
  markdown: string
  setMarkdown: (newMarkdown: string) => void;
  activeEndpoint: Endpoint
  setActiveEndpoint: (endpoint: Endpoint) => void;
  setDocumentChanged: (changed: boolean) => void;
  setEditingTitle: (editing: boolean) => void;
  docTitle: string,
  isMobile: boolean
}

const MarkdownEditor = (props: MarkdownEditorProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>( props.isMobile ? 'edit' : 'both')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [editingTitle, setEditingTitle] = useState(false);
  const docTitleRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setMarkdown(e.target.value)
    props.setDocumentChanged(true);
  }

  const handleDocTitleChange = async (newTitle: string) => {
    let d = props.
    props.setEditingTitle(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (docTitleRef.current && !docTitleRef.current.contains(event.target as Node)) {
        handleDocTitleChange(docTitleRef.current.value)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      const selectedText = text.substring(start, end)
      const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
      props.setMarkdown(newText)
      textarea.focus()
      setTimeout(() => {
        textarea.selectionStart = start + before.length
        textarea.selectionEnd = end + before.length
      }, 0)
    }
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          insertText('**', '**')
          break
        case 'i':
          e.preventDefault()
          insertText('*', '*')
          break
        case 'k':
          e.preventDefault()
          insertText('[', '](url)')
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [props.markdown])

  const toggleViewMode = () => {
    setViewMode(current => {
      switch (current) {
        case 'edit': return 'preview'
        case 'preview': return 'both'
        case 'both': return 'edit'
      }
    })
  }

  return (
    <div className="flex flex-col bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4 bg-gray-800">
        {editingTitle ?
          <Input ref={docTitleRef} id="title-focus" style={{ padding: '90px !important', color: 'black', fontSize: '28pt' }} contentEditable={true} defaultValue={props.activeEndpoint.docTitle} onChange={(e) => { activeEndpoint.docTitle = e.target.value }} />
          : <h1 onClick={() => { setEditingTitle(true); }} className="document-title" style={{ color: 'white' }}>
            {props.docTitle}
          </h1>
        }
            <div className="flex gap-2 p-4 bg-gray-800">
        <Button variant="outline" size="icon" onClick={toggleViewMode}>
          {viewMode === 'edit' && <Edit color='black' className="h-4 w-4" />}
          {viewMode === 'preview' && <Eye color='black' className="h-4 w-4" />}
          {viewMode === 'both' && <Columns color='black' className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={toggleViewMode}>
          <Save color='black' className='h-4 w-4'/>
        </Button>
      </div>
      </div>
      <div className="p-4 bg-gray-800">
        <div className="bg-gray-700 p-2 rounded-lg mb-4">
          <div className="space-x-2 mt-2">
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" size="icon" onClick={() => insertText('**', '**')}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" size="icon" onClick={() => insertText('*', '*')}>
              <Italic className="h-4 w-4" />
            </Button>
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" size="icon" onClick={() => insertText('- ')}>
              <List className="h-4 w-4" />
            </Button>
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" size="icon" onClick={() => insertText('1. ')}>
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" size="icon" onClick={() => insertText('```javascript', '```')}>
              <Code className="h-4 w-4" />
            </Button>
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" size="icon" onClick={() => insertText('[', '](url)')}>
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" onClick={() => insertText('\n-----\n**Request Headers**\n------\n```json\n' + props.activeEndpoint.headers + '\n```\n')}>
              <FileJson2Icon className="h-4 w-4" /> Headers
            </Button>
            <Button className={props.isMobile ? 'mb-4' : ''} variant="secondary" onClick={() => insertText('\n-----\n**Request Body**\n------\n```json\n' + props.activeEndpoint.body + '\n```\n')}>
              <FileJson className="h-4 w-4" /> Body
            </Button>
          </div>
        </div>
        <div className={`flex ${viewMode === 'both' ? 'space-x-4' : ''}`}>
          {(viewMode === 'edit' || viewMode === 'both') && (
            <div className={viewMode === 'both' ? 'w-1/2' : 'w-full'}>
              <textarea
                ref={textareaRef}
                className="w-full h-[calc(100vh-180px)] bg-gray-700 text-white p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-coral-500"
                value={props.markdown}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your markdown here..."
              />
            </div>
          )}
          {(viewMode === 'preview' || viewMode === 'both') && (
            <div style={{maxHeight:'65vh', overflow:'visible'}} className={`${viewMode === 'both' ? 'w-1/2' : 'w-full'} h-[calc(100vh-180px)] bg-gray-700 p-4 rounded-lg`}>
              <ReactMarkdown
                className="prose prose-invert max-w-none"
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        PreTag="div"
                        style={atomDark}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {props.markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor