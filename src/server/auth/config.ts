import { DefaultSession, NextAuthConfig } from "next-auth";
import { Collection, Doc, Endpoint, Workspace } from "~/model";
import { JWT as J } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
    token: JWT;
  }

  interface User {
    expires: Date,
    workspaces:Workspace[],
    activeWorkspace: Workspace
    activeCollection: Collection
    activeEndpoint: Endpoint
    activeDocument: Doc,
    hasPassword: boolean,
    docs: Doc[]
  }

  interface JWT extends J {
    workspaces:Workspace[],
    activeWorkspace: Workspace
    activeCollection: Collection
    activeEndpoint: Endpoint
    activeDocument: Doc,
    docs: Doc[]
  }
}

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [

  ],
};