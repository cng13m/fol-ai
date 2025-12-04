"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard/header"
import { cn } from "@/lib/utils"
import { XIcon, CheckIcon } from "@/components/icons"

interface FAQ {
  id: string
  question: string
  answer: string
}

interface Product {
  id: string
  name: string
  description: string
  price: string
}

const initialFaqs: FAQ[] = [
  { id: "1", question: "Çfarë orari punoni?", answer: "Jemi hapë prej orës 09:00 deri në 17:00, Hënë - Premte." },
  { id: "2", question: "A ofroni dërgim?", answer: "Po, ofrojmë dërgim falas për porosi mbi 50€ në Kosovë." },
  {
    id: "3",
    question: "Si mund të paguaj?",
    answer: "Pranojmë pagesë me para në dorë, kartë krediti dhe transfertë bankare.",
  },
]

const initialProducts: Product[] = [
  { id: "1", name: "Shërbimi Standard", description: "Paketa bazike për biznese të vogla", price: "29€/muaj" },
  { id: "2", name: "Shërbimi Premium", description: "Paketa e plotë me mbështetje prioritare", price: "79€/muaj" },
]

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<"faq" | "products" | "documents">("faq")
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showAddFaq, setShowAddFaq] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" })
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" })

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setFaqs([...faqs, { id: Date.now().toString(), ...newFaq }])
      setNewFaq({ question: "", answer: "" })
      setShowAddFaq(false)
    }
  }

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id))
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description) {
      setProducts([...products, { id: Date.now().toString(), ...newProduct }])
      setNewProduct({ name: "", description: "", price: "" })
      setShowAddProduct(false)
    }
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Baza e Njohurive" description="Trajno AI-n me informacione për biznesin tuaj" />

      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {[
            { id: "faq", label: "FAQ" },
            { id: "products", label: "Produkte/Shërbime" },
            { id: "documents", label: "Dokumente" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{faqs.length} pyetje të shpeshta</p>
              <Button onClick={() => setShowAddFaq(true)}>Shto FAQ</Button>
            </div>

            {showAddFaq && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Pyetja</Label>
                    <Input
                      placeholder="p.sh. Çfarë orari punoni?"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Përgjigja</Label>
                    <Textarea
                      placeholder="Shkruani përgjigjen..."
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddFaq(false)}>
                      Anulo
                    </Button>
                    <Button onClick={handleAddFaq}>
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Ruaj
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-medium">{faq.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteFaq(faq.id)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{products.length} produkte/shërbime</p>
              <Button onClick={() => setShowAddProduct(true)}>Shto produkt</Button>
            </div>

            {showAddProduct && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Emri</Label>
                      <Input
                        placeholder="Emri i produktit/shërbimit"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Çmimi</Label>
                      <Input
                        placeholder="p.sh. 29€/muaj"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Përshkrimi</Label>
                    <Textarea
                      placeholder="Përshkruani produktin/shërbimin..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                      Anulo
                    </Button>
                    <Button onClick={handleAddProduct}>
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Ruaj
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                        {product.price && <p className="text-sm font-semibold text-primary mt-2">{product.price}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ngarko Dokumente</CardTitle>
                <CardDescription>Ngarkoni PDF, TXT ose dokumente Word për të trajnuar AI-n</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-muted-foreground mb-3"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    <p className="text-sm font-medium">Tërhiq dhe lësho skedarë këtu</p>
                    <p className="text-xs text-muted-foreground mt-1">ose</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Zgjidhni skedarë
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3">PDF, TXT, DOC, DOCX (max 10MB)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tekst i lirë</CardTitle>
                <CardDescription>Shkruani ose ngjitni informacione direkt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Shkruani informacione për biznesin tuaj që AI-ja duhet të dijë..."
                  className="min-h-32"
                />
                <Button>Ruaj tekstin</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
