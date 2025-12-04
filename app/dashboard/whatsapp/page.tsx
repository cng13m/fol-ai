"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { WhatsAppIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export default function WhatsAppPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [businessId, setBusinessId] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleConnect = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsConnected(true)
      setIsSaving(false)
    }, 1500)
  }

  const webhookUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/whatsapp/webhook`
      : "https://your-domain.com/api/whatsapp/webhook"

  return (
    <div className="min-h-screen">
      <DashboardHeader title="WhatsApp Integration" description="Lidhu me WhatsApp Business API" />

      <div className="p-6 space-y-6 max-w-3xl">
        {/* Status Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  isConnected ? "bg-green-100" : "bg-muted",
                )}
              >
                <WhatsAppIcon className={cn("h-7 w-7", isConnected ? "text-green-600" : "text-muted-foreground")} />
              </div>
              <div>
                <h3 className="font-semibold">{isConnected ? "WhatsApp i lidhur" : "WhatsApp nuk është i lidhur"}</h3>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? `Numri: +383 49 123 456` : "Konfiguroni kredencialet për të aktivizuar WhatsApp"}
                </p>
              </div>
              {isConnected && (
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-600" />
                    Aktiv
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Konfigurimi</CardTitle>
            <CardDescription>Vendosni kredencialet nga Meta Business Suite</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Numri i telefonit</Label>
              <Input
                id="phone"
                placeholder="+383 49 XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessId">Phone Number ID</Label>
              <Input
                id="businessId"
                placeholder="ID nga Meta Business Suite"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="token">Access Token</Label>
              <Input
                id="token"
                type="password"
                placeholder="Token i aksesit"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
              />
            </div>
            <Button
              onClick={handleConnect}
              disabled={isSaving || (!phoneNumber && !businessId && !accessToken)}
              className="w-full"
            >
              {isSaving ? "Duke lidhur..." : isConnected ? "Përditëso" : "Lidh WhatsApp"}
            </Button>
          </CardContent>
        </Card>

        {/* Webhook URL */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook URL</CardTitle>
            <CardDescription>Vendosni këtë URL në Meta Business Suite për të pranuar mesazhe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input readOnly value={webhookUrl} className="font-mono text-sm" />
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(webhookUrl)}>
                Kopjo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Vendosni WHATSAPP_VERIFY_TOKEN në environment variables</p>
          </CardContent>
        </Card>

        {/* Setup Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Udhëzuesi i Konfigurimit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                step: 1,
                title: "Krijoni llogari Meta Business",
                description: "Shkoni te business.facebook.com dhe krijoni llogari biznesi",
              },
              {
                step: 2,
                title: "Aktivizoni WhatsApp Business API",
                description: "Në Meta Business Suite, shkoni te WhatsApp > Getting Started",
              },
              {
                step: 3,
                title: "Merrni kredencialet",
                description: "Kopjoni Phone Number ID dhe Access Token nga paneli",
              },
              {
                step: 4,
                title: "Konfiguroni Webhook",
                description: "Vendosni Webhook URL-në më lart në panelin e Meta",
              },
              {
                step: 5,
                title: "Verifikoni numrin",
                description: "Ndiqni hapat e verifikimit të numrit të telefonit",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Test Message */}
        {isConnected && (
          <Card>
            <CardHeader>
              <CardTitle>Testo Integrimin</CardTitle>
              <CardDescription>Dërgoni një mesazh test për të verifikuar lidhjen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Numri për test</Label>
                <Input placeholder="+383 49 XXX XXX" />
              </div>
              <Button>Dërgo mesazh test</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
