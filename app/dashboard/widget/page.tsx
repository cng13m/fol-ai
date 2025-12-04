"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { CheckIcon, CodeIcon } from "@/components/icons"

export default function WidgetPage() {
  const [copied, setCopied] = useState(false)

  const embedCode = `<script src="https://fol.ai/widget.js" data-business-id="demo123"></script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Widget" description="Integro chat widget-in në faqen tuaj" />

      <div className="p-6 space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Kodi i Integrimit</CardTitle>
            <CardDescription>Kopjoni këtë kod dhe vendoseni para tagut {"</body>"} në faqen tuaj</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                <code>{embedCode}</code>
              </pre>
              <Button size="sm" className="absolute top-2 right-2" onClick={handleCopy}>
                {copied ? (
                  <>
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Kopjuar
                  </>
                ) : (
                  <>
                    <CodeIcon className="h-4 w-4 mr-1" />
                    Kopjo
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pamja paraprake</CardTitle>
            <CardDescription>Kështu do të duket widget-i në faqen tuaj</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted/50 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-primary text-primary-foreground mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm">Widget-i shfaqet në këndin e poshtëm djathtas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Udhëzime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Kopjoni kodin</p>
                <p className="text-sm text-muted-foreground">Klikoni butonin "Kopjo" më lart</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Hapni faqen tuaj</p>
                <p className="text-sm text-muted-foreground">Shkoni te skedari HTML i faqes suaj</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Vendosni kodin</p>
                <p className="text-sm text-muted-foreground">Ngjiteni kodin para tagut {"</body>"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
