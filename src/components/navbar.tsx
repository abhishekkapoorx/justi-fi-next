"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import JustiFiLogo from "./JustiFiLogo"
// import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <JustiFiLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contact"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Contact
          </Link>
          <Link
            href="/pricing"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/pricing"
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Pricing
          </Link>
          <SignedIn>
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
          </SignedIn>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* <ModeToggle /> */}
          
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="hidden md:flex">
              <Link href="/sign-in">
                <Button size="sm">Sign In</Button>
              </Link>
            </div>
          </SignedOut>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] md:w-[350px]">
              <div className="flex flex-col gap-6 p-6">
                {/* Theme Toggle */}
                {/* <div className="flex items-center justify-between border-b pb-4">
                  <span className="text-sm font-medium text-foreground">Theme</span>
                  <ModeToggle />
                </div> */}
                
                {/* Navigation Links */}
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/about"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md",
                      pathname === "/about"
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md",
                      pathname === "/contact"
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md",
                      pathname === "/pricing"
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Pricing
                  </Link>
                </nav>
                
                {/* User Section */}
                <div className="border-t pt-4">
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-md block",
                        pathname === "/dashboard"
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </SignedIn>

                  <SignedOut>
                    <Link href="/sign-in" onClick={() => setOpen(false)}>
                      <Button className="w-full cursor-pointer" size="sm">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
