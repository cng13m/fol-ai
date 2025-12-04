"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { cn } from "@/lib/utils"

const tones = [
  { id: "formal", name: "Formal", description: "Profesional dhe zyrtar" },
  { id: "friendly", name: "Miqësor", description: "I ngrohtë dhe i afërt" },
  { id: "minimal", name: "Minimal", description: "I shkurtë dhe direkt" },
  { id: "luxury", name: "Luksoz", description: "Elegant dhe ekskluziv" },
]

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("Kompania Demo")
  const [greeting, setGreeting] = useState("Mirë se keni ardhë! Si mundem me ju ndihmu sot?")
  const [selectedTone, setSelectedTone] = useState("formal")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Cilësimet" description="Konfiguro chatbot-in dhe profilin e biznesit" />

      <div className="p-6 space-y-6 max-w-3xl">
        {/* Business Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profili i Biznesit</CardTitle>
            <CardDescription>Informacionet bazike të kompanisë suaj</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Emri i kompanisë</Label>
              <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="greeting">Mesazhi i mirëseardhjes</Label>
              <Input id="greeting" value={greeting} onChange={(e) => setGreeting(e.target.value)} />
              <p className="text-xs text-muted-foreground">Ky mesazh shfaqet kur dikush hap chat-in</p>
            </div>
          </CardContent>
        </Card>

        {/* Tone Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Toni i AI-së</CardTitle>
            <CardDescription>Zgjidhni stilin e komunikimit të chatbot-it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={cn(
                    "flex flex-col items-start rounded-lg border p-4 text-left transition-colors",
                    selectedTone === tone.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        selectedTone === tone.id ? "border-primary bg-primary" : "border-muted-foreground",
                      )}
                    >
                      {selectedTone === tone.id && (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{tone.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground pl-6">{tone.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Orari i Punës</CardTitle>
            <CardDescription>AI-ja do të informojë klientët për orarin tuaj</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Hapja</Label>
                <Input type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label>Mbyllja</Label>
                <Input type="time" defaultValue="17:00" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Ditët e punës</Label>
              <div className="flex flex-wrap gap-2">
                {["Hën", "Mar", "Mër", "Enj", "Pre", "Sht", "Die"].map((day, i) => (
                  <button
                    key={day}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      i < 5 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80",
                    )}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Duke ruajtur..." : "Ruaj ndryshimet"}
          </Button>
        </div>
      </div>
    </div>
  )
}
