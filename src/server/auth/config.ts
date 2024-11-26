import axios from "axios";
import { Session, User, DefaultSession, NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AtlassianProvider from "next-auth/providers/atlassian";
import { Collection, Doc, Endpoint, Workspace } from "~/model";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User {
    workspaces: Workspace[];
    expires: Date,
    activeWorkspace: Workspace
    activeCollection: Collection
    activeEndpoint: Endpoint
    activeDocument: Doc
  }
}

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AtlassianProvider({
      clientId: process.env.BITBUCKET_CLIENT_ID,
      clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, user, credentials, email, profile }) {
      try {
        const payload = {
          name: user.name,
          email: user.email,
          image: user.image,
          oauthProvider: account?.provider,
          oauthProviderAccountId: account?.providerAccountId
        }

        const res = await axios.post('http://localhost:5273/api/account/github', payload);
        user.id = res.data.user.id;
        user.workspaces = res.data.workspaces;
        // user.activeWorkspace = res.data.workspaces[0];
        // user.activeCollection = user.activeWorkspace.collections[0] ?? {} as Collection;
        // user.activeEndpoint = user.activeCollection.endpoints[0] ?? {} as Endpoint;
        // user.activeDocument = user.activeEndpoint.doc;

      } catch (error) {
        console.error('Error during sign-in process:', error);
        return false; // Prevent sign-in on error
      }

      return true; // Sign-in successful
    },

    async session({ session, token }) {
      // Assign the fetched properties from token into session
      if (token) {
        session.user.id = token.id + '';
        session.user.workspaces = token.workspaces! as Workspace[];
        session.user.activeWorkspace = session.user.workspaces[0] as Workspace;
        session.user.activeCollection = session.user.workspaces[0]?.collections[0] as Collection;
        session.user.activeEndpoint = session.user.workspaces[0]?.collections[0]?.endpoints[0] as Endpoint;
        session.user.activeDocument = session.user.workspaces[0]?.collections[0]?.endpoints[0]?.doc as Doc
        session.user.name = token.name || '';
        session.user.email = token.email || '';
        session.user.image = token.image + '';
      }
      return session; // Return the updated session
    },

    async jwt({ token, user }) {
      if (user) {
          // Set user properties on the token when the user is first signed in
          token.id = user.id;
          token.workspaces = user.workspaces; // Store workspaces in token
          token.activeWorkspace = user.workspaces[0] as Workspace;
          token.activeCollection = user.workspaces[0]?.collections[0] as Collection;
          token.activeEndpoint = user.workspaces[0]?.collections[0]?.endpoints[0] as Endpoint;
          token.activeDocument = user.workspaces[0]?.collections[0]?.endpoints[0]?.doc as Doc
          token.name = user.name; // Store user's name
          token.email = user.email; // Store user's email
          token.image = user.image; // Store user's image
      }
      return token; // Return the updated token
  }
}
};