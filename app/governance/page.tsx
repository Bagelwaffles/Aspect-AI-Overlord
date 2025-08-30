"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Shield, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function GovernancePage() {
  const [selectedPolicy, setSelectedPolicy] = useState("data-retention")

  const policies = [
    {
      id: "data-retention",
      name: "Data Retention Policy",
      status: "active",
      lastUpdated: "2024-01-15",
      compliance: 95,
      description: "Defines how long different types of data are stored",
    },
    {
      id: "privacy-protection",
      name: "Privacy Protection",
      status: "active",
      lastUpdated: "2024-01-10",
      compliance: 98,
      description: "Ensures user privacy and data protection compliance",
    },
    {
      id: "access-control",
      name: "Access Control Policy",
      status: "review",
      lastUpdated: "2024-01-05",
      compliance: 87,
      description: "Controls who can access what data and systems",
    },
    {
      id: "ai-ethics",
      name: "AI Ethics Guidelines",
      status: "draft",
      lastUpdated: "2024-01-20",
      compliance: 92,
      description: "Ethical guidelines for AI model usage and deployment",
    },
  ]

  const complianceChecks = [
    {
      id: "gdpr",
      name: "GDPR Compliance",
      status: "compliant",
      score: 98,
      lastCheck: "2024-01-20",
      issues: 0,
    },
    {
      id: "ccpa",
      name: "CCPA Compliance",
      status: "compliant",
      score: 95,
      lastCheck: "2024-01-19",
      issues: 1,
    },
    {
      id: "hipaa",
      name: "HIPAA Compliance",
      status: "warning",
      score: 87,
      lastCheck: "2024-01-18",
      issues: 3,
    },
    {
      id: "sox",
      name: "SOX Compliance",
      status: "compliant",
      score: 94,
      lastCheck: "2024-01-17",
      issues: 0,
    },
  ]

  const dataRequests = [
    {
      id: "req-001",
      type: "Data Export",
      user: "john.doe@example.com",
      status: "processing",
      requested: "2024-01-20",
      deadline: "2024-01-27",
    },
    {
      id: "req-002",
      type: "Data Deletion",
      user: "jane.smith@example.com",
      status: "completed",
      requested: "2024-01-18",
      deadline: "2024-01-25",
    },
    {
      id: "req-003",
      type: "Data Correction",
      user: "bob.wilson@example.com",
      status: "pending",
      requested: "2024-01-19",
      deadline: "2024-01-26",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Governance</h1>
            <p className="text-muted-foreground mt-2">Manage data policies, compliance, and privacy controls</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Shield className="w-4 h-4 mr-2" />
            Create Policy
          </Button>
        </div>

        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="requests">Data Requests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {policies.map((policy) => (
                <Card key={policy.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{policy.name}</CardTitle>
                      <Badge
                        variant={
                          policy.status === "active" ? "default" : policy.status === "review" ? "secondary" : "outline"
                        }
                      >
                        {policy.status}
                      </Badge>
                    </div>
                    <CardDescription>Last updated: {policy.lastUpdated}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{policy.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Compliance Score</span>
                        <span>{policy.compliance}%</span>
                      </div>
                      <Progress value={policy.compliance} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {complianceChecks.map((check) => (
                <Card key={check.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{check.name}</h3>
                      {check.status === "compliant" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score</span>
                        <span>{check.score}%</span>
                      </div>
                      <Progress value={check.score} className="h-2" />
                    </div>

                    <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                      <p>Last check: {check.lastCheck}</p>
                      <p>Issues: {check.issues}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
                <CardDescription>Overall compliance status and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">94%</div>
                    <p className="text-sm text-muted-foreground">Overall Compliance</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">4</div>
                    <p className="text-sm text-muted-foreground">Active Policies</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500">4</div>
                    <p className="text-sm text-muted-foreground">Issues to Address</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Recommendations</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Review HIPAA access controls for medical data</li>
                    <li>• Update data retention periods for analytics data</li>
                    <li>• Implement additional encryption for sensitive fields</li>
                    <li>• Schedule quarterly compliance audits</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Data Subject Requests</h2>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="space-y-4">
              {dataRequests.map((request) => (
                <Card key={request.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{request.type}</h3>
                        <p className="text-sm text-muted-foreground">User: {request.user}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : request.status === "processing" ? (
                          <Clock className="w-5 h-5 text-blue-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                        <Badge
                          variant={
                            request.status === "completed"
                              ? "default"
                              : request.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Requested:</span>
                        <p className="font-medium">{request.requested}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Deadline:</span>
                        <p className="font-medium">{request.deadline}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                      {request.status === "pending" && <Button size="sm">Process Request</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Configure privacy and data protection settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-encryption">Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Encrypt all sensitive data at rest</p>
                    </div>
                    <Switch id="data-encryption" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-logging">Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all data access and modifications</p>
                    </div>
                    <Switch id="audit-logging" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="anonymization">Data Anonymization</Label>
                      <p className="text-sm text-muted-foreground">Automatically anonymize personal data</p>
                    </div>
                    <Switch id="anonymization" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="consent-tracking">Consent Tracking</Label>
                      <p className="text-sm text-muted-foreground">Track user consent for data processing</p>
                    </div>
                    <Switch id="consent-tracking" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retention-period">Default Retention Period</Label>
                    <Select defaultValue="2-years">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                        <SelectItem value="5-years">5 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="data-classification">Data Classification Level</Label>
                    <Select defaultValue="confidential">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="confidential">Confidential</SelectItem>
                        <SelectItem value="restricted">Restricted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Save Settings</Button>
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
