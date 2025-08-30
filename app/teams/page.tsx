"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, Settings, Shield, Activity, Clock } from "lucide-react"

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState("members")

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@aspectai.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 min ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      email: "marcus@aspectai.com",
      role: "Developer",
      status: "Active",
      lastActive: "15 min ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emily Watson",
      email: "emily@aspectai.com",
      role: "Analyst",
      status: "Away",
      lastActive: "1 hour ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@aspectai.com",
      role: "Manager",
      status: "Active",
      lastActive: "5 min ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const workspaces = [
    {
      id: 1,
      name: "Production Environment",
      description: "Live AI agents and workflows",
      members: 12,
      agents: 7,
      status: "Active",
    },
    {
      id: 2,
      name: "Development Sandbox",
      description: "Testing and development workspace",
      members: 8,
      agents: 5,
      status: "Active",
    },
    {
      id: 3,
      name: "Client Demo Space",
      description: "Client presentations and demos",
      members: 4,
      agents: 3,
      status: "Active",
    },
  ]

  const permissions = [
    { category: "Agent Management", permissions: ["View Agents", "Create Agents", "Edit Agents", "Delete Agents"] },
    { category: "Data Access", permissions: ["View Analytics", "Export Data", "Manage Integrations", "Access Logs"] },
    { category: "User Management", permissions: ["View Users", "Invite Users", "Manage Roles", "Remove Users"] },
    { category: "System Settings", permissions: ["View Settings", "Edit Settings", "Manage Billing", "System Admin"] },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
            <p className="text-muted-foreground mt-2">Manage team members, workspaces, and permissions</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>

        {/* Team Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Workspaces</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Role Types</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage your team members and their access levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
                        <Badge variant="outline">{member.role}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {member.lastActive}
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workspaces" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workspaces</CardTitle>
                <CardDescription>Manage team workspaces and environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workspaces.map((workspace) => (
                    <Card key={workspace.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{workspace.name}</CardTitle>
                        <CardDescription>{workspace.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Members:</span>
                            <span className="text-sm font-medium">{workspace.members}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Agents:</span>
                            <span className="text-sm font-medium">{workspace.agents}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <Badge variant="default">{workspace.status}</Badge>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                          Manage Workspace
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Configure role-based access control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {permissions.map((category) => (
                    <div key={category.category}>
                      <h3 className="font-medium mb-3">{category.category}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {category.permissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" defaultChecked />
                            <span className="text-sm">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent team activity and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Sarah Chen", action: "Created new agent workflow", time: "2 minutes ago", type: "create" },
                    {
                      user: "Marcus Rodriguez",
                      action: "Updated integration settings",
                      time: "15 minutes ago",
                      type: "update",
                    },
                    { user: "Emily Watson", action: "Generated analytics report", time: "1 hour ago", type: "report" },
                    { user: "David Kim", action: "Invited new team member", time: "2 hours ago", type: "invite" },
                    { user: "System", action: "Automated backup completed", time: "4 hours ago", type: "system" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "create"
                              ? "bg-green-500"
                              : activity.type === "update"
                                ? "bg-blue-500"
                                : activity.type === "report"
                                  ? "bg-purple-500"
                                  : activity.type === "invite"
                                    ? "bg-orange-500"
                                    : "bg-gray-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
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
