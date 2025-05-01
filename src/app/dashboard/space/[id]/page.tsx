"use client"

import { useState } from "react"
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

// Mock data
const documents = [
  { id: "1", name: "Contract.pdf", date: "2023-04-15" },
  { id: "2", name: "Evidence.docx", date: "2023-04-16" },
  { id: "3", name: "Testimony.pdf", date: "2023-04-17" },
]

const threads = [
  { id: "1", name: "Initial Case Review", date: "2023-04-15" },
  { id: "2", name: "Client Meeting Notes", date: "2023-04-18" },
]

export default function SpacePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("documents")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full overflow-auto">
      {/* Left column: Documents and Case Insights */}
      <div className="flex flex-col gap-4">
        {/* Documents section */}
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Documents</CardTitle>
              <CardDescription>Case-related documents</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
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
                    <Input id="file" type="file" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {documents.length > 0 ? (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">{doc.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No documents yet</p>
                <Button variant="outline" size="sm" className="mt-4">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Case Insights section */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Case Insights</CardTitle>
            <CardDescription>AI-generated insights from your documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="opposition">Opposition</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Case Overview</h4>
                  <p className="text-sm text-muted-foreground">
                    This case involves a contract dispute between Smith and Johnson regarding the delivery of services.
                  </p>
                </div>
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Key Dates</h4>
                  <p className="text-sm text-muted-foreground">
                    Contract signed: Jan 15, 2023
                    <br />
                    Dispute arose: Mar 22, 2023
                    <br />
                    Filing date: Apr 10, 2023
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="support" className="space-y-2">
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Supporting Arguments</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Contract clearly states delivery timeline</li>
                    <li>• Payment was made in full and on time</li>
                    <li>• Multiple documented attempts to resolve</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="opposition" className="space-y-2">
                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2">Opposition Arguments</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Force majeure clause may apply</li>
                    <li>• Delivery specifications were changed</li>
                    <li>• Communication delays from both parties</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right column: Threads */}
      <Card className="h-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Threads</CardTitle>
            <CardDescription>AI-assisted conversations</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Thread
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
                  <Input id="thread-name" placeholder="e.g., Contract Analysis" />
                </div>
              </div>
              <DialogFooter>
                <Button>Create Thread</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)] overflow-auto">
          {threads.length > 0 ? (
            <div className="space-y-2">
              {threads.map((thread) => (
                <Link key={thread.id} href={`/dashboard/space/${params.id}/thread/${thread.id}`} className="block">
                  <div className="flex items-center p-3 rounded-md hover:bg-muted cursor-pointer">
                    <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">{thread.name}</div>
                      <div className="text-xs text-muted-foreground">{thread.date}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No threads yet</p>
              <Button variant="outline" size="sm" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Thread
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
