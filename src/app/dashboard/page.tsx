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

export default function DashboardPage() {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
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
                  <Input id="space-name" placeholder="e.g., Smith v. Johnson" />
                </div>
              </div>
              <DialogFooter>
                <Button>Create Space</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
