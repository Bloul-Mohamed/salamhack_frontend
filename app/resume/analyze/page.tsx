"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileUp, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { analyzeCVFile, analyzeCV } from "@/lib/api-service"
import Link from "next/link"

export default function AnalyzePage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [cvText, setCvText] = useState("")
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload")
      return
    }

    try {
      setError(null)
      setIsUploading(true)

      // Wait a moment to show the upload progress
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsUploading(false)
      setIsAnalyzing(true)

      // Call the API to analyze the CV
      const results = await analyzeCVFile(selectedFile)

      setAnalysisResults(results)
      setIsAnalyzing(false)
      setShowResults(true)
    } catch (err) {
      setError("Failed to analyze the resume. Please try again.")
      setIsUploading(false)
      setIsAnalyzing(false)
    }
  }

  const handleTextAnalysis = async () => {
    if (!cvText.trim()) {
      setError("Please enter your resume text")
      return
    }

    try {
      setError(null)
      setIsAnalyzing(true)

      // Call the API to analyze the CV text
      const results = await analyzeCV(cvText)

      setAnalysisResults(results)
      setIsAnalyzing(false)
      setShowResults(true)
    } catch (err) {
      setError("Failed to analyze the resume. Please try again.")
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
  }

  // Mock scores for demonstration or use actual data from API
  const scores = {
    overall: analysisResults?.score?.overall || 72,
    ats: analysisResults?.score?.categories?.ats_compatibility || 65,
    content: analysisResults?.score?.categories?.content_quality || 78,
    format: analysisResults?.score?.categories?.format_design || 80,
  }

  const strengths = analysisResults?.strengths || [
    "Clear professional summary",
    "Well-structured format",
    "Relevant experience highlighted",
  ]

  const weaknesses = analysisResults?.weaknesses || [
    "Lack of quantifiable achievements",
    "Missing industry keywords",
    "Skills section needs improvement",
  ]

  const suggestions = analysisResults?.suggestions || [
    "Add more quantifiable achievements to your work experience",
    "Include more industry-specific keywords for better ATS performance",
    "Strengthen your skills section with relevant technical abilities",
  ]

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
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="rounded-full bg-muted p-6">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-lg">Upload your resume</h3>
                    <p className="text-sm text-muted-foreground">Drag and drop your resume file or click to browse</p>
                  </div>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.tex"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="resume-upload">
                    <Button size="sm" className="mt-4 cursor-pointer">
                      <FileUp className="mr-2 h-4 w-4" /> Select Resume
                    </Button>
                  </label>
                  {selectedFile && (
                    <div className="text-sm text-muted-foreground mt-2">Selected file: {selectedFile.name}</div>
                  )}
                  {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
                  {selectedFile && (
                    <Button onClick={handleUpload} size="sm" className="mt-4 blue-gradient">
                      Analyze Resume
                    </Button>
                  )}
                </div>
              )}

              {isUploading && (
                <div className="py-10 space-y-4">
                  <div className="text-center">
                    <h3 className="font-medium text-lg">Uploading resume...</h3>
                  </div>
                  <Progress value={65} className="w-full" />
                </div>
              )}

              {isAnalyzing && (
                <div className="py-10 space-y-4">
                  <div className="text-center">
                    <h3 className="font-medium text-lg">Analyzing your resume...</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI is checking content, format, and ATS compatibility
                    </p>
                  </div>
                  <Progress value={85} className="w-full" />
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

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-sm font-medium">{scores.overall}/100</span>
                      </div>
                      <Progress value={scores.overall} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">ATS Compatibility</span>
                        <span className="text-sm font-medium">{scores.ats}/100</span>
                      </div>
                      <Progress value={scores.ats} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Content Quality</span>
                        <span className="text-sm font-medium">{scores.content}/100</span>
                      </div>
                      <Progress value={scores.content} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Format & Design</span>
                        <span className="text-sm font-medium">{scores.format}/100</span>
                      </div>
                      <Progress value={scores.format} className="w-full" />
                    </div>
                  </div>

                  <Tabs defaultValue="suggestions" className="mt-6">
                    <TabsList>
                      <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                      <TabsTrigger value="strengths">Strengths</TabsTrigger>
                      <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="suggestions" className="mt-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium">Improvement Suggestions:</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {
                            // @ts-ignore
                            suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="strengths" className="mt-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Resume Strengths:</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {
                            // @ts-ignore
                            strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="weaknesses" className="mt-4">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Areas for Improvement:</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {
                            // @ts-ignore

                            weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                                <span>{weakness}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
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
                  <Button size="sm" className="blue-gradient">
                    <Link href="/resume/builder">Build Improved Resume</Link>
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
                    className="min-h-[300px]"
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                  />
                  {error && <div className="text-sm text-red-500">{error}</div>}
                  <Button onClick={handleTextAnalysis} size="sm" className="blue-gradient" disabled={!cvText.trim()}>
                    Analyze Resume
                  </Button>
                </div>
              ) : isAnalyzing ? (
                <div className="py-10 space-y-4">
                  <div className="text-center">
                    <h3 className="font-medium text-lg">Analyzing your resume...</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI is checking content, format, and ATS compatibility
                    </p>
                  </div>
                  <Progress value={85} className="w-full" />
                </div>
              ) : (
                <div className="py-6 space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-lg mt-2">Analysis Complete</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className="text-sm font-medium">{scores.overall}/100</span>
                      </div>
                      <Progress value={scores.overall} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">ATS Compatibility</span>
                        <span className="text-sm font-medium">{scores.ats}/100</span>
                      </div>
                      <Progress value={scores.ats} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Content Quality</span>
                        <span className="text-sm font-medium">{scores.content}/100</span>
                      </div>
                      <Progress value={scores.content} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Format & Design</span>
                        <span className="text-sm font-medium">{scores.format}/100</span>
                      </div>
                      <Progress value={scores.format} className="w-full" />
                    </div>
                  </div>

                  <Tabs defaultValue="suggestions" className="mt-6">
                    <TabsList>
                      <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                      <TabsTrigger value="strengths">Strengths</TabsTrigger>
                      <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="suggestions" className="mt-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium">Improvement Suggestions:</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {
                            // @ts-ignore

                            suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="strengths" className="mt-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Resume Strengths:</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {

                            // @ts-ignore
                            strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="weaknesses" className="mt-4">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Areas for Improvement:</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {
                            // @ts-ignore
                            weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                                <span>{weakness}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
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
                  <Button size="sm" className="blue-gradient">
                    <Link href="/resume/builder">Build Improved Resume</Link>
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

