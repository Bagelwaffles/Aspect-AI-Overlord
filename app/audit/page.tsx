"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, FileText, Download, Filter, User, Activity } from "lucide-react"

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState("logs")

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:22",
      user: "sarah@aspectai.com",
      action: "Agent Created",
      resource: "Aspect.EcommerceAutomation",
      ip: "192.168.1.100",
      status: "Success",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:25:15",
      user: "marcus@aspectai.com",
      action: "Settings Updated",
      resource: "System Configuration",
      ip: "192.168.1.101",
      status: "Success",
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:20:08",
      user: "emily@aspectai.com",
      action: "Data Export",
      resource: "Analytics Dashboard",
      ip: "192.168.1.102",
      status: "Success",
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:15:33",
      user: "system",
      action: "Backup Completed",
      resource: "Database",
      ip: "internal",
      status: "Success",
    },
    {
      id: 5,
      timestamp: "2024-01-15 14:10:45",
      user: "david@aspectai.com",
      action: "Login Failed",
      resource: "Authentication",
      ip: "192.168.1.103",
      status: "Failed",
    },
  ]

  const complianceReports = [
    { id: 1, name: "GDPR Compliance Report", date: "2024-01-15", status: "Compliant", score: 98 },
    { id: 2, name: "SOC 2 Type II Assessment", date: "2024-01-10", status: "Compliant", score: 95 },
    { id: 3, name: "ISO 27001 Audit", date: "2024-01-05", status: "Compliant", score: 97 },
    { id: 4, name: "HIPAA Compliance Check", date: "2024-01-01", status: "Review Required", score: 88 },
  ]

  const securityEvents = [
    {
      id: 1,
      type: "Authentication",
      event: "Multiple failed login attempts",
      severity: "Medium",
      time: "2 hours ago",
      resolved: false,
    },
    {
      id: 2,
      type: "Data Access",
      event: "Unusual data export pattern detected",
      severity: "Low",
      time: "4 hours ago",
      resolved: true,
    },
    {
      id: 3,
      type: "System",
      event: "Unauthorized API access attempt",
      severity: "High",
      time: "6 hours ago",
      resolved: true,
    },
    {
      id: 4,
      type: "Network",
      event: "Suspicious IP address blocked",
      severity: "Medium",
      time: "8 hours ago",
      resolved: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Audit & Compliance</h1>
            <p className="text-muted-foreground mt-2">
              Monitor system activity, security events, and compliance status
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Audit Events Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">Compliance Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Audit Logs</CardTitle>
                <CardDescription>Comprehensive log of all system activities and user actions</CardDescription>
                <div className="flex space-x-2 mt-4">
                  <Input placeholder="Search logs..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="create">Create</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="delete">Delete</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-mono text-muted-foreground">{log.timestamp}</div>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {log.user} • {log.resource}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={log.status === "Success" ? "default" : "destructive"}>{log.status}</Badge>
                        <span className="text-sm text-muted-foreground">{log.ip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Current compliance status across all frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {complianceReports.map((report) => (
                    <Card key={report.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <CardDescription>Last assessed: {report.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant={report.status === "Compliant" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{report.score}%</p>
                            <p className="text-sm text-muted-foreground">Compliance Score</p>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Events</CardTitle>
                <CardDescription>Recent security incidents and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            event.severity === "High"
                              ? "bg-red-500"
                              : event.severity === "Medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{event.event}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.type} • {event.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={event.severity === "High" ? "destructive" : "secondary"}>
                          {event.severity}
                        </Badge>
                        <Badge variant={event.resolved ? "default" : "outline"}>
                          {event.resolved ? "Resolved" : "Active"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Reports</CardTitle>
                <CardDescription>Generate and download comprehensive audit reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Security Report</CardTitle>
                      <CardDescription>Comprehensive security analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Generate Report</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance Report</CardTitle>
                      <CardDescription>Regulatory compliance status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Generate Report</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Activity Report</CardTitle>
                      <CardDescription>User activity and system usage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Generate Report</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
