'use client'

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BotMessageSquare,
  Sparkles,
  BookUser,
  ListTodo,
  Timer,
  Plane,
  CalendarCheck,
  RotateCw,
  LogOut,
  Settings,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/answer-generator", icon: BotMessageSquare, label: "AI Answer Generator" },
  { href: "/response-improver", icon: Sparkles, label: "Response Improver" },
  { href: "/practice", icon: Timer, label: "Practice Zone" },
  { href: "/saved-responses", icon: BookUser, label: "Saved Responses" },
  { href: "/documents", icon: ListTodo, label: "Document Checklist" },
]

const otherItems = [
    { href: "/apply", icon: Plane, label: "Start Application" },
    { href: "/appointments", icon: CalendarCheck, label: "Appointments" },
    { href: "/renewals", icon: RotateCw, label: "Renewals" },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getPageTitle = () => {
    const allItems = [...navItems, ...otherItems];
    const currentItem = allItems.find(item => pathname.startsWith(item.href));
    return currentItem ? currentItem.label : "Dashboard";
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Icons.logo className="size-8 text-sidebar-primary" />
            <span className="text-xl font-semibold font-headline text-sidebar-foreground">VisaPrep</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
              <div className="my-2 h-px w-full bg-sidebar-border" />
            </SidebarMenuItem>
             {otherItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/login" legacyBehavior passHref>
                    <SidebarMenuButton tooltip={{ children: "Logout" }}>
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 p-2">
            <Avatar className="size-10">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
                <span className="font-semibold truncate">Demo User</span>
                <span className="text-xs text-sidebar-foreground/70 truncate">demo@visaprep.com</span>
            </div>
            <Settings className="ml-auto size-5 shrink-0" />
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h1 className="text-xl font-semibold font-headline">
                    {getPageTitle()}
                </h1>
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
