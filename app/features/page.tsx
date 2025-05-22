import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, FileText, Sparkles, Target, History, CheckCircle, Briefcase, PenLine, Zap } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI-Powered Content Creation",
      description:
        "Our advanced AI analyzes your experience and skills to generate professional, tailored content for each section of your resume.",
      benefits: [
        "Save hours of writing and editing time",
        "Get professionally worded descriptions",
        "Highlight your most relevant achievements",
      ],
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with our built-in keyword optimization and formatting tools.",
      benefits: [
        "Get past automated resume filters",
        "Identify missing keywords from job descriptions",
        "Format your resume for maximum ATS compatibility",
      ],
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Resume Scoring & Analysis",
      description:
        "Receive detailed feedback and scoring to improve your resume's effectiveness for specific job roles and industries.",
      benefits: [
        "Understand your resume's strengths and weaknesses",
        "Get actionable improvement suggestions",
        "Track your progress as you make changes",
      ],
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Professional Templates",
      description: "Choose from a wide variety of professionally designed templates for any industry or career level.",
      benefits: [
        "Templates optimized for different industries",
        "Customizable colors and fonts",
        "Mobile and print-friendly designs",
      ],
    },
    {
      icon: <History className="h-8 w-8 text-primary" />,
      title: "Version History & A/B Testing",
      description:
        "Create multiple versions of your resume and track changes to see which performs best for different applications.",
      benefits: [
        "Compare different versions side by side",
        "Restore previous versions at any time",
        "Test different approaches for different jobs",
      ],
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Job Matching",
      description:
        "Paste any job description to get a compatibility score and tailored suggestions to optimize your resume for that specific position.",
      benefits: [
        "Customize your resume for each application",
        "Identify skill gaps for specific roles",
        "Increase your chances of getting interviews",
      ],
    },
    {
      icon: <PenLine className="h-8 w-8 text-primary" />,
      title: "Cover Letter Generator",
      description:
        "Create customized cover letters that complement your resume and address the specific requirements of each job posting.",
      benefits: [
        "AI-generated cover letters in seconds",
        "Tailored to match job descriptions",
        "Professional tone and formatting",
      ],
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "One-Click Export",
      description: "Export your resume in multiple formats including PDF, DOCX, TXT, and more with a single click.",
      benefits: [
        "Download in any format required by employers",
        "Share directly via email or link",
        "QR code generation for digital sharing",
      ],
    },
  ]

  return (
    <div className="container py-6 space-y-12 max-w-6xl">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful Features</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our platform combines AI technology with professional resume expertise to help you create standout resumes
          that get results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </div>
              <CardDescription className="mt-2">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* <div className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to build your perfect resume?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of job seekers who have used our platform to land their dream jobs.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Get Started
          </a>
          <a
            href="/templates"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            View Templates
          </a>
        </div>
      </div> */}
    </div>
  )
}

