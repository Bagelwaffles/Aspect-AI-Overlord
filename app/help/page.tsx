import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, MessageCircle, Video, ExternalLink } from "lucide-react"

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Help Center</h1>
          <p className="text-xl text-muted-foreground">Get help with Aspect Marketing Solutions</p>
          <div className="flex items-center space-x-2 max-w-md mx-auto">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for help articles..." className="flex-1" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Book className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Documentation</h3>
              <p className="text-sm text-muted-foreground">Complete guides and API docs</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with our support team</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
            </CardContent>
          </Card>
        </div>

        {/* Help Content */}
        <Tabs defaultValue="getting-started" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with Aspect AI</CardTitle>
                <CardDescription>Learn the basics of using our AI agent platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Platform Overview", desc: "Understanding the Aspect AI ecosystem", time: "5 min read" },
                  {
                    title: "Setting Up Your First Agent",
                    desc: "Configure and deploy your first AI agent",
                    time: "10 min read",
                  },
                  {
                    title: "Dashboard Navigation",
                    desc: "Navigate the console and monitoring tools",
                    time: "3 min read",
                  },
                  { title: "User Management", desc: "Add team members and manage permissions", time: "7 min read" },
                ].map((article, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium">{article.title}</h4>
                      <p className="text-sm text-muted-foreground">{article.desc}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{article.time}</Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Documentation</CardTitle>
                <CardDescription>Learn about each AI agent and their capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Aspect.Overmind",
                    desc: "Master orchestration agent for coordinating all operations",
                    type: "Core Agent",
                  },
                  {
                    title: "Aspect.EcommerceAutomation",
                    desc: "Automate Etsy and Printify operations",
                    type: "Ecommerce",
                  },
                  {
                    title: "Aspect.MediaUploader",
                    desc: "Process and upload media to various platforms",
                    type: "Media",
                  },
                  { title: "Aspect.VoiceControl", desc: "Voice-activated commands and control", type: "Interface" },
                  { title: "Aspect.Research", desc: "Automated research and data gathering", type: "Research" },
                  { title: "Aspect.Web3DAO", desc: "Blockchain and DAO management", type: "Web3" },
                  { title: "Aspect.CreatorTools", desc: "Content creation and optimization tools", type: "Creator" },
                ].map((agent, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium">{agent.title}</h4>
                      <p className="text-sm text-muted-foreground">{agent.desc}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{agent.type}</Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integration Guides</CardTitle>
                <CardDescription>Connect external services and platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Etsy Integration",
                    desc: "Connect your Etsy shop for automated management",
                    category: "Ecommerce",
                  },
                  { title: "Printify Setup", desc: "Configure print-on-demand automation", category: "Ecommerce" },
                  { title: "YouTube API", desc: "Upload and manage YouTube content", category: "Media" },
                  { title: "Discord Bot", desc: "Set up Discord community management", category: "Social" },
                  { title: "Blockchain Wallets", desc: "Connect Web3 wallets for DAO operations", category: "Web3" },
                ].map((integration, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium">{integration.title}</h4>
                      <p className="text-sm text-muted-foreground">{integration.desc}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{integration.category}</Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
                <CardDescription>Solutions to frequently encountered problems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Agent Not Responding", desc: "Troubleshoot unresponsive AI agents", severity: "High" },
                  { title: "Upload Failures", desc: "Fix file upload and processing issues", severity: "Medium" },
                  { title: "API Rate Limits", desc: "Handle API rate limiting errors", severity: "Medium" },
                  { title: "Authentication Errors", desc: "Resolve login and permission issues", severity: "High" },
                  { title: "Performance Issues", desc: "Optimize platform performance", severity: "Low" },
                ].map((issue, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium">{issue.title}</h4>
                      <p className="text-sm text-muted-foreground">{issue.desc}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          issue.severity === "High"
                            ? "destructive"
                            : issue.severity === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {issue.severity}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>Contact our support team for personalized assistance</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Our support team is available 24/7 to help you succeed</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Email Support</Button>
              <Button>Start Live Chat</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
