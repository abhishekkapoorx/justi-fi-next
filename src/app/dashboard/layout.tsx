import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col w-full">
            {/* Sidebar Toggle Button */}
            <div className="flex items-center gap-2 border-b px-4 py-2">
              <SidebarTrigger className="h-8 w-8" />
            </div>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
