"use client"

import { useState } from "react"
import { FileText, Search, Sparkles, CheckCircle, AlertCircle, ArrowRight, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JobMatchPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = () => {
    if (!jobDescription) return

    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 2500)
  }

  const resetAnalysis = () => {
    setJobDescription("")
    setShowResults(false)
  }

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Match</h1>
          <p className="text-muted-foreground">Analyze job descriptions and optimize your resume for specific roles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Your Resumes</CardTitle>
              <CardDescription>Select a resume to match against job descriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">Marketing Resume</h3>
                    <p className="text-xs text-muted-foreground">Last updated 2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {showResults && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Resume Match Score</CardTitle>
                <CardDescription>How well your resume matches this job</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                    <div className="text-3xl font-bold text-primary">72%</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Overall Match</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Skills Match</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Experience Match</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Education Match</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Keyword Match</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="sm">
                  <Sparkles className="mr-2 h-4 w-4" /> Optimize Resume
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Job Description Analyzer</CardTitle>
              <CardDescription>Paste a job description to analyze compatibility with your resume</CardDescription>
            </CardHeader>
            <CardContent>
              {!showResults ? (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste job description here..."
                    className="min-h-[200px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <Button
                    onClick={handleAnalyze}
                    disabled={!jobDescription || isAnalyzing}
                    className="w-full"
                    size="sm"
                  >
                    {isAnalyzing ? (
                      <>Analyzing...</>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" /> Analyze Job Description
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <Tabs defaultValue="keywords">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      <TabsTrigger value="missing">Missing Skills</TabsTrigger>
                      <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="keywords" className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Key terms and skills mentioned in the job description
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Hard Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { term: "Digital Marketing", match: true },
                              { term: "SEO", match: true },
                              { term: "Content Strategy", match: true },
                              { term: "Google Analytics", match: true },
                              { term: "Email Marketing", match: false },
                              { term: "A/B Testing", match: false },
                              { term: "Social Media Marketing", match: true },
                              { term: "PPC Advertising", match: false },
                            ].map((keyword, index) => (
                              <div
                                key={index}
                                className={`flex items-center rounded-full px-3 py-1 text-sm ${
                                  keyword.match
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                }`}
                              >
                                {keyword.term}
                                {keyword.match && <CheckCircle className="ml-1 h-3 w-3" />}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Soft Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { term: "Communication", match: true },
                              { term: "Leadership", match: true },
                              { term: "Problem Solving", match: true },
                              { term: "Creativity", match: false },
                              { term: "Collaboration", match: false },
                            ].map((keyword, index) => (
                              <div
                                key={index}
                                className={`flex items-center rounded-full px-3 py-1 text-sm ${
                                  keyword.match
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                }`}
                              >
                                {keyword.term}
                                {keyword.match && <CheckCircle className="ml-1 h-3 w-3" />}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Tools & Software</h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { term: "Adobe Creative Suite", match: true },
                              { term: "Mailchimp", match: true },
                              { term: "Salesforce", match: true },
                              { term: "HubSpot", match: false },
                              { term: "Google Ads", match: false },
                            ].map((keyword, index) => (
                              <div
                                key={index}
                                className={`flex items-center rounded-full px-3 py-1 text-sm ${
                                  keyword.match
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                }`}
                              >
                                {keyword.term}
                                {keyword.match && <CheckCircle className="ml-1 h-3 w-3" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="missing" className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        Skills and qualifications mentioned in the job that are missing from your resume
                      </p>

                      <div className="space-y-4">
                        {[
                          {
                            skill: "Email Marketing",
                            description: "Experience with email marketing campaigns and automation",
                          },
                          {
                            skill: "A/B Testing",
                            description: "Experience with testing and optimizing marketing campaigns",
                          },
                          {
                            skill: "PPC Advertising",
                            description: "Experience with Google Ads and paid social media advertising",
                          },
                          {
                            skill: "HubSpot",
                            description: "Experience with HubSpot marketing automation platform",
                          },
                          {
                            skill: "Google Ads",
                            description: "Experience with Google Ads platform and campaign management",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 rounded-md border p-3">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{item.skill}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="suggestions" className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground">
                        AI-powered suggestions to improve your resume for this specific job
                      </p>

                      <div className="space-y-4">
                        <div className="rounded-md border p-4 space-y-3">
                          <h3 className="font-medium flex items-center">
                            <Sparkles className="h-4 w-4 mr-2 text-primary" />
                            Add Missing Skills
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Add these critical keywords that are missing from your resume: Email Marketing, PPC, A/B
                            Testing, Marketing Automation.
                          </p>
                          <Button size="sm" variant="outline">
                            Add to Resume
                          </Button>
                        </div>

                        <div className="rounded-md border p-4 space-y-3">
                          <h3 className="font-medium flex items-center">
                            <Sparkles className="h-4 w-4 mr-2 text-primary" />
                            Enhance Work Descriptions
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Modify your work experience to better align with this role by highlighting quantifiable
                            results related to digital marketing campaigns.
                          </p>
                          <Button size="sm" variant="outline">
                            Update Experience
                          </Button>
                        </div>

                        <div className="rounded-md border p-4 space-y-3">
                          <h3 className="font-medium flex items-center">
                            <Sparkles className="h-4 w-4 mr-2 text-primary" />
                            Generate Cover Letter
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Create a tailored cover letter that addresses the specific requirements of this job posting.
                          </p>
                          <Button size="sm">
                            <PenLine className="mr-2 h-4 w-4" /> Generate Cover Letter
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" size="sm" onClick={resetAnalysis}>
                      Analyze Another Job
                    </Button>
                    <Button size="sm">
                      Optimize Resume <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

