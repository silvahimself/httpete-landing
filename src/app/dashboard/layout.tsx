'use client'
import "~/styles/globals.css";
import "~/styles/documentation.scss";

import { GeistSans } from "geist/font/sans";
import 'toastr/build/toastr.min.css';
import DashboardHeader from "~/components/dashboardHeader";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Collection, Doc, Endpoint, Workspace } from "~/model";
import { usePathname } from "next/navigation";
import Dashboard from "./page";
import DocsPage from "./docs/page";
import { Globe, User, Settings, LogOutIcon, File } from "lucide-react";
import { auth } from "~/server/auth";

export type DashboardPageProps = {
  isDocumentationChanged: boolean,
  setIsDocumentationChanged: (changed: boolean) => void,
  workspaces: Workspace[],
  setWorkspaces: (ws: Workspace[]) => void,
  activeEndpoint: Endpoint,
  activeWorkspace: Workspace,
  setActiveWorkspace: (ws: Workspace) => void,
  setActiveEndpoint: (endpoint: Endpoint) => void;
  activeDocumentation: Doc,
  setActiveDocumentation: (doc: Doc) => void;
  activeCollection: Collection,
  setActiveCollection: (collection: Collection) => void;
  setActiveDocumentationText: (text: string) => void;
  setEditingTitle: (editing: boolean) => void;
}

export type LayoutPageProps = {
  children: React.ReactNode,
  dashboardProps: DashboardPageProps
}

// Mock data
const initialWorkspaces: Workspace[] = [
  {
    id: 1, title: "Personal Workspace", description: "My personal API workspace", icon: "Folder",
    collections: [
      {
        id: 1, name: "User API", endpoints: [
          {
            id: 1,
            method: "GET",
            url: "/users",
            headers: '{\n  "Authorization": "Bearer token"\n}', body: '{}',
            doc: {
              id: 1,
              type: 'document',

              title: "Get Users",
              text: '# Lorem Ipsum'
            },
            name: "Get Users",
          },
          {
            id: 2,
            method: "POST",
            url: "/users",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "John Doe",\n  "email": "john@example.com"\n}',
            doc: {
              id: 2,
              type: 'document',

              title: "Create User",
              text: '# Lorem Ipsum 2'
            },
            name: "Create User",
          },
          {
            id: 3,
            method: "PUT",
            url: "/users/{id}",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "Jane Doe"\n}',
            doc: {
              id: 3,
              type: 'document',

              title: "Update User",
              text: '# Lorem Ipsum 3'
            },
            name: "Update User",
          }
        ]
      },
      {
        id: 3, name: "Services API", endpoints: [
          {
            id: 1,
            method: "GET",
            url: "/users",
            headers: '{\n  "Authorization": "Bearer token"\n}', body: '{}',
            doc: {
              id: 4,
              type: 'document',

              title: "Get Users",
              text: '# Lorem Ipsum'
            },
            name: "Get Users",
          },
          {
            id: 2,
            method: "POST",
            url: "/users",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "John Doe",\n  "email": "john@example.com"\n}',
            doc: {
              id: 5,
              type: 'document',

              title: "Create User",
              text: '# Lorem Ipsum 2'
            },
            name: "Create User",
          },
          {
            id: 3,
            method: "PUT",
            url: "/users/{id}",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "Jane Doe"\n}',
            doc: {
              id: 6,
              type: 'document',

              title: "Update User",
              text: '# Lorem Ipsum 3'
            },
            name: "Update User",
          }
        ]
      }
    ]
  },
  {
    id: 2, title: "Team Project", description: "Collaborative API workspace for the team", icon: "Users",
    collections: [
      {
        id: 2, name: "Product API", endpoints: [
          {
            id: 1,
            method: "GET",
            url: "/users",
            headers: '{\n  "Authorization": "Bearer token"\n}', body: '{}',
            doc: {
              id: 7,
              type: 'document',

              title: "Get Users",
              text: '# Lorem Ipsum'
            },
            name: "Get Users",
          },
          {
            id: 2,
            method: "POST",
            url: "/users",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "John Doe",\n  "email": "john@example.com"\n}',
            doc: {
              id: 8,
              type: 'document',

              title: "Create User",
              text: '# Lorem Ipsum 2'
            },
            name: "Create User",
          },
          {
            id: 3,
            method: "PUT",
            url: "/users/{id}",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "Jane Doe"\n}',
            doc: {
              id: 9,
              type: 'document',

              title: "Update User",
              text: '# Lorem Ipsum 3'
            },
            name: "Update User",
          }
        ]
      },
      {
        id: 4, name: "Email API", endpoints: [
          {
            id: 1,
            method: "GET",
            url: "/users",
            headers: '{\n  "Authorization": "Bearer token"\n}', body: '{}',
            doc: {
              id: 10,
              type: 'document',

              title: "Get Users",
              text: '# Lorem Ipsum'
            },
            name: "Get Users",
          },
          {
            id: 2,
            method: "POST",
            url: "/users",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "John Doe",\n  "email": "john@example.com"\n}',
            doc: {
              id: 11,
              type: 'document',

              title: "Create User",
              text: '# Lorem Ipsum 2'
            },
            name: "Create User",
          },
          {
            id: 3,
            method: "PUT",
            url: "/users/{id}",
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "name": "Jane Doe"\n}',
            doc: {
              id: 12,
              type: 'document',

              title: "Update User",
              text: '# Lorem Ipsum 3'
            },
            name: "Update User",
          }
        ]
      }
    ]
  },
]

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode}>) {
  const { data: session, status } = useSession();
  const [workspaces, setWorkspaces] = useState(session?.user.workspaces)
  const [isDocumentationChanged, setIsDocumentationChanged] = useState(false)
  const [activeWorkspace, setActiveWorkspace] = useState(session?.user.workspaces[0]);
  const [activeCollection, setActiveCollection] = useState(activeWorkspace?.collections[0]!)
  const [activeEndpoint, setActiveEndpoint] = useState(activeCollection?.endpoints[0]!)
  const [activeDocumentation, setActiveDocumentation] = useState(activeEndpoint?.doc)
  const [editingTitle, setEditingTitle] = useState(false)
// Effect to update states when session changes or updates
useEffect(() => {
  if (session && session.user) {
      setWorkspaces(session.user.workspaces || []);
      const initialWorkspace = session.user.workspaces?.[0] || null;
      setActiveWorkspace(initialWorkspace);
      setActiveCollection(initialWorkspace?.collections?.[0] || null);
      setActiveEndpoint(activeCollection?.endpoints?.[0] || null);
      setActiveDocumentation(activeEndpoint?.doc || null);
      console.log('upd', session)
  }
}, [session]);

  const setActiveDocumentationText = (text: string) => {
    let d = activeDocumentation;
    d.text = text;
    let end = activeEndpoint;
    end.doc = d;
    setActiveEndpoint(end)
    setActiveDocumentation(d);
  }
  const currentPath = usePathname();

  const title = currentPath === '/dashboard/docs' ? 'Documentation'
    : currentPath === '/dashboard' ? 'API Interface'
    : currentPath === '/dashboard/community' ? 'Community'
    : 'Unknown Page' 

  function isMobile(): boolean {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Define mobile breakpoint (e.g., 768px)
    const mobileBreakpoint = 768; // Common breakpoint for mobile devices


    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileAgent = /android|avantgo|blackberry|bada|bb10|iemobile|opera mini|opera mobi|phone|mobile|mini|wap/i.test(userAgent);

    return width < mobileBreakpoint || isMobileAgent;
  }
  
  const menuEntries = [
    { title: 'API Interface', icon: <Globe className="w-6 h-6 text-white" />, path: '/dashboard' },
    { title: 'Documentation', icon: <File className="w-6 h-6 text-white" />, path: '/dashboard/docs' },
    { title: 'Profile', icon: <User className="w-6 h-6 text-white" />, path: '/dashboard/profile' },
    { title: 'Settings', icon: <Settings className="w-6 h-6 text-white" />, path: '/dashboard/settings' },
    { title: 'Sign out', icon: <LogOutIcon className="w-6 h-6 text-white" />, path: '/sign-out' }
]
  return (
      <body className={`${GeistSans.variable} custom-scrollbar`} style={{maxWidth:'100%'}}>
        <DashboardHeader setActiveWorkspace={setActiveWorkspace} activeWorkspace={activeWorkspace} workspaces={workspaces} isMobile={isMobile()} title={title} />
        {usePathname() === '/dashboard' ?
          <Dashboard
            activeCollection={activeCollection}
            activeDocumentation={activeDocumentation}
            activeEndpoint={activeEndpoint}
            activeWorkspace={activeWorkspace}
            isDocumentationChanged={isDocumentationChanged}
            setActiveCollection={setActiveCollection}
            setActiveDocumentation={setActiveDocumentation}
            setActiveEndpoint={setActiveEndpoint}
            setActiveWorkspace={setActiveWorkspace}
            setIsDocumentationChanged={setIsDocumentationChanged}
            setWorkspaces={setWorkspaces}
            workspaces={workspaces}
            setActiveDocumentationText={setActiveDocumentationText}
            setEditingTitle={setEditingTitle}
          />
          : usePathname() === '/dashboard/docs' ?
            <DocsPage
              activeDocumentation={activeDocumentation}
              activeEndpoint={activeEndpoint}
              setActiveDocumentation={setActiveDocumentation}
              setActiveDocumentationText={setActiveDocumentationText}
              setActiveEndpoint={setActiveEndpoint}
              setIsDocumentationChanged={setIsDocumentationChanged}
              activeWorkspace={activeWorkspace}
              isMobile={isMobile()}
              setEditingTitle={setEditingTitle}
            />
            : <>{children}</>
        }
      </body>
  );
}