import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BarChart, PieChart, CheckCircle, AlertCircle, FileText, Download, ArrowUpRight, Sparkles } from "lucide-react"

export default function AnalysisPage() {
  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Analysis</h1>
          <p className="text-muted-foreground">Detailed insights and improvement suggestions for your resumes</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76/100</div>
            <Progress value={76} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+12 points improvement from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ATS Compatibility</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82/100</div>
            <Progress value={82} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Good - Your resume is ATS-friendly</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keyword Optimization</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68/100</div>
            <Progress value={68} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Needs improvement - Add more industry keywords</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Analysis</TabsTrigger>
          <TabsTrigger value="ats">ATS Compatibility</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Resume Performance</CardTitle>
              <CardDescription>Analysis of your Marketing Resume across key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-primary"></div>
                      <span className="text-sm font-medium">Content Quality</span>
                    </div>
                    <span className="text-sm font-medium">78/100</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Your content is clear and well-structured, but could use more quantifiable achievements.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium">Keyword Optimization</span>
                    </div>
                    <span className="text-sm font-medium">68/100</span>
                  </div>
                  <Progress value={68} className="h-2" color="blue" />
                  <p className="text-xs text-muted-foreground">
                    Your resume includes some relevant keywords, but is missing several important industry terms.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">ATS Compatibility</span>
                    </div>
                    <span className="text-sm font-medium">82/100</span>
                  </div>
                  <Progress value={82} className="h-2" color="green" />
                  <p className="text-xs text-muted-foreground">
                    Your resume format is ATS-friendly with good structure and formatting.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium">Visual Design</span>
                    </div>
                    <span className="text-sm font-medium">75/100</span>
                  </div>
                  <Progress value={75} className="h-2" color="yellow" />
                  <p className="text-xs text-muted-foreground">
                    Your resume has a clean design but could benefit from better spacing and hierarchy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>Areas where your resume performs well</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Clear Professional Summary",
                      description: "Your summary effectively communicates your experience and value proposition.",
                    },
                    {
                      title: "Well-Structured Format",
                      description: "Your resume follows a logical structure that is easy to scan.",
                    },
                    {
                      title: "Relevant Experience",
                      description: "Your work history is relevant to your target roles in marketing.",
                    },
                    {
                      title: "Education Section",
                      description: "Your education credentials are well presented and relevant.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Aspects of your resume that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Quantifiable Achievements",
                      description: "Add more specific metrics and results to demonstrate your impact.",
                    },
                    {
                      title: "Industry Keywords",
                      description: "Include more relevant marketing keywords to improve ATS performance.",
                    },
                    {
                      title: "Skills Section",
                      description: "Expand your skills section to highlight technical and soft skills.",
                    },
                    {
                      title: "Action Verbs",
                      description: "Use stronger action verbs to begin your bullet points.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Content Quality Analysis</CardTitle>
              <CardDescription>Detailed assessment of your resume content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Professional Summary</h3>
                  <div className="rounded-md border p-4 bg-muted/50">
                    <p className="text-sm italic">
                      "Experienced marketing professional with 5+ years of experience in digital marketing, content
                      strategy, and campaign management. Proven track record of developing successful marketing
                      initiatives that drive engagement and conversion. Skilled in SEO, social media marketing, and
                      analytics."
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Strengths</h4>
                      <ul className="text-sm space-y-1 list-disc pl-5">
                        <li>Clear statement of experience level</li>
                        <li>Mentions key areas of expertise</li>
                        <li>Includes specific skills</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Improvements</h4>
                      <ul className="text-sm space-y-1 list-disc pl-5">
                        <li>Add a specific achievement</li>
                        <li>Mention target industry or role</li>
                        <li>Include a unique value proposition</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Work Experience</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Marketing Manager at Acme Inc. (2020-Present)</h4>
                      <div className="rounded-md border p-4 bg-muted/50">
                        <ul className="text-sm space-y-1 list-disc pl-5">
                          <li>Led digital marketing campaigns across multiple channels</li>
                          <li>Managed social media presence and content calendar</li>
                          <li>Collaborated with design team on marketing materials</li>
                          <li>Analyzed campaign performance and reported to leadership</li>
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Bullet points are clear but lack specific metrics and achievements. Use stronger action
                            verbs and include quantifiable results.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Suggested Improvement</h4>
                          <p className="text-sm text-primary">
                            "Led digital marketing campaigns across multiple channels, increasing website traffic by 45%
                            and conversion rates by 28%"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Skills Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-sm">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Technical Skills</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Digital Marketing</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>SEO</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Content Strategy</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Email Marketing</span>
                            <span className="text-red-500">✗</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>PPC Advertising</span>
                            <span className="text-red-500">✗</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Soft Skills</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Communication</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Leadership</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Problem Solving</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Project Management</span>
                            <span className="text-red-500">✗</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Data Analysis</span>
                            <span className="text-red-500">✗</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Tools & Software</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Google Analytics</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Adobe Creative Suite</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Mailchimp</span>
                            <span className="text-green-500">✓</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>HubSpot</span>
                            <span className="text-red-500">✗</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Google Ads</span>
                            <span className="text-red-500">✗</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ats" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>ATS Compatibility Analysis</CardTitle>
              <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Overall ATS Score</h3>
                  <div className="text-2xl font-bold">82/100</div>
                </div>
                <Progress value={82} className="h-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Format Analysis</h3>
                    <div className="space-y-3">
                      {[
                        {
                          title: "File Format",
                          status: "pass",
                          description: "PDF format is readable by most ATS systems",
                        },
                        {
                          title: "Headers & Sections",
                          status: "pass",
                          description: "Clear section headers that ATS can recognize",
                        },
                        {
                          title: "Fonts",
                          status: "pass",
                          description: "Standard fonts that are ATS-friendly",
                        },
                        {
                          title: "Tables & Columns",
                          status: "warning",
                          description: "Some multi-column sections may cause parsing issues",
                        },
                        {
                          title: "Images & Graphics",
                          status: "pass",
                          description: "No images that would confuse ATS systems",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          {item.status === "pass" ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          )}
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Keyword Analysis</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Keywords found in your resume compared to industry standards for Marketing roles:
                      </p>
                      <div className="space-y-2">
                        {[
                          { term: "Digital Marketing", found: true, importance: "high" },
                          { term: "SEO", found: true, importance: "high" },
                          { term: "Content Strategy", found: true, importance: "medium" },
                          { term: "Social Media Marketing", found: true, importance: "high" },
                          { term: "Email Marketing", found: false, importance: "high" },
                          { term: "PPC", found: false, importance: "high" },
                          { term: "Google Analytics", found: true, importance: "medium" },
                          { term: "A/B Testing", found: false, importance: "medium" },
                          { term: "Conversion Rate Optimization", found: false, importance: "medium" },
                          { term: "Marketing Automation", found: false, importance: "high" },
                        ].map((keyword, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              {keyword.found ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                              )}
                              <span className="text-sm">{keyword.term}</span>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                keyword.importance === "high"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              {keyword.importance === "high" ? "Critical" : "Important"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium">ATS Simulation Results</h3>
                  <div className="rounded-md border p-4 bg-muted/50">
                    <div className="space-y-4">
                      <p className="text-sm">
                        We ran your resume through simulations of popular ATS systems. Here are the results:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Workday</h4>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Parsed Successfully</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Taleo</h4>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Parsed Successfully</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Greenhouse</h4>
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                            <span className="text-sm">Minor Parsing Issues</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recommended Improvements</CardTitle>
              <CardDescription>AI-powered suggestions to enhance your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">High Priority Improvements</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Add Quantifiable Achievements",
                        description:
                          "Include specific metrics and results in your work experience to demonstrate your impact.",
                        example:
                          "Led digital marketing campaigns that increased website traffic by 45% and conversion rates by 28% over 6 months.",
                      },
                      {
                        title: "Include Missing Keywords",
                        description:
                          "Add these critical keywords that are missing from your resume: Email Marketing, PPC, A/B Testing, Marketing Automation.",
                        example:
                          "Developed and executed email marketing campaigns with A/B testing that achieved 35% open rates and 12% click-through rates.",
                      },
                      {
                        title: "Strengthen Skills Section",
                        description:
                          "Expand your skills section to include more technical and industry-specific skills.",
                        example:
                          "Add a dedicated 'Technical Skills' section that includes: Google Ads, HubSpot, Marketing Automation, Data Visualization.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="rounded-md border p-4 space-y-3">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium">Example:</p>
                          <p className="text-sm italic">{item.example}</p>
                        </div>
                        <Button size="sm">
                          Apply Suggestion <ArrowUpRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Enhancements</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Improve Action Verbs",
                        description:
                          "Replace generic verbs with stronger action verbs at the beginning of bullet points.",
                        example:
                          "Replace 'Managed social media' with 'Orchestrated social media strategy across 5 platforms, growing audience by 65%'",
                      },
                      {
                        title: "Enhance Professional Summary",
                        description: "Add a specific achievement and mention your target industry in your summary.",
                        example:
                          "Experienced marketing professional with 5+ years of experience driving results in the SaaS industry. Increased lead generation by 40% through integrated digital marketing campaigns.",
                      },
                      {
                        title: "Optimize Layout",
                        description: "Adjust spacing and formatting to improve readability and ATS compatibility.",
                        example:
                          "Convert multi-column sections to single column and ensure consistent spacing between sections.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="rounded-md border p-4 space-y-3">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium">Example:</p>
                          <p className="text-sm italic">{item.example}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Apply Suggestion <ArrowUpRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border-2 border-dashed p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 font-medium">Generate AI-Optimized Resume</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Let our AI automatically apply all suggested improvements to create an optimized version of your
                    resume.
                  </p>
                  <Button className="mt-4" size="sm">
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Optimized Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

