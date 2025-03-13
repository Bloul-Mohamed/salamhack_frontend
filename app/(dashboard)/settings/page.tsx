import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Trash2, LogOut, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Button size="sm" className="blue-gradient">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="johndoe123" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Marketing professional with 5+ years of experience" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage accounts connected to your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Connected as John Doe</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">Google</p>
                    <p className="text-sm text-muted-foreground">Connected as john.doe@gmail.com</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-destructive">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all your data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "resume-tips",
                      label: "Resume Tips & Suggestions",
                      description: "Weekly tips to improve your resume",
                    },
                    {
                      id: "job-matches",
                      label: "Job Match Recommendations",
                      description: "Notifications about jobs that match your profile",
                    },
                    { id: "product-updates", label: "Product Updates", description: "New features and improvements" },
                    {
                      id: "account-activity",
                      label: "Account Activity",
                      description: "Login attempts and security alerts",
                    },
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={notification.id} className="font-medium">
                          {notification.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Switch id={notification.id} defaultChecked={notification.id !== "product-updates"} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-3">
                  {[
                    { id: "push-resume", label: "Resume Reminders", description: "Reminders to update your resume" },
                    {
                      id: "push-job",
                      label: "Job Opportunities",
                      description: "New job matches and application deadlines",
                    },
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={notification.id} className="font-medium">
                          {notification.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Switch id={notification.id} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Marketing Communications</h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "marketing-email",
                      label: "Marketing Emails",
                      description: "Promotional offers and newsletters",
                    },
                    { id: "marketing-sms", label: "SMS Messages", description: "Text message promotions and updates" },
                  ].map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={notification.id} className="font-medium">
                          {notification.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Switch id={notification.id} defaultChecked={false} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </div>
                <Badge>Free Plan</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Free Plan</h3>
                    <p className="text-sm text-muted-foreground">Basic resume building tools</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        1 resume
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        3 templates
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Basic ATS check
                      </li>
                    </ul>
                  </div>
                  <Button size="sm" className="blue-gradient">
                    Upgrade
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Pro Plan</h3>
                  <p className="text-sm text-muted-foreground">$12/month</p>
                  <p className="text-sm text-muted-foreground mt-2">Advanced features for job seekers</p>
                  <Button size="sm" variant="outline" className="mt-4 w-full">
                    View Details
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Premium Plan</h3>
                  <p className="text-sm text-muted-foreground">$29/month</p>
                  <p className="text-sm text-muted-foreground mt-2">Complete career solution</p>
                  <Button size="sm" variant="outline" className="mt-4 w-full">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-6">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground mt-2">No payment methods added yet</p>
                <Button size="sm" className="mt-4">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground">No billing history available</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button size="sm">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Protect your account with an additional security layer
                  </p>
                </div>
                <Switch id="2fa" defaultChecked={false} />
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm">
                  Two-factor authentication adds an extra layer of security to your account by requiring more than just
                  a password to sign in.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>Manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">MacBook Pro • New York, USA</p>
                    <p className="text-xs text-muted-foreground mt-1">Started 2 hours ago • Chrome on macOS</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0"
                  >
                    Active
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Previous Session</p>
                    <p className="text-sm text-muted-foreground">iPhone 13 • New York, USA</p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago • Safari on iOS</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out All Devices
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

