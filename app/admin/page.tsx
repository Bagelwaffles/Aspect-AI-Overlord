import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Users, Activity, Database, AlertTriangle } from "lucide-react"

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Manage platform users, agents, and system settings</p>
          </div>
          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
            Super Admin
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold">7/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold">2.4TB</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Alerts</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="agents">Agent Control</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts, permissions, and access levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search users..." className="flex-1" />
                  <Button>Add User</Button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
                    { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
                    { name: "Bob Wilson", email: "bob@example.com", role: "User", status: "Suspended" },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                        <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
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

          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Control Center</CardTitle>
                <CardDescription>Monitor and control all AI agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Aspect.Overmind", status: "Running", cpu: "45%", memory: "2.1GB" },
                  { name: "Aspect.EcommerceAutomation", status: "Running", cpu: "32%", memory: "1.8GB" },
                  { name: "Aspect.MediaUploader", status: "Running", cpu: "28%", memory: "1.5GB" },
                  { name: "Aspect.VoiceControl", status: "Idle", cpu: "5%", memory: "0.8GB" },
                  { name: "Aspect.Research", status: "Running", cpu: "67%", memory: "3.2GB" },
                  { name: "Aspect.Web3DAO", status: "Running", cpu: "23%", memory: "1.2GB" },
                  { name: "Aspect.CreatorTools", status: "Running", cpu: "41%", memory: "2.0GB" },
                ].map((agent, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        CPU: {agent.cpu} | Memory: {agent.memory}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={agent.status === "Running" ? "default" : "secondary"}>{agent.status}</Badge>
                      <Button variant="outline" size="sm">
                        Restart
                      </Button>
                      <Button variant="outline" size="sm">
                        Stop
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Configure platform-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode for system updates</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-scaling</Label>
                      <p className="text-sm text-muted-foreground">Automatically scale resources based on demand</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Debug Logging</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>API Rate Limit</Label>
                  <Input placeholder="1000 requests/hour" />
                </div>
                <div className="space-y-2">
                  <Label>Max File Upload Size</Label>
                  <Input placeholder="100MB" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security policies and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password Policy</Label>
                  <Input placeholder="Minimum 12 characters, special chars required" />
                </div>
                <div className="space-y-2">
                  <Label>Failed Login Attempts</Label>
                  <Input placeholder="5 attempts before lockout" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
