'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, Settings, CreditCard, Globe, Menu, File, LogOut } from 'lucide-react'
import { cn } from "~/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar'
import DashboardHeader, { DashboardBtnLarge, DropdownMenuEntry } from '~/components/dashboardHeader'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { SessionProvider, signOut } from 'next-auth/react'
import { GeistSans } from 'geist/font/sans'
import SettingsSidebar from '~/components/sidebar/settings-sidebar'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'

const menuItems = [
  { icon: <User />, label: 'Profile', href: '/settings/profile' },
  { icon: <Settings />, label: 'Account', href: '/settings/account' },
  { icon: <CreditCard/>, label: 'Billing', href: '/settings/billing' },
]

type SettingsHeaderProps = {
  isMobile: boolean
}
function isMobile(): boolean {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Define mobile breakpoint (e.g., 768px)
  const mobileBreakpoint = 768; // Common breakpoint for mobile devices


  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobileAgent = /android|avantgo|blackberry|bada|bb10|iemobile|opera mini|opera mobi|phone|mobile|mini|wap/i.test(userAgent);

  return width < mobileBreakpoint || isMobileAgent;
}
const SettingsHeader = (props: SettingsHeaderProps) => {
  const router = useRouter()

  return (
      <header className="bg-gray-800 py-6 sticky w-full border-b-2 border-red-400 shadow-lg">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center">
                  <Image src="https://utfs.io/f/5VzIfIO6yTtGnHrN3BtGQJcDXfzP96NBie4G3S2vqupKLw58" alt="HttPete Logo" width={40} height={40} className="mr-4" />
                  <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
              <div className="flex mt-14" style={{width:'80%'}}>
                  {props.isMobile ?
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost">
                                  <Menu className="text-white bg-slate-600 rounded-3xl" style={{ width: '40px', height: '40px', padding: '5px' }} />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-700 text-white border-none shadow-[0_0_10px_rgba(255,127,80,0.5)]">
                              {menuItems.map(x =>
                                  <DropdownMenuEntry title={x.label} icon={x.icon} path={x.href} />
                              )}
                          </DropdownMenuContent>
                      </DropdownMenu>
                      : <div className="w-full flex flex-wrap-reverse">
                          <div className="flex absolute right-4 gap-2 mt-2" style={{ height: '60px', padding: '5px' }}>
                              <DashboardBtnLarge title="API Interface" path="/dashboard" icon={<Globe className="w-6 h-6 mx-2 text-white" />} />
                              <DashboardBtnLarge title="Documentation" path="/dashboard/docs" icon={<File className="w-6 h-6 mx-2 text-white" />} />
                              <DashboardBtnLarge title="Settings" path="/settings" icon={<Settings className="w-6 h-6 mx-2 text-white" />} />
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
                                        <DropdownMenuItem onClick={() => signOut({callbackUrl:'/'})}>
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

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  return (
    <SessionProvider>
      <body className={`${GeistSans.variable}`} style={{maxWidth:'100%'}}>
        <SettingsHeader isMobile={isMobile()}  />
        <>{children}</>
      </body>
    </SessionProvider>
  )
}

