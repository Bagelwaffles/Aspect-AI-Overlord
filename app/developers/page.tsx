import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Code, Download, Key, Zap, BookOpen, Terminal, Cpu, Globe } from "lucide-react"

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Developer Tools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build, integrate, and extend the Aspect AI platform with our comprehensive developer toolkit
          </p>
        </div>

        <Tabs defaultValue="sdk" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="sdk">SDK & APIs</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="playground">API Playground</TabsTrigger>
            <TabsTrigger value="tools">Dev Tools</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="sdk" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    JavaScript SDK
                  </CardTitle>
                  <CardDescription>Official JavaScript/TypeScript SDK</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">npm install @aspect/sdk</code>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">v2.1.0</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download SDK
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Python SDK
                  </CardTitle>
                  <CardDescription>Python library for AI agent integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">pip install aspect-ai</code>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">v1.8.3</Badge>
                    <Badge variant="outline">Python 3.8+</Badge>
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download SDK
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    REST API
                  </CardTitle>
                  <CardDescription>Direct HTTP API access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">api.aspect.ai/v1</code>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">v1.0</Badge>
                    <Badge variant="outline">OpenAPI 3.0</Badge>
                  </div>
                  <Button className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Docs
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Keys & Authentication</CardTitle>
                <CardDescription>Manage your API keys and authentication tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key Name</label>
                    <Input placeholder="My App Key" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Permissions</label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Read & Write</option>
                      <option>Read Only</option>
                      <option>Admin</option>
                    </select>
                  </div>
                </div>
                <Button>
                  <Key className="h-4 w-4 mr-2" />
                  Generate API Key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                  <CardDescription>Get up and running in 5 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Tutorial</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>Complete API documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Reference</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Development</CardTitle>
                  <CardDescription>Build custom AI agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="playground" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Playground</CardTitle>
                <CardDescription>Test API endpoints directly in your browser</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Endpoint</label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>/agents/list</option>
                      <option>/agents/create</option>
                      <option>/agents/status</option>
                      <option>/upload/file</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Method</label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>GET</option>
                      <option>POST</option>
                      <option>PUT</option>
                      <option>DELETE</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Request Body</label>
                  <Textarea placeholder='{"agent_type": "ecommerce", "config": {...}}' className="min-h-32" />
                </div>
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>CLI Tool</CardTitle>
                  <CardDescription>Command-line interface for Aspect AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">npm install -g @aspect/cli</code>
                  </div>
                  <Button className="w-full">Download CLI</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>VS Code Extension</CardTitle>
                  <CardDescription>IDE integration for agent development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="secondary">v1.2.0</Badge>
                    <Badge variant="outline">VS Code</Badge>
                  </div>
                  <Button className="w-full">Install Extension</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Bot</CardTitle>
                  <CardDescription>Automated product management</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Code</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Creator</CardTitle>
                  <CardDescription>AI-powered content generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Code</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Analyzer</CardTitle>
                  <CardDescription>Automated data processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Code</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testing Suite</CardTitle>
                <CardDescription>Comprehensive testing tools for your integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Cpu className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Unit Tests</h3>
                    <p className="text-sm text-muted-foreground">Test individual components</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Integration Tests</h3>
                    <p className="text-sm text-muted-foreground">End-to-end testing</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold">Load Tests</h3>
                    <p className="text-sm text-muted-foreground">Performance testing</p>
                  </div>
                </div>
                <Button className="w-full">Run Test Suite</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
