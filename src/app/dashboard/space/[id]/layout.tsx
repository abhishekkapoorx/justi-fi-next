"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Home } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SpaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <header className="flex items-center h-12 sm:h-14 px-3 sm:px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <Button variant="ghost" size="icon" asChild className="mr-1 sm:mr-2 h-8 w-8 sm:h-9 sm:w-9">
          <Link href="/dashboard">
            <Home className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
        <Separator orientation="vertical" className="mx-1 sm:mx-2 h-4 sm:h-6" />
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden w-full">{children}</div>
    </div>
  )
}
