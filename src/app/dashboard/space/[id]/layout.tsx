import type React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Home } from "lucide-react"
import Link from "next/link"

export default function SpaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center h-14 px-4 border-b">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/dashboard">
            <Home className="h-4 w-4" />
          </Link>
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* <div className="font-medium">Space {params.id}</div> */}
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
