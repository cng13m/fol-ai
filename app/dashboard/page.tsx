import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/header"
import { MessageIcon, UsersIcon, WhatsAppIcon, BotIcon, CodeIcon } from "@/components/icons"

const stats = [
  {
    title: "Mesazhe sot",
    value: "124",
    change: "+12%",
    icon: MessageIcon,
  },
  {
    title: "Biseda aktive",
    value: "18",
    change: "+3",
    icon: UsersIcon,
  },
  {
    title: "WhatsApp",
    value: "89",
    change: "+8%",
    icon: WhatsAppIcon,
  },
  {
    title: "AI Përgjigje",
    value: "95%",
    change: "+2%",
    icon: BotIcon,
  },
]

const recentChats = [
  { id: 1, name: "Arben K.", message: "A keni këtë produkt në stok?", time: "2 min", channel: "WhatsApp" },
  { id: 2, name: "Liridona M.", message: "Çfarë orari punoni?", time: "15 min", channel: "Widget" },
  { id: 3, name: "Faton B.", message: "Faleminderit për ndihmën!", time: "32 min", channel: "WhatsApp" },
  { id: 4, name: "Albana S.", message: "Si mund të porosit?", time: "1 orë", channel: "Widget" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Dashboard" description="Mirë se erdhët përsëri!" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change} nga dje</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Chats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bisedat e fundit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold text-sm">
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{chat.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">{chat.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        chat.channel === "WhatsApp" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {chat.channel}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-lg bg-primary/10 mb-3">
                <DatabaseIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Shto FAQ</h3>
              <p className="text-sm text-muted-foreground mt-1">Trajno AI-n me pyetje të reja</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-lg bg-green-100 mb-3">
                <WhatsAppIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Lidh WhatsApp</h3>
              <p className="text-sm text-muted-foreground mt-1">Konfiguro numrin e WhatsApp</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-lg bg-primary/10 mb-3">
                <CodeIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Merr Widget</h3>
              <p className="text-sm text-muted-foreground mt-1">Kopjo kodin për faqen tuaj</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}
