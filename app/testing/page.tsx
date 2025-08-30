import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, Play, Pause, RotateCcw, TestTube, Zap, Shield, Database } from "lucide-react"

export default function TestingPage() {
  const testSuites = [
    {
      name: "API Endpoints",
      status: "passed",
      tests: 45,
      passed: 45,
      failed: 0,
      duration: "2.3s",
      coverage: 98,
    },
    {
      name: "Agent Operations",
      status: "running",
      tests: 32,
      passed: 28,
      failed: 0,
      duration: "5.1s",
      coverage: 92,
    },
    {
      name: "Database Integrity",
      status: "passed",
      tests: 18,
      passed: 18,
      failed: 0,
      duration: "1.8s",
      coverage: 100,
    },
    {
      name: "Security Validation",
      status: "failed",
      tests: 24,
      passed: 22,
      failed: 2,
      duration: "3.7s",
      coverage: 85,
    },
    {
      name: "Performance Tests",
      status: "passed",
      tests: 15,
      passed: 15,
      failed: 0,
      duration: "8.2s",
      coverage: 88,
    },
    {
      name: "Integration Tests",
      status: "pending",
      tests: 28,
      passed: 0,
      failed: 0,
      duration: "0s",
      coverage: 0,
    },
  ]

  const performanceMetrics = [
    { name: "API Response Time", value: 45, target: 100, unit: "ms", status: "good" },
    { name: "Database Query Time", value: 12, target: 50, unit: "ms", status: "excellent" },
    { name: "Memory Usage", value: 67, target: 80, unit: "%", status: "good" },
    { name: "CPU Usage", value: 23, target: 70, unit: "%", status: "excellent" },
    { name: "Error Rate", value: 0.02, target: 1, unit: "%", status: "excellent" },
    { name: "Throughput", value: 1250, target: 1000, unit: "req/s", status: "excellent" },
  ]

  const securityTests = [
    { name: "SQL Injection", status: "passed", severity: "critical" },
    { name: "XSS Protection", status: "passed", severity: "high" },
    { name: "CSRF Validation", status: "passed", severity: "high" },
    { name: "Authentication Bypass", status: "failed", severity: "critical" },
    { name: "Authorization Checks", status: "passed", severity: "high" },
    { name: "Data Encryption", status: "failed", severity: "medium" },
    { name: "Rate Limiting", status: "passed", severity: "medium" },
    { name: "Input Validation", status: "passed", severity: "high" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: "default",
      failed: "destructive",
      running: "secondary",
      pending: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPerformanceStatus = (value: number, target: number, unit: string) => {
    if (unit === "%" || unit === "ms") {
      return value <= target * 0.7 ? "excellent" : value <= target ? "good" : "poor"
    } else {
      return value >= target * 1.2 ? "excellent" : value >= target ? "good" : "poor"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Testing & Validation</h1>
          <p className="text-muted-foreground">Comprehensive testing suite for platform reliability and performance</p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Test Suite Overview
              </CardTitle>
              <CardDescription>Current status of all automated test suites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Run All Tests
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Tests
                  </Button>
                  <Button size="sm" variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">128</div>
                  <div className="text-sm text-muted-foreground">Tests Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">2</div>
                  <div className="text-sm text-muted-foreground">Tests Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">28</div>
                  <div className="text-sm text-muted-foreground">Tests Running</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">93%</div>
                  <div className="text-sm text-muted-foreground">Coverage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="suites" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="suites">Test Suites</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="suites" className="space-y-4">
            <div className="grid gap-4">
              {testSuites.map((suite, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(suite.status)}
                        <div>
                          <h3 className="font-semibold text-foreground">{suite.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {suite.tests} tests • {suite.duration} duration
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(suite.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Test Coverage</span>
                          <span>{suite.coverage}%</span>
                        </div>
                        <Progress value={suite.coverage} className="h-2" />
                      </div>
                      <div className="text-sm">
                        <span className="text-green-500 font-medium">{suite.passed} passed</span>
                        {suite.failed > 0 && (
                          <span className="text-red-500 font-medium ml-2">{suite.failed} failed</span>
                        )}
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{metric.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Target: {metric.target}
                            {metric.unit}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-foreground">
                            {metric.value}
                            {metric.unit}
                          </div>
                          <Badge
                            variant={
                              getPerformanceStatus(metric.value, metric.target, metric.unit) === "excellent"
                                ? "default"
                                : getPerformanceStatus(metric.value, metric.target, metric.unit) === "good"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {getPerformanceStatus(metric.value, metric.target, metric.unit)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {securityTests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(test.status)}
                          <div>
                            <div className="font-medium text-foreground">{test.name}</div>
                            <div className="text-sm text-muted-foreground">Severity: {test.severity}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              test.severity === "critical"
                                ? "destructive"
                                : test.severity === "high"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {test.severity}
                          </Badge>
                          {getStatusBadge(test.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Test Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">Daily Test Report</div>
                        <div className="text-sm text-muted-foreground">January 15, 2025</div>
                      </div>
                      <Button size="sm" variant="outline">
                        Download PDF
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">Weekly Performance Report</div>
                        <div className="text-sm text-muted-foreground">Week of January 8-14, 2025</div>
                      </div>
                      <Button size="sm" variant="outline">
                        Download PDF
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">Security Audit Report</div>
                        <div className="text-sm text-muted-foreground">January 2025</div>
                      </div>
                      <Button size="sm" variant="outline">
                        Download PDF
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">Coverage Analysis</div>
                        <div className="text-sm text-muted-foreground">Current Sprint</div>
                      </div>
                      <Button size="sm" variant="outline">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
