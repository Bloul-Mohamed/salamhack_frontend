"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Download,
  Eye,
  Sparkles,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Settings,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateLatexCV, convertLatexToPdf, convertLatexToWord, analyzeCV, scoreCV } from "@/lib/api-service"
import { toast } from "@/hooks/use-toast"

export default function ResumeBuilderPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isGenerating, setIsGenerating] = useState(false)
  const [latexCode, setLatexCode] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)

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

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <FileText className="h-4 w-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "skills", label: "Skills", icon: <Award className="h-4 w-4" /> },
    { id: "languages", label: "Languages", icon: <Languages className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
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

  const generateResume = async () => {
    try {
      setIsGenerating(true)
      const cvData = {
        personal_info: personalInfo,
        experience: experiences,
        education: education,
        skills: skills,
        sections: sectionOrder
      }
      
      // @ts-ignore
      const response = await generateLatexCV(cvData)
      const latexCode = response.latex_content
      
      // Store in localStorage for preview page
      localStorage.setItem("latexCode", latexCode)
      
      // Navigate to preview
      router.push("/resume/preview")
    } catch (error) {
      console.error("Error generating resume:", error)
      toast({
        title: "Error",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const exportAsPDF = async () => {
    if (!latexCode) {
      toast({
        title: "Error",
        description: "Please generate your resume first.",
        variant: "destructive",
      })
      return
    }

    try {
      try {
                    // @ts-ignore
        const response = await convertLatexToPdf({ latex_content: latexCode })
        // Handle PDF download
        toast({
          title: "Success",
          description: "PDF downloaded successfully.",
        })
      } catch (apiError) {
        console.error("API call failed:", apiError)

        // Fallback: Create a simple PDF download link
        const blob = new Blob([latexCode], { type: "application/x-latex" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "resume.tex"
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(url)

        toast({
          title: "API Connection Issue",
          description: "Downloaded as LaTeX file instead. You can convert it to PDF using an online LaTeX editor.",
        })
      }
    } catch (error) {
      console.error("Error exporting as PDF:", error)
      toast({
        title: "Error",
        description: "Failed to export as PDF. Please try again or check your network connection.",
        variant: "destructive",
      })
    }
  }

  const exportAsWord = async () => {
    if (!latexCode) {
      toast({
        title: "Error",
        description: "Please generate your resume first.",
        variant: "destructive",
      })
      return
    }

    try {
      try {
                    // @ts-ignore
        const response = await convertLatexToWord({ latex_content: latexCode })
        // Handle Word download
        toast({
          title: "Success",
          description: "Word document downloaded successfully.",
        })
      } catch (apiError) {
        console.error("API call failed:", apiError)

        // Fallback: Create a simple text download
        const blob = new Blob([latexCode], { type: "application/x-latex" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "resume.tex"
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(url)

        toast({
          title: "API Connection Issue",
          description:
            "Downloaded as LaTeX file instead. You can convert it to a Word document using an online converter.",
        })
      }
    } catch (error) {
      console.error("Error exporting as Word:", error)
      toast({
        title: "Error",
        description: "Failed to export as Word. Please try again or check your network connection.",
        variant: "destructive",
      })
    }
  }

  const analyzeResume = async () => {
    try {
      setIsAnalyzing(true)
      const cvText = JSON.stringify({
        personal_info: personalInfo,
        experience: experiences,
        education: education,
        skills: skills
      })
      
      const response = await scoreCV(cvText)
      setAnalysisResults(response)
      
      toast({
        title: "Analysis Complete",
        description: `Overall Score: ${response.score.overall}/100`
      })
    } catch (error) {
      console.error("Error analyzing resume:", error)
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Builder</h1>
          <p className="text-muted-foreground">Create and customize your professional resume</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={analyzeResume}>
            <Sparkles className="mr-2 h-4 w-4" /> Analyze
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button variant="outline" size="sm" onClick={exportAsPDF}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button size="sm" className="blue-gradient" onClick={generateResume} disabled={isGenerating}>
            <Save className="mr-2 h-4 w-4" /> {isGenerating ? "Generating..." : "Generate Resume"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col h-auto w-full bg-transparent space-y-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className="justify-start w-full"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <Upload className="h-4 w-4 mr-2 text-primary" />
                  Import Existing Resume
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload an existing resume to automatically fill in your information.
                </p>
                <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx,.txt,.tex" />
                <label htmlFor="resume-upload">
                  <Button variant="outline" className="w-full" size="sm" >
                    Upload Resume
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  AI Suggestions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered suggestions to improve your resume content.
                </p>
                <Button className="w-full" variant="outline" size="sm">
                  Generate Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              {activeTab === "personal" && (
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
              )}

              {activeTab === "experience" && (
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
                          <Button size="sm">
                            <Sparkles className="mr-2 h-3 w-3" /> Improve with AI
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "education" && (
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
              )}

              {activeTab === "skills" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <p className="text-sm text-muted-foreground">Add your professional skills and competencies.</p>

                  <div className="space-y-4">
                    <div className="space-y-4">
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
                    </div>

                    <div className="space-y-4">
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
                    </div>

                    <div className="space-y-4">
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
                    </div>

                    <Button variant="outline" size="sm" className="mt-2">
                      <Sparkles className="mr-2 h-4 w-4" /> Suggest Skills with AI
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "languages" && (
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
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Resume Settings</h2>
                  <p className="text-sm text-muted-foreground">Customize the appearance and layout of your resume.</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template">Template</Label>
                      <Select defaultValue="modern">
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    // Replace the color scheme section in the settings tab with this updated version
                    <div className="space-y-2">
                      <Label htmlFor="colorScheme">Color Scheme</Label>
                      <div className="flex gap-2">
                        {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-gray-500"].map(
                          (color, index) => (
                            <button
                              key={index}
                              className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                              aria-label={`Color option ${index + 1}`}
                              onClick={() => setSelectedColor(color)}
                            />
                          ),
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Selected color: {selectedColor.replace("bg-", "").replace("-500", "")}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fontSize">Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="spacing">Spacing</Label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger>
                          <SelectValue placeholder="Select spacing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    // Replace the section order part in the settings tab with this updated version
                    <div className="space-y-2">
                      <Label htmlFor="sections">Section Order</Label>
                      <p className="text-sm text-muted-foreground">Use the arrows to reorder sections</p>
                      <div className="space-y-2 mt-2">
                        {sectionOrder.map((section, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <div className="flex items-center">
                              <span className="text-muted-foreground mr-2">{index + 1}</span>
                              <span>{section}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <button
                                className="p-1 hover:bg-background rounded"
                                onClick={() => moveSection(index, "up")}
                                disabled={index === 0}
                                aria-label="Move up"
                              >
                                ↑
                              </button>
                              <button
                                className="p-1 hover:bg-background rounded"
                                onClick={() => moveSection(index, "down")}
                                disabled={index === sectionOrder.length - 1}
                                aria-label="Move down"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={prevTab} disabled={activeTab === tabs[0].id}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {activeTab === tabs[tabs.length - 1].id ? (
              <Button size="sm" className="blue-gradient" onClick={generateResume} disabled={isGenerating}>
                <Save className="mr-2 h-4 w-4" /> {isGenerating ? "Generating..." : "Generate Resume"}
              </Button>
            ) : (
              <Button size="sm" onClick={nextTab}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

