'use client'
import { baseUrl, Doc, urlOptions, Workspace, WorkspaceData } from "~/model"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Globe, LogOut, Send, Settings, User, FileText, Save, Folder, Users, } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog"
import dynamic from "next/dynamic";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios"
import LeftSideBar from "~/components/sidebar/left-sidebar"

// import "easymde/dist/easymde.min.css"; // Styles for SimpleMDE

import "~/styles/documentation.scss"
import { Label } from "~/components/ui/label"
import MarkdownEditor from "~/components/markdown-editor"
import remarkGfm from "remark-gfm"
import { signOut, useSession } from "next-auth/react"
import { DashboardPageProps } from "~/app/dashboard/layout"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { Textarea } from "~/components/ui/textarea"
import { Session } from "next-auth"
import CustomGPTAgent from "~/components/CustomGPTAgent"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: true });



const pulsingAnimation = `
  @keyframes pulse {
    0%, 100% { background-color: rgba(6, 182, 212, 0.5); }
    50% { background-color: rgba(255, 127, 80, 0.5); }
  }
`

const styles = {
  loadingAnimation: {
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
}

const Dashboard = (props: DashboardPageProps) => {
  const [requestBaseUrl, setRequestBaseUrl] = useState(urlOptions[0])
  const [requestMethod, setRequestMethod] = useState(props.activeEndpoint?.method)
  const [requestUrl, setRequestUrl] = useState(`https://api.example.com${props.activeEndpoint?.url}`)
  const [responseData, setResponseData] = useState("")
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editingWorkspaceName, setEditingWorkspaceName] = useState(false)
  const [isUnsavedChangesDialogOpen, setIsUnsavedChangesDialogOpen] = useState(false)
  const workspaceNameInputRef = useRef(null)
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState(false);
  const docContentRef = useRef(null);
  const [activeTab, setActiveTab] = useState("request"); // Set the default active tab
  const [doc, setDoc] = useState(props.activeDocumentation?.text); // Set the default active tab
  const [schema, setSchema] = useState('http://'); // Set the default active tab
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  console.log('endpoint', props.activeEndpoint)

  const handleDialogConfirm = () => {
    const val =  schema + newUrl;

    if (newUrl) {
      setRequestBaseUrl(val);
      setIsDialogOpen(false);
      urlOptions.push(val);
      setRequestBaseUrl(urlOptions[urlOptions.length-1]);
    }
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
    setNewUrl('');
  };

  function isMobile(): boolean {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Define mobile breakpoint (e.g., 768px)
    const mobileBreakpoint = 768; // Common breakpoint for mobile devices


    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileAgent = /android|avantgo|blackberry|bada|bb10|iemobile|opera mini|opera mobi|phone|mobile|mini|wap/i.test(userAgent);

    return width < mobileBreakpoint || isMobileAgent;
  }

  const handleTabClick = (value: string) => {
    setActiveTab(value); // Update the active tab state
  };

  useEffect(() => {
    setRequestMethod(props.activeEndpoint?.method)
    setRequestUrl(`${props.activeEndpoint?.url}`)
  }, [props.activeEndpoint])

  const handleSendRequest = () => {
    setIsLoading(true)
    axios.request({
      method: requestMethod,
      url: requestUrl,
      headers: JSON.parse(props.activeEndpoint?.headers || "{}"),
      data: JSON.parse(props.activeEndpoint?.body || "{}")
    }).then(response => {
      setResponseData(JSON.stringify({
        message: response.statusText,
        method: requestMethod,
        url: requestUrl,
        headers: JSON.parse(JSON.stringify(response.headers)),
        body: response.data
      }, null, 2))

      setIsLoading(false)
    })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const handleSaveDocumentation = () => {
    // Simulating saving documentation
    setIsLoading(true)
    setTimeout(() => {
      let newEndpoint = props.activeEndpoint;
      newEndpoint.doc = props.activeDocumentation;
      props.setActiveEndpoint(newEndpoint);
      setIsLoading(false)
      props.setIsDocumentationChanged(false)
      setEditingDoc(false);
    }, 1000)
  }

  const handleDocContentChange = (newContent: string) => {
    let newEndpoint = props.activeEndpoint;
    newEndpoint.doc.text = newContent;
    props.setActiveEndpoint(newEndpoint);
    setEditingDoc(false);
  }

  const handleWorkspaceNameEdit = (newName: string) => {
    setIsLoading(true)
    try {
      const response = fetch('http://localhost:9999/api/workspace/rename', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: props.activeWorkspace?.id, name: newName }),
      })
      if (response.ok) {
        props.setActiveWorkspace({ ...props.activeWorkspace, title: newName })
        props.setWorkspaces(props.workspaces?.map(w => w.id === props.activeWorkspace?.id ? { ...w, title: newName } : w))
      } else {
        console.error('Failed to rename workspace')
      }
    } catch (error) {
      console.error('Error renaming workspace:', error)
    }
    setIsLoading(false)
    setEditingWorkspaceName(false)
    props.workspaces!.filter(x => x.id === props.activeWorkspace?.id)[0]!.title = newName;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceNameInputRef.current && !workspaceNameInputRef.current.contains(event.target as Node)) {
        handleWorkspaceNameEdit(workspaceNameInputRef.current.value)
      }

      else if (docContentRef.current && !docContentRef.current.contains(event.target as Node)) {
        handleDocContentChange(docContentRef.current.value)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const addWorkspace = (workspace: Workspace) => {
    props.setWorkspaces([...props.workspaces, workspace])
  }

  const handleChildData = (data: string) => {
    const wsData = JSON.parse(data) as WorkspaceData;
    setIsNewWorkspaceModalOpen(true);
    props.setActiveWorkspace(wsData.activeWorkspace);
    props.setActiveCollection(wsData.activeCollection)
    props.setActiveEndpoint(wsData.activeEndpoint)
    props.setActiveDocumentation(wsData.activeEndpoint.doc);
  };

  return (
    <>

      <div className="flex h-screen bg-gray-900 text-gray-100">
        <style>{pulsingAnimation}</style>

        {/* Left Sidebar */}
        {!isMobile() && <LeftSideBar
          setActiveDocumentation={props.setActiveDocumentation}
          collections={props.activeWorkspace?.collections}
          workspaces={props.workspaces}
          setIsModalOpen={setIsNewWorkspaceModalOpen}
          addWorkspace={addWorkspace}
          activeWorkspace={props.activeWorkspace}
          activeCollection={props.activeCollection}
          setActiveWorkspace={props.setActiveWorkspace}
          setActiveCollection={props.setActiveCollection}
          setActiveEndpoint={props.setActiveEndpoint}
          sendDataToParent={handleChildData} />}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* <header className="bg-gray-800 shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {props.activeWorkspace?.icon === 'Globe' && <Globe className="text-gray-400" size={24} />}
              {props.activeWorkspace?.icon === 'Folder' && <Folder className="text-gray-400" size={24} />}
              {props.activeWorkspace?.icon === 'Users' && <Users className="text-gray-400" size={24} />}

              {editingWorkspaceName ? (
                <input
                  ref={workspaceNameInputRef}
                  type="text"
                  defaultValue={props.activeWorkspace?.name}
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleWorkspaceNameEdit(e.target.value)
                    }
                  }}
                />
              ) : (
                <h2
                  className="text-xl font-semibold cursor-pointer hover:border hover:border-gray-300 hover:rounded-lg px-2 py-1"
                  onClick={() => setEditingWorkspaceName(true)}
                >
                  {props.activeWorkspace?.name}
                </h2>
              )}
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
                <DropdownMenuContent className="bg-gray-700 text-white border-none shadow-[0_0_10px_rgba(255,127,80,0.5)]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header> */}

          <main className="flex-1 p-6 overflow-auto">
            <Tabs defaultValue="request" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-gray-700">
                  <TabsTrigger
                    value="request"
                    className="TabsTrigger"
                    onClick={() => handleTabClick("request")} // Handle tab click
                  >
                    Request
                  </TabsTrigger>
                  <TabsTrigger
                    value="docs"
                    className="TabsTrigger"
                    style={{ marginLeft: 0, marginRight: '-0.5rem' }}
                    onClick={() => handleTabClick("docs")} // Handle tab click
                  >
                    Documentation
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveDocumentation}
                  disabled={!props.isDocumentationChanged}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
              <TabsContent value="request">
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <select
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
                      value={requestMethod}
                      onChange={(e) => setRequestMethod(e.target.value)}
                    >
                      <option>GET</option>
                      <option>POST</option>
                      <option>PUT</option>
                      <option>PATCH</option>
                      <option>DELETE</option>
                    </select>
                    <div>
      <select
        className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
        value={requestMethod}
        onChange={(e) => {
          if (e.target.value === 'Add new...') {
            setIsDialogOpen(true);
            return;
          }
          setRequestBaseUrl(e.target.value);
          setRequestMethod(e.target.value);
        }}
      >
        {urlOptions.map((x, index) => (
          <option key={index} value={x}>
            {x}
          </option>
        ))}
        <option>Add new...</option>
      </select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-0">
          <DialogHeader>
            <DialogTitle>Add New URL</DialogTitle>
          </DialogHeader>
          <div className="py-2">
          <div className="flex flex-row">
            <select value={schema} onChange={(e) => {setSchema(e.target.value)}} className="my-1 mx-4 bg-slate-700 rounded h-8">
              <option>http://</option>
              <option>https://</option>
            </select>
            <Input
              type="text"
              placeholder="Enter new URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full text-black"
            />
          </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogCancel} className="text-black">
              Cancel
            </Button>
            <Button variant="default" onClick={handleDialogConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
                    <Input
                      type="text"
                      placeholder="Enter request URL"
                      value={requestUrl}
                      onChange={(e) => setRequestUrl(e.target.value)}
                      className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
                    />
                    <Button
                      onClick={handleSendRequest}
                      className={`bg-red-500 hover:bg-cyan-600 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isLoading}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <CustomGPTAgent />
                    <Tabs defaultValue="headers" className="w-full">
                      <TabsList className="bg-gray-700">
                        <TabsTrigger value="headers" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Headers</TabsTrigger>
                        <TabsTrigger value="body" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Body</TabsTrigger>
                      </TabsList>
                      <TabsContent value="headers">
                        <div className="border rounded shadow-md">
                          <MonacoEditor
                            height="500px"
                            defaultLanguage="json"
                            defaultValue="{}"
                            theme="vs-dark"
                            value={props.activeEndpoint?.headers}
                            onChange={(value) => {
                              let newEndpoint = props.activeEndpoint;
                              newEndpoint.headers = value ?? "{}";
                              props.setActiveEndpoint(newEndpoint);
                            }}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="body">
                        <div className="border rounded shadow-md">
                          <MonacoEditor
                            height="500px"
                            defaultLanguage="json"
                            defaultValue="{}"
                            theme="vs-dark"
                            value={props.activeEndpoint?.body}
                            onChange={(value) => {
                              let newEndpoint = props.activeEndpoint;
                              newEndpoint.body = (value ?? props.activeEndpoint?.body)

                              props.setActiveEndpoint(newEndpoint);
                            }}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Response</h3>
                    <div className="border rounded shadow-md">
                      <SyntaxHighlighter language="json" style={dracula}>
                        {responseData}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="docs">
                <div className="space-y-4">
                  <MarkdownEditor
                    docTitle={props.activeDocumentation?.title}
                    setDocumentChanged={props.setIsDocumentationChanged}
                    setActiveEndpoint={props.setActiveEndpoint}
                    activeEndpoint={props.activeEndpoint}
                    setEditingTitle={props.setEditingTitle}
                    markdown={doc}
                    setMarkdown={setDoc} 
                    isMobile={isMobile()}
                    />
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>

        {/* Right Sidebar - Endpoints */}
        {!isMobile() && <div className="bg-gray-800 p-6 border-l-2 border-red-400 shadow-md transition-all duration-300 ease-in-out">
          <div className={`${isRightSidebarCollapsed ? 'w-12' : 'w-64'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Endpoints</h2>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <ul>
                {props.activeCollection?.endpoints?.map((endpoint, index) => (
                  <li
                    key={index}
                    className={props.activeEndpoint?.id === endpoint?.id ? 'py-2 cursor-pointer text-red-200' : 'py-2 cursor-pointer'}
                    onClick={() => {
                      props.setActiveEndpoint(endpoint);
                      setDoc(endpoint.doc.text);
                      props.setActiveDocumentationText(endpoint.doc.text ?? "Some basic text.");
                    }}
                  >
                    <span className={`inline-block w-16 ${endpoint?.method === 'GET' ? 'text-green-500' : endpoint?.method === 'POST' ? 'text-blue-500' : endpoint?.method === 'PUT' ? 'text-yellow-500' : 'text-red-500'}`}>
                      {endpoint?.method}
                    </span>
                    {endpoint?.url}
                  </li>
                ))}
              </ul>
            </ScrollArea>

          </div>
        </div>}

        {/* Unsaved Changes Dialog */}
        <AlertDialog open={isUnsavedChangesDialogOpen} onOpenChange={setIsUnsavedChangesDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Would you like to save before exiting?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsUnsavedChangesDialogOpen(false)}>Discard</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                handleSaveDocumentation()
                setIsUnsavedChangesDialogOpen(false)
              }}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Loading animation */}
        {isLoading && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            style={styles.loadingAnimation}
          >
            <div className="text-white text-2xl">Loading...</div>
          </div>
        )}
      </div>

    </>
  )
}

export default Dashboard;