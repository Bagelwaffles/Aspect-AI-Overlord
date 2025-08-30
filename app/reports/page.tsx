"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Download,
  CalendarIcon,
  Filter,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  BarChart3,
  Table,
} from "lucide-react"
import { format } from "date-fns"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  const reports = [
    {
      id: 1,
      name: "Agent Performance Summary",
      type: "Performance",
      generated: "2024-01-15",
      size: "2.4 MB",
      format: "PDF",
      status: "Ready",
    },
    {
      id: 2,
      name: "Monthly Usage Analytics",
      type: "Usage",
      generated: "2024-01-14",
      size: "1.8 MB",
      format: "Excel",
      status: "Ready",
    },
    {
      id: 3,
      name: "Revenue Analysis Q1",
      type: "Financial",
      generated: "2024-01-13",
      size: "3.2 MB",
      format: "PDF",
      status: "Processing",
    },
    {
      id: 4,
      name: "User Engagement Report",
      type: "User Analytics",
      generated: "2024-01-12",
      size: "1.5 MB",
      format: "CSV",
      status: "Ready",
    },
  ]

  const templates = [
    {
      name: "Agent Performance Dashboard",
      description: "Comprehensive overview of all agent metrics and KPIs",
      icon: BarChart3,
      category: "Performance",
    },
    {
      name: "Financial Summary",
      description: "Revenue, costs, and profitability analysis",
      icon: DollarSign,
      category: "Financial",
    },
    {
      name: "User Analytics",
      description: "User behavior, engagement, and retention metrics",
      icon: Users,
      category: "Analytics",
    },
    {
      name: "System Health Report",
      description: "Infrastructure performance and uptime statistics",
      icon: Activity,
      category: "Technical",
    },
    {
      name: "Usage Trends",
      description: "Platform usage patterns and growth trends",
      icon: TrendingUp,
      category: "Usage",
    },
    {
      name: "Custom Data Export",
      description: "Export specific data sets with custom parameters",
      icon: Table,
      category: "Data",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and download comprehensive reports</p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate Reports</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {dateRange.from && dateRange.to
                            ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                            : "Select date range"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Report Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                        <SelectItem value="json">JSON Export</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Agent Filter</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Agents</SelectItem>
                        <SelectItem value="overmind">Aspect.Overmind</SelectItem>
                        <SelectItem value="ecommerce">Aspect.EcommerceAutomation</SelectItem>
                        <SelectItem value="media">Aspect.MediaUploader</SelectItem>
                        <SelectItem value="control">Aspect.Control</SelectItem>
                        <SelectItem value="research">Aspect.Research</SelectItem>
                        <SelectItem value="web3">Aspect.Web3DAO</SelectItem>
                        <SelectItem value="creator">Aspect.CreatorTools</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <template.icon className="h-8 w-8 text-primary" />
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Report History</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="usage">Usage</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold">{report.name}</h3>
                          <Badge variant="outline">{report.type}</Badge>
                          <Badge variant={report.status === "Ready" ? "default" : "secondary"}>{report.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Generated: {report.generated}</span>
                          <span>Size: {report.size}</span>
                          <span>Format: {report.format}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={report.status !== "Ready"}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Scheduled Reports</h2>
              <Button>Schedule New Report</Button>
            </div>

            <div className="grid gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Weekly Performance Summary</h3>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Every Monday at 9:00 AM</span>
                        <span>Next run: Jan 22, 2024</span>
                        <span>Recipients: 3</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Pause
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Monthly Financial Report</h3>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>First day of each month at 8:00 AM</span>
                        <span>Next run: Feb 1, 2024</span>
                        <span>Recipients: 5</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Pause
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Daily System Health Check</h3>
                        <Badge variant="secondary">Paused</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Daily at 6:00 AM</span>
                        <span>Last run: Jan 10, 2024</span>
                        <span>Recipients: 2</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="default" size="sm">
                        Resume
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
