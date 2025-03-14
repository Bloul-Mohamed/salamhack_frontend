// Base API configuration
const API_BASE_URL = "http://stepdevs.click:8000/api"

// Basic auth credentials would typically come from environment variables
const credentials = btoa("username:password") // Replace with actual credentials

// Generic fetch function with authentication
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const headers = {
    ...options.headers,
    Authorization: `Basic ${credentials}`,
    "Content-Type": options.method === "POST" && options.body instanceof FormData ? undefined : "application/json",
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    // @ts-ignore
    headers,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  // Some endpoints might return a file instead of JSON
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return await response.json()
  }

  return response
}

// CV Analysis API functions
export async function analyzeCVFile(file: File) {
  const formData = new FormData()
  formData.append("cv_file", file)

  return fetchAPI("/cv/analyze-cv-file/", {
    method: "POST",
    body: formData,
  })
}

export async function analyzeCV(cvText: string) {
  return fetchAPI("/cv/analyze-cv/", {
    method: "POST",
    body: JSON.stringify({ cv_text: cvText }),
  })
}

export async function scoreCV(cvText: string) {
  return fetchAPI("/cv/score-cv/", {
    method: "POST",
    body: JSON.stringify({ cv_text: cvText }),
  })
}

// LaTeX CV Generation and Conversion
export async function generateLatexCV(cvData: {
  personal_info: Record<string, string | null>
  summary: string
  experience: Array<Record<string, string | null>>
  education: Array<Record<string, string | null>>
  skills: Record<string, string | null>
}) {
  return fetchAPI("/cv/generate-latex-cv/", {
    method: "POST",
    body: JSON.stringify(cvData),
  })
}

export async function convertLatexToPdf(latexContent: string) {
  return fetchAPI("/cv/latex-to-pdf/", {
    method: "POST",
    body: JSON.stringify({ latex_content: latexContent }),
  })
}

export async function convertLatexToWord(latexContent: string) {
  return fetchAPI("/cv/latex-to-word/", {
    method: "POST",
    body: JSON.stringify({ latex_content: latexContent }),
  })
}

// User and CV Management
export async function getJobs() {
  return fetchAPI("/pack/jobs/")
}

export async function getPlans() {
  return fetchAPI("/pack/plans/")
}

export async function createClient(clientData: {
  name: string
  email: string
  phone: string
  job: number
}) {
  return fetchAPI("/users/clients/", {
    method: "POST",
    body: JSON.stringify(clientData),
  })
}

export async function uploadCV(clientId: number, cvFile: File) {
  const formData = new FormData()
  formData.append("client", clientId.toString())
  formData.append("cv", cvFile)

  return fetchAPI("/users/cvs/upload_cv/", {
    method: "POST",
    body: formData,
  })
}

export async function getClientCVs(clientId: number) {
  return fetchAPI(`/users/cvs/by_client/?client_id=${clientId}`)
}

