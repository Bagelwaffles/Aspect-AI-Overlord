import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Store,
  Search,
  Star,
  Download,
  Filter,
  Bot,
  Zap,
  Shield,
  Globe,
  Code,
  Palette,
  Database,
  MessageSquare,
} from "lucide-react"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Agent Marketplace</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover, install, and customize AI agents built by the community
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search agents, categories, or developers..." className="pl-10" />
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Marketplace Tabs */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="my-agents">My Agents</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Bot className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Smart Content Creator</CardTitle>
                        <CardDescription>by AspectAI Team</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Advanced AI agent for creating engaging content across multiple platforms with SEO optimization.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>12.5K</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">Content</Badge>
                    <Badge variant="outline">SEO</Badge>
                    <Badge variant="outline">Marketing</Badge>
                  </div>
                  <Button className="w-full">Install Agent</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Data Analyzer Pro</CardTitle>
                        <CardDescription>by DataCorp</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Powerful data analysis agent with machine learning capabilities and automated reporting.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.7</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>8.2K</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">Analytics</Badge>
                    <Badge variant="outline">ML</Badge>
                    <Badge variant="outline">Reports</Badge>
                  </div>
                  <Button className="w-full">Install Agent</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Customer Support Bot</CardTitle>
                        <CardDescription>by SupportTech</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Intelligent customer support agent with multilingual capabilities and sentiment analysis.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>15.7K</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">Support</Badge>
                    <Badge variant="outline">Chat</Badge>
                    <Badge variant="outline">AI</Badge>
                  </div>
                  <Button className="w-full">Install Agent</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI & Automation</h3>
                    <p className="text-sm text-muted-foreground">247 agents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Data & Analytics</h3>
                    <p className="text-sm text-muted-foreground">156 agents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Communication</h3>
                    <p className="text-sm text-muted-foreground">189 agents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Creative Tools</h3>
                    <p className="text-sm text-muted-foreground">134 agents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Web & Social</h3>
                    <p className="text-sm text-muted-foreground">203 agents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Security</h3>
                    <p className="text-sm text-muted-foreground">78 agents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Development</h3>
                    <p className="text-sm text-muted-foreground">165 agents</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Productivity</h3>
                    <p className="text-sm text-muted-foreground">298 agents</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Installed Agents</CardTitle>
                <CardDescription>Manage and configure your installed marketplace agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Smart Content Creator</h3>
                        <p className="text-sm text-muted-foreground">Installed 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Active</Badge>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Data Analyzer Pro</h3>
                        <p className="text-sm text-muted-foreground">Installed 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Inactive</Badge>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Marketplace Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Statistics</CardTitle>
            <CardDescription>Community metrics and platform growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Total Agents</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">45.2K</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">892</div>
                <div className="text-sm text-muted-foreground">Developers</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">4.6</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
