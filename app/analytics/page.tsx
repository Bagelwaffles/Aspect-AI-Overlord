export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Platform analytics coming soon</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold text-foreground">Total Requests</h3>
            <p className="text-3xl font-bold text-primary mt-2">847,392</p>
            <p className="text-sm text-muted-foreground mt-1">+12.5% from last month</p>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold text-foreground">Active Users</h3>
            <p className="text-3xl font-bold text-primary mt-2">23,847</p>
            <p className="text-sm text-muted-foreground mt-1">+8.2% from last month</p>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold text-foreground">Revenue</h3>
            <p className="text-3xl font-bold text-primary mt-2">$284,592</p>
            <p className="text-sm text-muted-foreground mt-1">+15.3% from last month</p>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold text-foreground">Efficiency</h3>
            <p className="text-3xl font-bold text-primary mt-2">94.2%</p>
            <p className="text-sm text-muted-foreground mt-1">+2.1% from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
