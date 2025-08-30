"use client"

import { useState, useEffect } from "react"
import { Search, Clock, FileText, Settings, BarChart3, Upload, Coins, Bot, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const searchData = [
  {
    id: 1,
    title: "Agent Console",
    description: "Monitor and manage all AI agents",
    type: "page",
    category: "agents",
    url: "/console",
    icon: Bot,
  },
  {
    id: 2,
    title: "File Uploader",
    description: "Upload files for AI processing",
    type: "page",
    category: "tools",
    url: "/upload",
    icon: Upload,
  },
  {
    id: 3,
    title: "DAO Explorer",
    description: "Governance and voting interface",
    type: "page",
    category: "web3",
    url: "/dao",
    icon: Coins,
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "Platform usage and performance metrics",
    type: "page",
    category: "analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    id: 5,
    title: "Aspect.Overmind",
    description: "Central orchestration agent",
    type: "agent",
    category: "agents",
    url: "/agents/overmind",
    icon: Bot,
  },
  {
    id: 6,
    title: "Aspect.EcommerceAutomation",
    description: "Automated ecommerce operations",
    type: "agent",
    category: "agents",
    url: "/agents/ecommerce",
    icon: Bot,
  },
  {
    id: 7,
    title: "User Settings",
    description: "Account and platform configuration",
    type: "page",
    category: "settings",
    url: "/settings",
    icon: Settings,
  },
  {
    id: 8,
    title: "API Documentation",
    description: "Complete API reference and examples",
    type: "documentation",
    category: "docs",
    url: "/api",
    icon: FileText,
  },
  {
    id: 9,
    title: "Billing Management",
    description: "Subscription and payment settings",
    type: "page",
    category: "billing",
    url: "/billing",
    icon: FileText,
  },
  {
    id: 10,
    title: "System Monitoring",
    description: "Real-time system health and performance",
    type: "page",
    category: "monitoring",
    url: "/monitoring",
    icon: BarChart3,
  },
  {
    id: 11,
    title: "Help Center",
    description: "Documentation and support resources",
    type: "page",
    category: "support",
    url: "/help",
    icon: HelpCircle,
  },
  {
    id: 12,
    title: "Admin Panel",
    description: "Administrative controls and management",
    type: "page",
    category: "admin",
    url: "/admin",
    icon: Settings,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState(searchData)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [recentSearches, setRecentSearches] = useState(["agent status", "upload files", "DAO proposals"])

  useEffect(() => {
    let results = searchData

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter((item) => item.category === selectedCategory)
    }

    // Filter by type
    if (selectedType !== "all") {
      results = results.filter((item) => item.type === selectedType)
    }

    setFilteredResults(results)
  }, [searchQuery, selectedCategory, selectedType])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)])
    }
  }

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "agents", label: "Agents" },
    { value: "tools", label: "Tools" },
    { value: "analytics", label: "Analytics" },
    { value: "settings", label: "Settings" },
    { value: "docs", label: "Documentation" },
    { value: "support", label: "Support" },
  ]

  const types = [
    { value: "all", label: "All Types" },
    { value: "page", label: "Pages" },
    { value: "agent", label: "Agents" },
    { value: "documentation", label: "Documentation" },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Search Platform</h1>
          <p className="text-muted-foreground text-lg">Find agents, tools, documentation, and more</p>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for agents, pages, documentation..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Search Results ({filteredResults.length})</TabsTrigger>
            <TabsTrigger value="recent">Recent Searches</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            {filteredResults.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredResults.map((result) => {
                  const IconComponent = result.icon
                  return (
                    <Link key={result.id} href={result.url}>
                      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{result.title}</h3>
                                <Badge variant="secondary">{result.type}</Badge>
                                <Badge variant="outline">{result.category}</Badge>
                              </div>
                              <p className="text-muted-foreground">{result.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Searches
                </CardTitle>
                <CardDescription>Your recent search queries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSearch(search)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {search}
                    </Button>
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
