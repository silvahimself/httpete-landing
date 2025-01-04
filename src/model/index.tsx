import { Session } from "next-auth";

export type PageProps = {
  env: Env
}

export let urlOptions = [
  'http://localhost:5273/api',
  'https://httpete.dev/api'
]



export const baseUrl = 'http://localhost:5273/api';

export type Env = {
    NODE_ENV: 'development' | 'production' | 'test',
    AUTH_SECRET: string
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
  }

export type WorkspaceData = {
    workspaces: Workspace[];
    activeWorkspace: Workspace;
    activeCollection: Collection;
    activeEndpoint: Endpoint;
  };

  export type Workspace = {
    id: number
    title:string
    description:string
    icon:string
    collections: Collection[]
}

export type Collection = {
    id: number
    name: string
    endpoints: Endpoint[]
}

export type Endpoint = {
    id: number
    name: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    headers: string
    body: string
    documentation: Doc
}

export type Doc = {
  id: number,
  type: 'document' | 'folder' | 'file',
  title: string,
  text: string,
  updatedBy?: string | null,
  updated?: Date | null,
  children?: Doc[] | null
}

export type DocsPageProps = {
  setIsDocumentationChanged: (changed: boolean) => void;
  setActiveEndpoint: (endpoint: Endpoint) => void;
  activeEndpoint: Endpoint,
  activeDocumentation: Doc,
  activeWorkspace: Workspace,
  setActiveDocumentation: (doc: Doc) => void;
  setActiveDocumentationText: (txt: string) => void;
  setEditingTitle: (editing: boolean) => void;
  isMobile:boolean,
  session: Session,
  docs: Doc[]
}