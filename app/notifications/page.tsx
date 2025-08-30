export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Agent Deployment Complete",
      message: "Aspect.EcommerceAutomation has been successfully deployed and is now active.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "High API Usage",
      message: "Your API usage is approaching the monthly limit. Consider upgrading your plan.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New Feature Available",
      message: "Voice control integration is now available for all agents.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "error",
      title: "Agent Error",
      message: "Aspect.MediaUploader encountered an error processing video file.",
      time: "5 hours ago",
      read: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <button className="text-sm text-primary hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-card border rounded-lg p-4 ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        notification.type === "success"
                          ? "bg-green-500"
                          : notification.type === "warning"
                            ? "bg-yellow-500"
                            : notification.type === "error"
                              ? "bg-red-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    {!notification.read && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="text-sm text-muted-foreground hover:text-foreground">Load more notifications</button>
        </div>
      </div>
    </div>
  )
}
