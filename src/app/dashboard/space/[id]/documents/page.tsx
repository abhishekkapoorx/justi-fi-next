"use client"

import { useState } from "react"
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
import { FileText, Upload } from "lucide-react"

// Mock data
const documents = [
  { id: "1", name: "Contract.pdf", type: "PDF", size: "2.4 MB", date: "2023-04-15" },
  { id: "2", name: "Evidence.docx", type: "DOCX", size: "1.8 MB", date: "2023-04-16" },
  { id: "3", name: "Testimony.pdf", type: "PDF", size: "3.2 MB", date: "2023-04-17" },
  { id: "4", name: "Case_Law_Reference.pdf", type: "PDF", size: "5.1 MB", date: "2023-04-18" },
  { id: "5", name: "Meeting_Notes.docx", type: "DOCX", size: "0.9 MB", date: "2023-04-19" },
]

export default function DocumentsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("all")

  // Filter documents based on active tab
  const filteredDocuments =
    activeTab === "all" ? documents : documents.filter((doc) => doc.type.toLowerCase() === activeTab)

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage case-related documents</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
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
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input id="description" placeholder="Brief description of the document" />
              </div>
            </div>
            <DialogFooter>
              <Button>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="pdf">PDF</TabsTrigger>
          <TabsTrigger value="docx">Word</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {activeTab === "all"
                  ? "All Documents"
                  : activeTab === "pdf"
                    ? "PDF Documents"
                    : activeTab === "docx"
                      ? "Word Documents"
                      : "Other Documents"}
              </CardTitle>
              <CardDescription>
                {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-2">Date</div>
                </div>
                {filteredDocuments.length > 0 ? (
                  <div className="divide-y">
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted cursor-pointer">
                        <div className="col-span-6 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{doc.name}</span>
                        </div>
                        <div className="col-span-2">{doc.type}</div>
                        <div className="col-span-2">{doc.size}</div>
                        <div className="col-span-2">{doc.date}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No documents found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
