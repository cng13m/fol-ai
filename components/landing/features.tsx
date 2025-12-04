import { Card, CardContent } from "@/components/ui/card"
import { MessageIcon, WhatsAppIcon, DashboardIcon, DatabaseIcon, BotIcon, UsersIcon } from "@/components/icons"

const features = [
  {
    icon: MessageIcon,
    title: "Chat Widget",
    description: "Widget i integruar për çdo faqe interneti. Instalim i lehtë me një kod.",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp Integration",
    description: "Lidhje direkte me WhatsApp Business API. Mesazhe automatike 24/7.",
  },
  {
    icon: BotIcon,
    title: "AI në Shqip",
    description: "Asistent që flet dialektin Gegë. Profesional dhe i sjellshëm.",
  },
  {
    icon: DashboardIcon,
    title: "Paneli Admin",
    description: "Menaxho bisedat, shiko statistika, dhe kontrollo çdo aspekt.",
  },
  {
    icon: DatabaseIcon,
    title: "Baza e Njohurive",
    description: "Shto FAQ, produkte, shërbime dhe dokumente për AI-n tuaj.",
  },
  {
    icon: UsersIcon,
    title: "Multi-Tenant",
    description: "Çdo biznes ka chatbot-in e vet, numrin e WhatsApp, dhe widget-in.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Gjithçka që keni nevojë</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Platformë e plotë për automatizimin e mbështetjes së klientëve
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
