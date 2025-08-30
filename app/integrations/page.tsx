import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Database,
  Cloud,
  Zap,
  Globe,
  ShoppingCart,
  Video,
  Workflow,
} from "lucide-react"

const integrations = [
  {
    name: "Etsy API",
    description: "E-commerce marketplace integration",
    status: "connected",
    icon: ShoppingCart,
    category: "ecommerce",
    lastSync: "2 minutes ago",
    config: { apiKey: "••••••••••••3f2a", shopId: "AspectStore" },
  },
  {
    name: "Printify",
    description: "Print-on-demand service",
    status: "connected",
    icon: Settings,
    category: "ecommerce",
    lastSync: "5 minutes ago",
    config: { token: "••••••••••••8b1c", storeId: "12345" },
  },
  {
    name: "YouTube API",
    description: "Video platform integration",
    status: "connected",
    icon: Video,
    category: "media",
    lastSync: "1 hour ago",
    config: { channelId: "UC••••••••••••xyz", apiKey: "••••••••••••9d4e" },
  },
  {
    name: "OpenAI",
    description: "AI model provider",
    status: "connected",
    icon: Zap,
    category: "ai",
    lastSync: "Real-time",
    config: { apiKey: "••••••••••••sk-1a2b", model: "gpt-4" },
  },
  {
    name: "Anthropic",
    description: "Claude AI integration",
    status: "connected",
    icon: Zap,
    category: "ai",
    lastSync: "Real-time",
    config: { apiKey: "••••••••••••ant-3c4d", model: "claude-3" },
  },
  {
    name: "n8n Workflows",
    description: "Automation platform",
    status: "connected",
    icon: Workflow,
    category: "automation",
    lastSync: "30 seconds ago",
    config: { endpoint: "https://flow.aspect...", webhook: "active" },
  },
  {
    name: "PostgreSQL",
    description: "Primary database",
    status: "connected",
    icon: Database,
    category: "database",
    lastSync: "Real-time",
    config: { host: "db.aspect...", database: "production" },
  },
  {
    name: "Redis Cache",
    description: "In-memory data store",
    status: "connected",
    icon: Database,
    category: "database",
    lastSync: "Real-time",
    config: { host: "redis.aspect...", cluster: "enabled" },
  },
  {
    name: "AWS S3",
    description: "Cloud storage service",
    status: "connected",
    icon: Cloud,
    category: "storage",
    lastSync: "10 minutes ago",
    config: { bucket: "aspect-media-prod", region: "us-east-1" },
  },
  {
    name: "Stripe",
    description: "Payment processing",
    status: "pending",
    icon: ShoppingCart,
    category: "payments",
    lastSync: "Not configured",
    config: { publishableKey: "", secretKey: "" },
  },
  {
    name: "Discord Bot",
    description: "Community management",
    status: "error",
    icon: Globe,
    category: "social",
    lastSync: "Connection failed",
    config: { botToken: "••••••••••••5f6g", guildId: "789012345" },
  },
  {
    name: "Telegram Bot",
    description: "Messaging platform",
    status: "disconnected",
    icon: Globe,
    category: "social",
    lastSync: "Never",
    config: { botToken: "", chatId: "" },
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "pending":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    case "error":
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <XCircle className="h-5 w-5 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  const variants = {
    connected: "default",
    pending: "secondary",
    error: "destructive",
    disconnected: "outline",
  } as const

  return (
    <Badge variant={variants[status as keyof typeof variants] || "outline"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function IntegrationsPage() {
  const categories = ["all", "ecommerce", "media", "ai", "automation", "database", "storage", "payments", "social"]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Integrations</h1>
          <p className="text-muted-foreground">Manage your platform connections and API integrations</p>
        </div>

        {/* Integration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground">Across 8 categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">9</div>
              <p className="text-xs text-muted-foreground">Connected and syncing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">1</div>
              <p className="text-xs text-muted-foreground">Requires configuration</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">2</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations
                  .filter((integration) => category === "all" || integration.category === category)
                  .map((integration) => (
                    <Card key={integration.name} className="relative">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <integration.icon className="h-6 w-6 text-primary" />
                            <div>
                              <CardTitle className="text-lg">{integration.name}</CardTitle>
                              <CardDescription>{integration.description}</CardDescription>
                            </div>
                          </div>
                          {getStatusIcon(integration.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          {getStatusBadge(integration.status)}
                          <span className="text-sm text-muted-foreground">{integration.lastSync}</span>
                        </div>

                        {integration.status === "connected" && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Configuration</Label>
                            {Object.entries(integration.config).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground capitalize">{key}:</span>
                                <span className="font-mono">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {integration.status === "pending" && (
                          <div className="space-y-3">
                            <Label htmlFor={`${integration.name}-key`}>API Key</Label>
                            <Input id={`${integration.name}-key`} type="password" placeholder="Enter API key..." />
                            <Button className="w-full">Connect</Button>
                          </div>
                        )}

                        {integration.status === "error" && (
                          <div className="space-y-3">
                            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                              <p className="text-sm text-red-600 dark:text-red-400">
                                Connection failed. Check your credentials and try again.
                              </p>
                            </div>
                            <Button variant="outline" className="w-full bg-transparent">
                              Reconnect
                            </Button>
                          </div>
                        )}

                        {integration.status === "disconnected" && (
                          <Button variant="outline" className="w-full bg-transparent">
                            Setup Integration
                          </Button>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <Switch
                            checked={integration.status === "connected"}
                            disabled={integration.status === "pending" || integration.status === "error"}
                          />
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
