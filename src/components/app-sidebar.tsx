"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, FileText, Home, Plus, Settings, User } from "lucide-react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { toast } from "sonner" 

// Space interface
interface Space {
  _id: string;
  spaceName: string;
  owner: string;
}

export function AppSidebar() {
  const pathname = usePathname()
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false)
  const [newSpaceName, setNewSpaceName] = useState("")
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loading, setLoading] = useState(true)

  // Function to check if a path is active
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/")
  }

  // Fetch spaces from API
  const fetchSpaces = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/spaces')
      setSpaces(response.data)
    } catch (error) {
      console.error("Failed to fetch spaces:", error)
      // toast({
      //   title: "Error",
      //   description: "Failed to load your spaces. Please try again.",
      //   variant: "destructive",
      // })
      toast("Failed to load your spaces. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle space creation
  const handleCreateSpace = async () => {
    if (!newSpaceName.trim()) return
    
    try {
      setLoading(true)
      const response = await axios.post('/api/spaces', { spaceName: newSpaceName })
      setSpaces(prevSpaces => [response.data, ...prevSpaces])
      setNewSpaceName("")
      setIsCreateSpaceOpen(false)
      // toast({
      //   title: "Success",
      //   description: "Space created successfully",
      // })
      toast("Space created successfully")
    } catch (error) {
      console.error("Failed to create space:", error)
      // toast({
      //   title: "Error",
      //   description: "Failed to create space. Please try again.",
      //   variant: "destructive",
      // })
      toast("Failed to create space. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Load spaces on component mount
  useEffect(() => {
    fetchSpaces()
  }, [])

  return (
    <Sidebar>
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Link href="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Spaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {loading && <div className="px-4 py-2 text-sm text-muted-foreground">Loading spaces...</div>}
              {!loading && spaces.length === 0 && (
                <div className="px-4 py-2 text-sm text-muted-foreground">No spaces found. Create one below.</div>
              )}
              {spaces.map((space) => (
                <SidebarMenuItem key={space._id}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(`/dashboard/space/${space._id}`)} 
                    tooltip={space.spaceName}
                  >
                    <Link href={`/dashboard/space/${space._id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>{space.spaceName}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Dialog open={isCreateSpaceOpen} onOpenChange={setIsCreateSpaceOpen}>
                  <DialogTrigger asChild>
                    <SidebarMenuButton>
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create New Space</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Space</DialogTitle>
                      <DialogDescription>Enter a name for your new case space.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="space-name">Space Name</Label>
                        <Input
                          id="space-name"
                          placeholder="e.g., Smith v. Johnson"
                          value={newSpaceName}
                          onChange={(e) => setNewSpaceName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newSpaceName.trim()) {
                              handleCreateSpace();
                            }
                          }}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleCreateSpace} 
                        disabled={!newSpaceName.trim() || loading}
                      >
                        {loading ? 'Creating...' : 'Create Space'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}






