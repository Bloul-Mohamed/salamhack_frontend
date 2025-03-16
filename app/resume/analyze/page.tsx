"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Upload,
  FileUp,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  Briefcase,
  Award,
  Target,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cvService } from "@/services/api"
import { toast } from "@/hooks/use-toast"
import { useResumeStore } from "@/store/resume-store"
import { useRouter } from "next/navigation"
import CircularScore from "@/components/circular-score"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Define types for analysis results
interface AnalysisScore {
  overall: number
  categories: {
    content?: number
    format?: number
    relevance?: number
    impact?: number
    ats_compatibility?: number
  }
  breakdown?: {
    content?: {
      has_clear_summary?: number
      experience_detail?: number
      skills_coverage?: number
      education_detail?: number
    }
  }
  suggestions?: string[]
}

interface SkillsAssessment {
  technical_skills: string
  soft_skills: string
  skills_gaps: string
}

interface AnalysisResults {
  extracted_text?: string
  analysis?: {
    strengths: string[]
    weaknesses: string[]
    career_trajectory?: string
    skills_assessment?: SkillsAssessment
    ats_compatibility?: string
    industry_fit?: string[]
    action_plan?: string[]
    is_valid_cv?: boolean
  }
  score: AnalysisScore
}

export default function AnalyzePage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cvText, setCvText] = useState("")
  const [activeTab, setActiveTab] = useState("upload")
  const [activeResultTab, setActiveResultTab] = useState("overview")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit. Please select a smaller file.")
        return
      }

      // Check file type
      const validTypes = [".pdf", ".doc", ".docx", ".txt", ".tex"]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
      if (!validTypes.includes(fileExtension)) {
        setError("Invalid file type. Please upload PDF, DOC, DOCX, TXT, or TEX files.")
        return
      }

      setSelectedFile(file)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-blue-400")
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-blue-400")
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-blue-400")
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit. Please select a smaller file.")
        return
      }

      const validTypes = [".pdf", ".doc", ".docx", ".txt", ".tex"]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
      if (!validTypes.includes(fileExtension)) {
        setError("Invalid file type. Please upload PDF, DOC, DOCX, TXT, or TEX files.")
        return
      }

      setSelectedFile(file)
      setError(null)
    }
  }

  const handleSelectResumeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload")
      toast({
        title: "Missing File",
        description: "Please select a resume file to analyze.",
        variant: "destructive",
      })
      return
    }

    try {
      setError(null)
      setIsUploading(true)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsUploading(false)
      setIsAnalyzing(true)

      // Call the API to analyze the CV file
      const response = await cvService.analyzeCVFile(selectedFile)

      if (response.data) {
        console.log(response.data)

        setAnalysisResults(response.data)
        setShowResults(true)
        toast({
          title: "Analysis Complete",
          description: "Your resume has been successfully analyzed",
        })
      } else {
        throw new Error("No data received from API")
      }
    } catch (err: any) {
      console.error("Analysis error:", err)
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to analyze the resume. Please try again."
      setError(errorMessage)
      setShowResults(false)
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
      setIsUploading(false)
    }
  }

  const handleTextAnalysis = async () => {
    if (!cvText.trim()) {
      setError("Please enter your resume text")
      toast({
        title: "Missing Content",
        description: "Please paste your resume text to analyze.",
        variant: "destructive",
      })
      return
    }

    try {
      setError(null)
      setIsAnalyzing(true)

      // Call the API to analyze the CV text
      const response = await cvService.analyzeCV(cvText)

      if (response.data) {
        console.log(response.data)

        setAnalysisResults(response.data)
        setShowResults(true)
        toast({
          title: "Analysis Complete",
          description: "Your resume has been successfully analyzed",
        })
      } else {
        throw new Error("No data received from API")
      }
    } catch (err: any) {
      console.error("Analysis error:", err)
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to analyze the resume. Please try again."
      setError(errorMessage)
      setShowResults(false)
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setIsUploading(false)
    setIsAnalyzing(false)
    setShowResults(false)
    setAnalysisResults(null)
    setSelectedFile(null)
    setCvText("")
    setError(null)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Function to handle "Build Improved Resume" button click
  const handleBuildResume = async () => {
    try {
      if (!selectedFile) {
        toast({
          title: "Error",
          description: "No resume file available for extraction",
          variant: "destructive",
        })
        return
      }

      // Store analysis results in the store
      if (analysisResults) {
        useResumeStore.getState().setAnalysisResults(analysisResults)
      }

      // Show loading toast
      toast({
        title: "Processing",
        description: "Extracting data from your resume...",
      })

      // Extract data from the file
      const response = await cvService.extractCvDataFromFile(selectedFile)

      if (response.data) {
        // Store the extracted data in the Zustand store
        useResumeStore.getState().setResumeData(response.data)

        toast({
          title: "Success",
          description: "Resume data extracted successfully",
        })

        // Navigate to the builder page
        router.push("/resume/builder")
      }
    } catch (error) {
      console.error("Error extracting resume data:", error)
      toast({
        title: "Error",
        description: "Failed to extract resume data. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get scores with fallbacks
  const getScores = () => {
    if (!analysisResults)
      return {
        overall: 0,
        content: 0,
        format: 0,
        relevance: 0,
        impact: 0,
        ats: 0,
      }

    return {
      overall: analysisResults.score?.overall || 0,
      content: analysisResults.score?.categories?.content || 0,
      format: analysisResults.score?.categories?.format || 0,
      relevance: analysisResults.score?.categories?.relevance || 0,
      impact: analysisResults.score?.categories?.impact || 0,
      ats: analysisResults.score?.categories?.ats_compatibility || 0,
    }
  }

  const scores = getScores()

  // Get content breakdown scores
  const getContentBreakdown = () => {
    if (!analysisResults || !analysisResults.score?.breakdown?.content)
      return {
        summary: 0,
        experience: 0,
        skills: 0,
        education: 0,
      }

    const content = analysisResults.score.breakdown.content

    return {
      summary: content.has_clear_summary || 0,
      experience: content.experience_detail || 0,
      skills: content.skills_coverage || 0,
      education: content.education_detail || 0,
    }
  }

  const contentBreakdown = getContentBreakdown()

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Analysis</h1>
          <p className="text-muted-foreground">Get detailed feedback on your resume</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="paste">Paste Resume</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="border border-dashed shadow-sm">
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>Upload your resume file for detailed analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {!isUploading && !isAnalyzing && !showResults && (
                <div
                  ref={dropZoneRef}
                  className={`flex flex-col items-center justify-center py-10 space-y-4 border-2 border-dashed ${error ? "border-red-300 bg-red-50 dark:bg-red-900/10" : "border-gray-300"} rounded-lg p-6 transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className={`rounded-full ${error ? "bg-red-100 dark:bg-red-900/20" : "bg-muted"} p-6`}>
                    <Upload className={`h-8 w-8 ${error ? "text-red-500" : "text-muted-foreground"}`} />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-lg">Upload your resume</h3>
                    <p className="text-sm text-muted-foreground">Drag and drop your resume file or click to browse</p>
                  </div>
                  <input
                    type="file"
                    id="resume-upload"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.tex"
                    onChange={handleFileChange}
                  />
                  <Button size="sm" className="mt-4 cursor-pointer" onClick={handleSelectResumeClick}>
                    <FileUp className="mr-2 h-4 w-4" /> Select Resume
                  </Button>
                  {selectedFile && (
                    <div className="text-sm text-muted-foreground mt-2">Selected file: {selectedFile.name}</div>
                  )}
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h4>
                          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 p-0 h-auto"
                            onClick={() => setError(null)}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedFile && !error && (
                    <Button
                      onClick={handleUpload}
                      size="sm"
                      className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Analyze Resume
                    </Button>
                  )}
                </div>
              )}

              {isUploading && (
                <div className="py-10 space-y-4 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-medium text-lg">Uploading resume...</h3>
                  </div>
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="py-10 space-y-4 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-medium text-lg">Analyzing your resume...</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI is checking content, format, and ATS compatibility
                    </p>
                  </div>
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  </div>
                </div>
              )}

              {showResults && (
                <div className="py-6 space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-lg mt-2">Analysis Complete</h3>
                  </div>

                  <Tabs
                    defaultValue="overview"
                    value={activeResultTab}
                    onValueChange={setActiveResultTab}
                    className="mt-6"
                  >
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="strengths">Strengths</TabsTrigger>
                      <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                      <TabsTrigger value="career">Career</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="action">Action Plan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Overall Score</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center pt-2">
                              <CircularScore score={scores.overall} size={150} label="Overall" />
                            </CardContent>
                          </Card>

                          <Card className="md:col-span-2">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Category Scores</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <CircularScore score={scores.content} size={90} label="Content" />
                                <CircularScore score={scores.format} size={90} label="Format" />
                                <CircularScore score={scores.ats} size={90} label="ATS" />
                                <CircularScore score={scores.relevance} size={90} label="Relevance" />
                                <CircularScore score={scores.impact} size={90} label="Impact" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Content Breakdown</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Summary</span>
                                  <span className="text-sm font-medium">{contentBreakdown.summary}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.summary < 4 ? "bg-red-500" : contentBreakdown.summary < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.summary * 10}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Experience</span>
                                  <span className="text-sm font-medium">{contentBreakdown.experience}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.experience < 4 ? "bg-red-500" : contentBreakdown.experience < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.experience * 10}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Skills</span>
                                  <span className="text-sm font-medium">{contentBreakdown.skills}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.skills < 4 ? "bg-red-500" : contentBreakdown.skills < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.skills * 10}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Education</span>
                                  <span className="text-sm font-medium">{contentBreakdown.education}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.education < 4 ? "bg-red-500" : contentBreakdown.education < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.education * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Key Suggestions</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <ul className="space-y-2">
                              {analysisResults?.score?.suggestions &&
                                Array.isArray(analysisResults.score.suggestions) &&
                                analysisResults.score.suggestions.slice(0, 3).map((suggestion, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <span>{suggestion}</span>
                                  </li>
                                ))}
                            </ul>
                            {analysisResults?.score?.suggestions &&
                              Array.isArray(analysisResults.score.suggestions) &&
                              analysisResults.score.suggestions.length > 3 && (
                                <Button
                                  variant="link"
                                  className="mt-2 p-0 h-auto"
                                  onClick={() => setActiveResultTab("action")}
                                >
                                  View all suggestions
                                </Button>
                              )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="strengths" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            Resume Strengths
                          </CardTitle>
                          <CardDescription>
                            These are the positive aspects of your resume that stand out
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.strengths &&
                          Array.isArray(analysisResults.analysis.strengths) &&
                          analysisResults.analysis.strengths.length > 0 ? (
                            <ul className="space-y-4">
                              {analysisResults.analysis.strengths.map((strength, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                                >
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                  <div>
                                    <p>{strength}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No strengths identified.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="weaknesses" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                            Areas for Improvement
                          </CardTitle>
                          <CardDescription>These are the aspects of your resume that could be improved</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.weaknesses &&
                          Array.isArray(analysisResults.analysis.weaknesses) &&
                          analysisResults.analysis.weaknesses.length > 0 ? (
                            <ul className="space-y-4">
                              {analysisResults.analysis.weaknesses.map((weakness, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                                >
                                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                                  <div>
                                    <p>{weakness}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No weaknesses identified.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="career" className="mt-6">
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Target className="h-5 w-5 text-primary mr-2" />
                              Career Trajectory
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {analysisResults?.analysis?.career_trajectory ? (
                              <p className="text-sm">{analysisResults.analysis.career_trajectory}</p>
                            ) : (
                              <p className="text-muted-foreground">No career trajectory information available.</p>
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Briefcase className="h-5 w-5 text-primary mr-2" />
                              Industry Fit
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {analysisResults?.analysis?.industry_fit &&
                            Array.isArray(analysisResults.analysis.industry_fit) &&
                            analysisResults.analysis.industry_fit.length > 0 ? (
                              <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                  {analysisResults.analysis.industry_fit.map((industry, index) => {
                                    // Extract just the industry name from the text
                                    const industryName =
                                      typeof industry === "string" ? industry.split(":")[0].trim() : ""
                                    return (
                                      <Badge key={index} variant="secondary" className="text-sm py-1">
                                        {industryName}
                                      </Badge>
                                    )
                                  })}
                                </div>
                                <div className="space-y-3">
                                  {analysisResults.analysis.industry_fit.map((industry, index) => (
                                    <div key={index} className="text-sm">
                                      <p>{typeof industry === "string" ? industry : ""}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">No industry fit information available.</p>
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Zap className="h-5 w-5 text-primary mr-2" />
                              ATS Compatibility
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {analysisResults?.analysis?.ats_compatibility ? (
                              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <CircularScore score={scores.ats} size={80} />
                                  <div>
                                    <h4 className="font-medium">ATS Score: {scores.ats}/100</h4>
                                    <p className="text-sm text-muted-foreground">
                                      How well your resume performs with Applicant Tracking Systems
                                    </p>
                                  </div>
                                </div>
                                <Separator />
                                <div>
                                  <p className="text-sm">{analysisResults.analysis.ats_compatibility}</p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">No ATS compatibility information available.</p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Award className="h-5 w-5 text-primary mr-2" />
                            Skills Assessment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.skills_assessment ? (
                            <div className="space-y-6">
                              <div>
                                <h3 className="font-medium mb-2">Technical Skills</h3>
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-sm">
                                    {analysisResults.analysis.skills_assessment.technical_skills}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium mb-2">Soft Skills</h3>
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-sm">{analysisResults.analysis.skills_assessment.soft_skills}</p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium mb-2">Skills Gaps</h3>
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-sm">{analysisResults.analysis.skills_assessment.skills_gaps}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No skills assessment information available.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="action" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-primary mr-2" />
                            Action Plan
                          </CardTitle>
                          <CardDescription>Follow these steps to improve your resume</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.action_plan &&
                          Array.isArray(analysisResults.analysis.action_plan) &&
                          analysisResults.analysis.action_plan.length > 0 ? (
                            <div className="space-y-4">
                              {analysisResults.analysis.action_plan.map((action, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <p className="text-sm">{action}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : analysisResults?.score?.suggestions &&
                            Array.isArray(analysisResults.score.suggestions) &&
                            analysisResults.score.suggestions.length > 0 ? (
                            <div className="space-y-4">
                              {analysisResults.score.suggestions.map((suggestion, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <p className="text-sm">{suggestion}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No action plan available.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {showResults ? (
                <>
                  <Button variant="outline" size="sm" onClick={resetAnalysis}>
                    Analyze Another Resume
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    onClick={handleBuildResume}
                  >
                    Build Improved Resume
                  </Button>
                </>
              ) : (
                <div className="w-full text-center text-sm text-muted-foreground">
                  Supported formats: PDF, DOCX, TXT, LaTeX (Max 5MB)
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="paste" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Paste Your Resume</CardTitle>
              <CardDescription>Paste the text content of your resume for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {!isAnalyzing && !showResults ? (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste your resume text here..."
                    className={`min-h-[300px] ${error ? "border-red-300 focus-visible:ring-red-300" : ""}`}
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                  />
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h4>
                          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 p-0 h-auto"
                            onClick={() => setError(null)}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={handleTextAnalysis}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    disabled={!cvText.trim()}
                  >
                    Analyze Resume
                  </Button>
                </div>
              ) : isAnalyzing ? (
                <div className="py-10 space-y-4 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-medium text-lg">Analyzing your resume...</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI is checking content, format, and ATS compatibility
                    </p>
                  </div>
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  </div>
                </div>
              ) : (
                <div className="py-6 space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-lg mt-2">Analysis Complete</h3>
                  </div>

                  <Tabs
                    defaultValue="overview"
                    value={activeResultTab}
                    onValueChange={setActiveResultTab}
                    className="mt-6"
                  >
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="strengths">Strengths</TabsTrigger>
                      <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                      <TabsTrigger value="career">Career</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="action">Action Plan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Overall Score</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center pt-2">
                              <CircularScore score={scores.overall} size={150} label="Overall" />
                            </CardContent>
                          </Card>

                          <Card className="md:col-span-2">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Category Scores</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <CircularScore score={scores.content} size={90} label="Content" />
                                <CircularScore score={scores.format} size={90} label="Format" />
                                <CircularScore score={scores.ats} size={90} label="ATS" />
                                <CircularScore score={scores.relevance} size={90} label="Relevance" />
                                <CircularScore score={scores.impact} size={90} label="Impact" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Content Breakdown</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Summary</span>
                                  <span className="text-sm font-medium">{contentBreakdown.summary}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.summary < 4 ? "bg-red-500" : contentBreakdown.summary < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.summary * 10}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Experience</span>
                                  <span className="text-sm font-medium">{contentBreakdown.experience}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.experience < 4 ? "bg-red-500" : contentBreakdown.experience < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.experience * 10}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Skills</span>
                                  <span className="text-sm font-medium">{contentBreakdown.skills}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.skills < 4 ? "bg-red-500" : contentBreakdown.skills < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.skills * 10}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Education</span>
                                  <span className="text-sm font-medium">{contentBreakdown.education}/10</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${contentBreakdown.education < 4 ? "bg-red-500" : contentBreakdown.education < 7 ? "bg-yellow-500" : "bg-green-500"}`}
                                    style={{ width: `${contentBreakdown.education * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Key Suggestions</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <ul className="space-y-2">
                              {analysisResults?.score?.suggestions &&
                                Array.isArray(analysisResults.score.suggestions) &&
                                analysisResults.score.suggestions.slice(0, 3).map((suggestion, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <span>{suggestion}</span>
                                  </li>
                                ))}
                            </ul>
                            {analysisResults?.score?.suggestions &&
                              Array.isArray(analysisResults.score.suggestions) &&
                              analysisResults.score.suggestions.length > 3 && (
                                <Button
                                  variant="link"
                                  className="mt-2 p-0 h-auto"
                                  onClick={() => setActiveResultTab("action")}
                                >
                                  View all suggestions
                                </Button>
                              )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="strengths" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            Resume Strengths
                          </CardTitle>
                          <CardDescription>
                            These are the positive aspects of your resume that stand out
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.strengths &&
                          Array.isArray(analysisResults.analysis.strengths) &&
                          analysisResults.analysis.strengths.length > 0 ? (
                            <ul className="space-y-4">
                              {analysisResults.analysis.strengths.map((strength, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                                >
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                  <div>
                                    <p>{strength}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No strengths identified.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="weaknesses" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                            Areas for Improvement
                          </CardTitle>
                          <CardDescription>These are the aspects of your resume that could be improved</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.weaknesses &&
                          Array.isArray(analysisResults.analysis.weaknesses) &&
                          analysisResults.analysis.weaknesses.length > 0 ? (
                            <ul className="space-y-4">
                              {analysisResults.analysis.weaknesses.map((weakness, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                                >
                                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                                  <div>
                                    <p>{weakness}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">No weaknesses identified.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="career" className="mt-6">
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Target className="h-5 w-5 text-primary mr-2" />
                              Career Trajectory
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {analysisResults?.analysis?.career_trajectory ? (
                              <p className="text-sm">{analysisResults.analysis.career_trajectory}</p>
                            ) : (
                              <p className="text-muted-foreground">No career trajectory information available.</p>
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Briefcase className="h-5 w-5 text-primary mr-2" />
                              Industry Fit
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {analysisResults?.analysis?.industry_fit &&
                            Array.isArray(analysisResults.analysis.industry_fit) &&
                            analysisResults.analysis.industry_fit.length > 0 ? (
                              <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                  {analysisResults.analysis.industry_fit.map((industry, index) => {
                                    // Extract just the industry name from the text
                                    const industryName =
                                      typeof industry === "string" ? industry.split(":")[0].trim() : ""
                                    return (
                                      <Badge key={index} variant="secondary" className="text-sm py-1">
                                        {industryName}
                                      </Badge>
                                    )
                                  })}
                                </div>
                                <div className="space-y-3">
                                  {analysisResults.analysis.industry_fit.map((industry, index) => (
                                    <div key={index} className="text-sm">
                                      <p>{typeof industry === "string" ? industry : ""}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">No industry fit information available.</p>
                            )}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Zap className="h-5 w-5 text-primary mr-2" />
                              ATS Compatibility
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {analysisResults?.analysis?.ats_compatibility ? (
                              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <CircularScore score={scores.ats} size={80} />
                                  <div>
                                    <h4 className="font-medium">ATS Score: {scores.ats}/100</h4>
                                    <p className="text-sm text-muted-foreground">
                                      How well your resume performs with Applicant Tracking Systems
                                    </p>
                                  </div>
                                </div>
                                <Separator />
                                <div>
                                  <p className="text-sm">{analysisResults.analysis.ats_compatibility}</p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">No ATS compatibility information available.</p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Award className="h-5 w-5 text-primary mr-2" />
                            Skills Assessment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.skills_assessment ? (
                            <div className="space-y-6">
                              <div>
                                <h3 className="font-medium mb-2">Technical Skills</h3>
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-sm">
                                    {analysisResults.analysis.skills_assessment.technical_skills}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium mb-2">Soft Skills</h3>
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-sm">{analysisResults.analysis.skills_assessment.soft_skills}</p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium mb-2">Skills Gaps</h3>
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-sm">{analysisResults.analysis.skills_assessment.skills_gaps}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No skills assessment information available.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="action" className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-primary mr-2" />
                            Action Plan
                          </CardTitle>
                          <CardDescription>Follow these steps to improve your resume</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {analysisResults?.analysis?.action_plan &&
                          Array.isArray(analysisResults.analysis.action_plan) &&
                          analysisResults.analysis.action_plan.length > 0 ? (
                            <div className="space-y-4">
                              {analysisResults.analysis.action_plan.map((action, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <p className="text-sm">{action}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : analysisResults?.score?.suggestions &&
                            Array.isArray(analysisResults.score.suggestions) &&
                            analysisResults.score.suggestions.length > 0 ? (
                            <div className="space-y-4">
                              {analysisResults.score.suggestions.map((suggestion, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-medium">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <p className="text-sm">{suggestion}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No action plan available.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {showResults ? (
                <>
                  <Button variant="outline" size="sm" onClick={resetAnalysis}>
                    Analyze Another Resume
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    onClick={handleBuildResume}
                  >
                    Build Improved Resume
                  </Button>
                </>
              ) : (
                <div className="w-full text-center text-sm text-muted-foreground">
                  Paste the full text of your resume for the most accurate analysis
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

