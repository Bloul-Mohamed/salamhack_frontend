"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Upload, FileUp, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { analyzeCVFile } from "@/lib/api-service"

export function ResumeScoreChecker() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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

  const resetDemo = () => {
    setIsUploading(false)
    setIsAnalyzing(false)
    setShowResults(false)
    setAnalysisResults(null)
    setSelectedFile(null)
    setError(null)
  }

  // Mock scores for demonstration
  const scores = {
    overall: analysisResults?.score?.overall || 72,
    ats: analysisResults?.score?.categories?.ats_compatibility || 65,
    content: analysisResults?.score?.categories?.content_quality || 78,
    format: analysisResults?.score?.categories?.format_design || 80,
  }

  const improvements = analysisResults?.score?.suggestions || [
    "Add more quantifiable achievements to your work experience",
    "Include more industry-specific keywords for better ATS performance",
    "Strengthen your skills section with relevant technical abilities",
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Check Your Resume Score</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Upload your current resume for an instant analysis and see how it can be improved
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-12">
          <Card className="border border-dashed shadow-sm">
            <CardHeader>
              <CardTitle>Resume Analysis</CardTitle>
              <CardDescription>Get instant feedback on your resume's effectiveness</CardDescription>
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

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium">Key Improvement Areas:</h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      {
                        // @ts-ignore
                        improvements.map((improvement, index) => (
                          <li key={index}>• {improvement}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {showResults ? (
                <>
                  <Button variant="outline" size="sm" onClick={resetDemo}>
                    Try Another Resume
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
        </div>
      </div>
    </section>
  )
}

