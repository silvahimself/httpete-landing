'use client'
import Image from "next/image"
import { ChevronDown, File, FileText, Folder, Globe, LogOut, LogOutIcon, Menu, Settings, User, Users } from "lucide-react"
import { redirect, usePathname, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { urlOptions, Workspace } from "~/model"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { createNewWorkspace } from "~/server/auth"

type HeaderProps = {
    title: string,
    isMobile: boolean,
    activeWorkspace: Workspace,
    setActiveWorkspace: (ws: Workspace) => void;
    workspaces: Workspace[],
}
// <DropdownMenuEntry title='API Interface' icon={} path='/dashboard' />
// <DropdownMenuEntry title='Documentation' icon={<File className="w-6 h-6 text-white" />} path='/dashboard/docs' />
// <DropdownMenuEntry title='Profile' icon={<User className="w-6 h-6 text-white" />} path='/profile' />
// <DropdownMenuEntry title='Settings' icon={<Settings className="w-6 h-6 text-white" />} path='/settings' />
// <DropdownMenuEntry title='Sign out' icon={<LogOutIcon className="w-6 h-6 text-white" />} path='/settings' />
const menuEntries = [
    { title: 'API Interface', icon: <Globe className="w-6 h-6 text-white" />, path: '/dashboard' },
    { title: 'Documentation', icon: <File className="w-6 h-6 text-white" />, path: '/dashboard/docs' },
    { title: 'Community', icon: <Users className="w-6 h-6 text-white" />, path: '/dashboard/community' },
    { title: 'Settings', icon: <Settings className="w-6 h-6 text-white" />, path: '/settings' },
    { title: 'Sign out', icon: <LogOutIcon className="w-6 h-6 text-white" />, path: '/sign-out' }
]

type DropdownMenuEntryProps = {
    title: string,
    icon: React.ReactNode,
    path: string
}
export const DropdownMenuEntry = (props: DropdownMenuEntryProps) => {
    const currentPath = usePathname();
    const router = useRouter();

    return (
        <DropdownMenuItem onClick={() => {
            if (props.title === 'Sign out') {
                signOut({ callbackUrl: '/' })
                return;
            }

            router.push(props.path)
        }
        }>
            <div className={'rounded-sm w-full flex p-2' + (currentPath === props.path ? ' bg-red-400' : ' bg-slate-600')}>
                {props.icon}
                <span className="px-2">
                    {props.title}
                </span>
            </div>
        </DropdownMenuItem>
    )
}

type DashboardDropdownLargeProps = {
    title: string,
    icon: React.ReactNode,
    path: string,
}

type DashboardBtnLargeProps = {
    path: string,
    icon: React.ReactNode,
    title: string,
}

export const DashboardDropdownLarge = (props: DashboardDropdownLargeProps) => {
    const router = useRouter();
    const path = usePathname();
    const isActive = path === props.path;
    const { data: session } = useSession();
    const [activeWorkspace, setActiveWorkspace] = useState(session?.user.workspaces[0] ?? { id: 0 } as Workspace)
    const [workspaces, setWorkspaces] = useState(session?.user.workspaces)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState('');


    const handleDialogConfirm = () => {
        const userId = parseInt(session?.user.id ?? '-1');
        if (userId === -1) {
            return;
        }
        
        const created = createNewWorkspace({userId: userId, wsName: newWorkspaceName})
    };

    const handleDialogCancel = () => {
        setIsDialogOpen(false);
    };
    useEffect(() => {
        setActiveWorkspace(session?.user.activeWorkspace ?? session?.user.workspaces[0] ?? { id: 0 } as Workspace)
        setWorkspaces(session?.user.workspaces);
        console.log('eff', session)
    }, [session])
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={"flex float-left text-white border-2 border-gray-600 p-3 rounded-full hover:bg-gray-600 transition duration-300"}>
                    <span style={{ marginLeft: '1rem' }}>
                        {session?.user.activeWorkspace?.title ?? session?.user.workspaces[0]?.title}
                    </span>
                    <ChevronDown width={32} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ backgroundColor: '#ffffff32' }} className="text-white space-y-2 border-none">
                {session?.user.workspaces?.filter(x => x.id !== activeWorkspace?.id).map(x =>
                    <Button
                        className={'rounded-sm w-full flex p-2 border-2'}
                        onClick={() => { setActiveWorkspace(x) }}
                    >
                        <span className="px-2">
                            {x.title}
                        </span>
                    </Button>
                )}
                <Button
                    className={'rounded-sm w-full flex p-2 border-2'}
                    onClick={() => {
                        setIsDialogOpen(true);
                    }}
                >
                    <span className="px-2">
                        Add new...
                    </span>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-slate-800 border-0">
                <DialogHeader>
                    <DialogTitle>Create a new Workspace</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                    <div className="flex flex-col">
                        <label htmlFor="wsName" className="block text-2xl font-medium text-gray-300 mb-2">Name</label>
                        <Input
                            id="wsName"
                            type="text"
                            placeholder="My New Workspace"
                            value={''}
                            onChange={(e) => { }}
                            className="w-full text-white placeholder:text-gray-300 border-0 bg-slate-600"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleDialogCancel} className="text-white bg-transparent">
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleDialogConfirm} className="text-slate-800 bg-white">
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    </>
}

export const DashboardBtnLarge = (props: DashboardBtnLargeProps) => {
    const router = useRouter();
    const path = usePathname();
    const isActive = path === props.path;

    return <>
        <button onClick={() => {
            router.push(props.path)
        }}
            className={("flex text-white border-2 border-red-50 p-3 rounded-full hover:bg-gray-600 transition duration-300") + (isActive === true ? ' bg-red-500' : '')}>
            {props.icon}
            {props.title}
        </button>
    </>
}

export const DashboardHeader = (props: HeaderProps) => {
    const router = useRouter()
    const { data: session, status } = useSession();
    const [workspaces, setWorkspaces] = useState([] as Workspace[])
    const [activeWorkspace, setActiveWorkspace] = useState({} as Workspace)

    useEffect(() => {
        setWorkspaces(session?.user.workspaces)
        setActiveWorkspace(session?.user.workspaces[0])
    }, [session])
    return (
        <header className="bg-gray-800 py-6 sticky w-full border-b-2 border-red-400 shadow-lg">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="https://utfs.io/f/5VzIfIO6yTtGnHrN3BtGQJcDXfzP96NBie4G3S2vqupKLw58" alt="HttPete Logo" width={40} height={40} className="mr-4" />
                    <h1 className="text-3xl font-bold text-white">HttPete</h1>
                </div>
                <div className="flex" style={{ width: '80%' }}>
                    {props.isMobile ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    <Menu className="text-white bg-slate-600 rounded-3xl" style={{ width: '40px', height: '40px', padding: '5px' }} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-700 text-white border-none shadow-[0_0_10px_rgba(255,127,80,0.5)]">
                                {menuEntries.map(x =>
                                    <DropdownMenuEntry title={x.title} icon={x.icon} path={x.path} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        : <div className="w-full flex flex-wrap-reverse">
                            <div className="float-left gap-2 mt-2" style={{ height: '60px', padding: '5px' }}>
                                <DashboardDropdownLarge title="APIs Interface" path="/dashboard" icon={<Globe className="w-6 h-6 mx-2 text-white" />} />
                            </div>
                            <div className="flex absolute right-4 gap-2 mt-2" style={{ height: '60px', padding: '5px' }}>
                                {menuEntries.map(x =>
                                    <DashboardBtnLarge title={x.title} path={x.path} icon={x.icon} />
                                )}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size={'icon'}>
                                            <Avatar className="bg-slate-300 text-slate-800 ml-2">
                                                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                                <AvatarFallback >CN</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mr-12 mt-8 scale-125 bg-slate-800 border-2 text-white">
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>
                                                Profile
                                            </span>
                                        </DropdownMenuItem>
                                        {/* <DropdownMenuSeparator /> */}
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>
                                                Settings
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </header>
    )
}

export default DashboardHeader;