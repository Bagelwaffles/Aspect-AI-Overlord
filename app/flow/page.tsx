"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Square, Settings, GitBranch, Clock, Zap, AlertCircle } from "lucide-react"

export default function FlowPage() {
  const [activeFlows, setActiveFlows] = useState(12)
  const [totalExecutions, setTotalExecutions] = useState(1847)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlows((prev) => prev + Math.floor(Math.random() * 3) - 1)
      setTotalExecutions((prev) => prev + Math.floor(Math.random() * 5))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const workflows = [
    {
      id: 1,
      name: "Ecommerce Product Sync",
      status: "running",
      lastRun: "2 minutes ago",
      executions: 234,
      agent: "Aspect.EcommerceAutomation",
      description: "Syncs products between Etsy and Printify",
    },
    {
      id: 2,
      name: "Media Processing Pipeline",
      status: "running",
      lastRun: "5 minutes ago",
      executions: 156,
      agent: "Aspect.MediaUploader",
      description: "Processes uploaded media files and generates thumbnails",
    },
    {
      id: 3,
      name: "Research Data Collection",
      status: "paused",
      lastRun: "1 hour ago",
      executions: 89,
      agent: "Aspect.Research",
      description: "Collects market research data from various sources",
    },
    {
      id: 4,
      name: "DAO Governance Notifications",
      status: "running",
      lastRun: "10 minutes ago",
      executions: 67,
      agent: "Aspect.Web3DAO",
      description: "Monitors governance proposals and sends notifications",
    },
    {
      id: 5,
      name: "Voice Command Processing",
      status: "idle",
      lastRun: "30 minutes ago",
      executions: 45,
      agent: "Aspect.Control",
      description: "Processes voice commands and executes actions",
    },
    {
      id: 6,
      name: "Creator Content Pipeline",
      status: "running",
      lastRun: "1 minute ago",
      executions: 123,
      agent: "Aspect.CreatorTools",
      description: "Automates content creation and publishing workflows",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "idle":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4" />
      case "paused":
        return <Pause className="h-4 w-4" />
      case "idle":
        return <Square className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Square className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Workflow Automation</h1>
            <p className="text-muted-foreground mt-2">
              Manage and monitor n8n automation workflows across all AI agents
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Settings className="h-4 w-4 mr-2" />
            Configure n8n
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{activeFlows}</p>
                  <p className="text-sm text-muted-foreground">Active Flows</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{totalExecutions}</p>
                  <p className="text-sm text-muted-foreground">Total Executions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">99.8%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Errors Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList>
            <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="logs">Execution Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <div className="grid gap-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                        <div>
                          <CardTitle className="text-lg">{workflow.name}</CardTitle>
                          <CardDescription>{workflow.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{workflow.agent}</Badge>
                        <Button size="sm" variant="outline">
                          {getStatusIcon(workflow.status)}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last run: {workflow.lastRun}</span>
                      <span>{workflow.executions} executions</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Ecommerce Sync", description: "Sync products across platforms", category: "Ecommerce" },
                { name: "Media Processing", description: "Process and optimize media files", category: "Media" },
                { name: "Data Collection", description: "Collect and analyze research data", category: "Research" },
                { name: "Notification System", description: "Send automated notifications", category: "Communication" },
                { name: "Content Publishing", description: "Automate content publishing", category: "Content" },
                { name: "Backup & Sync", description: "Backup data across services", category: "Utility" },
              ].map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.category}</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Executions</CardTitle>
                <CardDescription>Latest workflow execution logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      workflow: "Creator Content Pipeline",
                      status: "success",
                      time: "2 minutes ago",
                      duration: "1.2s",
                    },
                    { workflow: "Ecommerce Product Sync", status: "success", time: "5 minutes ago", duration: "3.4s" },
                    {
                      workflow: "DAO Governance Notifications",
                      status: "success",
                      time: "8 minutes ago",
                      duration: "0.8s",
                    },
                    {
                      workflow: "Media Processing Pipeline",
                      status: "warning",
                      time: "12 minutes ago",
                      duration: "15.2s",
                    },
                    {
                      workflow: "Voice Command Processing",
                      status: "success",
                      time: "18 minutes ago",
                      duration: "2.1s",
                    },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            log.status === "success"
                              ? "bg-green-500"
                              : log.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{log.workflow}</p>
                          <p className="text-sm text-muted-foreground">{log.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{log.duration}</p>
                        <Badge variant={log.status === "success" ? "default" : "secondary"}>{log.status}</Badge>
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
