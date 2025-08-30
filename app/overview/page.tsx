import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Bot,
  Users,
  Upload,
  Coins,
  BarChart3,
  Shield,
  Search,
  Webhook,
  MessageSquare,
  Smartphone,
  Store,
  Cpu,
  Lock,
  Palette,
  Database,
  Brain,
  BookOpen,
  Activity,
  TestTube,
  CheckCircle,
} from "lucide-react"

export default function PlatformOverview() {
  const platformFeatures = [
    {
      name: "Agent Console",
      icon: Bot,
      path: "/console",
      status: "Active",
      description: "Monitor and manage all 7 AI agents",
    },
    {
      name: "File Uploader",
      icon: Upload,
      path: "/upload",
      status: "Active",
      description: "Intelligent file processing and routing",
    },
    {
      name: "DAO Explorer",
      icon: Coins,
      path: "/dao",
      status: "Active",
      description: "Decentralized governance and voting",
    },
    {
      name: "Workflow Automation",
      icon: BarChart3,
      path: "/flow",
      status: "Active",
      description: "n8n integration and process automation",
    },
    {
      name: "Analytics Dashboard",
      icon: BarChart3,
      path: "/analytics",
      status: "Active",
      description: "Performance metrics and insights",
    },
    {
      name: "Team Management",
      icon: Users,
      path: "/teams",
      status: "Active",
      description: "Collaboration and role management",
    },
    {
      name: "Security Center",
      icon: Shield,
      path: "/security",
      status: "Active",
      description: "Threat monitoring and access control",
    },
    {
      name: "Search System",
      icon: Search,
      path: "/search",
      status: "Active",
      description: "Intelligent platform-wide search",
    },
    {
      name: "Webhook Management",
      icon: Webhook,
      path: "/webhooks",
      status: "Active",
      description: "Event-driven integrations",
    },
    {
      name: "Support Chat",
      icon: MessageSquare,
      path: "/support",
      status: "Active",
      description: "Real-time assistance and ticketing",
    },
    {
      name: "Mobile Interface",
      icon: Smartphone,
      path: "/mobile",
      status: "Active",
      description: "iOS and Android applications",
    },
    {
      name: "Agent Marketplace",
      icon: Store,
      path: "/marketplace",
      status: "Active",
      description: "Community-built AI agents",
    },
    {
      name: "Model Configuration",
      icon: Cpu,
      path: "/models",
      status: "Active",
      description: "AI model training and tuning",
    },
    {
      name: "Data Governance",
      icon: Lock,
      path: "/governance",
      status: "Active",
      description: "Privacy and compliance controls",
    },
    {
      name: "Custom Branding",
      icon: Palette,
      path: "/branding",
      status: "Active",
      description: "White-label customization",
    },
    {
      name: "Backup Systems",
      icon: Database,
      path: "/backup",
      status: "Active",
      description: "Disaster recovery and data protection",
    },
    {
      name: "Business Intelligence",
      icon: Brain,
      path: "/intelligence",
      status: "Active",
      description: "Advanced analytics and forecasting",
    },
    {
      name: "Documentation",
      icon: BookOpen,
      path: "/documentation",
      status: "Active",
      description: "Comprehensive guides and API docs",
    },
    {
      name: "System Status",
      icon: Activity,
      path: "/status",
      status: "Active",
      description: "Real-time service monitoring",
    },
    {
      name: "Testing Suite",
      icon: TestTube,
      path: "/testing",
      status: "Active",
      description: "Automated validation and benchmarking",
    },
  ]

  const systemStats = {
    totalFeatures: platformFeatures.length,
    activeAgents: 7,
    integrations: 12,
    uptime: 99.9,
    users: 1247,
    apiCalls: 2847392,
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Aspect Marketing Solutions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete Enterprise AI Agent Platform Overview
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Platform Complete
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {systemStats.totalFeatures} Features
            </Badge>
          </div>
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Active Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{systemStats.activeAgents}</div>
              <p className="text-sm text-muted-foreground">AI agents running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{systemStats.uptime}%</div>
              <Progress value={systemStats.uptime} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Platform Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{systemStats.users.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Active users</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Features Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {platformFeatures.map((feature) => (
              <Card key={feature.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <feature.icon className="w-4 h-4" />
                    {feature.name}
                  </CardTitle>
                  <Badge variant={feature.status === "Active" ? "default" : "secondary"} className="w-fit">
                    {feature.status}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs mb-3">{feature.description}</CardDescription>
                  <Button asChild size="sm" className="w-full">
                    <Link href={feature.path}>Access Feature</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common platform management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild variant="outline">
                <Link href="/console">Monitor Agents</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/analytics">View Analytics</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/settings">Platform Settings</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/documentation">View Docs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Aspect Marketing Solutions - Enterprise AI Agent Platform</p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
