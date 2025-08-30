"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key, Fingerprint, Globe, Database, Zap } from "lucide-react"

export default function SecurityPage() {
  const [scanInProgress, setScanInProgress] = useState(false)

  const securityMetrics = [
    { name: "Security Score", value: "94/100", status: "excellent", icon: Shield },
    { name: "Vulnerabilities", value: "2 Low", status: "good", icon: AlertTriangle },
    { name: "Failed Logins", value: "12 (24h)", status: "good", icon: Lock },
    { name: "Active Sessions", value: "1,247", status: "normal", icon: Eye },
    { name: "API Keys", value: "23 Active", status: "normal", icon: Key },
    { name: "Certificates", value: "5 Valid", status: "excellent", icon: Fingerprint },
  ]

  const securityAlerts = [
    {
      type: "warning",
      title: "SSL Certificate Expiring",
      description: "Certificate for api.aspectmarketingsolutions.app expires in 15 days",
      action: "Renew Certificate",
    },
    {
      type: "info",
      title: "Security Scan Completed",
      description: "Weekly security scan completed with 2 low-priority findings",
      action: "View Report",
    },
  ]

  const handleSecurityScan = () => {
    setScanInProgress(true)
    setTimeout(() => setScanInProgress(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security Center</h1>
            <p className="text-muted-foreground mt-2">Monitor and manage platform security</p>
          </div>
          <Button onClick={handleSecurityScan} disabled={scanInProgress}>
            {scanInProgress ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Run Security Scan
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityMetrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <Card key={metric.name}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <Badge variant={metric.status === "excellent" ? "default" : "secondary"} className="mt-2">
                        {metric.status}
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Recent security notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityAlerts.map((alert, index) => (
                    <Alert key={index}>
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{alert.title}</div>
                            <div className="text-sm text-muted-foreground">{alert.description}</div>
                          </div>
                          <Button size="sm" variant="outline">
                            {alert.action}
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Health</CardTitle>
                  <CardDescription>Overall security posture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Security Score</span>
                      <span>94/100</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Encryption enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>2FA enforced</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Firewall active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Backups secured</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Control Management</CardTitle>
                <CardDescription>Manage user permissions and access policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Active Sessions</h4>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Across all users</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Failed Login Attempts</h4>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
                <Button className="w-full">Manage User Permissions</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
                <CardDescription>Real-time security event monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-semibold">Network</div>
                    <div className="text-sm text-muted-foreground">Secure</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <Database className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-semibold">Database</div>
                    <div className="text-sm text-muted-foreground">Protected</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <Key className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-lg font-semibold">API Keys</div>
                    <div className="text-sm text-muted-foreground">Valid</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Regulatory compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["GDPR", "SOC 2", "ISO 27001", "HIPAA"].map((standard) => (
                    <div key={standard} className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">{standard}</span>
                      <Badge variant="default">Compliant</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Incidents</CardTitle>
                <CardDescription>Track and manage security incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">No Active Incidents</h3>
                  <p className="text-muted-foreground">All systems are secure and operating normally</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
