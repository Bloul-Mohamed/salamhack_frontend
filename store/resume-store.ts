import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define types for the resume data
interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  website?: string
  portfolio?: string
  instagram?: string
  title?: string
  summary?: string
}

interface Experience {
  title: string
  company: string
  location: string
  dates: string | null
  achievements: string
  startDate?: string
  endDate?: string
  description?: string
}

interface Education {
  degree: string
  institution: string
  location: string
  dates: string | null
  details: string | null
  school?: string
  startDate?: string
  endDate?: string
  description?: string
}

interface Skills {
  [category: string]: string[]
}

interface ResumeData {
  personal_info: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skills
}

interface AnalysisResults {
  extracted_text?: string
  analysis?: {
    strengths: string[]
    weaknesses: string[]
    career_trajectory?: string
    skills_assessment?: any
    ats_compatibility?: string
    industry_fit?: string[]
    action_plan?: string[]
    is_valid_cv?: boolean
  }
  score?: {
    overall: number
    categories: {
      content?: number
      format?: number
      relevance?: number
      impact?: number
      ats_compatibility?: number
    }
    breakdown?: any
    suggestions?: string[]
  }
}

interface ResumeStore {
  // Resume data
  resumeData: ResumeData | null
  analysisResults: AnalysisResults | null

  // Actions
  setResumeData: (data: ResumeData) => void
  setAnalysisResults: (results: AnalysisResults) => void
  clearResumeData: () => void

  // Utility functions
  mapExtractedDataToFormData: () => {
    personalInfo: any
    experiences: any[]
    education: any[]
    skills: any
  }
}

// Create the store with persistence
export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumeData: null,
      analysisResults: null,

      setResumeData: (data) => set({ resumeData: data }),
      setAnalysisResults: (results) => set({ analysisResults: results }),
      clearResumeData: () => set({ resumeData: null, analysisResults: null }),

      // Map the API data format to the form data format
      mapExtractedDataToFormData: () => {
        const { resumeData } = get()

        if (!resumeData) {
          return {
            personalInfo: {
              name: "",
              title: "",
              email: "",
              phone: "",
              location: "",
              summary: "",
            },
            experiences: [
              {
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
            education: [
              {
                degree: "",
                school: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
            skills: {
              technical: [""],
              soft: [""],
              languages: [""],
              tools: [""],
            },
          }
        }

        // Map personal info
        const personalInfo = {
          name: resumeData.personal_info.name || "",
          title: resumeData.personal_info.title || "",
          email: resumeData.personal_info.email || "",
          phone: resumeData.personal_info.phone || "",
          location: resumeData.personal_info.location || "",
          summary: resumeData.personal_info.summary || "",
        }

        // Map experiences
        const experiences = resumeData.experience.map((exp) => {
          // Parse dates if available
          let startDate = ""
          let endDate = ""

          if (exp.dates) {
            const datesParts = exp.dates.split(" - ")
            if (datesParts.length === 2) {
              startDate = datesParts[0]
              endDate = datesParts[1]
            }
          }

          return {
            title: exp.title || "",
            company: exp.company || "",
            location: exp.location || "",
            startDate: exp.startDate || startDate,
            endDate: exp.endDate || endDate,
            description: exp.achievements || exp.description || "",
          }
        })

        // If no experiences, add an empty one
        if (experiences.length === 0) {
          experiences.push({
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }

        // Map education
        const education = resumeData.education.map((edu) => {
          // Parse dates if available
          let startDate = ""
          let endDate = ""

          if (edu.dates) {
            const datesParts = edu.dates.split(" - ")
            if (datesParts.length === 2) {
              startDate = datesParts[0]
              endDate = datesParts[1]
            }
          }

          return {
            degree: edu.degree || "",
            school: edu.institution || edu.school || "",
            location: edu.location || "",
            startDate: edu.startDate || startDate,
            endDate: edu.endDate || endDate,
            description: edu.details || edu.description || "",
          }
        })

        // If no education, add an empty one
        if (education.length === 0) {
          education.push({
            degree: "",
            school: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }

        // Map skills
        const skills: any = {
          technical: [""],
          soft: [""],
          languages: [""],
          tools: [""],
        }

        // Process skills from the API response
        if (resumeData.skills) {
          console.log(resumeData.skills)

          // Check if skills has a direct "technical" property
          if (resumeData.skills.technical && Array.isArray(resumeData.skills.technical)) {
            skills.technical = resumeData.skills.technical
          }
          // Check if skills has a direct "soft" property
          if (resumeData.skills.soft && Array.isArray(resumeData.skills.soft)) {
            skills.soft = resumeData.skills.soft
          }
          // Check if skills has a direct "languages" property
          if (resumeData.skills.languages && Array.isArray(resumeData.skills.languages)) {
            skills.languages = resumeData.skills.languages
          } else if (resumeData.skills.Languages && Array.isArray(resumeData.skills.Languages)) {
            skills.languages = resumeData.skills.Languages
          }
          // Check if skills has a direct "tools" property
          if (resumeData.skills.tools && Array.isArray(resumeData.skills.tools)) {
            skills.tools = resumeData.skills.tools
          }

          // If no specific categories are found, try to map based on available keys
          if (skills.technical.length === 0 || skills.technical[0] === "") {
            // Iterate through all keys in resumeData.skills
            Object.entries(resumeData.skills).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                // Map to appropriate category based on key name
                if (
                  key.toLowerCase().includes("technical") ||
                  key.toLowerCase().includes("programming") ||
                  key.toLowerCase().includes("development") ||
                  key.toLowerCase().includes("web") ||
                  key.toLowerCase().includes("software")
                ) {
                  skills.technical = [...skills.technical, ...value]
                  if (skills.technical[0] === "") skills.technical.shift()
                } else if (
                  key.toLowerCase().includes("soft") ||
                  key.toLowerCase().includes("communication") ||
                  key.toLowerCase().includes("problem") ||
                  key.toLowerCase().includes("leadership")
                ) {
                  skills.soft = [...skills.soft, ...value]
                  if (skills.soft[0] === "") skills.soft.shift()
                } else if (key.toLowerCase().includes("language")) {
                  skills.languages = [...skills.languages, ...value]
                  if (skills.languages[0] === "") skills.languages.shift()
                } else if (
                  key.toLowerCase().includes("tool") ||
                  key.toLowerCase().includes("tech") ||
                  key.toLowerCase().includes("design") ||
                  key.toLowerCase().includes("ui") ||
                  key.toLowerCase().includes("ux")
                ) {
                  skills.tools = [...skills.tools, ...value]
                  if (skills.tools[0] === "") skills.tools.shift()
                } else {
                  // If no specific category matches, add to technical by default
                  skills.technical = [...skills.technical, ...value]
                  if (skills.technical[0] === "") skills.technical.shift()
                }
              }
            })
          }

          // Ensure all skill categories have at least an empty string
          if (skills.technical.length === 0) skills.technical = [""]
          if (skills.soft.length === 0) skills.soft = [""]
          if (skills.languages.length === 0) skills.languages = [""]
          if (skills.tools.length === 0) skills.tools = [""]
        }

        return {
          personalInfo,
          experiences,
          education,
          skills,
        }
      },
    }),
    {
      name: "resume-storage", // name of the item in localStorage
    },
  ),
)

