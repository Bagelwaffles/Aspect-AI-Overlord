"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, Zap, Database, Server, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"

export default function PerformancePage() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [lastOptimized, setLastOptimized] = useState("2 hours ago")

  const performanceMetrics = [
    { name: "Response Time", value: "245ms", status: "good", target: "<300ms" },
    { name: "Throughput", value: "1,247 req/min", status: "excellent", target: ">1000 req/min" },
    { name: "Error Rate", value: "0.12%", status: "excellent", target: "<0.5%" },
    { name: "CPU Usage", value: "34%", status: "good", target: "<70%" },
    { name: "Memory Usage", value: "2.1GB", status: "good", target: "<4GB" },
    { name: "Disk I/O", value: "156 MB/s", status: "good", target: "<500 MB/s" },
  ]

  const optimizationSuggestions = [
    {
      title: "Database Query Optimization",
      description: "Optimize slow queries in agent processing pipeline",
      impact: "High",
      effort: "Medium",
      savings: "15% faster response time",
    },
    {
      title: "Cache Implementation",
      description: "Implement Redis caching for frequently accessed data",
      impact: "High",
      effort: "Low",
      savings: "25% reduced database load",
    },
    {
      title: "Load Balancer Configuration",
      description: "Optimize load balancing across agent instances",
      impact: "Medium",
      effort: "Low",
      savings: "10% better resource utilization",
    },
  ]

  const handleOptimize = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setIsOptimizing(false)
      setLastOptimized("Just now")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Performance Optimization</h1>
            <p className="text-muted-foreground mt-2">Monitor and optimize AI agent performance</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">Last optimized: {lastOptimized}</Badge>
            <Button onClick={handleOptimize} disabled={isOptimizing}>
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Auto-Optimize
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="metrics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
            <TabsTrigger value="reports">Performance Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceMetrics.map((metric) => (
                <Card key={metric.name}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    {metric.status === "excellent" && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {metric.status === "good" && <Activity className="w-4 h-4 text-blue-500" />}
                    {metric.status === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">Target: {metric.target}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
                <CardDescription>Current system performance status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Performance Score</span>
                    <span>87/100</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-green-500" />
                    <span>All services operational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span>Database healthy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Alert>
              <Zap className="w-4 h-4" />
              <AlertDescription>
                Auto-optimization is enabled. The system will automatically apply safe optimizations.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Optimization Suggestions</h3>
              {optimizationSuggestions.map((suggestion, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{suggestion.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={suggestion.impact === "High" ? "destructive" : "secondary"}>
                          {suggestion.impact} Impact
                        </Badge>
                        <Badge variant="outline">{suggestion.effort} Effort</Badge>
                      </div>
                    </div>
                    <CardDescription>{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Expected: {suggestion.savings}</span>
                      <Button size="sm">Apply Optimization</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Metrics</CardTitle>
                  <CardDescription>Live performance data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>52%</span>
                    </div>
                    <Progress value={52} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Network I/O</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                  <CardDescription>Individual agent metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Overmind", "EcommerceAutomation", "MediaUploader", "VoiceControl"].map((agent) => (
                    <div key={agent} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{agent}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                        <span className="text-xs text-muted-foreground">98% uptime</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reports</CardTitle>
                <CardDescription>Historical performance analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-green-600">+12%</div>
                    <div className="text-sm text-muted-foreground">Performance improvement this month</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-blue-600">99.8%</div>
                    <div className="text-sm text-muted-foreground">Average uptime</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-purple-600">-23%</div>
                    <div className="text-sm text-muted-foreground">Reduced response time</div>
                  </div>
                </div>
                <Button className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate Detailed Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
