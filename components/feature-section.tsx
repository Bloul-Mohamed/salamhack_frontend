import { BarChart, FileText, Sparkles, Target, History, Layers } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI-Powered Creation",
      description: "Generate professional content tailored to your experience and target role",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems with keyword optimization",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Resume Scoring",
      description: "Get detailed feedback and scoring to improve your resume's effectiveness",
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Multiple Templates",
      description: "Choose from professional templates for any industry or career level",
    },
    {
      icon: <History className="h-8 w-8 text-primary" />,
      title: "Version History",
      description: "Track changes and compare different versions of your resume",
    },
    {
      icon: <Layers className="h-8 w-8 text-primary" />,
      title: "Job Matching",
      description: "Tailor your resume to specific job descriptions with AI suggestions",
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
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm"
            >
              {feature.icon}
              <h3 className="text-xl font-medium">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

