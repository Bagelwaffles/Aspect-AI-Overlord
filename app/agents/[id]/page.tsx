"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Activity, Settings, Play, Pause, BarChart3, Clock, Zap, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"

const agentData = {
  overmind: {
    name: "Aspect.Overmind",
    description: "Central orchestration and coordination agent with comprehensive AI capabilities",
    status: "active",
    uptime: "99.9%",
    tasksCompleted: 15847,
    currentLoad: 67,
    category: "orchestration",
    capabilities: [
      "AI App Builder (APK/AAB + Play Store submission assets)",
      "AI Coder (apps, APIs, agents, websites)",
      "Website Builder + hosting + CI/CD",
      "Product Creator (Etsy, Printify, Amazon)",
      "Amazon Listing Automation",
      "Funnel Creation + Landing Pages",
      "API Key Generator (links + secret storage hooks)",
      "Inter-op across all sub-agents",
    ],
    integrations: ["All Platform Services", "CI/CD Pipeline", "Cloud Hosting", "App Stores"],
    metrics: {
      avgResponseTime: "0.3s",
      successRate: "99.2%",
      dailyTasks: 1247,
      errorRate: "0.8%",
    },
  },
  ecommerce: {
    name: "Printify↔Etsy Sync",
    description: "Automated ecommerce operations with product synchronization and marketplace management",
    status: "active",
    uptime: "98.7%",
    tasksCompleted: 8934,
    currentLoad: 45,
    category: "ecommerce",
    capabilities: [
      "Sync products/variants",
      "Auto-generate mockups",
      "Daily auto-posting (50/day cap adjustable)",
      "Bundle CSV import/export",
    ],
    integrations: ["Printify", "Etsy", "Pinterest", "Instagram"],
    metrics: {
      avgResponseTime: "1.2s",
      successRate: "97.8%",
      dailyTasks: 567,
      errorRate: "2.2%",
    },
  },
  media: {
    name: "YouTube Uploader Agent",
    description: "Media processing and upload management with automated content publishing",
    status: "active",
    uptime: "99.1%",
    tasksCompleted: 12456,
    currentLoad: 78,
    category: "media",
    capabilities: ["MP4 upload", "Thumbnail + hashtags", "Public uploader app"],
    integrations: ["YouTube", "Agent Memory"],
    metrics: {
      avgResponseTime: "2.1s",
      successRate: "98.5%",
      dailyTasks: 892,
      errorRate: "1.5%",
    },
  },
  control: {
    name: "AGI Commander",
    description: "Advanced voice and command interface with custom avatar and terminal-style UI",
    status: "idle",
    uptime: "97.3%",
    tasksCompleted: 3421,
    currentLoad: 12,
    category: "control",
    capabilities: ["Voice interface", "Custom avatar", "Terminal-style UI", "Persona memory"],
    integrations: ["Voice Recognition", "Avatar System", "Terminal Interface"],
    metrics: {
      avgResponseTime: "0.8s",
      successRate: "95.6%",
      dailyTasks: 234,
      errorRate: "4.4%",
    },
  },
  research: {
    name: "Reverse-Engineering Intelligence Agent",
    description: "Advanced research and intelligence gathering with self-improvement capabilities",
    status: "active",
    uptime: "98.9%",
    tasksCompleted: 6789,
    currentLoad: 56,
    category: "research",
    capabilities: [
      "Monitor v0/Manus/Claude/AutoGPT/AgentOps releases",
      "Scrape changelogs/tutorials",
      "Self-improvement + repair suggestions",
    ],
    integrations: ["Web Scraping", "API Monitoring", "Documentation Systems"],
    metrics: {
      avgResponseTime: "3.4s",
      successRate: "96.7%",
      dailyTasks: 445,
      errorRate: "3.3%",
    },
  },
  web3dao: {
    name: "DAO & Token Suite",
    description: "Comprehensive blockchain and DAO governance automation with multi-chain support",
    status: "active",
    uptime: "99.5%",
    tasksCompleted: 2156,
    currentLoad: 34,
    category: "web3",
    capabilities: [
      "Airdrop tracker",
      "Yield pool",
      "Treasury dashboard",
      "Snapshot votes",
      "Cross-chain deployment (Base/Arbitrum/Solana)",
    ],
    integrations: ["Base", "Arbitrum", "Solana", "Snapshot", "DeFi Protocols"],
    metrics: {
      avgResponseTime: "1.8s",
      successRate: "98.9%",
      dailyTasks: 178,
      errorRate: "1.1%",
    },
  },
  creator: {
    name: "Bagelwaffles Stream Agent",
    description: "Comprehensive creator tools for streaming and content creation with automation",
    status: "active",
    uptime: "98.2%",
    tasksCompleted: 9876,
    currentLoad: 62,
    category: "creator",
    capabilities: ["Overlay pack", "Clips bot", "Merch triggers", "Multi-stream schedule + alerts"],
    integrations: ["Streaming Platforms", "Clip Generation", "Merchandise Systems", "Alert Systems"],
    metrics: {
      avgResponseTime: "2.7s",
      successRate: "97.1%",
      dailyTasks: 723,
      errorRate: "2.9%",
    },
  },
}

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = agentData[params.id as keyof typeof agentData]
  const [isRunning, setIsRunning] = useState(agent?.status === "active")
  const [currentLoad, setCurrentLoad] = useState(agent?.currentLoad || 0)

  useEffect(() => {
    if (!agent) return

    const interval = setInterval(() => {
      setCurrentLoad((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)))
    }, 2000)

    return () => clearInterval(interval)
  }, [agent])

  if (!agent) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(agent.status)}`} />
            <div>
              <h1 className="text-3xl font-bold text-balance">{agent.name}</h1>
              <p className="text-muted-foreground mt-2">{agent.description}</p>
              <Badge variant="outline" className="mt-2 capitalize">
                {agent.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant={isRunning ? "destructive" : "default"} onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{agent.uptime}</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{agent.tasksCompleted.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{Math.round(currentLoad)}%</p>
                  <p className="text-sm text-muted-foreground">Current Load</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{agent.metrics.avgResponseTime}</p>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Load Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Current Load</CardTitle>
            <CardDescription>Real-time processing load and capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing Capacity</span>
                <span>{Math.round(currentLoad)}%</span>
              </div>
              <Progress value={currentLoad} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <Badge variant="default">{agent.metrics.successRate}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Tasks</span>
                    <Badge variant="secondary">{agent.metrics.dailyTasks}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Rate</span>
                    <Badge variant="destructive">{agent.metrics.errorRate}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <Badge variant="outline">{agent.metrics.avgResponseTime}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Agent Status</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                      <span className="capitalize">{agent.status}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Usage</span>
                    <span>2.3 GB / 8 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPU Usage</span>
                    <span>{Math.round(currentLoad * 0.8)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network I/O</span>
                    <span>45.2 MB/s</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {agent.capabilities.map((capability, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{capability}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Connected Integrations</CardTitle>
                <CardDescription>External services and platforms this agent connects to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agent.integrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-medium">{integration}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{agent.metrics.avgResponseTime}</div>
                  <p className="text-sm text-muted-foreground mt-1">Average response time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">{agent.metrics.successRate}</div>
                  <p className="text-sm text-muted-foreground mt-1">Task completion rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Error Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">{agent.metrics.errorRate}</div>
                  <p className="text-sm text-muted-foreground mt-1">Failed task percentage</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest agent activity and task execution logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Task completed successfully", time: "2 minutes ago", status: "success" },
                    { action: "Processing media file upload", time: "5 minutes ago", status: "info" },
                    { action: "Integration sync completed", time: "8 minutes ago", status: "success" },
                    { action: "Warning: High memory usage detected", time: "12 minutes ago", status: "warning" },
                    { action: "Task queue processed", time: "15 minutes ago", status: "success" },
                    { action: "Configuration updated", time: "20 minutes ago", status: "info" },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.status === "success"
                            ? "bg-green-500"
                            : log.status === "warning"
                              ? "bg-yellow-500"
                              : log.status === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
