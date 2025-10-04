"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import JustiFiLogo from "@/components/JustiFiLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";

interface Space {
  _id: string;
  spaceName: string;
  createdAt: string;
}

export default function DashboardPage() {
  const pathname = usePathname();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");

  // fetch spaces
  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Space[]>("/api/spaces");
      setSpaces(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Could not load spaces");
    } finally {
      setLoading(false);
    }
  };

  // create space
  const handleCreate = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post<Space>("/api/spaces", {
        spaceName: newName.trim(),
      });
      setSpaces((s) => [res.data, ...s]);
      setNewName("");
      setCreateOpen(false);
      toast.success("Space created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4">

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="text-xs sm:text-sm">
              <FolderPlus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">New Space</span>
              <span className="sm:hidden">New</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Space</DialogTitle>
              <DialogDescription>
                Name your new case workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="space-name">Space Name</Label>
                <Input
                  id="space-name"
                  placeholder="e.g. Smith v. Johnson"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && newName.trim() && handleCreate()
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={!newName.trim() || loading}>
                {loading ? "Creating…" : "Create Space"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        {loading ? (
          <p className="text-center">Loading your spaces…</p>
        ) : spaces.length === 0 ? (
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle>No spaces yet</CardTitle>
              <CardDescription>
                Create a space to organize your legal cases.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button onClick={() => setCreateOpen(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Space
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {spaces.map((space) => (
              <Link key={space._id} href={`/dashboard/space/${space._id}`}>
                <Card className={`transition-colors hover:shadow-md ${pathname.includes(space._id) ? "border-primary" : ""}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg truncate">{space.spaceName}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {new Date(space.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Click to open this space.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
