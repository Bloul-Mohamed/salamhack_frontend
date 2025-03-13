import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, BarChart3, Clock, ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your resumes.</p>
        </div>
        <Button size="sm" className="blue-gradient">
          <Plus className="mr-2 h-4 w-4" /> Create New Resume
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76/100</div>
            <p className="text-xs text-muted-foreground">+12 points improvement</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 days ago</div>
            <p className="text-xs text-muted-foreground">Marketing Resume</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15%</div>
            <Progress value={15} className="h-2 mt-2 bg-blue-100 dark:bg-blue-950">
              <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
            </Progress>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="resumes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumes">My Resumes</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="resumes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Marketing Resume",
                updated: "2 days ago",
                score: 82,
                template: "Modern",
              },
              {
                title: "Product Manager",
                updated: "1 week ago",
                score: 75,
                template: "Professional",
              },
              {
                title: "UX Designer",
                updated: "3 weeks ago",
                score: 68,
                template: "Creative",
              },
            ].map((resume, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{resume.title}</CardTitle>
                  <CardDescription>Last updated: {resume.updated}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resume Score</span>
                      <span className="font-medium">{resume.score}/100</span>
                    </div>
                    <Progress value={resume.score} className="h-2 bg-blue-100 dark:bg-blue-950">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                    </Progress>
                  </div>
                  <div className="text-sm text-muted-foreground">Template: {resume.template}</div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button size="sm" className="blue-gradient">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your resume activity from the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Updated Marketing Resume",
                    date: "2 days ago",
                    description: "Changed job descriptions and added new skills",
                  },
                  {
                    action: "Exported Product Manager Resume",
                    date: "5 days ago",
                    description: "Downloaded as PDF for job application",
                  },
                  {
                    action: "Created UX Designer Resume",
                    date: "3 weeks ago",
                    description: "Started from Creative template",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
              <CardDescription>Personalized recommendations to improve your resumes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Strengthen your Marketing Resume",
                    description: "Add more quantifiable achievements to showcase your impact",
                    resume: "Marketing Resume",
                  },
                  {
                    title: "Update your skills section",
                    description: "Your Product Manager resume is missing key technical skills",
                    resume: "Product Manager",
                  },
                  {
                    title: "Improve ATS compatibility",
                    description: "Your UX Designer resume needs more industry keywords",
                    resume: "UX Designer",
                  },
                ].map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{suggestion.title}</p>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">For: {suggestion.resume}</p>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">
                      Apply <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

