import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Globe, Key, Zap, Database, Shield } from "lucide-react"

export default function APIPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/agents",
      description: "List all available agents and their status",
      auth: "API Key",
      category: "Agents",
    },
    {
      method: "POST",
      path: "/api/agents/{id}/start",
      description: "Start a specific agent",
      auth: "API Key",
      category: "Agents",
    },
    {
      method: "POST",
      path: "/api/agents/{id}/stop",
      description: "Stop a specific agent",
      auth: "API Key",
      category: "Agents",
    },
    {
      method: "GET",
      path: "/api/agents/{id}/status",
      description: "Get detailed status of a specific agent",
      auth: "API Key",
      category: "Agents",
    },
    {
      method: "POST",
      path: "/api/upload",
      description: "Upload files for processing",
      auth: "API Key",
      category: "Media",
    },
    {
      method: "GET",
      path: "/api/upload/{id}/status",
      description: "Check upload processing status",
      auth: "API Key",
      category: "Media",
    },
    {
      method: "GET",
      path: "/api/workflows",
      description: "List all n8n workflows",
      auth: "API Key",
      category: "Workflows",
    },
    {
      method: "POST",
      path: "/api/workflows/{id}/trigger",
      description: "Trigger a specific workflow",
      auth: "API Key",
      category: "Workflows",
    },
    {
      method: "GET",
      path: "/api/dao/proposals",
      description: "Get DAO governance proposals",
      auth: "API Key",
      category: "DAO",
    },
    {
      method: "POST",
      path: "/api/dao/vote",
      description: "Submit a vote on a proposal",
      auth: "Wallet Signature",
      category: "DAO",
    },
  ]

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-500"
      case "POST":
        return "bg-blue-500"
      case "PUT":
        return "bg-yellow-500"
      case "DELETE":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Code className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-balance">API Documentation</h1>
            <p className="text-muted-foreground mt-2">Integrate with Aspect Marketing Solutions platform APIs</p>
          </div>
        </div>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Quick Start</span>
            </CardTitle>
            <CardDescription>Get started with the Aspect API in minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Key className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">1. Get API Key</p>
                  <p className="text-sm text-muted-foreground">Generate your API key in settings</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Globe className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">2. Make Request</p>
                  <p className="text-sm text-muted-foreground">Use base URL: api.aspectmarketingsolutions.app</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Database className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">3. Process Response</p>
                  <p className="text-sm text-muted-foreground">Handle JSON responses and errors</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Reference */}
        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="space-y-4">
              {["Agents", "Media", "Workflows", "DAO"].map((category) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle>{category} API</CardTitle>
                    <CardDescription>
                      {category === "Agents" && "Manage and monitor AI agents"}
                      {category === "Media" && "Upload and process media files"}
                      {category === "Workflows" && "Control n8n automation workflows"}
                      {category === "DAO" && "Interact with DAO governance system"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {endpoints
                        .filter((endpoint) => endpoint.category === category)
                        .map((endpoint, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Badge className={`${getMethodColor(endpoint.method)} text-white`}>
                                {endpoint.method}
                              </Badge>
                              <div>
                                <p className="font-mono text-sm">{endpoint.path}</p>
                                <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{endpoint.auth}</Badge>
                              <Button size="sm" variant="outline">
                                Try It
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>API Authentication</span>
                </CardTitle>
                <CardDescription>Secure your API requests with proper authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">API Key Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Include your API key in the Authorization header for most endpoints.
                    </p>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <p>Authorization: Bearer sk-asp-your-api-key-here</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Wallet Signature (DAO Endpoints)</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      DAO-related endpoints require wallet signature authentication.
                    </p>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <p>X-Wallet-Address: 0x1234...abcd</p>
                      <p>X-Signature: 0x5678...efgh</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Sample code to get you started quickly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">JavaScript/Node.js</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Get all agents
const response = await fetch('https://api.aspectmarketingsolutions.app/api/agents', {
  headers: {
    'Authorization': 'Bearer sk-asp-your-api-key-here',
    'Content-Type': 'application/json'
  }
});

const agents = await response.json();
console.log(agents);`}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Python</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`import requests

headers = {
    'Authorization': 'Bearer sk-asp-your-api-key-here',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.aspectmarketingsolutions.app/api/agents', headers=headers)
agents = response.json()
print(agents)`}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">cURL</h3>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`curl -X GET "https://api.aspectmarketingsolutions.app/api/agents" \\
  -H "Authorization: Bearer sk-asp-your-api-key-here" \\
  -H "Content-Type: application/json"`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "JavaScript SDK", description: "Official JavaScript/TypeScript SDK", status: "Available" },
                { name: "Python SDK", description: "Official Python SDK", status: "Available" },
                { name: "Go SDK", description: "Official Go SDK", status: "Coming Soon" },
                { name: "PHP SDK", description: "Official PHP SDK", status: "Coming Soon" },
                { name: "Ruby SDK", description: "Official Ruby SDK", status: "Coming Soon" },
                { name: "Java SDK", description: "Official Java SDK", status: "Coming Soon" },
              ].map((sdk, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{sdk.name}</CardTitle>
                    <CardDescription>{sdk.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant={sdk.status === "Available" ? "default" : "secondary"}>{sdk.status}</Badge>
                      <Button size="sm" variant="outline" disabled={sdk.status !== "Available"}>
                        {sdk.status === "Available" ? "Download" : "Notify Me"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
