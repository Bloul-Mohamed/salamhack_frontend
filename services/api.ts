import axios from "axios"

// Base API configuration - now using relative URL for the proxy
const API_BASE_URL = "/api/proxy"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add params serializer to include the path parameter
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams()
    for (const key in params) {
      searchParams.append(key, params[key])
    }
    return searchParams.toString()
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

    return api.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        path: "/cv/analyze-cv-file/",
      },
    })
  },

  // Analyze CV from text
  analyzeCV: async (cvText: string) => {
    return api.post(
      "",
      { cv_text: cvText },
      {
        params: {
          path: "/cv/analyze-cv/",
        },
      },
    )
  },

  // Score CV
  scoreCV: async (cvText: File) => {
    return api.post(
      "",
      { cv_text: cvText },
      {
        params: {
          path: "/cv/score-cv/",
        },
      },
    )
  },

  // Generate LaTeX CV
  generateLatexCV: async (cvData: any) => {
    return api.post("", cvData, {
      params: {
        path: "/cv/generate-latex-cv/",
      },
    })
  },

  // Convert LaTeX to PDF
  latexToPdf: async (latexContent: string) => {
    return api.post(
      "",
      { latex_content: latexContent },
      {
        responseType: "blob",
        params: {
          path: "/cv/latex-to-pdf/",
        },
      },
    )
  },

  // Convert LaTeX to Word
  latexToWord: async (latexContent: string) => {
    return api.post(
      "",
      { latex_content: latexContent },
      {
        responseType: "blob",
        params: {
          path: "/cv/latex-to-word/",
        },
      },
    )
  },

  extractCvDataFromFile: async (file: File) => {
    const formData = new FormData()
    formData.append("cv_file", file)

    return api.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        path: "/cv/extract-cv-data-from-file/",
      },
    })
  },
}

// User Management
export const userService = {
  // Get all clients
  getClients: async () => {
    return api.get("", {
      params: {
        path: "/users/clients/",
      },
    })
  },

  // Get client by ID
  getClient: async (id: number) => {
    return api.get("", {
      params: {
        path: `/users/clients/${id}/`,
      },
    })
  },

  // Create client
  createClient: async (clientData: any) => {
    return api.post("", clientData, {
      params: {
        path: "/users/clients/",
      },
    })
  },

  // Update client
  updateClient: async (id: number, clientData: any) => {
    return api.put("", clientData, {
      params: {
        path: `/users/clients/${id}/`,
      },
    })
  },

  // Get client CVs
  getClientCVs: async (clientId: number) => {
    return api.get("", {
      params: {
        path: "/users/cvs/by_client/",
        client_id: clientId,
      },
    })
  },

  // Upload CV for client
  uploadCV: async (clientId: number, file: File) => {
    const formData = new FormData()
    formData.append("client", clientId.toString())
    formData.append("cv", file)

    return api.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        path: "/users/cvs/upload_cv/",
      },
    })
  },
}

// Job and Plan Management
export const jobService = {
  // Get all jobs
  getJobs: async () => {
    return api.get("", {
      params: {
        path: "/pack/jobs/",
      },
    })
  },

  // Get job by ID
  getJob: async (id: number) => {
    return api.get("", {
      params: {
        path: `/pack/jobs/${id}/`,
      },
    })
  },
}

export const planService = {
  // Get all plans
  getPlans: async () => {
    return api.get("", {
      params: {
        path: "/pack/plans/",
      },
    })
  },

  // Get client plans
  getClientPlans: async (clientId: number) => {
    return api.get("", {
      params: {
        path: "/users/client-plans/by_client/",
        client_id: clientId,
      },
    })
  },
}

export default api

