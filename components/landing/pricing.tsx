import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "@/components/icons"
import Link from "next/link"

const plans = [
  {
    name: "Fillor",
    price: "0",
    description: "Për biznese të vogla që sapo fillojnë",
    features: ["1 chatbot", "100 mesazhe/muaj", "Chat widget bazik", "Email support"],
    cta: "Fillo falas",
    popular: false,
  },
  {
    name: "Profesional",
    price: "49",
    description: "Për biznese në rritje",
    features: [
      "3 chatbote",
      "2,000 mesazhe/muaj",
      "WhatsApp integration",
      "Paneli i avancuar",
      "Prioritet support",
      "Custom branding",
    ],
    cta: "Fillo tani",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "149",
    description: "Për kompani të mëdha",
    features: [
      "Chatbote pa limit",
      "Mesazhe pa limit",
      "API access",
      "White-label",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Kontaktoni",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Çmimet</h2>
          <p className="mt-4 text-lg text-muted-foreground">Plane të përshtatshme për çdo madhësi biznesi</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular ? "border-primary shadow-lg ring-1 ring-primary" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Më i popullarizuar
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">€{plan.price}</span>
                  <span className="text-muted-foreground">/muaj</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col pt-4">
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
