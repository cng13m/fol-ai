import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, WhatsAppIcon, MessageIcon } from "@/components/icons"
import { Iridescence } from "@/components/landing/iridescence"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            <span className="text-muted-foreground">Integrimi i plotë me WhatsApp</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Asistenti yt digjital për <span className="text-primary">bizneset e Kosovës</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            FOL.AI automatizon mbështetjen e klientëve tuaj 24/7. Fole shqip, integrohu me WhatsApp, dhe rriti shitjet
            me inteligjencë artificiale.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="gap-2 px-8">
                Fillo falas
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="outline" size="lg" className="gap-2 px-8 bg-transparent">
                <MessageIcon className="h-4 w-4" />
                Shiko demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#25D366]" />
              <span>WhatsApp Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>100% Shqip</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-foreground" />
              <span>Për Kosovë</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Iridescence color={[0.5, 0.6, 0.8]} mouseReact amplitude={0.1} speed={1} />
      </div>
    </section>
  )
}


