"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Activity, Bot, Settings, Play, Pause, RotateCcw, TrendingUp, Zap } from "lucide-react"

interface Agent {
  id: string
  name: string
  status: "active" | "idle" | "error" | "maintenance"
  description: string
  performance: number
  tasksCompleted: number
  uptime: string
  lastActivity: string
}

export default function ConsolePage() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "overmind",
      name: "Aspect.Overmind",
      status: "active",
      description: "Orchestration and coordination agent",
      performance: 98,
      tasksCompleted: 1247,
      uptime: "99.8%",
      lastActivity: "2 minutes ago",
    },
    {
      id: "ecommerce",
      name: "Aspect.Ecommerce",
      status: "active",
      description: "Etsy & Printify automation",
      performance: 94,
      tasksCompleted: 856,
      uptime: "97.2%",
      lastActivity: "5 minutes ago",
    },
    {
      id: "media",
      name: "Aspect.Media",
      status: "idle",
      description: "YouTube & content uploading",
      performance: 89,
      tasksCompleted: 423,
      uptime: "95.1%",
      lastActivity: "1 hour ago",
    },
    {
      id: "control",
      name: "Aspect.Control",
      status: "active",
      description: "Voice control and automation",
      performance: 96,
      tasksCompleted: 672,
      uptime: "98.5%",
      lastActivity: "3 minutes ago",
    },
    {
      id: "research",
      name: "Aspect.Research",
      status: "active",
      description: "Data analysis and insights",
      performance: 92,
      tasksCompleted: 1089,
      uptime: "96.8%",
      lastActivity: "1 minute ago",
    },
    {
      id: "web3",
      name: "Aspect.Web3",
      status: "maintenance",
      description: "DAO and blockchain operations",
      performance: 87,
      tasksCompleted: 234,
      uptime: "94.3%",
      lastActivity: "2 hours ago",
    },
    {
      id: "creator",
      name: "Aspect.Creator",
      status: "active",
      description: "Content creation and optimization",
      performance: 91,
      tasksCompleted: 567,
      uptime: "97.9%",
      lastActivity: "4 minutes ago",
    },
  ])

  const [systemStats, setSystemStats] = useState({
    totalTasks: 5088,
    activeAgents: 5,
    systemLoad: 67,
    responseTime: 245,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        ...prev,
        totalTasks: prev.totalTasks + Math.floor(Math.random() * 3),
        systemLoad: Math.max(30, Math.min(90, prev.systemLoad + (Math.random() - 0.5) * 10)),
        responseTime: Math.max(100, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 50)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      case "maintenance":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
      case "idle":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Idle</Badge>
      case "error":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>
      case "maintenance":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Maintenance</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Console</h1>
            <p className="text-muted-foreground">Monitor and manage your AI agents</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              System Online
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalTasks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeAgents}/7</div>
              <p className="text-xs text-muted-foreground">2 idle, 0 errors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Load</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(systemStats.systemLoad)}%</div>
              <Progress value={systemStats.systemLoad} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(systemStats.responseTime)}ms</div>
              <p className="text-xs text-muted-foreground">Average latency</p>
            </CardContent>
          </Card>
        </div>

        {/* Agent Management */}
        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} animate-pulse`}></div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription>{agent.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(agent.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Performance</p>
                        <div className="flex items-center gap-2">
                          <Progress value={agent.performance} className="flex-1" />
                          <span className="font-medium">{agent.performance}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tasks Completed</p>
                        <p className="font-medium">{agent.tasksCompleted.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p className="font-medium">{agent.uptime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Activity</p>
                        <p className="font-medium">{agent.lastActivity}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        {agent.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Real-time agent activity and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      time: "14:32:15",
                      agent: "Aspect.Overmind",
                      action: "Coordinated task distribution to 3 agents",
                      type: "info",
                    },
                    {
                      time: "14:31:42",
                      agent: "Aspect.Ecommerce",
                      action: "Successfully uploaded 12 products to Etsy",
                      type: "success",
                    },
                    {
                      time: "14:30:18",
                      agent: "Aspect.Research",
                      action: "Completed market analysis report",
                      type: "success",
                    },
                    {
                      time: "14:29:55",
                      agent: "Aspect.Control",
                      action: 'Voice command processed: "Generate weekly report"',
                      type: "info",
                    },
                    {
                      time: "14:28:33",
                      agent: "Aspect.Web3",
                      action: "Entering maintenance mode for blockchain sync",
                      type: "warning",
                    },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.type === "success"
                            ? "bg-green-500"
                            : log.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{log.agent}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{log.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{log.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Manage global agent settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-restart failed agents</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically restart agents that encounter errors
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Performance monitoring</h4>
                      <p className="text-sm text-muted-foreground">Track agent performance metrics and alerts</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Load balancing</h4>
                      <p className="text-sm text-muted-foreground">Distribute tasks across available agents</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
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
