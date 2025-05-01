"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

// Mock chat messages
const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your legal assistant. How can I help with this case?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "user",
    content: "Can you analyze the contract and identify any potential issues?",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "I've analyzed the contract and found several potential issues:\n\n1. The force majeure clause is quite broad and may be interpreted in favor of the defendant.\n\n2. The delivery timeline section lacks specific penalties for delays.\n\n3. The payment terms section doesn't clearly address partial deliveries.",
    timestamp: "10:32 AM",
  },
]

export default function ThreadPage({
  params,
}: {
  params: { id: string; threadId: string }
}) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'll look into that for you. Based on the documents provided, I recommend focusing on sections 3.2 and 4.1 of the contract which address the specific concerns you mentioned.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full border-0 rounded-none">
        <CardHeader className="border-b px-4 py-2">
          <CardTitle className="text-lg">Initial Case Review</CardTitle>
          <CardDescription>Thread #{params.threadId}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                    {message.role === "assistant" ? (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AI</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>JD</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    <p
                      className={`text-xs text-muted-foreground mt-1 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form
            className="flex w-full items-center space-x-2"
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
          >
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
