"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

/**
 * 
 * 
 * use user hook to get user data and display it in the navbar
 */

export function Navbar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto w-[85%] flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            Justi-Fi
          </Link>

          <nav className="hidden md:flex gap-6">
            
            <SignedIn>
              <Link
                href="/user-profile"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/user-profile" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Profile
              </Link>
            </SignedIn>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <SignedIn>
            <UserButton

            />

          </SignedIn>

          <SignedOut>
            <div className="hidden md:flex gap-2">
              <Link href="/sign-in">
                <Button size="sm">Sign In</Button>
              </Link>
            </div>
          </SignedOut>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      route.active ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                <SignedIn>
                  <Link
                    href="/user-profile"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === "/user-profile" ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                </SignedIn>
                <SignedOut>
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href="/sign-in">
                      <Button className="w-full" size="sm">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}