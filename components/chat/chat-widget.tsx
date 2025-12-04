"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MessageIcon, XIcon, MinusIcon, SendIcon, SunIcon, MoonIcon, BotIcon } from "@/components/icons"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatWidgetProps {
  businessName?: string
  greeting?: string
}

export function ChatWidget({
  businessName = "FOL.AI",
  greeting = "Mirë se keni ardhë në FOL.AI! Si mundem me ju ndihmu sot?",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      content: greeting,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          businessName,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Më falni, pati një gabim. Ju lutem provoni përsëri.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const widgetClasses = cn(
    "fixed bottom-4 right-4 z-50 flex flex-col transition-all duration-300",
    isDark ? "dark" : "",
  )

  if (!isOpen) {
    return (
      <div className={widgetClasses}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <MessageIcon className="h-6 w-6" />
          <span className="sr-only">Hap chat</span>
        </Button>
      </div>
    )
  }

  return (
    <div className={widgetClasses}>
      <div
        className={cn(
          "flex flex-col rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300",
          "w-[360px] max-w-[calc(100vw-2rem)]",
          isMinimized ? "h-14" : "h-[520px] max-h-[calc(100vh-2rem)]",
          isDark ? "bg-[#1a1a1a] border-[#333] text-white" : "bg-white border-border text-foreground",
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-4 h-14 shrink-0 border-b",
            isDark ? "bg-[#222] border-[#333]" : "bg-primary text-primary-foreground",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-full",
                isDark ? "bg-primary" : "bg-white/20",
              )}
            >
              <BotIcon className={cn("h-4 w-4", isDark ? "text-white" : "text-white")} />
            </div>
            <div>
              <p className={cn("font-semibold text-sm", isDark ? "text-white" : "")}>{businessName}</p>
              <p className={cn("text-xs", isDark ? "text-gray-400" : "text-white/80")}>Online</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-[#333]"
                  : "text-white/80 hover:text-white hover:bg-white/20",
              )}
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              <span className="sr-only">Ndrysho temën</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-[#333]"
                  : "text-white/80 hover:text-white hover:bg-white/20",
              )}
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <MinusIcon className="h-4 w-4" />
              <span className="sr-only">Minimizo</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-[#333]"
                  : "text-white/80 hover:text-white hover:bg-white/20",
              )}
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Mbyll</span>
            </Button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div className={cn("flex-1 overflow-y-auto p-4 space-y-4", isDark ? "bg-[#1a1a1a]" : "bg-muted/30")}>
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      message.role === "user"
                        ? cn("rounded-br-md", isDark ? "bg-primary text-white" : "bg-primary text-primary-foreground")
                        : cn(
                            "rounded-bl-md",
                            isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-foreground border border-border",
                          ),
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className={cn(
                      "rounded-2xl rounded-bl-md px-4 py-2",
                      isDark ? "bg-[#2a2a2a]" : "bg-white border border-border",
                    )}
                  >
                    <div className="flex gap-1">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full animate-bounce",
                          isDark ? "bg-gray-500" : "bg-muted-foreground/50",
                        )}
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full animate-bounce",
                          isDark ? "bg-gray-500" : "bg-muted-foreground/50",
                        )}
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full animate-bounce",
                          isDark ? "bg-gray-500" : "bg-muted-foreground/50",
                        )}
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className={cn(
                "flex items-center gap-2 p-3 border-t",
                isDark ? "bg-[#222] border-[#333]" : "bg-white border-border",
              )}
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Shkruani mesazhin tuaj..."
                disabled={isLoading}
                className={cn(
                  "flex-1 rounded-full",
                  isDark ? "bg-[#2a2a2a] border-[#444] text-white placeholder:text-gray-500" : "",
                )}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 rounded-full shrink-0"
              >
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Dërgo</span>
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
