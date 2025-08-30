"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Bot,
  LayoutDashboard,
  Upload,
  Coins,
  Workflow,
  Settings,
  FileText,
  Activity,
  Users,
  Shield,
  BarChart3,
  Smartphone,
  Store,
  Brain,
  Zap,
  HelpCircle,
  Search,
  Webhook,
  MessageSquare,
  FileBarChart,
  Palette,
  Database,
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function MainNavigation() {
  const pathname = usePathname()
  const [activeAgents, setActiveAgents] = useState(5)
  const [totalOperations, setTotalOperations] = useState(1247)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgents((prev) => Math.max(3, Math.min(7, prev + (Math.random() > 0.5 ? 1 : -1))))
      setTotalOperations((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const navigationItems = [
    {
      title: "Platform",
      items: [
        {
          href: "/console",
          label: "Agent Console",
          icon: LayoutDashboard,
          description: "Monitor and manage AI agents",
        },
        { href: "/upload", label: "File Uploader", icon: Upload, description: "Upload files for AI processing" },
        { href: "/dao", label: "DAO Explorer", icon: Coins, description: "Web3 governance and treasury" },
        { href: "/flow", label: "Workflow Engine", icon: Workflow, description: "Automation workflows" },
        { href: "/overview", label: "Platform Overview", icon: Activity, description: "Complete platform summary" },
      ],
    },
    {
      title: "Analytics & Intelligence",
      items: [
        { href: "/analytics", label: "Analytics", icon: BarChart3, description: "Platform usage metrics" },
        {
          href: "/intelligence",
          label: "Business Intelligence",
          icon: Brain,
          description: "Advanced insights and forecasting",
        },
        { href: "/reports", label: "Reports", icon: FileBarChart, description: "Custom report generation" },
        { href: "/monitoring", label: "System Monitoring", icon: Activity, description: "Real-time system health" },
        { href: "/performance", label: "Performance", icon: Zap, description: "Optimization and tuning" },
      ],
    },
    {
      title: "Management",
      items: [
        { href: "/teams", label: "Team Management", icon: Users, description: "Collaborate with team members" },
        { href: "/billing", label: "Billing", icon: Coins, description: "Subscription and usage tracking" },
        { href: "/integrations", label: "Integrations", icon: Workflow, description: "Third-party connections" },
        { href: "/settings", label: "Settings", icon: Settings, description: "Platform configuration" },
        { href: "/branding", label: "Branding", icon: Palette, description: "Custom branding options" },
      ],
    },
    {
      title: "AI & Development",
      items: [
        { href: "/models", label: "AI Models", icon: Brain, description: "Configure and train models" },
        { href: "/marketplace", label: "Agent Marketplace", icon: Store, description: "Discover community agents" },
        { href: "/developers", label: "Developer Tools", icon: FileText, description: "SDK and API resources" },
        { href: "/automation", label: "Automation", icon: Zap, description: "Workflow automation" },
        { href: "/webhooks", label: "Webhooks", icon: Webhook, description: "Event notifications" },
      ],
    },
    {
      title: "Security & Compliance",
      items: [
        { href: "/security", label: "Security Center", icon: Shield, description: "Security monitoring" },
        { href: "/audit", label: "Audit Logs", icon: FileText, description: "Compliance tracking" },
        { href: "/governance", label: "Data Governance", icon: Database, description: "Privacy and compliance" },
        { href: "/backup", label: "Backup & Recovery", icon: Database, description: "Data protection" },
      ],
    },
    {
      title: "Support & Resources",
      items: [
        { href: "/help", label: "Help Center", icon: HelpCircle, description: "Documentation and guides" },
        { href: "/support", label: "Support", icon: MessageSquare, description: "Get help and chat support" },
        { href: "/documentation", label: "Documentation", icon: FileText, description: "Complete platform docs" },
        { href: "/api", label: "API Reference", icon: FileText, description: "API documentation" },
        { href: "/status", label: "System Status", icon: Activity, description: "Service uptime monitoring" },
      ],
    },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-balance">Aspect Marketing Solutions</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger className="text-sm font-medium">{section.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 max-h-[400px] overflow-y-auto">
                      {section.items.map((item) => (
                        <NavigationMenuLink key={item.href} asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center space-x-3 rounded-md p-3 hover:bg-accent transition-colors",
                              pathname === item.href && "bg-accent text-accent-foreground",
                            )}
                          >
                            <item.icon className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/mobile">
                <Smartphone className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">{activeAgents}/7 active</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{totalOperations.toLocaleString()}</span>
            </div>
          </div>

          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/console">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile menu button - simplified for now */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/console">
              <LayoutDashboard className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
