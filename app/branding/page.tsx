"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Upload, Eye, Download, Settings, Zap } from "lucide-react"

export default function BrandingPage() {
  const [activeTab, setActiveTab] = useState("colors")

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Custom Branding</h1>
            <p className="text-muted-foreground">Customize the platform appearance and branding</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Theme
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="logos">Logos</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="whitelabel">White Label</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Color Palette
                  </CardTitle>
                  <CardDescription>Customize your brand colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input type="color" value="#15803d" className="w-16 h-10" />
                        <Input value="#15803d" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label>Secondary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input type="color" value="#84cc16" className="w-16 h-10" />
                        <Input value="#84cc16" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label>Accent Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input type="color" value="#3b82f6" className="w-16 h-10" />
                        <Input value="#3b82f6" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <Label>Background</Label>
                      <div className="flex gap-2 mt-1">
                        <Input type="color" value="#0a0a0a" className="w-16 h-10" />
                        <Input value="#0a0a0a" className="flex-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Preview</CardTitle>
                  <CardDescription>See how your colors look in context</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Sample Interface</h3>
                      <Badge>Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="bg-primary">Primary Button</Button>
                      <Button variant="secondary">Secondary</Button>
                    </div>
                    <div className="h-2 bg-primary/20 rounded">
                      <div className="h-full w-3/4 bg-primary rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Font Settings</CardTitle>
                  <CardDescription>Customize typography and fonts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Heading Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Body Font</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Size Scale</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Typography Preview</CardTitle>
                  <CardDescription>See how your fonts look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold">Heading 1</h1>
                    <h2 className="text-2xl font-semibold">Heading 2</h2>
                    <h3 className="text-xl font-medium">Heading 3</h3>
                    <p className="text-base">
                      Body text paragraph with regular weight and standard line height for readability.
                    </p>
                    <p className="text-sm text-muted-foreground">Small text for captions and secondary information.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logos" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Logo Upload
                  </CardTitle>
                  <CardDescription>Upload your brand logos and assets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Main Logo</Label>
                    <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drop your logo here or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                  <div>
                    <Label>Favicon</Label>
                    <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload favicon (32x32 px)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo Settings</CardTitle>
                  <CardDescription>Configure logo display options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Show logo in header</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show logo in footer</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show logo on login page</Label>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label>Logo Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Layout Options
                  </CardTitle>
                  <CardDescription>Customize the platform layout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Sidebar Style</Label>
                    <Select defaultValue="fixed">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed</SelectItem>
                        <SelectItem value="collapsible">Collapsible</SelectItem>
                        <SelectItem value="overlay">Overlay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Header Style</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show breadcrumbs</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Rounded corners</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Layout</CardTitle>
                  <CardDescription>Configure content display options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Container Width</Label>
                    <Select defaultValue="full">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="narrow">Narrow</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="wide">Wide</SelectItem>
                        <SelectItem value="full">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Card Style</Label>
                    <Select defaultValue="elevated">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="elevated">Elevated</SelectItem>
                        <SelectItem value="outlined">Outlined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Dense spacing</Label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="whitelabel" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    White Label Settings
                  </CardTitle>
                  <CardDescription>Remove Aspect branding and add your own</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input placeholder="Your Company Name" />
                  </div>
                  <div>
                    <Label>Product Name</Label>
                    <Input placeholder="Your Product Name" />
                  </div>
                  <div>
                    <Label>Support Email</Label>
                    <Input type="email" placeholder="support@yourcompany.com" />
                  </div>
                  <div>
                    <Label>Website URL</Label>
                    <Input type="url" placeholder="https://yourcompany.com" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Hide Aspect branding</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Custom footer text</Label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Text</CardTitle>
                  <CardDescription>Customize platform text and messaging</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Welcome Message</Label>
                    <Textarea placeholder="Welcome to your AI agent platform..." />
                  </div>
                  <div>
                    <Label>Footer Text</Label>
                    <Textarea placeholder="© 2024 Your Company. All rights reserved." />
                  </div>
                  <div>
                    <Label>Login Page Title</Label>
                    <Input placeholder="Sign in to your account" />
                  </div>
                  <div>
                    <Label>Dashboard Title</Label>
                    <Input placeholder="Your AI Dashboard" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export & Import</CardTitle>
                <CardDescription>Export your branding configuration or import existing themes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Export Theme</h3>
                    <p className="text-sm text-muted-foreground">Download your current branding configuration</p>
                    <div className="space-y-2">
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export as JSON
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Export as CSS
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Import Theme</h3>
                    <p className="text-sm text-muted-foreground">Upload a previously exported theme</p>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drop theme file here</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
