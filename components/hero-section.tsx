import Link from "next/link"
import { ArrowRight, FileText, BarChart, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 blue-gradient-subtle">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Build Your Perfect Resume with AI-Powered Analysis
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create professional resumes that get noticed. Our AI-powered platform analyzes, scores, and optimizes
                your resume for your dream job.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="sm" className="blue-gradient">
                <Link href="/resume/builder">
                  Create Resume <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/resume/analyze">Analyze Existing Resume</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-primary/10 p-1">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-primary/10 p-1">
                  <BarChart className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Resume Scoring</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-primary/10 p-1">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">ATS Optimization</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-xl border bg-background shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <div className="absolute inset-0 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
                  <div className="p-8">
                    <div className="h-6 w-24 rounded-md bg-primary/10 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-md bg-primary/10"></div>
                      <div className="h-4 w-5/6 rounded-md bg-primary/10"></div>
                      <div className="h-4 w-4/6 rounded-md bg-primary/10"></div>
                    </div>
                    <div className="mt-6 h-6 w-32 rounded-md bg-primary/10 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-md bg-primary/10"></div>
                      <div className="h-4 w-5/6 rounded-md bg-primary/10"></div>
                      <div className="h-4 w-4/6 rounded-md bg-primary/10"></div>
                    </div>
                    <div className="mt-6 h-6 w-28 rounded-md bg-primary/10 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-md bg-primary/10"></div>
                      <div className="h-4 w-5/6 rounded-md bg-primary/10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

