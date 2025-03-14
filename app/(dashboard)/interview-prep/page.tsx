import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Play, BookOpen, CheckCircle, Clock, Plus, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function InterviewPrepPage() {
  const commonQuestions = [
    {
      id: 1,
      question: "Tell me about yourself",
      category: "General",
      difficulty: "Easy",
      practiced: true,
    },
    {
      id: 2,
      question: "What are your strengths and weaknesses?",
      category: "General",
      difficulty: "Easy",
      practiced: true,
    },
    {
      id: 3,
      question: "Why do you want to work for this company?",
      category: "General",
      difficulty: "Medium",
      practiced: false,
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      category: "General",
      difficulty: "Medium",
      practiced: false,
    },
    {
      id: 5,
      question: "Describe a challenging situation at work and how you handled it.",
      category: "Behavioral",
      difficulty: "Hard",
      practiced: false,
    },
    {
      id: 6,
      question: "How do you handle stress and pressure?",
      category: "Behavioral",
      difficulty: "Medium",
      practiced: true,
    },
  ]

  const technicalQuestions = [
    {
      id: 7,
      question: "Explain the difference between REST and GraphQL.",
      category: "Technical",
      difficulty: "Medium",
      practiced: false,
    },
    {
      id: 8,
      question: "What is your experience with Agile methodologies?",
      category: "Technical",
      difficulty: "Medium",
      practiced: false,
    },
    {
      id: 9,
      question: "How would you optimize a website's performance?",
      category: "Technical",
      difficulty: "Hard",
      practiced: false,
    },
  ]

  const upcomingInterviews = [
    {
      id: 1,
      company: "Acme Inc.",
      position: "Marketing Manager",
      date: "June 15, 2023",
      time: "10:00 AM",
      status: "Scheduled",
      preparationProgress: 65,
    },
    {
      id: 2,
      company: "Tech Solutions",
      position: "Product Manager",
      date: "June 20, 2023",
      time: "2:30 PM",
      status: "Scheduled",
      preparationProgress: 40,
    },
  ]

  const difficultyColor = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Hard: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  }

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Interview Preparation</h1>
          <p className="text-muted-foreground">
            Practice common interview questions and prepare for upcoming interviews
          </p>
        </div>
        <Button size="sm" className="blue-gradient">
          <Plus className="mr-2 h-4 w-4" /> Add Interview
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interviews and preparation progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{interview.position}</h3>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {interview.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {interview.date} at {interview.time}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Preparation Progress</span>
                        <span>{interview.preparationProgress}%</span>
                      </div>
                      <Progress value={interview.preparationProgress} className="h-2 bg-blue-100 dark:bg-blue-950">
                        <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                      </Progress>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm">
                        Continue Preparation <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No upcoming interviews scheduled</p>
                <Button size="sm" className="mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Add Interview
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Practice Statistics</CardTitle>
            <CardDescription>Your interview preparation progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground">Questions Practiced</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                  <p className="text-xs text-muted-foreground mt-1">of 9 total questions</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground">Practice Sessions</p>
                  <p className="text-3xl font-bold mt-1">5</p>
                  <p className="text-xs text-muted-foreground mt-1">Last session: 2 days ago</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Question Categories</h3>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>General</span>
                      <span>50%</span>
                    </div>
                    <Progress value={50} className="h-2 bg-blue-100 dark:bg-blue-950">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                    </Progress>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Behavioral</span>
                      <span>33%</span>
                    </div>
                    <Progress value={33} className="h-2 bg-blue-100 dark:bg-blue-950">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                    </Progress>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Technical</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2 bg-blue-100 dark:bg-blue-950">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                    </Progress>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button size="sm" className="blue-gradient">
                  <Play className="mr-2 h-4 w-4" /> Start Practice Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="common" className="space-y-4">
        <TabsList>
          <TabsTrigger value="common">Common Questions</TabsTrigger>
          <TabsTrigger value="technical">Technical Questions</TabsTrigger>
          <TabsTrigger value="custom">My Custom Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="common" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {commonQuestions.map((question) => (
              <Card key={question.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{question.question}</h3>
                    {question.practiced && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" /> Practiced
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {question.category}
                    </Badge>

                    <Badge variant="outline" className={`text-xs ${
                      // @ts-ignore
                      difficultyColor[question.difficulty]
                      }`}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" /> View Tips
                    </Button>
                    <Button size="sm" className="blue-gradient">
                      <MessageSquare className="mr-2 h-4 w-4" /> Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {technicalQuestions.map((question) => (
              <Card key={question.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{question.question}</h3>
                    {question.practiced && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" /> Practiced
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {question.category}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${
                      // @ts-ignore
                      difficultyColor[question.difficulty]
                      }`}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" /> View Tips
                    </Button>
                    <Button size="sm" className="blue-gradient">
                      <MessageSquare className="mr-2 h-4 w-4" /> Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No custom questions yet</h3>
            <p className="text-muted-foreground mt-2">Create your own custom interview questions to practice</p>
            <Button size="sm" className="mt-4 blue-gradient">
              <Plus className="mr-2 h-4 w-4" /> Add Custom Question
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

