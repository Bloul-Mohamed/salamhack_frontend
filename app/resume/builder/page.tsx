"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Settings,
  Upload,
  FileUp,
  Loader2,
  Trash2,
  FileCheck,
  ArrowUp,
  Menu,
  X,
  CheckCircle,
  PanelLeft,
  PanelRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cvService } from "@/services/api"
import { toast } from "@/hooks/use-toast"
import { useResumeStore } from "@/store/resume-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResumeBuilderPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [latexCode, setLatexCode] = useState("")
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Form state
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  })

  const [experiences, setExperiences] = useState([
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ])

  const [education, setEducation] = useState([
    {
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ])

  const [skills, setSkills] = useState({
    technical: [""],
    soft: [""],
    languages: [""],
    tools: [""],
  })

  // Add these new state variables after the other useState declarations
  const [selectedColor, setSelectedColor] = useState("bg-blue-500")
  const [sectionOrder, setSectionOrder] = useState([
    "Professional Summary",
    "Work Experience",
    "Education",
    "Skills",
    "Languages",
  ])

  // Use the resume store
  const resumeData = useResumeStore((state) => state.resumeData)
  const mapExtractedDataToFormData = useResumeStore((state) => state.mapExtractedDataToFormData)
  const setResumeData = useResumeStore((state) => state.setResumeData)
  const clearResumeData = useResumeStore((state) => state.clearResumeData)

  // Add a new state variable for full screen PDF view
  const [fullScreenPdf, setFullScreenPdf] = useState(false)

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle scroll events to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load data from store on component mount
  useEffect(() => {
    if (resumeData) {
      const formData = mapExtractedDataToFormData()

      // Set form state from the mapped data
      setPersonalInfo(formData.personalInfo)
      setExperiences(formData.experiences)
      setEducation(formData.education)
      setSkills(formData.skills)

      // Show success toast
      toast({
        title: "Resume Data Loaded",
        description: "Your resume data has been loaded into the builder",
      })
    }

    // Check if there's a stored PDF URL in localStorage
    const storedPdfUrl = localStorage.getItem("resumePdfUrl")
    if (storedPdfUrl) {
      setPdfUrl(storedPdfUrl)
    }

    // Check if there's stored LaTeX code in localStorage
    const storedLatexCode = localStorage.getItem("latexCode")
    if (storedLatexCode) {
      setLatexCode(storedLatexCode)
    }
  }, [resumeData, mapExtractedDataToFormData])

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <FileText className="h-4 w-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "skills", label: "Skills", icon: <Award className="h-4 w-4" /> },
    { id: "languages", label: "Languages", icon: <Languages className="h-4 w-4" /> },
    // { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  const nextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }

  const prevTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperiences = [...experiences]
    newExperiences[index] = { ...newExperiences[index], [field]: value }
    setExperiences(newExperiences)
  }

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index))
    }
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setEducation(newEducation)
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index))
    }
  }

  const handleSkillChange = (category: keyof typeof skills, index: number, value: string) => {
    const newSkills = { ...skills }
    newSkills[category][index] = value
    setSkills(newSkills)
  }

  const addSkill = (category: keyof typeof skills) => {
    const newSkills = { ...skills }
    newSkills[category] = [...newSkills[category], ""]
    setSkills(newSkills)
  }

  const removeSkill = (category: keyof typeof skills, index: number) => {
    if (skills[category].length > 1) {
      const newSkills = { ...skills }
      newSkills[category] = newSkills[category].filter((_, i) => i !== index)
      setSkills(newSkills)
    }
  }

  // Add this function to handle moving sections up and down
  const moveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...sectionOrder]
    if (direction === "up" && index > 0) {
      // Swap with the item above
      ;[newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
    } else if (direction === "down" && index < newOrder.length - 1) {
      // Swap with the item below
      ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    }
    setSectionOrder(newOrder)
  }

  // Handle file upload functionality
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File size exceeds 5MB limit. Please select a smaller file.",
          variant: "destructive",
        })
        return
      }

      // Check file type
      const validTypes = [".pdf", ".doc", ".docx", ".txt", ".tex"]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
      if (!validTypes.includes(fileExtension)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload PDF, DOC, DOCX, TXT, or TEX files.",
          variant: "destructive",
        })
        return
      }

      try {
        setIsUploading(true)

        // Extract data from the file
        const response = await cvService.extractCvDataFromFile(file)

        if (response.data) {
          // Store the extracted data in the Zustand store
          setResumeData(response.data)

          // Map the data to form fields
          const formData = useResumeStore.getState().mapExtractedDataToFormData()

          // Update form state
          setPersonalInfo(formData.personalInfo)
          setExperiences(formData.experiences)
          setEducation(formData.education)
          setSkills(formData.skills)

          toast({
            title: "Resume Imported",
            description: "Your resume data has been successfully imported",
          })
        }
      } catch (error) {
        console.error("Error extracting resume data:", error)
        toast({
          title: "Import Failed",
          description: "Failed to extract data from your resume. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const generateResume = async () => {
    try {
      setIsGenerating(true)

      // Format the data for the API
      const cvData = {
        personal_info: {
          name: personalInfo.name,
          email: personalInfo.email,
          phone: personalInfo.phone,
          location: personalInfo.location,
          title: personalInfo.title,
        },
        summary: personalInfo.summary,
        experience: experiences.map((exp) => ({
          title: exp.title,
          company: exp.company,
          location: exp.location,
          dates: exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : null,
          achievements: exp.description,
        })),
        education: education.map((edu) => ({
          degree: edu.degree,
          institution: edu.school,
          location: edu.location,
          dates: edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : null,
          details: edu.description,
        })),
        skills: {
          technical: skills.technical.filter((skill) => skill.trim() !== ""),
          soft: skills.soft.filter((skill) => skill.trim() !== ""),
          languages: skills.languages.filter((skill) => skill.trim() !== ""),
          tools: skills.tools.filter((skill) => skill.trim() !== ""),
        },
        sections: sectionOrder,
      }

      // Call the API to generate LaTeX
      const response = await cvService.generateLatexCV(cvData)

      // Handle the response correctly based on the API structure
      let latexContent = ""
      if (response.data.latex_content) {
        latexContent = response.data.latex_content
      } else if (response.data.latex_code) {
        latexContent = response.data.latex_code
      }

      // Clean up the LaTeX content if needed
      if (latexContent.includes("```latex")) {
        latexContent = latexContent.replace("```latex\n", "").replace("```", "")
      }

      // Store in localStorage
      localStorage.setItem("latexCode", latexContent)
      setLatexCode(latexContent)

      toast({
        title: "Resume Generated",
        description: "Your resume has been successfully generated",
      })

      // Toggle preview mode to show the result
      setPreviewMode(true)

      // Automatically export to PDF
      exportAsPDF(latexContent)
    } catch (error) {
      console.error("Error generating resume:", error)
      toast({
        title: "Error",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const exportAsPDF = async (latexCodeParam?: string) => {
    const codeToUse = latexCodeParam || latexCode

    if (!codeToUse) {
      toast({
        title: "Error",
        description: "Please generate your resume first.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsExporting(true)

      // Call the API to convert LaTeX to PDF
      const response = await cvService.latexToPdf(codeToUse)

      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      // Store the URL in state and localStorage
      setPdfUrl(url)
      localStorage.setItem("resumePdfUrl", url)

      toast({
        title: "Success",
        description: "PDF generated successfully. You can now download it.",
      })

      // Set fullScreenPdf to true to show the full screen PDF view
      setFullScreenPdf(true)
    } catch (error) {
      console.error("Error exporting as PDF:", error)
      toast({
        title: "Error",
        description: "Failed to export as PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const downloadPDF = () => {
    if (!pdfUrl) {
      toast({
        title: "Error",
        description: "No PDF available to download. Please generate one first.",
        variant: "destructive",
      })
      return
    }

    // Create a link and trigger the download
    const a = document.createElement("a")
    a.href = pdfUrl
    a.download = "resume.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const clearAllData = () => {
    // Clear Zustand store
    clearResumeData()

    // Clear local state
    setPersonalInfo({
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    })

    setExperiences([
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])

    setEducation([
      {
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])

    setSkills({
      technical: [""],
      soft: [""],
      languages: [""],
      tools: [""],
    })

    // Clear PDF and LaTeX data
    setPdfUrl(null)
    setLatexCode("")
    localStorage.removeItem("resumePdfUrl")
    localStorage.removeItem("latexCode")

    toast({
      title: "Data Cleared",
      description: "All resume data has been cleared",
    })
  }

  const analyzeResume = async () => {
    try {
      setIsAnalyzing(true)
      const cvText = JSON.stringify({
        personal_info: personalInfo,
        experience: experiences,
        education: education,
        skills: skills,
      })

      // @ts-ignore
      const response = await cvService.scoreCV(cvText)
      setAnalysisResults(response.data)

      toast({
        title: "Analysis Complete",
        description: `Overall Score: ${response.data.score.overall}/100`,
      })

    } catch (error) {
      console.error("Error analyzing resume:", error)
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Render the form content based on active tab
  const renderFormContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-sm text-muted-foreground">Add your personal and contact information.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Marketing Manager"
                  value={personalInfo.title}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="New York, NY"
                  value={personalInfo.location}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="Experienced marketing professional with a track record of developing successful campaigns..."
                className="min-h-[120px]"
                value={personalInfo.summary}
                onChange={handlePersonalInfoChange}
              />
              <p className="text-xs text-muted-foreground">
                A brief 3-4 sentence overview of your professional background and key strengths.
              </p>
            </div>
          </div>
        )

      case "experience":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <Button size="sm" variant="outline" onClick={addExperience}>
                Add Experience
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Add your work history, starting with your most recent position.
            </p>

            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index} className="space-y-4 rounded-lg border p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                      <Input
                        id={`jobTitle-${index}`}
                        placeholder="Marketing Manager"
                        value={experience.title}
                        onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        placeholder="Acme Inc."
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      placeholder="New York, NY"
                      value={experience.location}
                      onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        placeholder="Jan 2020"
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        placeholder="Present"
                        value={experience.endDate}
                        onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`jobDescription-${index}`}>Description</Label>
                    <Textarea
                      id={`jobDescription-${index}`}
                      placeholder="• Led digital marketing campaigns that increased conversion rates by 25%..."
                      className="min-h-[120px]"
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    {experiences.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeExperience(index)}>
                        Delete
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                    >
                      <Sparkles className="mr-2 h-3 w-3" /> Improve with AI
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "education":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Education</h2>
              <Button size="sm" variant="outline" onClick={addEducation}>
                Add Education
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Add your educational background, starting with your highest degree.
            </p>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="space-y-4 rounded-lg border p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        placeholder="Bachelor of Science in Marketing"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`school-${index}`}>School</Label>
                      <Input
                        id={`school-${index}`}
                        placeholder="University of California"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`eduLocation-${index}`}>Location</Label>
                    <Input
                      id={`eduLocation-${index}`}
                      placeholder="Berkeley, CA"
                      value={edu.location}
                      onChange={(e) => handleEducationChange(index, "location", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`eduStartDate-${index}`}>Start Date</Label>
                      <Input
                        id={`eduStartDate-${index}`}
                        placeholder="Sep 2014"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`eduEndDate-${index}`}>End Date</Label>
                      <Input
                        id={`eduEndDate-${index}`}
                        placeholder="Jun 2018"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`eduDescription-${index}`}>Description (Optional)</Label>
                    <Textarea
                      id={`eduDescription-${index}`}
                      placeholder="• GPA: 3.8/4.0
• Relevant coursework: Digital Marketing, Consumer Behavior
• Marketing Club President"
                      className="min-h-[120px]"
                      value={edu.description}
                      onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    {education.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeEducation(index)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <p className="text-sm text-muted-foreground">Add your professional skills and competencies.</p>

            <Tabs defaultValue="technical" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
              </TabsList>

              <TabsContent value="technical" className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Technical Skills</Label>
                  <Button size="sm" variant="outline" onClick={() => addSkill("technical")}>
                    Add Skill
                  </Button>
                </div>
                <div className="space-y-2">
                  {skills.technical.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleSkillChange("technical", index, e.target.value)}
                        placeholder="e.g. Digital Marketing"
                      />
                      {skills.technical.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeSkill("technical", index)}>
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="soft" className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Soft Skills</Label>
                  <Button size="sm" variant="outline" onClick={() => addSkill("soft")}>
                    Add Skill
                  </Button>
                </div>
                <div className="space-y-2">
                  {skills.soft.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleSkillChange("soft", index, e.target.value)}
                        placeholder="e.g. Leadership"
                      />
                      {skills.soft.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeSkill("soft", index)}>
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tools" className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Tools & Software</Label>
                  <Button size="sm" variant="outline" onClick={() => addSkill("tools")}>
                    Add Tool
                  </Button>
                </div>
                <div className="space-y-2">
                  {skills.tools.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleSkillChange("tools", index, e.target.value)}
                        placeholder="e.g. Adobe Creative Suite"
                      />
                      {skills.tools.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeSkill("tools", index)}>
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="languages" className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Languages</Label>
                  <Button size="sm" variant="outline" onClick={() => addSkill("languages")}>
                    Add Language
                  </Button>
                </div>
                <div className="space-y-2">
                  {skills.languages.map((language, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={language}
                        onChange={(e) => handleSkillChange("languages", index, e.target.value)}
                        placeholder="e.g. English (Native)"
                      />
                      {skills.languages.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeSkill("languages", index)}>
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Suggest Skills with AI
            </Button>
          </div>
        )

      case "languages":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Languages</h2>
              <Button size="sm" variant="outline" onClick={() => addSkill("languages")}>
                Add Language
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Add languages you speak and your proficiency level.</p>

            <div className="space-y-2">
              {skills.languages.map((language, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={language}
                    onChange={(e) => handleSkillChange("languages", index, e.target.value)}
                    placeholder="e.g. English (Native)"
                  />
                  {skills.languages.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeSkill("languages", index)}>
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      // case "settings":
      //   return (
      //     <div className="space-y-4">
      //       <h2 className="text-xl font-semibold">Resume Settings</h2>
      //       <p className="text-sm text-muted-foreground">Customize the appearance and layout of your resume.</p>

      //       <div className="space-y-4">
      //         <div className="space-y-2">
      //           <Label htmlFor="template">Template</Label>
      //           <Select defaultValue="modern">
      //             <SelectTrigger>
      //               <SelectValue placeholder="Select template" />
      //             </SelectTrigger>
      //             <SelectContent>
      //               <SelectItem value="modern">Modern</SelectItem>
      //               <SelectItem value="classic">Classic</SelectItem>
      //               <SelectItem value="creative">Creative</SelectItem>
      //               <SelectItem value="professional">Professional</SelectItem>
      //               <SelectItem value="minimal">Minimal</SelectItem>
      //             </SelectContent>
      //           </Select>
      //         </div>
      //         <div className="space-y-2">
      //           <Label htmlFor="colorScheme">Color Scheme</Label>
      //           <div className="flex gap-2">
      //             {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-gray-500"].map((color, index) => (
      //               <button
      //                 key={index}
      //                 className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : ""}`}
      //                 aria-label={`Color option ${index + 1}`}
      //                 onClick={() => setSelectedColor(color)}
      //               />
      //             ))}
      //           </div>
      //           <p className="text-xs text-muted-foreground mt-1">
      //             Selected color: {selectedColor.replace("bg-", "").replace("-500", "")}
      //           </p>
      //         </div>
      //         <div className="space-y-2">
      //           <Label htmlFor="fontSize">Font Size</Label>
      //           <Select defaultValue="medium">
      //             <SelectTrigger>
      //               <SelectValue placeholder="Select font size" />
      //             </SelectTrigger>
      //             <SelectContent>
      //               <SelectItem value="small">Small</SelectItem>
      //               <SelectItem value="medium">Medium</SelectItem>
      //               <SelectItem value="large">Large</SelectItem>
      //             </SelectContent>
      //           </Select>
      //         </div>
      //         <div className="space-y-2">
      //           <Label htmlFor="spacing">Spacing</Label>
      //           <Select defaultValue="comfortable">
      //             <SelectTrigger>
      //               <SelectValue placeholder="Select spacing" />
      //             </SelectTrigger>
      //             <SelectContent>
      //               <SelectItem value="compact">Compact</SelectItem>
      //               <SelectItem value="comfortable">Comfortable</SelectItem>
      //               <SelectItem value="spacious">Spacious</SelectItem>
      //             </SelectContent>
      //           </Select>
      //         </div>
      //         <Separator />
      //         <div className="space-y-2">
      //           <Label htmlFor="sections">Section Order</Label>
      //           <p className="text-sm text-muted-foreground">Use the arrows to reorder sections</p>
      //           <div className="space-y-2 mt-2">
      //             {sectionOrder.map((section, index) => (
      //               <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
      //                 <div className="flex items-center">
      //                   <span className="text-muted-foreground mr-2">{index + 1}</span>
      //                   <span>{section}</span>
      //                 </div>
      //                 <div className="flex items-center text-muted-foreground">
      //                   <button
      //                     className="p-1 hover:bg-background rounded"
      //                     onClick={() => moveSection(index, "up")}
      //                     disabled={index === 0}
      //                     aria-label="Move up"
      //                   >
      //                     ↑
      //                   </button>
      //                   <button
      //                     className="p-1 hover:bg-background rounded"
      //                     onClick={() => moveSection(index, "down")}
      //                     disabled={index === sectionOrder.length - 1}
      //                     aria-label="Move down"
      //                   >
      //                     ↓
      //                   </button>
      //                 </div>
      //               </div>
      //             ))}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   )

      default:
        return null
    }
  }

  // Render the resume preview
  const renderResumePreview = () => {
    return (
      <div className="border rounded-md p-6 bg-white shadow-sm  max-h-[400px] overflow-y-scroll">
        <div className="space-y-6">
          {/* Header with name and title */}
          <div className="text-center border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">{personalInfo.name || "Your Name"}</h1>
            <p className="text-lg text-gray-600 mt-1">{personalInfo.title || "Professional Title"}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-600">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
            </div>
          </div>

          {/* Summary section */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
              <p className="text-gray-700 text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience section */}
          {experiences.some((exp) => exp.title || exp.company) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Experience</h2>
              {experiences.map((exp, i) =>
                exp.title || exp.company ? (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-medium text-gray-800">{exp.title || "Position"}</h3>
                      <span className="text-sm text-gray-600">
                        {exp.startDate && exp.endDate ? `${exp.startDate}–${exp.endDate}` : ""}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </p>
                    {exp.description && (
                      <div className="mt-2 text-gray-700">
                        {typeof exp.description === "string" ? (
                          exp.description.split("\n").map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className="mr-2">○</span>
                              <p>{item}</p>
                            </div>
                          ))
                        ) : (
                          <p>{exp.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : null,
              )}
            </div>
          )}

          {/* Education section */}
          {education.some((edu) => edu.degree || edu.school) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
              {education.map((edu, i) =>
                edu.degree || edu.school ? (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-medium text-gray-800">{edu.degree || "Degree"}</h3>
                      <span className="text-sm text-gray-600">
                        {edu.startDate && edu.endDate ? `${edu.startDate}–${edu.endDate}` : ""}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {edu.school}
                      {edu.location ? `, ${edu.location}` : ""}
                    </p>
                    {edu.description && (
                      <div className="mt-2 text-gray-700">
                        {typeof edu.description === "string" ? (
                          edu.description.split("\n").map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className="mr-2">○</span>
                              <p>{item}</p>
                            </div>
                          ))
                        ) : (
                          <p>{edu.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : null,
              )}
            </div>
          )}

          {/* Skills section */}
          {(skills.technical.some((s) => s) ||
            skills.soft.some((s) => s) ||
            skills.tools.some((s) => s) ||
            skills.languages.some((s) => s)) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
              <div className="space-y-2">
                {skills.technical.some((s) => s) && (
                  <div>
                    <h3 className="font-medium text-gray-800">Technical Skills</h3>
                    <p className="text-gray-700">{skills.technical.filter((s) => s).join(", ")}</p>
                  </div>
                )}
                {skills.tools.some((s) => s) && (
                  <div>
                    <h3 className="font-medium text-gray-800">Tools</h3>
                    <p className="text-gray-700">{skills.tools.filter((s) => s).join(", ")}</p>
                  </div>
                )}
                {skills.soft.some((s) => s) && (
                  <div>
                    <h3 className="font-medium text-gray-800">Soft Skills</h3>
                    <p className="text-gray-700">{skills.soft.filter((s) => s).join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Languages section */}
          {skills.languages.some((s) => s) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Languages</h2>
              <p className="text-gray-700">{skills.languages.filter((s) => s).join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 space-y-6 max-w-7xl">
      {/* Fixed header with actions */}
      <div className="sticky top-0 z-10 bg-background pb-4 border-b mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <div className="md:hidden mr-2">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Resume Builder</h1>
              <p className="text-muted-foreground">Create and customize your professional resume</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200"
            >
              {previewMode ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {previewMode ? "Hide Preview" : "Preview"}
            </Button> */}

            <Button
              variant="outline"
              size="sm"
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200"
            >
              {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>

            {pdfUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPDF}
                className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => exportAsPDF()}
              disabled={!latexCode || isExporting}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
            >
              {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>

            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              onClick={generateResume}
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isGenerating ? "Generating..." : "Generate Resume"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={clearAllData}
              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Clear Data
            </Button>

            {fullScreenPdf && pdfUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFullScreenPdf(false)}
                className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
              >
                <EyeOff className="mr-2 h-4 w-4" /> Hide Full PDF
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-muted rounded-lg">
            <div className="flex flex-col space-y-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab(tab.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full screen PDF view */}
      {fullScreenPdf && pdfUrl && (
        <div className="mb-6">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Resume PDF</h2>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={downloadPDF}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFullScreenPdf(false)}
                      className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                    >
                      <EyeOff className="mr-2 h-4 w-4" /> Hide PDF
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden bg-white">
                  <iframe src={pdfUrl} className="w-full h-[800px]" title="Resume PDF Preview" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - form */}
        <div ref={contentRef} className={`${fullScreenPdf ? "hidden lg:block" : ""} space-y-4`}>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              {/* Desktop tabs navigation */}
              <div className="hidden md:flex overflow-x-auto mb-6 pb-2 space-x-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className={`flex items-center ${activeTab === tab.id ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </Button>
                ))}
              </div>

              {/* Form content based on active tab */}
              {renderFormContent()}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTab}
                  disabled={activeTab === tabs[0].id}
                  className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>

                {activeTab === tabs[tabs.length - 1].id ? (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    onClick={generateResume}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Generate Resume
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={nextTab}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick actions card */}
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Upload className="h-4 w-4 mr-2 text-primary" />
                    Import Resume
                  </h3>
                  <input
                    type="file"
                    id="resume-upload"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.tex"
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={handleUploadClick}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload Resume
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    AI Suggestions
                  </h3>
                  <Button className="w-full" variant="outline" size="sm" onClick={analyzeResume} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Suggestions
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - preview */}
        <div className={`${previewMode ? "block" : "hidden lg:block"}`}>
          <Card className="shadow-sm sticky top-28">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Resume Preview</h2>
                </div>
                <p className="text-sm text-muted-foreground">This is how your resume will look.</p>

                {/* Professional resume preview */}
                {renderResumePreview()}

                {/* PDF preview button */}
                {pdfUrl ? (
                  <div className="flex justify-between items-center">
                    <Button
                      size="sm"
                      onClick={() => setFullScreenPdf(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      <FileCheck className="mr-2 h-4 w-4" /> View Full PDF
                    </Button>
                    <Button
                      size="sm"
                      onClick={downloadPDF}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={generateResume}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Generate Resume
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary text-white p-3 z-50"
          size="icon"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Success indicator when resume is generated */}
      {/* {pdfUrl && !fullScreenPdf && (
        <div className="fixed bottom-6 left-6 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg p-3 shadow-lg flex items-center z-50">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Resume generated successfully!</span>
        </div>
      )} */}
    </div>
  )
}

