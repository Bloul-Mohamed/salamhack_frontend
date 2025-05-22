"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Image className="size-24" src={"/logo.svg"} alt="cv genius logo" width={200} height={200}>

            </Image>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <SignedIn>
              <Link href="/resume/builder" className="transition-colors hover:text-foreground/80">
                Resume Builder
              </Link>
              <Link href="/resume/analyze" className="transition-colors hover:text-foreground/80">
                Resume Analysis
              </Link>
            </SignedIn>
            <Link href="/features" className="transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <ModeToggle />
            <SignedOut>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        <div className="flex md:hidden flex-1 justify-end">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-14 z-50 bg-background md:hidden">
          <div className="container flex h-full flex-col overflow-y-auto pb-12 pt-6">
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
            <nav className="flex flex-col space-y-6 text-lg font-medium">
              <SignedIn>
                <Link href="/resume/builder" className="hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                  Resume Builder
                </Link>
                <Link href="/resume/analyze" className="hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                  Resume Analysis
                </Link>
              </SignedIn>
              <Link href="/features" className="hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                Features
              </Link>
              <Link href="/pricing" className="hover:text-foreground/80" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
            </nav>
            <div className="mt-auto flex flex-col space-y-4 pt-6">
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="w-full" size="sm" asChild>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

