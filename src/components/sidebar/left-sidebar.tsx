'use client'
import { Plus, Folder, GitBranch, Globe, Users, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Collection, Doc, Endpoint, Workspace } from "~/model";

type LeftSidebarProps = {
  sendDataToParent: (data: string) => void;
  setIsModalOpen: (open: boolean) => void;
  addWorkspace: (ws: Workspace) => void;
  setActiveWorkspace: (ws: Workspace) => void;
  setActiveCollection: (ws: Collection) => void;
  setActiveEndpoint: (ws: Endpoint) => void;
  setActiveDocumentation: (doc: Doc) => void;
  collections: Collection[];
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  activeCollection: Collection;
};

const LeftSideBar = (props: LeftSidebarProps) => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false)
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('My Workspace');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('My Workspace Description');
  const [newWorkspaceIcon, setNewWorkspaceIcon] = useState("Folder")

  const handleCreateNewWorkspace = () => {
    const ids = props.workspaces.map(x => x.id);
    const newId = Math.max(...ids) + 1;
    const newWorkspace = {
      id: newId,
      title: newWorkspaceName,
      description: newWorkspaceDescription,
      icon: newWorkspaceIcon,
    } as Workspace;
    props.addWorkspace(newWorkspace)
    props.setActiveWorkspace(newWorkspace)
    setIsNewWorkspaceModalOpen(false)
    setNewWorkspaceName(newWorkspace.title)
    setNewWorkspaceDescription(newWorkspace.description)
    setNewWorkspaceIcon(newWorkspace.icon)
  }

  return (
    <div className="bg-gray-800 border-r-2 border-red-400 p-6 shadow-md transition-all duration-300 ease-in-out">
      {isLeftSidebarCollapsed ? <ChevronRight className="text-gray-500 hover:text-gray-300" style={{position:'absolute', bottom:'1rem', left:'1rem'}} size={32} onClick={() => setIsLeftSidebarCollapsed(false)}/>
      : 
      <div
        className="flex flex-row gap-2 text-gray-500 hover:text-gray-300"
        style={{position:'absolute', bottom:'1rem', left:'1rem'}}
        onClick={() => setIsLeftSidebarCollapsed(true)}
      >
      <ChevronLeft size={32}/>
        <span className="mt-1 hover:cursor-default">Collapse</span>
      </div>
      }
      <div className={`${isLeftSidebarCollapsed ? 'w-2' : 'w-64'}`}>
          {isLeftSidebarCollapsed 
          ? <>
          </>
          : <>
        <div className="flex justify-between items-center mb-2 mt-8">
          <h2 className="font-semibold mb-2">Collections</h2>
          <Dialog open={isNewWorkspaceModalOpen} onOpenChange={setIsNewWorkspaceModalOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => setIsNewWorkspaceModalOpen(true)} >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent style={{backgroundColor:'#111827'}}>
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
                <DialogDescription>
                  Enter the details for your new workspace?.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    className="col-span-3 text-black"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newWorkspaceDescription}
                    onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                    className="col-span-3 text-black"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">
                    Icon
                  </Label>
                  <Select onValueChange={setNewWorkspaceIcon} defaultValue={newWorkspaceIcon}>
                    <SelectTrigger className="col-span-3 text-black">
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Folder">Folder</SelectItem>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="Globe">Globe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateNewWorkspace}>Create Workspace</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
          <div className="mt-1">
            <ul>
              {props.activeWorkspace?.collections?.map((collection) => (
                <li
                  key={collection.id}
                  className={`py-2 cursor-pointer ${props.activeCollection?.id === collection.id ? "text-cyan-400" : ""
                    }`}
                  onClick={() => {
                    props.setActiveCollection(collection)
                    props.setActiveEndpoint(collection.endpoints[0]!);
                    props.setActiveDocumentation(collection.endpoints[0]!.docContent?.toString()??"");
                  }}
                >
                  <GitBranch className="inline-block mr-2" size={16} />
                  {collection.name}
                </li>
              ))}
            </ul>
          </div>
          </>}
      </div>
      
    </div>
  )
}

export default LeftSideBar;