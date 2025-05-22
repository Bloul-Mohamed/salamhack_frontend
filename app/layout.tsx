import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"
import "./globals.css"
import { Inter } from "next/font/google"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "CV Genius - AI-Powered Resume Builder",
  icons: {
    icon: '/logo.svg',
  },
  description: "Create professional resumes with AI assistance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
            <div className="relative flex min-h-screen max-w-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <Toaster />
            </div>
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>

  )
}



import './globals.css'