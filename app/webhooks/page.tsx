"use client"

import { useState } from "react"
import { Webhook, Plus, Settings, Trash2, Edit, Pause, CheckCircle, XCircle, Clock, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const webhooks = [
  {
    id: 1,
    name: "Agent Status Updates",
    url: "https://api.example.com/webhooks/agent-status",
    events: ["agent.started", "agent.stopped", "agent.error"],
    status: "active",
    lastTriggered: "2 minutes ago",
    successRate: 98.5,
  },
  {
    id: 2,
    name: "File Processing Complete",
    url: "https://api.example.com/webhooks/file-complete",
    events: ["file.processed", "file.error"],
    status: "active",
    lastTriggered: "15 minutes ago",
    successRate: 99.2,
  },
  {
    id: 3,
    name: "DAO Proposal Updates",
    url: "https://api.example.com/webhooks/dao-proposals",
    events: ["proposal.created", "proposal.voted", "proposal.executed"],
    status: "paused",
    lastTriggered: "2 hours ago",
    successRate: 97.8,
  },
]

const recentDeliveries = [
  {
    id: 1,
    webhook: "Agent Status Updates",
    event: "agent.started",
    status: "success",
    timestamp: "2 minutes ago",
    responseTime: "145ms",
  },
  {
    id: 2,
    webhook: "File Processing Complete",
    event: "file.processed",
    status: "success",
    timestamp: "15 minutes ago",
    responseTime: "203ms",
  },
  {
    id: 3,
    webhook: "Agent Status Updates",
    event: "agent.error",
    status: "failed",
    timestamp: "1 hour ago",
    responseTime: "5000ms",
  },
  {
    id: 4,
    webhook: "DAO Proposal Updates",
    event: "proposal.voted",
    status: "success",
    timestamp: "2 hours ago",
    responseTime: "178ms",
  },
]

export default function WebhooksPage() {
  const [selectedWebhook, setSelectedWebhook] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Webhook className="h-8 w-8 text-primary" />
              Webhook Management
            </h1>
            <p className="text-muted-foreground mt-2">Configure and monitor webhook endpoints</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Webhook
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Webhook</DialogTitle>
                <DialogDescription>Configure a new webhook endpoint to receive events</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="webhook-name">Webhook Name</Label>
                  <Input id="webhook-name" placeholder="Enter webhook name" />
                </div>
                <div>
                  <Label htmlFor="webhook-url">Endpoint URL</Label>
                  <Input id="webhook-url" placeholder="https://your-api.com/webhook" />
                </div>
                <div>
                  <Label htmlFor="webhook-events">Events</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select events to subscribe to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent.started">Agent Started</SelectItem>
                      <SelectItem value="agent.stopped">Agent Stopped</SelectItem>
                      <SelectItem value="agent.error">Agent Error</SelectItem>
                      <SelectItem value="file.processed">File Processed</SelectItem>
                      <SelectItem value="proposal.created">Proposal Created</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="webhook-description">Description</Label>
                  <Textarea id="webhook-description" placeholder="Optional description" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>Create Webhook</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="webhooks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="webhooks">Webhooks ({webhooks.length})</TabsTrigger>
            <TabsTrigger value="deliveries">Recent Deliveries</TabsTrigger>
            <TabsTrigger value="events">Event Types</TabsTrigger>
          </TabsList>

          <TabsContent value="webhooks" className="space-y-4">
            <div className="grid gap-4">
              {webhooks.map((webhook) => (
                <Card key={webhook.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{webhook.name}</h3>
                          {getStatusIcon(webhook.status)}
                          <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                            {webhook.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{webhook.url}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Events: {webhook.events.join(", ")}</span>
                          <span>Last triggered: {webhook.lastTriggered}</span>
                          <span>Success rate: {webhook.successRate}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Deliveries</CardTitle>
                <CardDescription>Latest webhook delivery attempts and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDeliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getDeliveryStatusIcon(delivery.status)}
                        <div>
                          <p className="font-medium">{delivery.webhook}</p>
                          <p className="text-sm text-muted-foreground">{delivery.event}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{delivery.timestamp}</p>
                        <p>{delivery.responseTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Agent Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>agent.started</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>agent.stopped</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>agent.error</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    File Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>file.uploaded</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>file.processed</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>file.error</span>
                      <Badge variant="outline">Active</Badge>
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
