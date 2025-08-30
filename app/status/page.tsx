import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, XCircle, Clock, Activity, Server, Database, Globe } from "lucide-react"

export default function StatusPage() {
  const services = [
    { name: "API Gateway", status: "operational", uptime: 99.9, responseTime: 45 },
    { name: "Agent Console", status: "operational", uptime: 99.8, responseTime: 120 },
    { name: "File Upload Service", status: "operational", uptime: 99.7, responseTime: 200 },
    { name: "DAO Explorer", status: "maintenance", uptime: 98.5, responseTime: 0 },
    { name: "Workflow Engine", status: "operational", uptime: 99.9, responseTime: 80 },
    { name: "Database Cluster", status: "operational", uptime: 99.95, responseTime: 15 },
    { name: "Authentication", status: "operational", uptime: 99.8, responseTime: 60 },
    { name: "Monitoring System", status: "degraded", uptime: 97.2, responseTime: 300 },
  ]

  const incidents = [
    {
      id: 1,
      title: "DAO Explorer Scheduled Maintenance",
      status: "ongoing",
      severity: "maintenance",
      started: "2025-01-15 14:00 UTC",
      description: "Scheduled maintenance for blockchain integration updates",
    },
    {
      id: 2,
      title: "Monitoring System Performance Issues",
      status: "investigating",
      severity: "minor",
      started: "2025-01-15 12:30 UTC",
      description: "Investigating elevated response times in monitoring dashboard",
    },
    {
      id: 3,
      title: "API Rate Limiting Resolved",
      status: "resolved",
      severity: "major",
      started: "2025-01-14 09:15 UTC",
      resolved: "2025-01-14 11:45 UTC",
      description: "Resolved API rate limiting issues affecting agent operations",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "maintenance":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "outage":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      operational: "default",
      degraded: "secondary",
      maintenance: "outline",
      outage: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getSeverityBadge = (severity: string) => {
    const variants = {
      maintenance: "outline",
      minor: "secondary",
      major: "destructive",
      critical: "destructive",
    } as const

    return (
      <Badge variant={variants[severity as keyof typeof variants] || "default"}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">System Status</h1>
          <p className="text-muted-foreground">
            Real-time status and performance metrics for Aspect Marketing Solutions
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Overall System Status
              </CardTitle>
              <CardDescription>Current operational status across all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-xl font-semibold text-green-500">All Systems Operational</div>
                  <div className="text-sm text-muted-foreground">
                    6 of 8 services running normally, 1 in maintenance, 1 degraded
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99.2%</div>
                  <div className="text-sm text-muted-foreground">Overall Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">98ms</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">2</div>
                  <div className="text-sm text-muted-foreground">Active Incidents</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <div className="grid gap-4">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="font-semibold text-foreground">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {service.status === "maintenance"
                              ? "Under maintenance"
                              : service.status === "degraded"
                                ? "Performance issues"
                                : "Operating normally"}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uptime (30 days)</span>
                          <span>{service.uptime}%</span>
                        </div>
                        <Progress value={service.uptime} className="h-2" />
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Response Time: </span>
                        <span className="font-medium">
                          {service.responseTime > 0 ? `${service.responseTime}ms` : "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <div className="grid gap-4">
              {incidents.map((incident) => (
                <Card key={incident.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{incident.title}</h3>
                          {getSeverityBadge(incident.severity)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Started: {incident.started}
                          {incident.resolved && ` • Resolved: ${incident.resolved}`}
                        </div>
                      </div>
                      <Badge variant={incident.status === "resolved" ? "default" : "secondary"}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Infrastructure Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-foreground">12</div>
                      <div className="text-sm text-muted-foreground">Active Servers</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-foreground">3.2TB</div>
                      <div className="text-sm text-muted-foreground">Data Processed</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-foreground">1.2M</div>
                      <div className="text-sm text-muted-foreground">API Requests</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-foreground">45ms</div>
                      <div className="text-sm text-muted-foreground">Avg Latency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Disk Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold text-foreground">US East</div>
                      <div className="text-sm text-muted-foreground mb-2">Virginia</div>
                      <div className="text-green-500 font-medium">32ms</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold text-foreground">EU West</div>
                      <div className="text-sm text-muted-foreground mb-2">Ireland</div>
                      <div className="text-green-500 font-medium">28ms</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold text-foreground">Asia Pacific</div>
                      <div className="text-sm text-muted-foreground mb-2">Singapore</div>
                      <div className="text-yellow-500 font-medium">89ms</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Status page last updated: January 15, 2025 at 15:30 UTC</p>
          <p className="mt-1">Subscribe to updates • Contact Support • View Historical Data</p>
        </div>
      </div>
    </div>
  )
}
