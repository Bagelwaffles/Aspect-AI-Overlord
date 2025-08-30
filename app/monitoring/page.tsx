"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Activity, Server, Wifi, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function MonitoringPage() {
  const [systemStatus, setSystemStatus] = useState("operational")
  const [uptime, setUptime] = useState(99.97)

  const services = [
    { name: "API Gateway", status: "operational", uptime: 99.99, responseTime: 45 },
    { name: "Agent Orchestrator", status: "operational", uptime: 99.95, responseTime: 120 },
    { name: "Database Cluster", status: "operational", uptime: 99.98, responseTime: 15 },
    { name: "File Storage", status: "operational", uptime: 99.92, responseTime: 80 },
    { name: "Authentication", status: "degraded", uptime: 98.5, responseTime: 200 },
    { name: "Notification Service", status: "operational", uptime: 99.88, responseTime: 60 },
  ]

  const metrics = [
    { name: "CPU Usage", value: 45, unit: "%", status: "normal" },
    { name: "Memory Usage", value: 68, unit: "%", status: "normal" },
    { name: "Disk Usage", value: 32, unit: "%", status: "normal" },
    { name: "Network I/O", value: 1.2, unit: "GB/s", status: "normal" },
  ]

  const incidents = [
    {
      id: 1,
      title: "Authentication Service Slowdown",
      status: "investigating",
      severity: "minor",
      started: "2024-01-15 14:30 UTC",
      description: "Users may experience slower login times",
    },
    {
      id: 2,
      title: "Scheduled Maintenance",
      status: "scheduled",
      severity: "maintenance",
      started: "2024-01-20 02:00 UTC",
      description: "Database optimization and security updates",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-500"
      case "degraded":
        return "text-yellow-500"
      case "outage":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "outage":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Monitoring</h1>
            <p className="text-muted-foreground mt-2">Real-time platform health and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(systemStatus)}
            <Badge variant={systemStatus === "operational" ? "default" : "destructive"}>
              {systemStatus === "operational" ? "All Systems Operational" : "Service Issues"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{uptime}%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {services.filter((s) => s.status === "operational").length}/{services.length}
              </div>
              <p className="text-xs text-muted-foreground">Services running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Wifi className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87ms</div>
              <p className="text-xs text-muted-foreground">API response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{incidents.filter((i) => i.status !== "resolved").length}</div>
              <p className="text-xs text-muted-foreground">Active issues</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
                <CardDescription>Current status of all platform services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.uptime}% uptime • {service.responseTime}ms avg response
                          </p>
                        </div>
                      </div>
                      <Badge variant={service.status === "operational" ? "default" : "destructive"}>
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {metric.value}
                        {metric.unit}
                      </span>
                      <Badge variant={metric.status === "normal" ? "default" : "destructive"}>{metric.status}</Badge>
                    </div>
                    <Progress value={metric.value} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Incidents</CardTitle>
                <CardDescription>Active and scheduled incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium">{incident.title}</h3>
                        <Badge variant={incident.severity === "minor" ? "secondary" : "default"}>
                          {incident.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Status: {incident.status}</span>
                        <span>Started: {incident.started}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>Recent system activity and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  <div className="p-2 bg-muted rounded">
                    <span className="text-muted-foreground">2024-01-15 15:42:33</span> [INFO] Agent.Overmind: Task
                    completed successfully
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <span className="text-muted-foreground">2024-01-15 15:41:15</span> [WARN] Auth Service: High
                    response time detected
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <span className="text-muted-foreground">2024-01-15 15:40:02</span> [INFO] Database: Connection pool
                    optimized
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <span className="text-muted-foreground">2024-01-15 15:38:45</span> [INFO] API Gateway: Rate limit
                    adjusted
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
