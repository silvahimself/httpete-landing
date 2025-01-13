import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";
import { baseUrl, Workspace } from "~/model";
import axios from "axios";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };

type NewWorkspaceDTO = {
    userId: number,
    wsName: string
}

export async function createNewWorkspace(dto: NewWorkspaceDTO): Promise<Workspace> {
    return await axios.post(baseUrl + '/api/workspace/create', { dto })
        .then((res) => {
            return res.data as Workspace;
        })
        .catch(err => {
            console.log('Error creating workspace: ', err);
            return {} as Workspace;
        })
}

export async function getWorkspaces(userId: number)
{
    return await axios.get(baseUrl + '/workspace/get-for-user?userId=' + userId)
        .then(res => {return res.data as Workspace[];}) || [] as Workspace[]
}