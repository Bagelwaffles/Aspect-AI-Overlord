"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Brain, Cpu, Database, Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])

  const models = [
    {
      id: "gpt-4",
      name: "GPT-4 Turbo",
      provider: "OpenAI",
      status: "active",
      accuracy: 95,
      speed: "Fast",
      cost: "$0.03/1K tokens",
      description: "Most capable model for complex reasoning tasks",
    },
    {
      id: "claude-3",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      status: "active",
      accuracy: 94,
      speed: "Medium",
      cost: "$0.015/1K tokens",
      description: "Excellent for analysis and creative tasks",
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      status: "training",
      accuracy: 92,
      speed: "Very Fast",
      cost: "$0.001/1K tokens",
      description: "Optimized for multimodal understanding",
    },
    {
      id: "llama-2",
      name: "Llama 2 70B",
      provider: "Meta",
      status: "inactive",
      accuracy: 88,
      speed: "Medium",
      cost: "$0.0007/1K tokens",
      description: "Open-source model for general tasks",
    },
  ]

  const trainingJobs = [
    {
      id: "job-001",
      name: "Customer Support Fine-tune",
      model: "GPT-4",
      progress: 75,
      status: "training",
      eta: "2h 15m",
      dataset: "10K conversations",
    },
    {
      id: "job-002",
      name: "Product Description Generator",
      model: "Claude 3",
      progress: 100,
      status: "completed",
      eta: "Complete",
      dataset: "5K products",
    },
    {
      id: "job-003",
      name: "Email Response Classifier",
      model: "Gemini Pro",
      progress: 45,
      status: "training",
      eta: "4h 30m",
      dataset: "25K emails",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Model Configuration</h1>
            <p className="text-muted-foreground mt-2">Configure and train AI models for your agents</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Brain className="w-4 h-4 mr-2" />
            Deploy New Model
          </Button>
        </div>

        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models">Available Models</TabsTrigger>
            <TabsTrigger value="training">Training Jobs</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <Card key={model.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <Badge
                        variant={
                          model.status === "active" ? "default" : model.status === "training" ? "secondary" : "outline"
                        }
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <CardDescription>{model.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{model.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span>{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Speed:</span>
                        <p className="font-medium">{model.speed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <p className="font-medium">{model.cost}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Training Jobs</h2>
              <Button>
                <Zap className="w-4 h-4 mr-2" />
                Start New Training
              </Button>
            </div>

            <div className="space-y-4">
              {trainingJobs.map((job) => (
                <Card key={job.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{job.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Model: {job.model} • Dataset: {job.dataset}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Cpu className="w-5 h-5 text-blue-500 animate-pulse" />
                        )}
                        <Badge variant={job.status === "completed" ? "default" : "secondary"}>{job.status}</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {job.progress}% • ETA: {job.eta}
                        </span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        View Logs
                      </Button>
                      <Button size="sm" variant="outline">
                        Download Model
                      </Button>
                      {job.status === "training" && (
                        <Button size="sm" variant="destructive">
                          Stop Training
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <CardDescription>Configure parameters for the selected model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="model-select">Select Model</Label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Temperature: {temperature[0]}</Label>
                      <Slider
                        value={temperature}
                        onValueChange={setTemperature}
                        max={2}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Controls randomness in responses (0 = deterministic, 2 = very creative)
                      </p>
                    </div>

                    <div>
                      <Label>Max Tokens: {maxTokens[0]}</Label>
                      <Slider
                        value={maxTokens}
                        onValueChange={setMaxTokens}
                        max={4096}
                        min={256}
                        step={256}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Maximum length of generated responses</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="system-prompt">System Prompt</Label>
                      <Textarea
                        id="system-prompt"
                        placeholder="Enter system instructions for the model..."
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="streaming" />
                      <Label htmlFor="streaming">Enable Streaming</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="function-calling" />
                      <Label htmlFor="function-calling">Function Calling</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="content-filter" />
                      <Label htmlFor="content-filter">Content Filtering</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>Save Configuration</Button>
                  <Button variant="outline">Test Configuration</Button>
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-bold">1.2s</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold">99.7%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Requests</p>
                      <p className="text-2xl font-bold">45.2K</p>
                    </div>
                    <Database className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Error Rate</p>
                      <p className="text-2xl font-bold">0.3%</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
                <CardDescription>Performance metrics across different models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-medium">{model.name}</h4>
                          <p className="text-sm text-muted-foreground">{model.provider}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Accuracy</p>
                          <p className="font-semibold">{model.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Speed</p>
                          <p className="font-semibold">{model.speed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cost</p>
                          <p className="font-semibold">{model.cost}</p>
                        </div>
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
