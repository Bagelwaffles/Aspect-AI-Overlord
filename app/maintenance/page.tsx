import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, Clock, CheckCircle, Home } from "lucide-react"
import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Wrench className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">System Maintenance</CardTitle>
          <CardDescription>
            We're currently performing scheduled maintenance to improve your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              <Clock className="mr-1 h-3 w-3" />
              Estimated Duration: 30 minutes
            </Badge>
            <p className="text-sm text-muted-foreground">Started at 2:00 AM UTC • Expected completion: 2:30 AM UTC</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-sm">Maintenance Tasks:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="line-through text-muted-foreground">Database optimization</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="line-through text-muted-foreground">Security updates</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span>Agent system upgrades</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded-full border-2 border-muted" />
                <span className="text-muted-foreground">Performance optimizations</span>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">What's being improved:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Faster agent response times</li>
              <li>• Enhanced security protocols</li>
              <li>• Improved dashboard performance</li>
              <li>• New integration capabilities</li>
            </ul>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              We apologize for any inconvenience. The system will be back online shortly.
            </p>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Homepage
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              For urgent matters, contact{" "}
              <a href="mailto:support@aspectmarketingsolutions.app" className="text-primary hover:underline">
                support@aspectmarketingsolutions.app
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
