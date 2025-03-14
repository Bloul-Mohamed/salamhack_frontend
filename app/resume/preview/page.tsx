"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Copy, Share2 } from "lucide-react"
import { convertLatexToPdf, convertLatexToWord } from "@/lib/api-service"
import { toast } from "@/hooks/use-toast"

export default function PreviewPage() {
  const [latexCode, setLatexCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // In a real app, you would get this from a state management solution or URL params
  useEffect(() => {
    // Mock data for demonstration
    const storedLatexCode = localStorage.getItem("latexCode")
    if (storedLatexCode) {
      setLatexCode(storedLatexCode)
    }
  }, [])

  const handleDownloadPDF = async () => {
    if (!latexCode) {
      toast({
        title: "Error",
        description: "No resume content available to download",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      // @ts-ignore
      const response = await convertLatexToPdf({ latex_content: latexCode })

      // Create a blob from the response and trigger download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "resume.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: "Resume downloaded as PDF",
      })
    } catch (error) {
      console.error("Error downloading PDF:", error)
      toast({
        title: "Error",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadWord = async () => {
    if (!latexCode) {
      toast({
        title: "Error",
        description: "No resume content available to download",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      // @ts-ignore
      const response = await convertLatexToWord({ latex_content: latexCode })

      // Create a blob from the response and trigger download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "resume.docx"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: "Resume downloaded as Word document",
      })
    } catch (error) {
      console.error("Error downloading Word document:", error)
      toast({
        title: "Error",
        description: "Failed to download Word document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!latexCode) {
      toast({
        title: "Error",
        description: "No resume content available to copy",
        variant: "destructive",
      })
      return
    }

    navigator.clipboard.writeText(latexCode)
    toast({
      title: "Copied",
      description: "LaTeX code copied to clipboard",
    })
  }

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Preview</h1>
          <p className="text-muted-foreground">Preview and download your generated resume</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" /> Copy LaTeX
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadWord} disabled={isLoading}>
            <FileText className="mr-2 h-4 w-4" /> Download Word
          </Button>
          <Button size="sm" className="blue-gradient" onClick={handleDownloadPDF} disabled={isLoading}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handleDownloadPDF} disabled={isLoading}>
                <Download className="mr-2 h-4 w-4" /> Download as PDF
              </Button>
              <Button variant="outline" className="w-full" onClick={handleDownloadWord} disabled={isLoading}>
                <FileText className="mr-2 h-4 w-4" /> Download as Word
              </Button>
              <Button variant="outline" className="w-full" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" /> Copy LaTeX Code
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" /> Share Resume
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Optimize for ATS</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure your resume passes through Applicant Tracking Systems.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Run ATS Check
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Create Cover Letter</h3>
                <p className="text-sm text-muted-foreground">
                  Generate a matching cover letter for your job applications.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Create Cover Letter
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Get Expert Review</h3>
                <p className="text-sm text-muted-foreground">
                  Have a professional review your resume and provide feedback.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Request Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {latexCode ? (
                <div className="bg-muted rounded-md p-4 h-[800px] overflow-auto">
                  <pre className="text-sm whitespace-pre-wrap">{latexCode}</pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[800px] bg-muted rounded-md">
                  <p className="text-muted-foreground">No resume content available to preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

