"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Calendar, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("pro")

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      features: ["3 AI Agents", "1,000 API Calls/month", "Basic Analytics", "Email Support"],
      current: currentPlan === "starter",
    },
    {
      id: "pro",
      name: "Professional",
      price: 99,
      features: [
        "7 AI Agents",
        "10,000 API Calls/month",
        "Advanced Analytics",
        "Priority Support",
        "Custom Integrations",
      ],
      current: currentPlan === "pro",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 299,
      features: [
        "Unlimited Agents",
        "Unlimited API Calls",
        "White-label Solution",
        "24/7 Support",
        "Custom Development",
      ],
      current: currentPlan === "enterprise",
    },
  ]

  const usage = {
    apiCalls: { used: 7234, limit: 10000 },
    agents: { used: 5, limit: 7 },
    storage: { used: 2.3, limit: 10 },
  }

  const invoices = [
    { id: "INV-2024-001", date: "2024-01-01", amount: 99, status: "paid" },
    { id: "INV-2023-012", date: "2023-12-01", amount: 99, status: "paid" },
    { id: "INV-2023-011", date: "2023-11-01", amount: 99, status: "paid" },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billing & Subscription</h1>
            <p className="text-muted-foreground mt-2">Manage your subscription and billing information</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {plans.find((p) => p.current)?.name} Plan
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{plans.find((p) => p.current)?.name}</div>
                  <p className="text-xs text-muted-foreground">${plans.find((p) => p.current)?.price}/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Feb 1, 2024</div>
                  <p className="text-xs text-muted-foreground">Auto-renewal enabled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$99.00</div>
                  <p className="text-xs text-muted-foreground">+0% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Usage Overview</CardTitle>
                <CardDescription>Your current usage across key metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Calls</span>
                    <span>
                      {usage.apiCalls.used.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(usage.apiCalls.used / usage.apiCalls.limit) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Agents</span>
                    <span>
                      {usage.agents.used} / {usage.agents.limit}
                    </span>
                  </div>
                  <Progress value={(usage.agents.used / usage.agents.limit) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage (GB)</span>
                    <span>
                      {usage.storage.used} / {usage.storage.limit}
                    </span>
                  </div>
                  <Progress value={(usage.storage.used / usage.storage.limit) * 100} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={plan.current ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold mt-2">
                          ${plan.price}
                          <span className="text-sm font-normal">/month</span>
                        </CardDescription>
                      </div>
                      {plan.current && <Badge>Current</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.current ? "outline" : "default"} disabled={plan.current}>
                      {plan.current ? "Current Plan" : "Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage</CardTitle>
                  <CardDescription>Monthly API call consumption</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Used this month</span>
                      <span className="text-sm font-medium">{usage.apiCalls.used.toLocaleString()}</span>
                    </div>
                    <Progress value={(usage.apiCalls.used / usage.apiCalls.limit) * 100} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>{usage.apiCalls.limit.toLocaleString()} limit</span>
                    </div>
                  </div>
                  {usage.apiCalls.used / usage.apiCalls.limit > 0.8 && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Approaching usage limit</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Usage</CardTitle>
                  <CardDescription>Active AI agents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Active agents</span>
                      <span className="text-sm font-medium">{usage.agents.used}</span>
                    </div>
                    <Progress value={(usage.agents.used / usage.agents.limit) * 100} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>{usage.agents.limit} limit</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Download and view your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">${invoice.amount}</span>
                        <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
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
