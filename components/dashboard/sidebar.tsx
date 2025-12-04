"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  FolAILogo,
  DashboardIcon,
  MessageIcon,
  DatabaseIcon,
  SettingsIcon,
  WhatsAppIcon,
  CodeIcon,
} from "@/components/icons"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Bisedat", href: "/dashboard/chats", icon: MessageIcon },
  { name: "Baza e Njohurive", href: "/dashboard/knowledge", icon: DatabaseIcon },
  { name: "WhatsApp", href: "/dashboard/whatsapp", icon: WhatsAppIcon },
  { name: "Widget", href: "/dashboard/widget", icon: CodeIcon },
  { name: "Cilësimet", href: "/dashboard/settings", icon: SettingsIcon },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/dashboard">
          <FolAILogo className="h-8 w-24" />
        </Link>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            K
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Kompania Demo</p>
            <p className="text-xs text-muted-foreground truncate">demo@kompania.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
