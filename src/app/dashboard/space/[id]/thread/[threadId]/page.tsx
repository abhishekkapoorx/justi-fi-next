"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface IMessage {
  _id: string;
  role: "user" | "agent";
  content: string;
  createdAt: string;
}

export default function ThreadPage(props: {
  params: Promise<{ id: string; threadId: string }>;
}) {
  // unwrap the dynamic params
  const { id, threadId } = use(props.params);
  const spaceId = id; // Map id to spaceId for API calls

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // ref to auto-scroll
  const bottomRef = useRef<HTMLDivElement>(null);

  // 1) load existing messages
  useEffect(() => {
    setLoading(true);
    fetch(`/api/spaces/${spaceId}/threads/${threadId}/messages`)
      .then((r) => r.json())
      .then((data: IMessage[]) => setMessages(data))
      .catch((err) => console.error("Failed to load messages", err))
      .finally(() => setLoading(false));
  }, [spaceId, threadId]);

  // 2) scroll to bottom on update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3) send a new message (and fetch agent reply)
  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);

    try {
      const res = await fetch(
        `/api/spaces/${spaceId}/threads/${threadId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      if (!res.ok) throw new Error("POST failed");

      const { userMessage, agentResponse } = await res.json();
      setMessages((prev) => [
        ...prev,
        userMessage as IMessage,
        ...(agentResponse ? [agentResponse as IMessage] : []),
      ]);
      setNewMessage("");
    } catch (err) {
      console.error("Send error", err);
      // you could show a toast here
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-5xl">
      <Card className="flex flex-col h-full border-0 rounded-none">
        <CardHeader className="border-b px-4 py-2">
          <CardTitle className="text-lg">Thread #{threadId}</CardTitle>
          <CardDescription>Conversation</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-4 space-y-4">
          {loading ? (
            <p>Loading…</p>
          ) : (
            messages.length > 0 && messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    className={`h-8 w-8 ${
                      msg.role === "user" ? "ml-2" : "mr-2"
                    }`}
                  >
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      {msg.role === "user" ? "JD" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.role === "agent" ? (
                        <div className="markdown-content">
                          <ReactMarkdown
                            components={{
                              // Style code blocks with syntax highlighting appearance
                              code: ({ node, inline, className, children, ...props }) => (
                                <code
                                  className={`${inline ? 'inline-code' : 'block-code'} ${className || ''}`}
                                  {...props}
                                >
                                  {children}
                                </code>
                              ),
                              // Ensure links open in new tabs and have proper styling
                              a: ({ node, children, href, ...props }) => (
                                <a 
                                  href={href}
                                  className="text-blue-500 hover:underline" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  {...props}
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                    <p
                      className={`text-xs text-muted-foreground mt-1 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </CardContent>

        <CardFooter className="border-t p-4">
          <form
            className="flex w-full items-center space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input
              placeholder="Type your message…"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              disabled={sending}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!newMessage.trim() || sending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
