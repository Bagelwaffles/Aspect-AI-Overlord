import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Book,
  Search,
  ExternalLink,
  Download,
  Play,
  Code,
  Zap,
  Shield,
  Users,
  Settings,
  HelpCircle,
  FileText,
  Video,
  MessageSquare,
} from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentation</h1>
            <p className="text-muted-foreground">Complete guides and references for the Aspect AI platform</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documentation..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              PDF Export
            </Button>
          </div>
        </div>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>Get up and running with Aspect AI in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h3 className="font-medium">Setup Account</h3>
                </div>
                <p className="text-sm text-muted-foreground">Create your account and configure initial settings</p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  View Guide <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h3 className="font-medium">Deploy Agents</h3>
                </div>
                <p className="text-sm text-muted-foreground">Configure and deploy your first AI agents</p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  View Guide <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h3 className="font-medium">Monitor & Scale</h3>
                </div>
                <p className="text-sm text-muted-foreground">Monitor performance and scale your operations</p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  View Guide <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Documentation */}
        <Tabs defaultValue="guides" className="space-y-4">
          <TabsList>
            <TabsTrigger value="guides">User Guides</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Platform Overview
                  </CardTitle>
                  <CardDescription>Understanding the Aspect AI ecosystem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Introduction to AI Agents</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Platform Architecture</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Security & Compliance</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">User Management</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Agent Configuration
                  </CardTitle>
                  <CardDescription>Setting up and customizing AI agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Agent Types & Capabilities</span>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Configuration Parameters</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Performance Tuning</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Custom Workflows</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Integration Guides</CardTitle>
                <CardDescription>Connect Aspect AI with your existing tools and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">REST API</h3>
                    <p className="text-xs text-muted-foreground mb-3">Complete API integration guide</p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Webhooks</h3>
                    <p className="text-xs text-muted-foreground mb-3">Real-time event notifications</p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Authentication</h3>
                    <p className="text-xs text-muted-foreground mb-3">OAuth, API keys, and SSO</p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">SDKs</h3>
                    <p className="text-xs text-muted-foreground mb-3">JavaScript, Python, and more</p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Complete reference for all API endpoints and methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Authentication</h3>
                      <Badge variant="outline">v2.1</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage API keys, OAuth tokens, and authentication flows
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Endpoints
                      </Button>
                      <Button variant="outline" size="sm">
                        Try in Postman
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Agents</h3>
                      <Badge variant="outline">v2.1</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create, configure, and manage AI agents programmatically
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Endpoints
                      </Button>
                      <Button variant="outline" size="sm">
                        Try in Postman
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Workflows</h3>
                      <Badge variant="outline">v2.1</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automate complex processes with workflow management
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Endpoints
                      </Button>
                      <Button variant="outline" size="sm">
                        Try in Postman
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                  <CardDescription>Step-by-step video guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <Play className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Getting Started with Aspect AI</h4>
                        <p className="text-xs text-muted-foreground">12:34 • Beginner</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <Play className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Building Your First Agent</h4>
                        <p className="text-xs text-muted-foreground">18:45 • Intermediate</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <Play className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Advanced Workflow Automation</h4>
                        <p className="text-xs text-muted-foreground">25:12 • Advanced</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Written Tutorials
                  </CardTitle>
                  <CardDescription>In-depth written guides and examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <h4 className="font-medium text-sm mb-1">Building an E-commerce Automation Agent</h4>
                      <p className="text-xs text-muted-foreground">
                        Learn to automate order processing and inventory management
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Tutorial
                        </Badge>
                        <span className="text-xs text-muted-foreground">15 min read</span>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <h4 className="font-medium text-sm mb-1">Integrating with External APIs</h4>
                      <p className="text-xs text-muted-foreground">
                        Connect your agents to third-party services and APIs
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Tutorial
                        </Badge>
                        <span className="text-xs text-muted-foreground">22 min read</span>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                      <h4 className="font-medium text-sm mb-1">Scaling Your Agent Infrastructure</h4>
                      <p className="text-xs text-muted-foreground">Best practices for high-volume agent deployments</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          Tutorial
                        </Badge>
                        <span className="text-xs text-muted-foreground">18 min read</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Common Issues
                </CardTitle>
                <CardDescription>Solutions to frequently encountered problems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Agent Not Responding</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      When agents fail to process requests or become unresponsive
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>1. Check agent status in the console</p>
                      <p>2. Verify resource allocation and limits</p>
                      <p>3. Review recent error logs</p>
                      <p>4. Restart the agent if necessary</p>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">API Rate Limiting</h3>
                    <p className="text-sm text-muted-foreground mb-3">Handling rate limit errors and optimization</p>
                    <div className="space-y-2 text-sm">
                      <p>1. Implement exponential backoff</p>
                      <p>2. Use batch operations when possible</p>
                      <p>3. Monitor your rate limit usage</p>
                      <p>4. Consider upgrading your plan</p>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Authentication Failures</h3>
                    <p className="text-sm text-muted-foreground mb-3">Resolving login and API key issues</p>
                    <div className="space-y-2 text-sm">
                      <p>1. Verify API key is valid and active</p>
                      <p>2. Check token expiration dates</p>
                      <p>3. Ensure proper scopes are assigned</p>
                      <p>4. Review authentication headers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changelog" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Release Notes</CardTitle>
                <CardDescription>Latest updates and improvements to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Version 2.1.0</h3>
                      <Badge variant="secondary">Latest</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Released on January 15, 2025</p>
                    <div className="space-y-2 text-sm">
                      <p>• Enhanced AI model performance with 25% faster processing</p>
                      <p>• New marketplace for community-built agents</p>
                      <p>• Improved security with advanced threat detection</p>
                      <p>• Added support for custom branding and white-labeling</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-muted pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Version 2.0.5</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Released on December 20, 2024</p>
                    <div className="space-y-2 text-sm">
                      <p>• Fixed issue with webhook delivery failures</p>
                      <p>• Improved mobile app performance</p>
                      <p>• Enhanced analytics dashboard with new metrics</p>
                      <p>• Bug fixes and stability improvements</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-muted pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Version 2.0.0</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Released on November 30, 2024</p>
                    <div className="space-y-2 text-sm">
                      <p>• Major platform redesign with improved UX</p>
                      <p>• New agent types: Web3DAO and CreatorTools</p>
                      <p>• Advanced workflow automation capabilities</p>
                      <p>• Enterprise-grade security and compliance features</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
