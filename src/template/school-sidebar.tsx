import * as React from "react"

import {
  BookOpen,
  FileBarChart2,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SchoolSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard
    },
    {
      href: "/teachers",
      label: "Teachers",
      icon: Users
    },
    {
      href: "/students",
      label: "Students",
      icon: GraduationCap
    },
    {
      href: "/classes",
      label: "Classes",
      icon: BookOpen
    },
    {
      href: "/reports",
      label: "Reports",
      icon: FileBarChart2
    }
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border/50 p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="aspect-square w-20 rounded-xl bg-gradient-to-br from-primary/80 to-primary shadow-lg" />
          <h1 className="mt-4 text-lg font-semibold">School App</h1>
          <p className="text-sm text-muted-foreground">Management Portal</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="space-y-2">
          {routes.map((route) => {
            const Icon = route.icon
            const isActive = pathname === route.href
            
            return (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={route.label}
                  size="lg"
                  className="hover:bg-primary/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary [&_svg]:data-[active=true]:text-primary"
                  isActive={isActive}
                >
                  <Link href={route.href}>
                    <Icon className="h-5 w-5" />
                    <span className="text-base font-medium">{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
} 