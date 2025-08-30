import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Vote, Coins, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function DAOExplorer() {
  const proposals = [
    {
      id: "AMS-001",
      title: "Expand AI Agent Capabilities",
      description: "Proposal to add new machine learning models to Aspect.Research agent",
      status: "active",
      votesFor: 847,
      votesAgainst: 123,
      totalVotes: 970,
      timeLeft: "5 days",
      quorum: 85,
    },
    {
      id: "AMS-002",
      title: "Treasury Allocation for Marketing",
      description: "Allocate 50,000 AMS tokens for Q1 marketing initiatives",
      status: "passed",
      votesFor: 1205,
      votesAgainst: 95,
      totalVotes: 1300,
      timeLeft: "Ended",
      quorum: 92,
    },
    {
      id: "AMS-003",
      title: "New Partnership Integration",
      description: "Integrate with additional e-commerce platforms via Aspect.EcommerceAutomation",
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      timeLeft: "Starts in 2 days",
      quorum: 0,
    },
  ]

  const daoStats = [
    { label: "Total Members", value: "2,847", icon: Users, change: "+12%" },
    { label: "Active Proposals", value: "3", icon: Vote, change: "0%" },
    { label: "Treasury Balance", value: "1.2M AMS", icon: Coins, change: "+8%" },
    { label: "Governance Power", value: "94%", icon: TrendingUp, change: "+3%" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />
      case "passed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "passed":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "failed":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">DAO Explorer</h1>
              <p className="text-muted-foreground mt-2">Decentralized governance for Aspect Marketing Solutions</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Web3 Connected
              </Badge>
              <Button className="bg-primary hover:bg-primary/90">Connect Wallet</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* DAO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {daoStats.map((stat, index) => (
            <Card key={index} className="bg-card/50 border-border/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <stat.icon className="h-8 w-8 text-primary mb-2" />
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="proposals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/20">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Governance Proposals</h2>
              <Button className="bg-primary hover:bg-primary/90">Create Proposal</Button>
            </div>

            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="bg-card/50 border-border/40">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-foreground">{proposal.title}</CardTitle>
                          <Badge className={getStatusColor(proposal.status)}>
                            {getStatusIcon(proposal.status)}
                            <span className="ml-1 capitalize">{proposal.status}</span>
                          </Badge>
                        </div>
                        <CardDescription>{proposal.description}</CardDescription>
                        <p className="text-sm text-muted-foreground">Proposal ID: {proposal.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{proposal.timeLeft}</p>
                        <p className="text-sm font-medium text-foreground">Quorum: {proposal.quorum}%</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400">For: {proposal.votesFor.toLocaleString()}</span>
                        <span className="text-red-400">Against: {proposal.votesAgainst.toLocaleString()}</span>
                        <span className="text-muted-foreground">Total: {proposal.totalVotes.toLocaleString()}</span>
                      </div>

                      {proposal.totalVotes > 0 && (
                        <div className="space-y-2">
                          <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% For</span>
                            <span>{((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}% Against</span>
                          </div>
                        </div>
                      )}

                      {proposal.status === "active" && (
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Vote For
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent"
                          >
                            Vote Against
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="treasury" className="space-y-6">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-foreground">Treasury Overview</CardTitle>
                <CardDescription>Current DAO treasury holdings and allocations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">1.2M AMS</p>
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">850K AMS</p>
                    <p className="text-sm text-muted-foreground">Available</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">350K AMS</p>
                    <p className="text-sm text-muted-foreground">Allocated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-foreground">DAO Members</CardTitle>
                <CardDescription>Active governance participants and voting power distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-xl font-semibold text-foreground">2,847 Active Members</p>
                  <p className="text-muted-foreground">Participating in governance decisions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="text-foreground">Governance Analytics</CardTitle>
                <CardDescription>Voting patterns and participation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-xl font-semibold text-foreground">94% Participation Rate</p>
                  <p className="text-muted-foreground">High engagement in governance</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
