"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileUp, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { cvService } from "@/services/api"
import { toast } from "@/hooks/use-toast"

// Define types for analysis results
interface AnalysisScore {
  overall: number;
  categories: {
    ats_compatibility: number;
    content_quality: number;
    format_design: number;
  };
}

interface AnalysisResults {
  score: AnalysisScore;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit. Please select a smaller file.")
        return
      }
      
      // Check file type
      const validTypes = ['.pdf', '.doc', '.docx', '.txt', '.tex']
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
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
      dropZoneRef.current.classList.add('border-blue-400')
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-blue-400')
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-blue-400')
    }
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit. Please select a smaller file.")
        return
      }
      
      // Check file type
      const validTypes = ['.pdf', '.doc', '.docx', '.txt', '.tex']
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      if (!validTypes.includes(fileExtension)) {
        setError("Invalid file type. Please upload PDF, DOC, DOCX, TXT, or TEX files.")
        return
      }
      
      setSelectedFile(file)
      setError(null)
    }
  }

  // Function to trigger file input click
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

      // Show upload progress animation for a moment
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsUploading(false)
      setIsAnalyzing(true)

      // Call the API to analyze the CV file
      const response = await cvService.analyzeCVFile(selectedFile)
      
      if (response.data) {
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
      const errorMessage = err.response?.data?.message || err.message || "Failed to analyze the resume. Please try again."
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
      const errorMessage = err.response?.data?.message || err.message || "Failed to analyze the resume. Please try again."
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

  // Handle scores with fallbacks for missing data
  const scores = {
    overall: analysisResults?.score?.overall || 0,
    ats: analysisResults?.score?.categories?.ats_compatibility || 0,
    content: analysisResults?.score?.categories?.content_quality || 0,
    format: analysisResults?.score?.categories?.format_design || 0,
  }

  // Handle feedback arrays with fallbacks
  const strengths = analysisResults?.strengths || []
  const weaknesses = analysisResults?.weaknesses || []
  const suggestions = analysisResults?.suggestions || []

  // Function to handle "Build Improved Resume" button click
  const handleBuildResume = () => {
    // Store analysis results in localStorage to use in the builder
    if (analysisResults) {
      localStorage.setItem("resumeAnalysis", JSON.stringify(analysisResults))
    }
  }

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
                  className={`flex flex-col items-center justify-center py-10 space-y-4 border-2 border-dashed ${error ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : 'border-gray-300'} rounded-lg p-6 transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className={`rounded-full ${error ? 'bg-red-100 dark:bg-red-900/20' : 'bg-muted'} p-6`}>
                    <Upload className={`h-8 w-8 ${error ? 'text-red-500' : 'text-muted-foreground'}`} />
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
                  <Button 
                    size="sm" 
                    className="mt-4 cursor-pointer"
                    onClick={handleSelectResumeClick}
                  >
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
                        {suggestions.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-sm">
                            {suggestions.map((suggestion: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-muted-foreground">No suggestions available.</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="strengths" className="mt-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Resume Strengths:</h4>
                        {strengths.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-sm">
                            {strengths.map((strength: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-muted-foreground">No strengths identified.</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="weaknesses" className="mt-4">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Areas for Improvement:</h4>
                        {weaknesses.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-sm">
                            {weaknesses.map((weakness: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-muted-foreground">No weaknesses identified.</p>
                        )}
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
                  <Button size="sm" className="blue-gradient" onClick={handleBuildResume}>
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
                    className={`min-h-[300px] ${error ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
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
                        {suggestions.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-sm">
                            {suggestions.map((suggestion: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-muted-foreground">No suggestions available.</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="strengths" className="mt-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Resume Strengths:</h4>
                        {strengths.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-sm">
                            {strengths.map((strength: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-muted-foreground">No strengths identified.</p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="weaknesses" className="mt-4">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-medium">Areas for Improvement:</h4>
                        {weaknesses.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-sm">
                            {weaknesses.map((weakness: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-muted-foreground">No weaknesses identified.</p>
                        )}
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
                  <Button size="sm" className="blue-gradient" onClick={handleBuildResume}>
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

