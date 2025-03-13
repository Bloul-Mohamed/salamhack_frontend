import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"
import "../globals.css"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <main className="flex-1">
      <SiteHeader />
      <div>
        {children}
      </div>
    </main>

  )
}

