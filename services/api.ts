import axios from "axios"

// Base API configuration
const API_BASE_URL = "http://stepdevs.click:8000/api"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Set basic auth if credentials are available
export const setAuthCredentials = (username: string, password: string) => {
  const token = btoa(`${username}:${password}`)
  api.defaults.headers.common["Authorization"] = `Basic ${token}`
}

// CV Analysis and Generation
export const cvService = {
  // Analyze CV from file
  analyzeCVFile: async (file: File) => {
    const formData = new FormData()
    formData.append("cv_file", file)

    return api.post("/cv/analyze-cv-file/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // Analyze CV from text
  analyzeCV: async (cvText: string) => {
    return api.post("/cv/analyze-cv/", { cv_text: cvText })
  },

  // Score CV
  scoreCV: async (cvText: string) => {
    return api.post("/cv/score-cv/", { cv_text: cvText })
  },

  // Generate LaTeX CV
  generateLatexCV: async (cvData: any) => {
    return api.post("/cv/generate-latex-cv/", cvData)
  },

  // Convert LaTeX to PDF
  latexToPdf: async (latexContent: string) => {
    return api.post(
      "/cv/latex-to-pdf/",
      { latex_content: latexContent },
      {
        responseType: "blob",
      },
    )
  },

  // Convert LaTeX to Word
  latexToWord: async (latexContent: string) => {
    return api.post(
      "/cv/latex-to-word/",
      { latex_content: latexContent },
      {
        responseType: "blob",
      },
    )
  },
}

// User Management
export const userService = {
  // Get all clients
  getClients: async () => {
    return api.get("/users/clients/")
  },

  // Get client by ID
  getClient: async (id: number) => {
    return api.get(`/users/clients/${id}/`)
  },

  // Create client
  createClient: async (clientData: any) => {
    return api.post("/users/clients/", clientData)
  },

  // Update client
  updateClient: async (id: number, clientData: any) => {
    return api.put(`/users/clients/${id}/`, clientData)
  },

  // Get client CVs
  getClientCVs: async (clientId: number) => {
    return api.get(`/users/cvs/by_client/?client_id=${clientId}`)
  },

  // Upload CV for client
  uploadCV: async (clientId: number, file: File) => {
    const formData = new FormData()
    formData.append("client", clientId.toString())
    formData.append("cv", file)

    return api.post("/users/cvs/upload_cv/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
}

// Job and Plan Management
export const jobService = {
  // Get all jobs
  getJobs: async () => {
    return api.get("/pack/jobs/")
  },

  // Get job by ID
  getJob: async (id: number) => {
    return api.get(`/pack/jobs/${id}/`)
  },
}

export const planService = {
  // Get all plans
  getPlans: async () => {
    return api.get("/pack/plans/")
  },

  // Get client plans
  getClientPlans: async (clientId: number) => {
    return api.get(`/users/client-plans/by_client/?client_id=${clientId}`)
  },
}

export default api

