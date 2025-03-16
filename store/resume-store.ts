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
          // Map technical skills
          if (
            resumeData.skills["Software Development"] ||
            resumeData.skills["Web Development"] ||
            resumeData.skills["Programming Languages"]
          ) {
            skills.technical = [
              ...(resumeData.skills["Software Development"] || []),
              ...(resumeData.skills["Web Development"] || []),
              ...(resumeData.skills["Programming Languages"] || []),
            ]

            if (skills.technical.length === 0) skills.technical = [""]
          }

          // Map soft skills
          if (
            resumeData.skills["Problem-Solving & Algorithms"] ||
            resumeData.skills["Workshop & Training Facilitation"]
          ) {
            skills.soft = [
              ...(resumeData.skills["Problem-Solving & Algorithms"] || []),
              ...(resumeData.skills["Workshop & Training Facilitation"] || []),
            ]

            if (skills.soft.length === 0) skills.soft = [""]
          }

          // Map languages
          if (resumeData.skills["Languages"]) {
            skills.languages = resumeData.skills["Languages"]

            if (skills.languages.length === 0) skills.languages = [""]
          }

          // Map tools
          if (resumeData.skills["UI/UX Design"] || resumeData.skills["Techs"]) {
            skills.tools = [...(resumeData.skills["UI/UX Design"] || []), ...(resumeData.skills["Techs"] || [])]

            if (skills.tools.length === 0) skills.tools = [""]
          }
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
      name: "resume-storage", 
    },
  ),
)

