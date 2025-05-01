"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { FileText, FolderPlus } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

interface Space {
  _id: string;
  spaceName: string;
  owner: string;
}

export default function DashboardPage() {
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
      toast("Space created successfully")
    } catch (error) {
      console.error("Failed to create space:", error)
      toast("Failed to create space. Please try again.")
    } finally {
      setLoading(false)
      setIsCreateSpaceOpen(false)
    }
  }

  // Load spaces on component mount
  useEffect(() => {
    fetchSpaces()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to LegalAssist</CardTitle>
          <CardDescription>Organize your legal cases in dedicated spaces</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6">
          <div className="rounded-full bg-muted p-6 mb-4">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-center text-muted-foreground mb-4">
            You don't have any spaces yet. Create a space to start organizing your cases.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Dialog open={isCreateSpaceOpen} onOpenChange={(open) => {
            if (!loading) {
              setIsCreateSpaceOpen(open)
            }
          }}>
            <DialogTrigger asChild>
              <Button disabled={loading}>
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Your First Space
              </Button>
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
        </CardFooter>
      </Card>
    </div>
  )
}
