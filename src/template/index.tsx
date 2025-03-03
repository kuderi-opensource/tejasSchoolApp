"use client"

import type * as React from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { SchoolSidebar } from "./school-sidebar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-full min-h-screen w-full bg-background">
        <SchoolSidebar />
        <div className="flex w-full flex-1 flex-col">
          <Header />
          <main className="flex flex-1 flex-col justify-center overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

const Header = () => {
  return (
    <header className="flex h-[72px] items-center border-b px-4">
      <SidebarTrigger className="md:hidden" />
      <div className="ml-4">School App</div>
    </header>
  )
}

const withLayout = (Component: React.ComponentType) => {
  const WrappedComponent: React.FC = (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )

  WrappedComponent.displayName = `withLayout(${Component.displayName ?? (Component.name || "Component")})`

  return WrappedComponent
}

export { Layout, withLayout }

