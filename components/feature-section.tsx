import { BarChart, FileText, Sparkles, Target, Upload, Download } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Resume Analysis",
      description: "Upload your existing resume for instant analysis and scoring with detailed feedback.",
      benefits: [
        "Get an overall score out of 100",
        "Identify strengths and weaknesses",
        "Receive actionable improvement suggestions",
      ],
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI-Powered Creation",
      description: "Generate professional content tailored to your experience and target role",
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
        "Ensure your resume passes through Applicant Tracking Systems with our built-in keyword optimization.",
      benefits: [
        "Get past automated resume filters",
        "Identify missing keywords from job descriptions",
        "Format your resume for maximum ATS compatibility",
      ],
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Resume Scoring",
      description:
        "Receive detailed feedback and scoring to improve your resume's effectiveness for specific job roles.",
      benefits: [
        "Understand your resume's strengths and weaknesses",
        "Get actionable improvement suggestions",
        "Track your progress as you make changes",
      ],
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Multiple Templates",
      description: "Choose from professional templates for any industry or career level.",
      benefits: [
        "Templates optimized for different industries",
        "Customizable colors and fonts",
        "Mobile and print-friendly designs",
      ],
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "Multiple Export Formats",
      description: "Export your resume in multiple formats including PDF, Word, and LaTeX.",
      benefits: [
        "Download in any format required by employers",
        "Share directly via email or link",
        "Edit in your preferred software",
      ],
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Powerful Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines AI technology with professional resume expertise to help you stand out
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              {feature.icon}
              <h3 className="text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

