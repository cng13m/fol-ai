"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { cn } from "@/lib/utils"
import { SendIcon } from "@/components/icons"

const mockChats = [
  {
    id: "1",
    name: "Arben Krasniqi",
    lastMessage: "A keni këtë produkt në stok?",
    time: "2 min",
    unread: 2,
    channel: "whatsapp",
    messages: [
      { id: 1, role: "user", content: "Përshëndetje!" },
      { id: 2, role: "assistant", content: "Mirë se keni ardhë! Si mundem me ju ndihmu?" },
      { id: 3, role: "user", content: "A keni këtë produkt në stok?" },
    ],
  },
  {
    id: "2",
    name: "Liridona Morina",
    lastMessage: "Faleminderit!",
    time: "15 min",
    unread: 0,
    channel: "widget",
    messages: [
      { id: 1, role: "user", content: "Çfarë orari punoni?" },
      { id: 2, role: "assistant", content: "Jemi hapë prej orës 09:00 deri në 17:00, Hënë - Premte." },
      { id: 3, role: "user", content: "Faleminderit!" },
    ],
  },
  {
    id: "3",
    name: "Faton Berisha",
    lastMessage: "Do të vij nesër",
    time: "1 orë",
    unread: 0,
    channel: "whatsapp",
    messages: [
      { id: 1, role: "user", content: "A mund të rezervoj takim?" },
      { id: 2, role: "assistant", content: "Po, sigurisht! Kur dëshironi të vini?" },
      { id: 3, role: "user", content: "Do të vij nesër" },
    ],
  },
]

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [message, setMessage] = useState("")
  const [autoReply, setAutoReply] = useState(true)

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Bisedat" description={`${mockChats.length} biseda aktive`} />

      <div className="flex h-[calc(100vh-73px)]">
        {/* Chat List */}
        <div className="w-80 border-r border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <Input placeholder="Kërko biseda..." />
          </div>
          <div className="divide-y divide-border">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  "w-full p-4 text-left hover:bg-muted/50 transition-colors",
                  selectedChat.id === chat.id && "bg-muted",
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-sm text-primary">
                    {chat.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{chat.name}</p>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          chat.channel === "whatsapp" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700",
                        )}
                      >
                        {chat.channel === "whatsapp" ? "WhatsApp" : "Widget"}
                      </span>
                      {chat.unread > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-3 bg-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {selectedChat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-medium">{selectedChat.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedChat.channel === "whatsapp" ? "WhatsApp" : "Web Widget"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">AI Auto-Reply:</span>
              <button
                onClick={() => setAutoReply(!autoReply)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  autoReply ? "bg-primary" : "bg-muted",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    autoReply ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/30">
            {selectedChat.messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-start" : "justify-end")}>
                <div
                  className={cn(
                    "max-w-md rounded-2xl px-4 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-white border border-border rounded-bl-md"
                      : "bg-primary text-primary-foreground rounded-br-md",
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setMessage("")
              }}
              className="flex gap-2"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Shkruani përgjigjen..."
                className="flex-1"
              />
              <Button type="submit" disabled={!message.trim()}>
                <SendIcon className="h-4 w-4 mr-2" />
                Dërgo
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
