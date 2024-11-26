'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, Plus } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Doc } from '~/model'

interface DocFileTreeProps {
  data: Doc,
  setActiveDocumentation: (doc: Doc) => void;
}
// Function to generate the default expanded state
const generateExpandedState = (node) => {
  const state = { [node.id]: true }; // Default the current node to true
  if (node.children) {
    node.children.forEach((child) => {
      // Recursively build state for child nodes
      Object.assign(state, generateExpandedState(child));
    });
  }
  return state;
};

const DocFileTree: React.FC<DocFileTreeProps> = ({ data, setActiveDocumentation}) => {
  const [expanded, setExpanded] = useState(generateExpandedState(data));
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddDocument = (parentId: string) => {
    // TODO: Implement the logic to add a new document
  }

  const renderTreeNode = (node: Doc) => {
    const isExpanded = expanded[node.id] ?? true
    const isFolder = node.type === 'folder'

    return (
      <div key={node.id} className="ml-4">
        <div 
          className="flex items-center py-1 cursor-pointer group"
          onMouseEnter={() => setHoveredId(node.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => {setActiveDocumentation(node)}}
        >
          {isFolder && (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 mr-1 text-gray-400"
              onClick={() => toggleExpand(node.id)}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </Button>
          )}
          {isFolder ? <Folder size={16} className="mr-2 text-gray-400" /> : <File size={16} className="mr-2 text-gray-400" />}
          <span className="text-sm text-gray-200">{node.title}</span>
          {parseInt(hoveredId ?? "-1") === node.id && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleAddDocument(node.id)}
            >
              <Plus size={14} />
            </Button>
          )}
        </div>
        {isFolder && isExpanded && node.children && (
          <div className="ml-4">
            {node.children.map(childNode => renderTreeNode(childNode))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Collection #1</h2>
      {renderTreeNode(data)}
      <h2 className="text-xl mt-4 font-bold mb-4">Collection #2</h2>
      {renderTreeNode(data)}
    </div>
  )
}

export default DocFileTree

