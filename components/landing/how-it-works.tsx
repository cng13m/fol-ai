const steps = [
  {
    step: "01",
    title: "Regjistrohu",
    description: "Krijo llogarinë falas dhe lidh numrin tënd të WhatsApp Business.",
  },
  {
    step: "02",
    title: "Trajno AI-n",
    description: "Shto FAQ, produkte dhe informacione për biznesin tënd.",
  },
  {
    step: "03",
    title: "Aktivizo",
    description: "Integro widget-in në faqe ose lidhu direkt me WhatsApp.",
  },
  {
    step: "04",
    title: "Menaxho",
    description: "Shiko bisedat, analizo rezultatet dhe optimizo përgjigjet.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Si funksionon</h2>
          <p className="mt-4 text-lg text-muted-foreground">Katër hapa të thjeshtë për të filluar</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((item, index) => (
              <div key={item.step} className="relative flex gap-4 rounded-xl border border-border p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 mx-auto max-w-2xl rounded-2xl border border-border bg-muted/30 p-8">
          <h3 className="text-xl font-semibold text-center mb-6">Shembull përgjigje</h3>
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-br-md bg-primary text-primary-foreground px-4 py-2 max-w-xs">
                A jeni hapë sot?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-secondary text-secondary-foreground px-4 py-2 max-w-xs">
                Po, jemi hapë prej orës 09:00 deri në 17:00. A keni nevojë për ndihmë më shumë?
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


