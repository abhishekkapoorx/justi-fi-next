"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Plus, Upload } from "lucide-react"

interface DocumentItem {
  _id: string
  title: string
  secureUrl: string
  createdAt: string
}

interface ThreadItem {
  _id: string
  title: string
  createdAt: string
}

type Props = { params: Promise<{ id: string }> }

export default function SpacePage(props: Props) {
  const params = use(props.params)
  const { id: spaceId } = params
  const router = useRouter()

  const [docs, setDocs] = useState<DocumentItem[]>([])
  const [threads, setThreads] = useState<ThreadItem[]>([])
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [loadingThreads, setLoadingThreads] = useState(true)

  const [uploadOpen, setUploadOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [threadOpen, setThreadOpen] = useState(false)
  const [newThreadName, setNewThreadName] = useState("")
  const [isCreatingThread, setIsCreatingThread] = useState(false)

  // fetch documents
  useEffect(() => {
    setLoadingDocs(true)
    fetch(`/api/spaces/${spaceId}/documents`)
      .then((res) => res.json())
      .then((data: DocumentItem[]) => setDocs(data))
      .catch((e) => console.error("Failed loading docs", e))
      .finally(() => setLoadingDocs(false))
  }, [spaceId])

  // fetch threads
  useEffect(() => {
    setLoadingThreads(true)
    fetch(`/api/spaces/${spaceId}/threads`)
      .then((res) => res.json())
      .then((data: ThreadItem[]) => setThreads(data))
      .catch((e) => console.error("Failed loading threads", e))
      .finally(() => setLoadingThreads(false))
  }, [spaceId])

  // handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return
    setIsUploading(true)
    
    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const res = await fetch(`/api/spaces/${spaceId}/documents`, {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        const doc: DocumentItem = await res.json()
        setDocs((prev) => [doc, ...prev])
        setUploadOpen(false)
        setSelectedFile(null)
      } else {
        console.error("Upload failed", await res.json())
      }
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // handle new thread creation
  const handleCreateThread = async () => {
    if (!newThreadName.trim()) return
    setIsCreatingThread(true)
    
    try {
      const res = await fetch(`/api/spaces/${spaceId}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newThreadName }),
      })
      if (res.ok) {
        const thread: ThreadItem = await res.json()
        setThreads((prev) => [thread, ...prev])
        setThreadOpen(false)
        setNewThreadName("")
        // navigate into newly created thread
        router.push(`/dashboard/space/${spaceId}/thread/${thread._id}`)
      } else {
        console.error("Thread creation failed", await res.json())
      }
    } catch (error) {
      console.error("Thread creation error:", error)
    } finally {
      setIsCreatingThread(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4 h-full w-full overflow-auto">
      {/* Left column */}
      <div className="flex flex-col gap-3 sm:gap-4 flex-1 lg:max-w-[50%]">
        {/* Documents */}
        <Card className="flex-1 min-h-[40vh] max-h-[60vh] lg:max-h-[50vh]">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2 sm:gap-0">
            <div className="min-w-0">
              <Link href={`/dashboard/space/${spaceId}/documents`}>
                <CardTitle className="text-base sm:text-lg hover:text-primary cursor-pointer">Documents</CardTitle>
              </Link>
              <CardDescription className="text-xs sm:text-sm">Case-related documents</CardDescription>
            </div>
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <Button size="sm" disabled={isUploading} className="w-full sm:w-auto">
                  <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Upload</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>Upload a document to this case space.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="file">File</Label>
                    <Input id="file" type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            {loadingDocs ? (
              <p>Loading…</p>
            ) : docs.length > 0 ? (
              <div className="space-y-2">
                {docs.map((doc) => (
                  <a
                    key={doc._id}
                    href={doc.secureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No documents yet</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setUploadOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Case Insights (static for now) */}
        <Card className="flex-1 min-h-[40vh] max-h-[60vh] lg:max-h-[50vh]">
          <CardHeader className="pb-2">
            <Link href={`/dashboard/space/${spaceId}/insights`}>
              <CardTitle className="text-base sm:text-lg hover:text-primary cursor-pointer">Case Insights</CardTitle>
            </Link>
            <CardDescription className="text-xs sm:text-sm">AI-generated insights from your documents</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            <Tabs defaultValue="summary">
              <TabsList className="grid grid-cols-3 mb-4 h-8 sm:h-10 w-full">
                <TabsTrigger value="summary" className="text-xs sm:text-sm flex-1 min-w-0">Summary</TabsTrigger>
                <TabsTrigger value="support" className="text-xs sm:text-sm flex-1 min-w-0">Support</TabsTrigger>
                <TabsTrigger value="opposition" className="text-xs sm:text-sm flex-1 min-w-0">Opposition</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="space-y-3 sm:space-y-4">
                <div className="rounded-md bg-muted p-3 sm:p-4">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Case Overview</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {/* Replace with real data */}
                    This case involves a contract dispute…
                  </p>
                </div>
                <div className="rounded-md bg-muted p-3 sm:p-4">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Key Dates</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {/* Replace with real data */}
                    Contract signed: Jan 15, 2023…
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="support" className="space-y-2 sm:space-y-3">
                <div className="rounded-md bg-muted p-3 sm:p-4">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Supporting Arguments</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2">
                    {/* Replace with real data */}
                    <li>• Contract clearly states delivery timeline</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="opposition" className="space-y-2 sm:space-y-3">
                <div className="rounded-md bg-muted p-3 sm:p-4">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Opposition Arguments</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2">
                    {/* Replace with real data */}
                    <li>• Force majeure clause may apply</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right column: Threads */}
      <Card className="flex-1 lg:max-w-[50%] min-h-[50vh] max-h-[80vh] lg:max-h-[100vh] overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2 sm:gap-0">
          <div className="min-w-0">
            <Link href={`/dashboard/space/${spaceId}/threads`}>
              <CardTitle className="text-base sm:text-lg hover:text-primary cursor-pointer">Threads</CardTitle>
            </Link>
            <CardDescription className="text-xs sm:text-sm">AI-assisted conversations</CardDescription>
          </div>
          <Dialog open={threadOpen} onOpenChange={setThreadOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={isCreatingThread} className="w-full sm:w-auto">
                <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">New Thread</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Thread</DialogTitle>
                <DialogDescription>Start a new conversation about this case.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="thread-name">Thread Name</Label>
                  <Input
                    id="thread-name"
                    placeholder="e.g., Contract Analysis"
                    value={newThreadName}
                    onChange={(e) => setNewThreadName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newThreadName.trim()) {
                        handleCreateThread()
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateThread} disabled={!newThreadName.trim() || isCreatingThread}>
                  {isCreatingThread ? "Creating..." : "Create Thread"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] overflow-y-auto">
          {loadingThreads ? (
            <p className="text-sm text-center">Loading…</p>
          ) : threads.length > 0 ? (
            <div className="space-y-1">
              {threads.map((thread) => (
                <Link key={thread._id} href={`/dashboard/space/${spaceId}/thread/${thread._id}`} className="block">
                  <div className="flex items-center p-2 sm:p-3 rounded-md hover:bg-muted cursor-pointer transition-colors">
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base truncate">{thread.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(thread.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8 text-center">
              <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
              <p className="text-sm sm:text-base text-muted-foreground mb-4">No threads yet</p>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => setThreadOpen(true)}>
                <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Create Thread
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
