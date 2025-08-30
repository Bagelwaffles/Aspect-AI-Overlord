import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smartphone,
  Download,
  Bell,
  Activity,
  Settings,
  BarChart3,
  Upload,
  MessageSquare,
  Shield,
  Zap,
  Globe,
} from "lucide-react"

export default function MobilePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Smartphone className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Mobile App</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access your AI agents on the go with our native mobile applications for iOS and Android
          </p>
        </div>

        {/* App Downloads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Apps
            </CardTitle>
            <CardDescription>Get the Aspect AI mobile app for your device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">iOS App</h3>
                    <p className="text-sm text-muted-foreground">Version 2.1.0</p>
                  </div>
                </div>
                <Button className="w-full">Download from App Store</Button>
                <div className="text-xs text-muted-foreground">Requires iOS 14.0 or later</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Android App</h3>
                    <p className="text-sm text-muted-foreground">Version 2.1.0</p>
                  </div>
                </div>
                <Button className="w-full">Download from Google Play</Button>
                <div className="text-xs text-muted-foreground">Requires Android 8.0 or later</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Features */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5 text-primary" />
                    Real-time Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monitor all your AI agents in real-time with push notifications
                  </p>
                  <Badge variant="secondary">Live Updates</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Upload className="h-5 w-5 text-primary" />
                    Mobile Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload files directly from your mobile device camera or gallery
                  </p>
                  <Badge variant="secondary">Camera Integration</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Voice Commands
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Control your agents using voice commands and speech recognition
                  </p>
                  <Badge variant="secondary">Voice Control</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Mobile Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    View detailed analytics and performance metrics on mobile
                  </p>
                  <Badge variant="secondary">Touch Optimized</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    Biometric Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Secure access with fingerprint and face recognition
                  </p>
                  <Badge variant="secondary">Biometric Auth</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-primary" />
                    Offline Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access cached data and queue actions when offline
                  </p>
                  <Badge variant="secondary">Offline Support</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Agent Access</CardTitle>
                  <CardDescription>All agents optimized for mobile interaction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Aspect.Overmind</span>
                      <Badge variant="outline">Mobile Ready</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Aspect.EcommerceAutomation</span>
                      <Badge variant="outline">Mobile Ready</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Aspect.MediaUploader</span>
                      <Badge variant="outline">Mobile Ready</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Aspect.Control</span>
                      <Badge variant="outline">Mobile Ready</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks optimized for mobile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Quick Upload
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Activity className="h-4 w-4 mr-2" />
                    Agent Status
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Bell className="h-4 w-4 mr-2" />
                    View Alerts
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Voice Command
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Push Notifications
                </CardTitle>
                <CardDescription>Stay informed with real-time mobile alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Alert Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Agent Completion</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System Errors</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Usage Limits</span>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Security Alerts</span>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Delivery Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Immediate</span>
                        <Badge variant="outline">Real-time</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Batched (5 min)</span>
                        <Badge variant="outline">Grouped</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Daily Summary</span>
                        <Badge variant="outline">9:00 AM</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Do Not Disturb</span>
                        <Badge variant="outline">10 PM - 7 AM</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    App Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dark Mode</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Haptic Feedback</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-sync</span>
                      <Badge variant="secondary">Every 5 min</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cache Size</span>
                      <Badge variant="outline">128 MB</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Battery Optimization</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Data Usage</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Storage Used</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* App Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Mobile App Statistics</CardTitle>
            <CardDescription>Usage metrics and performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">15.2K</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">App Store Rating</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">2.1s</div>
                <div className="text-sm text-muted-foreground">Avg Load Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
