import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Download, Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResumesPage() {
  const resumes = [
    {
      id: 1,
      title: "Marketing Resume",
      updated: "2 days ago",
      score: 82,
      template: "Modern",
      category: "Marketing",
    },
    {
      id: 2,
      title: "Product Manager",
      updated: "1 week ago",
      score: 75,
      template: "Professional",
      category: "Product",
    },
    {
      id: 3,
      title: "UX Designer",
      updated: "3 weeks ago",
      score: 68,
      template: "Creative",
      category: "Design",
    },
    {
      id: 4,
      title: "Software Engineer",
      updated: "1 month ago",
      score: 79,
      template: "Technical",
      category: "Technology",
    },
    {
      id: 5,
      title: "Project Manager",
      updated: "2 months ago",
      score: 71,
      template: "Corporate",
      category: "Management",
    },
    {
      id: 6,
      title: "Data Analyst",
      updated: "3 months ago",
      score: 77,
      template: "Minimal",
      category: "Technology",
    },
  ]

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Resumes</h1>
          <p className="text-muted-foreground">Manage and organize all your resumes in one place</p>
        </div>
        <Button size="sm" className="blue-gradient">
          <Plus className="mr-2 h-4 w-4" /> Create New Resume
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input type="search" placeholder="Search resumes..." className="w-full" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue="recent">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="score-high">Highest Score</SelectItem>
              <SelectItem value="score-low">Lowest Score</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
          <Tabs defaultValue="grid" className="hidden md:block">
            <TabsList className="h-9">
              <TabsTrigger value="grid" className="px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grid-2x2"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{resume.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Template: {resume.template}</span>
                        <span className="text-muted-foreground">{resume.category}</span>
                      </div>
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

            <TabsContent value="list" className="mt-0">
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {resumes.map((resume) => (
                      <div key={resume.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{resume.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Updated {resume.updated} • {resume.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="hidden md:flex items-center gap-2 mr-4">
                            <div className="text-sm font-medium">{resume.score}/100</div>
                            <div className="w-24 h-2 bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                                style={{ width: `${resume.score}%` }}
                              />
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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


    </div>
  )
}

