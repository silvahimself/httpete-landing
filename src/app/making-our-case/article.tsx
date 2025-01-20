'use client'

import React, { useState, useEffect } from 'react'
import { string } from 'zod'



const SimpleMarkdownParser: React.FC<{ content: string }> = ({ content }) => {
  const [parsedContent, setParsedContent] = useState('')

  useEffect(() => {
    const parseMarkdown = (md: string) => {
      let html = ''
      let inCodeBlock = false
      let codeContent = ''

      // Split the content into lines
      const lines = md.split('\n')

      // Process each line
      lines.forEach((line, index) => {
        // Check if we're entering or leaving a code block
        if (line.trim().startsWith('```')) {
          if (inCodeBlock) {
            // End of code block
            html += `<pre><code>${codeContent}</code></pre>`
            codeContent = ''
          }
          inCodeBlock = !inCodeBlock
          return
        }

        if (inCodeBlock) {
          // If we're in a code block, don't parse as markdown
          // Instead, escape HTML characters and add a class for comment lines
          const escapedLine = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
          codeContent += line.startsWith('#')
            ? `<span class="comment">${escapedLine}</span>\n`
            : `${escapedLine}\n`
        } else {
          // Parse headers
          line = line.replace(/^### (.*$)/gim, '<h3>$1</h3>')
          line = line.replace(/^## (.*$)/gim, '<h2>$1</h2>')
          line = line.replace(/^# (.*$)/gim, '<h1>$1</h1>')

          // Parse lists
          line = line.replace(/^\s*- (.*$)/gim, '<li>$1</li>')

          // Parse paragraphs
          if (!/^<[h|u|o|l|p]/.test(line) && line.trim() !== '') {
            line = '<p>' + line + '</p>'
          }

          // Parse bold text
          line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

          // Parse italic text
          line = line.replace(/\*(.*?)\*/g, '<em>$1</em>')

          html += line + '\n'
        }
      })

      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>');
      html = html.replace(/=\[([^\]]*)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      // Wrap adjacent list items in <ul> tags
      html = html.replace(/<\/li>\n<li>/g, '</li><li>')
      html = html.replace(/<li>(.|\n)*?<\/li>/g, function (match) {
        return '<ul>' + match + '</ul>'
      })

      return html
    }

    setParsedContent(parseMarkdown(content))
  }, [content])

  return <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
}

export default function HttpPeteArticle ({articleContent} : {articleContent:string}) { 
  
  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      <SimpleMarkdownParser content={articleContent} />
      <style jsx global>{`
        h1 {
          font-size: 4.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #fff;
        }
        h2 {
          font-size: 3rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        h3 {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 0.5rem;
          color: #fff;
        }
        a {
          text-decoration: underline
        }
        p {
        font-size:1.25rem;
        margin-bottom: 1rem;
        line-height: 1.6;
        }
        ul {
          font-size:1.5rem;
          margin-bottom: 1rem;
          padding-left: 2rem;
          }
          li {
            font-size:1.5rem;
            margin-bottom: 0.5rem;
            }
            pre {
              font-size:1.5rem;
              background-color: #1C2F45;
              padding: 1rem;
              border-radius: 4px;
              overflow-x: auto;
              margin-bottom: 1rem;
              }
              code {
                font-size:1.5rem;
                font-family: monospace;
                font-size: 0.9rem;
                white-space: pre-wrap;
                word-wrap: break-word;
                }
                .comment {
                  color: #888;
                  }
                  strong {
                    font-size:1.5rem;
                    font-weight: bold;
                    }
                    em {
                      font-size:1.5rem;
          font-style: italic;
        }
      `}</style>
    </article>
  )
}

