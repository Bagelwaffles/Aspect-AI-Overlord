"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Bot,
  ShoppingCart,
  Video,
  Gamepad2,
  Search,
  Coins,
  Zap,
  ExternalLink,
  Play,
  Users,
  Activity,
  Clock,
} from "lucide-react"
import { useState, useEffect } from "react"

const agents = [
  {
    name: "Aspect.Overmind",
    category: "orchestration",
    description:
      "AI App Builder, Coder, Website Builder with hosting & CI/CD. Complete inter-op across all sub-agents.",
    capabilities: ["AI App Builder", "Website Builder", "API Key Generator", "Inter-op Management"],
    icon: <Bot className="h-8 w-8" />,
    status: "priority",
  },
  {
    name: "Printify↔Etsy Sync",
    category: "ecommerce",
    description: "Automated product sync, mockup generation, and daily posting with bundle CSV import/export.",
    capabilities: ["Product Sync", "Auto Mockups", "Daily Posting", "CSV Import/Export"],
    icon: <ShoppingCart className="h-8 w-8" />,
    status: "active",
  },
  {
    name: "YouTube Uploader Agent",
    category: "media",
    description: "Streamlined MP4 uploads with thumbnail generation, hashtag optimization, and public uploader app.",
    capabilities: ["MP4 Upload", "Thumbnail Generation", "Hashtag Optimization", "Public Interface"],
    icon: <Video className="h-8 w-8" />,
    status: "active",
  },
  {
    name: "AGI Commander",
    category: "control",
    description: "Voice interface with custom avatar, terminal-style UI, and persistent persona memory.",
    capabilities: ["Voice Interface", "Custom Avatar", "Terminal UI", "Persona Memory"],
    icon: <Gamepad2 className="h-8 w-8" />,
    status: "active",
  },
  {
    name: "Reverse-Engineering Intelligence",
    category: "research",
    description: "Monitor platform releases, scrape changelogs, and provide self-improvement suggestions.",
    capabilities: ["Release Monitoring", "Changelog Scraping", "Self-Improvement", "Repair Suggestions"],
    icon: <Search className="h-8 w-8" />,
    status: "active",
  },
  {
    name: "DAO & Token Suite",
    category: "web3",
    description:
      "Complete Web3 toolkit with airdrop tracking, yield pools, treasury dashboard, and cross-chain deployment.",
    capabilities: ["Airdrop Tracker", "Yield Pools", "Treasury Dashboard", "Cross-Chain Deploy"],
    icon: <Coins className="h-8 w-8" />,
    status: "active",
  },
  {
    name: "Bagelwaffles Stream Agent",
    category: "creator",
    description: "Creator toolkit with overlay packs, clips bot, merch triggers, and multi-stream scheduling.",
    capabilities: ["Overlay Packs", "Clips Bot", "Merch Triggers", "Multi-Stream Schedule"],
    icon: <Zap className="h-8 w-8" />,
    status: "active",
  },
]

export default function HomePage() {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false)
  const [activeAgents, setActiveAgents] = useState(5)
  const [totalOperations, setTotalOperations] = useState(1247)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgents((prev) => Math.max(3, Math.min(7, prev + (Math.random() > 0.5 ? 1 : -1))))
      setTotalOperations((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            7 AI Agents • Full Business Automation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Transform Your Business with <span className="text-primary">Advanced AI Agents</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Explore our comprehensive suite of automation solutions tailored for ecommerce, media, web3, research, and
            orchestration across your entire business ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-medium">{activeAgents}/7 Agents Active</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Activity className="h-4 w-4 text-accent" />
              <span className="font-medium">{totalOperations.toLocaleString()} Operations Today</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">24/7 Monitoring</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/console">
                Discover Our Agents <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Agent Showcase */}
      <section id="agents" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Meet Your AI Agent Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Each agent specializes in different aspects of business automation, working together to create a
              comprehensive solution for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-primary group-hover:scale-110 transition-transform">{agent.icon}</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={agent.status === "priority" ? "default" : "secondary"}>{agent.status}</Badge>
                      {agent.status === "active" && (
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-balance">{agent.name}</CardTitle>
                  <CardDescription className="text-pretty">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {agent.capabilities.map((capability, capIndex) => (
                      <Badge key={capIndex} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link href={`/agents/${agent.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                      Learn More <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Streaming Section */}
      <section id="live" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Live Agent Console</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Watch our AI agents in action and see real-time automation demonstrations.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">LIVE</span>
                <span className="text-sm text-muted-foreground">Agent Console Stream</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>👥 247 viewers</span>
                <span>⏱️ 2h 34m</span>
              </div>
            </div>

            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
              <div className="text-center relative z-10">
                <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Live Agent Monitoring</p>
                <p className="text-sm text-muted-foreground mb-4">Real-time automation in progress</p>
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span>Ecommerce Sync</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Media Processing</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Research Active</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90">Join Live Session</Button>
              <Button variant="outline">View Schedule</Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in YouTube
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Components */}
      <section id="platform" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Platform Access</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Direct access to specialized interfaces and tools for managing your AI agent ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Agent Console", href: "/console", description: "Manage and monitor all agents" },
              { name: "File Uploader", href: "/upload", description: "Upload files for AI processing" },
              { name: "DAO Explorer", href: "/dao", description: "Web3 treasury and governance" },
              { name: "Workflow Engine", href: "/flow", description: "Automation workflows" },
            ].map((link, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-balance">{link.name}</CardTitle>
                  <CardDescription className="text-pretty">{link.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href={link.href}>
                      Access <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-bold">Aspect Marketing Solutions</span>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Advanced AI agent platform for comprehensive business automation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/console" className="text-muted-foreground hover:text-primary">
                    Agent Console
                  </Link>
                </li>
                <li>
                  <Link href="/upload" className="text-muted-foreground hover:text-primary">
                    File Uploader
                  </Link>
                </li>
                <li>
                  <Link href="/dao" className="text-muted-foreground hover:text-primary">
                    DAO Explorer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/api" className="text-muted-foreground hover:text-primary">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-muted-foreground hover:text-primary">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Aspect Marketing Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
