import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenTool, Plus, Download, Eye, Pencil, Trash2, MoreHorizontal, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function CoverLetterPage() {
  const coverLetters = [
    {
      id: 1,
      title: "Marketing Manager - Acme Inc",
      created: "2 days ago",
      template: "Modern",
      category: "Marketing",
    },
    {
      id: 2,
      title: "Product Manager - Tech Solutions",
      created: "1 week ago",
      template: "Professional",
      category: "Product",
    },
    {
      id: 3,
      title: "UX Designer - Design Studio",
      created: "3 weeks ago",
      template: "Creative",
      category: "Design",
    },
  ]

  const templates = [
    {
      id: 1,
      name: "Modern",
      description: "Clean and contemporary design",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 2,
      name: "Professional",
      description: "Traditional and formal layout",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 3,
      name: "Creative",
      description: "Unique and eye-catching design",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 4,
      name: "Simple",
      description: "Minimalist and straightforward",
      image: "/placeholder.svg?height=200&width=150",
    },
  ]

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cover Letters</h1>
          <p className="text-muted-foreground">Create and manage your cover letters</p>
        </div>
        <Button size="sm" className="blue-gradient">
          <Plus className="mr-2 h-4 w-4" /> Create Cover Letter
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input type="search" placeholder="Search cover letters..." className="w-full" />
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
            </SelectContent>
          </Select>
        </div>
        <Select defaultValue="recent">
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="my-letters" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-letters">My Cover Letters</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="my-letters" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coverLetters.map((letter) => (
              <Card key={letter.id} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{letter.title}</CardTitle>
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
                  <CardDescription>Created: {letter.created}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Template: {letter.template}</span>
                    <Badge variant="outline">{letter.category}</Badge>
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

            <Card className="shadow-sm border-dashed flex flex-col items-center justify-center p-6 h-full">
              <PenTool className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium text-center">Create New Cover Letter</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Create a custom cover letter or use our AI generator
              </p>
              <Button size="sm" className="mt-4 blue-gradient">
                <Plus className="mr-2 h-4 w-4" /> Create New
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <Card key={template.id} className="shadow-sm overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-medium">{template.name}</h3>
                      <Button size="sm" variant="secondary" className="mt-2">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    Preview
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-generator" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>AI Cover Letter Generator</CardTitle>
              <CardDescription>
                Generate a personalized cover letter based on your resume and job description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume">Select Resume</Label>
                  <Select defaultValue="marketing">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing Resume</SelectItem>
                      <SelectItem value="product">Product Manager</SelectItem>
                      <SelectItem value="ux">UX Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" placeholder="e.g. Marketing Manager" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="e.g. Acme Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full blue-gradient">
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Cover Letter
                </Button>
              </div>

              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" /> Tips for Great Cover Letters
                </h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Customize each cover letter for the specific job</li>
                  <li>• Highlight relevant achievements from your resume</li>
                  <li>• Address the hiring manager by name if possible</li>
                  <li>• Keep it concise - aim for 250-400 words</li>
                  <li>• Proofread carefully before sending</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

function Textarea({ id, placeholder, className, ...props }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

