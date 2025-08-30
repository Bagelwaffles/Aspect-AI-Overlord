"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Phone, Mail, Clock, User, Bot, Paperclip, Star } from "lucide-react"

export default function SupportPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm AspectAI Support Assistant. How can I help you today?",
      timestamp: new Date(Date.now() - 60000),
      agent: "AI Assistant",
    },
    {
      id: 2,
      type: "user",
      content: "I'm having trouble with the Ecommerce Automation agent",
      timestamp: new Date(Date.now() - 30000),
      agent: "You",
    },
    {
      id: 3,
      type: "bot",
      content:
        "I can help you with that! Let me check the status of your Ecommerce Automation agent and gather some diagnostic information.",
      timestamp: new Date(Date.now() - 15000),
      agent: "AI Assistant",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: newMessage,
      timestamp: new Date(),
      agent: "You",
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: "bot" as const,
        content:
          "I understand your concern. Let me analyze your agent configuration and provide a solution. This may take a moment...",
        timestamp: new Date(),
        agent: "AI Assistant",
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const tickets = [
    {
      id: "TK-001",
      title: "Agent Performance Issue",
      status: "Open",
      priority: "High",
      created: "2024-01-15",
      agent: "Aspect.EcommerceAutomation",
    },
    {
      id: "TK-002",
      title: "Integration Setup Help",
      status: "In Progress",
      priority: "Medium",
      created: "2024-01-14",
      agent: "Aspect.MediaUploader",
    },
    {
      id: "TK-003",
      title: "Billing Question",
      status: "Resolved",
      priority: "Low",
      created: "2024-01-13",
      agent: "General",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Support Center</h1>
            <p className="text-muted-foreground">Get help with your AI agents and platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Support Online
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="contact">Contact Options</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Live Support Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {message.type === "bot" && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`max-w-[70%] ${message.type === "user" ? "order-first" : ""}`}>
                              <div
                                className={`rounded-lg p-3 ${
                                  message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <span>{message.agent}</span>
                                <span>•</span>
                                <span>{message.timestamp.toLocaleTimeString()}</span>
                              </div>
                            </div>
                            {message.type === "user" && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-muted">
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex gap-3 justify-start">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start New Conversation
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Common Issues</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Agent not responding
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Integration setup help
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Billing questions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      Performance issues
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Support Tickets</h2>
              <Button>Create New Ticket</Button>
            </div>

            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <Badge
                            variant={
                              ticket.status === "Open"
                                ? "destructive"
                                : ticket.status === "In Progress"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {ticket.status}
                          </Badge>
                          <Badge variant="outline">{ticket.priority}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Ticket ID: {ticket.id}</span>
                          <span>Agent: {ticket.agent}</span>
                          <span>Created: {ticket.created}</span>
                        </div>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get instant help from our AI assistant or connect with a human agent.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Available 24/7</span>
                  </div>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Send us a detailed message and we'll get back to you within 24 hours.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Response within 24h</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Schedule a call with our technical support team for complex issues.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Mon-Fri 9AM-6PM EST</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    Getting Started Guide
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Agent Configuration
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    API Reference
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Troubleshooting
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    Platform Overview
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Setting Up Agents
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Integration Walkthrough
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Advanced Features
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    Community Forum
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Feature Requests
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Bug Reports
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    User Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Featured Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Quick Start Checklist</h4>
                    <p className="text-sm text-muted-foreground">
                      Essential steps to get your AI agents up and running in minutes.
                    </p>
                    <Button variant="outline" size="sm">
                      View Checklist
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Best Practices Guide</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn how to optimize your agents for maximum performance.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
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
