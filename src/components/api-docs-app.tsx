"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Textarea } from "~/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Folder, GitBranch, Globe, LogOut, Plus, Send, Settings, User } from "lucide-react"

// Mock data
const workspaces = [
  { id: 1, name: "Personal Workspace" },
  { id: 2, name: "Team Project" },
]

const collections = [
  { id: 1, name: "User API", endpoints: ["GET /users", "POST /users", "PUT /users/{id}"] },
  { id: 2, name: "Product API", endpoints: ["GET /products", "POST /products", "DELETE /products/{id}"] },
]

export function ApiDocsApp() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0])
  const [activeCollection, setActiveCollection] = useState(collections[0])
  const [activeEndpoint, setActiveEndpoint] = useState(collections[0].endpoints[0])
  const [requestMethod, setRequestMethod] = useState("GET")
  const [requestUrl, setRequestUrl] = useState("https://api.example.com/users")
  const [responseData, setResponseData] = useState("")
  const [documentation, setDocumentation] = useState("")

  const handleSendRequest = () => {
    // Simulating API request
    setResponseData(JSON.stringify({ message: "Request sent successfully" }, null, 2))
  }

  const handleSaveDocumentation = () => {
    // Simulating saving documentation
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold">HttPete</h1>
        </div>
        <nav className="mt-4">
          <ul>
            {workspaces.map((workspace) => (
              <li
                key={workspace.id}
                className={`px-4 py-2 cursor-pointer ${
                  activeWorkspace.id === workspace.id ? "bg-blue-100 text-blue-600" : ""
                }`}
                onClick={() => setActiveWorkspace(workspace)}
              >
                <Folder className="inline-block mr-2" size={16} />
                {workspace.name}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 px-4">
          <h2 className="font-semibold mb-2">Collections</h2>
          <ul>
            {collections.map((collection) => (
              <li
                key={collection.id}
                className={`py-2 cursor-pointer ${
                  activeCollection.id === collection.id ? "text-blue-600" : ""
                }`}
                onClick={() => setActiveCollection(collection)}
              >
                <GitBranch className="inline-block mr-2" size={16} />
                {collection.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Globe className="text-gray-500" size={24} />
            <h2 className="text-xl font-semibold">{activeWorkspace.name}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Tabs defaultValue="request" className="w-full">
            <TabsList>
              <TabsTrigger value="request">Request</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
            </TabsList>
            <TabsContent value="request">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={requestMethod}
                    onChange={(e) => setRequestMethod(e.target.value)}
                  >
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                  </select>
                  <Input
                    type="text"
                    placeholder="Enter request URL"
                    value={requestUrl}
                    onChange={(e) => setRequestUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSendRequest}>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Request Body</h3>
                    <Textarea placeholder="Enter request body" className="h-64" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Response</h3>
                    <pre className="bg-gray-100 p-4 rounded h-64 overflow-auto">{responseData}</pre>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="docs">
              <div className="space-y-4">
                <Textarea
                  placeholder="Write your documentation here..."
                  className="h-64"
                  value={documentation}
                  onChange={(e) => setDocumentation(e.target.value)}
                />
                <Button onClick={handleSaveDocumentation}>Save Documentation</Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Right Sidebar - Endpoints */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="font-semibold mb-2">Endpoints</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <ul>
              {activeCollection.endpoints.map((endpoint, index) => (
                <li
                  key={index}
                  className={`py-2 cursor-pointer ${activeEndpoint === endpoint ? "text-blue-600" : ""}`}
                  onClick={() => setActiveEndpoint(endpoint)}
                >
                  {endpoint}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
        <div className="absolute bottom-4 left-4">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Endpoint
          </Button>
        </div>
      </div>
    </div>
  )
}