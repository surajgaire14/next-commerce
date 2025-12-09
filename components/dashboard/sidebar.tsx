"use client"

import { BarChart3, Database, Settings, LogOut, ChevronLeft, Menu, Package, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navItems = [
  { icon: BarChart3, label: "Overview", href: "/admin" },
  { icon: Tag, label: "Categories", href: "/admin/categories" },
  { icon: Database, label: "Hero", href: "/admin/hero" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Database, label: "Data", href: "/admin/data" },
]

const secondaryItems = [{ icon: Settings, label: "Settings", href: "/dashboard/settings" }]

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin" && pathname === "/admin") return true
    if (href !== "/admin" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-20",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {open && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold">
              D
            </div>
            <span className="font-semibold text-sm">Dashboard</span>
          </div>
        )}
        {open && (
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 w-8 p-0">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
        {!open && (
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(true)} className="h-8 w-8 p-0 mx-auto">
            <Menu className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full",
              isActive(item.href)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground",
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {open && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Secondary Navigation */}
      <div className="p-4 space-y-2 border-t border-sidebar-border">
        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full",
              isActive(item.href)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground",
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {open && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={() => {
            // Handle logout
          }}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground",
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {open && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
