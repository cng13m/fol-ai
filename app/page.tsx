import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Pricing } from "@/components/landing/pricing"
import { Footer } from "@/components/landing/footer"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Iridescence } from "@/components/landing/iridescence"

export default function LandingPage() {
  return (
    <div className="landing-page min-h-screen flex flex-col">
      <div className="landing-page__bg" aria-hidden="true">
        <Iridescence color={[0.5, 0.6, 0.8]} mouseReact amplitude={0.1} speed={1} />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </div>
  )
}
