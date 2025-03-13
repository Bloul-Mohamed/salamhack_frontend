import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 blue-gradient-subtle">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Build Your Perfect Resume with AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create professional resumes that get noticed. Our AI-powered platform helps you craft, analyze, and
                optimize your resume for your dream job.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="sm" className="blue-gradient">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                View Templates
              </Button>
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

