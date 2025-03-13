import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, CheckCircle, Clock, Award, ArrowRight, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function LearningCenterPage() {
  const courses = [
    {
      id: 1,
      title: "Resume Writing Fundamentals",
      description: "Learn the basics of creating an effective resume",
      lessons: 8,
      duration: "1h 45m",
      level: "Beginner",
      progress: 75,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Mastering the Job Interview",
      description: "Techniques to excel in any interview situation",
      lessons: 12,
      duration: "2h 30m",
      level: "Intermediate",
      progress: 40,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "LinkedIn Profile Optimization",
      description: "Make your LinkedIn profile stand out to recruiters",
      lessons: 6,
      duration: "1h 15m",
      level: "Beginner",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Advanced Job Search Strategies",
      description: "Find hidden job opportunities and network effectively",
      lessons: 10,
      duration: "2h 10m",
      level: "Advanced",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const articles = [
    {
      id: 1,
      title: "10 Resume Mistakes to Avoid in 2023",
      category: "Resume Tips",
      readTime: "5 min read",
      date: "May 15, 2023",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: 2,
      title: "How to Address Employment Gaps on Your Resume",
      category: "Resume Tips",
      readTime: "7 min read",
      date: "May 10, 2023",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: 3,
      title: "Negotiating Your Salary: A Complete Guide",
      category: "Career Advice",
      readTime: "10 min read",
      date: "May 5, 2023",
      image: "/placeholder.svg?height=150&width=250",
    },
    {
      id: 4,
      title: "Switching Careers: How to Position Your Transferable Skills",
      category: "Career Advice",
      readTime: "8 min read",
      date: "April 28, 2023",
      image: "/placeholder.svg?height=150&width=250",
    },
  ]

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learning Center</h1>
          <p className="text-muted-foreground">Improve your job search skills with courses and resources</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search resources..." className="w-full pl-9" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm blue-gradient-subtle">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <h2 className="text-xl font-bold">Continue Learning</h2>
                <p className="text-muted-foreground mt-1">Resume Writing Fundamentals</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-blue-100 dark:bg-blue-950">
                    <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                  </Progress>
                </div>
                <Button size="sm" className="mt-4 blue-gradient">
                  <Play className="mr-2 h-4 w-4" /> Continue Course
                </Button>
              </div>
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">Your Learning Stats</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-3xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Courses in Progress</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Articles Read</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">4h</p>
                <p className="text-sm text-muted-foreground">Learning Time</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Certificate Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id} className="shadow-sm overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  {course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100 dark:bg-blue-950">
                      <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: `${course.progress}%` }} />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{course.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {course.duration}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    {course.progress > 0 ? (
                      <>
                        <span className="text-sm">{course.progress}% complete</span>
                        <Button size="sm" className="blue-gradient">
                          Continue <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">Not started</span>
                        <Button size="sm" className="blue-gradient">
                          Start Course <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <Card key={article.id} className="shadow-sm overflow-hidden">
                <div className="aspect-[2/1] relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {article.category}
                  </Badge>
                  <h3 className="font-medium">{article.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <Button size="sm" variant="outline" className="mt-4 w-full">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Upcoming Webinars</h3>
            <p className="text-muted-foreground mt-2">No upcoming webinars scheduled at this time</p>
            <Button size="sm" className="mt-4">
              Browse Recorded Webinars
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your profile and career goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Personal Branding</h3>
                  <p className="text-sm text-muted-foreground">Advanced Course</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Learn how to build a strong personal brand to stand out in your job search
              </p>
              <Button size="sm" variant="outline" className="mt-4 w-full">
                View Course
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Networking Strategies</h3>
                  <p className="text-sm text-muted-foreground">Intermediate Course</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Effective networking techniques to expand your professional connections
              </p>
              <Button size="sm" variant="outline" className="mt-4 w-full">
                View Course
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Career Transition Guide</h3>
                  <p className="text-sm text-muted-foreground">Featured Article</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                A comprehensive guide to successfully changing careers at any stage
              </p>
              <Button size="sm" variant="outline" className="mt-4 w-full">
                Read Article
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

