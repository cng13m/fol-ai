"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolAILogo } from "@/components/icons"

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Demo: just redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="flex justify-center mb-4">
            <FolAILogo className="h-10 w-32" />
          </Link>
          <CardTitle className="text-2xl">Krijo llogari</CardTitle>
          <CardDescription>Filloni prova falas 14-ditore</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Emri i kompanisë</Label>
              <Input
                id="company"
                type="text"
                placeholder="Kompania juaj"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="emri@kompania.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Fjalëkalimi</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 8 karaktere"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Duke krijuar..." : "Krijo llogari"}
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Duke krijuar llogari, pranoni{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Kushtet e Shërbimit
            </Link>{" "}
            dhe{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Politikën e Privatësisë
            </Link>
          </p>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Keni llogari?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Hyni këtu
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
