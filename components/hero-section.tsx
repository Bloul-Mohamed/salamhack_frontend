import Link from "next/link"
import { ArrowRight, FileText, BarChart, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrbitingCircles } from "./magicui/orbiting-circles";

export function OrbitingCirclesDemo() {
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center overflow-hidden opacity-20">
      <OrbitingCircles iconSize={50} radius={300} speed={0.5}>
        <Icons.facebook />
        <Icons.apple />
        <Icons.google />
      </OrbitingCircles>
      <OrbitingCircles iconSize={40}>
        <Icons.facebook />
        <Icons.apple />
        <Icons.google />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <Icons.facebook />
        <Icons.apple />
        <Icons.google />
      </OrbitingCircles>
    </div>
  );
}


const Icons = {
  facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
    </svg>
  ),
  apple: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  ),
  amazon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 448 512" fill="currentColor">
      <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 6.4 33.5 35.1 37.2 39.4-8.7 11.8-21.2 27.6-36.5 44.1-3.2 3.4-1.9 0-.5 3.3 3.7 9.1 41.1 66 46.5 77.5 1.7 3.6 3.5 1.6 6.8 2.3 4.5 1 33.2 6.3 79.9 6.3 31.9 0 63.9-2.5 81.2-9.4 0-1-.1-1.9-.1-2.9-7.8-39.3-43.2-56.8-69.5-69.6-42.7-21-88.4-37.5-73.9-82.8 9.5-29.8 56.7-61.8 186.5-14.2 36.2 13.3 65.5 33.4 81.3 52.6 3.2 3.9 5.9 7.5 8.2 10.7 1.8 2.5 3.4 4.7 4.6 6.6 2.2 3.2 3.4 4.8 3.4 4.8s-1.6-3-4.8-8.5c-1.3-2.2-3-5-5.2-8.5-1.1-1.8-2.3-3.7-3.5-5.7-4.1-6.3-9.2-13.7-15.4-21.9-12.4-16.4-28.4-34.8-48.8-51.3-57.3-46.3-129.8-77-203.5-77-3.8 0-7.6.1-11.3.2C206.1 34.2 162.3 0 110.5 0 80.9 0 57.3 11.7 40.1 30.8 16.5 57.8 0 100 0 140.5c0 29.6 9.2 58 24.4 82 10.8 17 24.9 32.1 41.1 44.3-2.4 6.4-3.8 13.3-3.8 20.5 0 32.8 26.6 59.4 59.4 59.4 18.9 0 35.7-8.8 46.5-22.5 13.8 15.2 32.5 26.3 53.8 31.7 3.7.9 7.4 1.7 11.3 2.3-1.8 8.8-2.8 17.9-2.8 27.3 0 75.2 61 136.2 136.2S512 393.7 512 318.5c0-39.8-17.1-75.5-44.4-100.2-2.2-2-4.6-3.9-6.9-5.8-18.9-15.1-41.8-25.4-66.9-29.3-2.8-.4-5.6-.8-8.5-1-2.6-.2-5.2-.3-7.9-.3-45.4 0-85.4 22.5-109.7 56.9-2.7-4.1-5.6-8-8.7-11.7 15.6-36.8 38.1-72.2 66.3-104.2 28.2-32.1 60.3-59.7 93.6-80.6 4.2-2.6 8.4-5.1 12.7-7.4 4.3-2.3 8.6-4.5 13-6.5 4.4-2 8.8-3.9 13.3-5.6 4.5-1.7 9-3.3 13.6-4.7 9.1-2.9 18.4-5.3 27.7-7.1 4.6-.9 9.3-1.7 14-2.3 4.7-.6 9.4-1.1 14.1-1.4 2.4-.2 4.7-.3 7.1-.4 2.4-.1 4.7-.1 7.1-.1 9.4 0 18.8.7 28 2.1 4.6.7 9.2 1.6 13.7 2.6 4.5 1 9 2.2 13.4 3.5 8.8 2.7 17.3 6 25.5 9.9 4.1 1.9 8.1 4 12 6.2 3.9 2.2 7.7 4.6 11.4 7.1 7.4 5 14.4 10.5 21 16.5 6.6 6 12.7 12.5 18.4 19.4 11.3 13.9 20.4 29.2 27.4 45.6.9 2.1 1.7 4.3 2.5 6.4.8 2.2 1.5 4.3 2.2 6.5 1.3 4.3 2.5 8.7 3.5 13.1 1 4.4 1.8 8.8 2.4 13.3.6 4.4 1 8.9 1.3 13.4.2 4.5.3 9 .1 13.5-.1 2.3-.3 4.5-.5 6.8-.2 2.3-.5 4.5-.8 6.8-.7 4.5-1.5 9-2.6 13.4-1.1 4.4-2.4 8.8-3.9 13.1-1.5 4.3-3.2 8.5-5.1 12.6-1.9 4.1-4 8.1-6.3 12-2.3 3.9-4.8 7.7-7.4 11.4-2.6 3.7-5.5 7.2-8.4 10.7-6 6.9-12.6 13.3-19.8 19.2-7.2 5.9-15 11.1-23.2 15.6-8.3 4.5-17 8.3-26.2 11.3-9.1 3-18.6 5.2-28.3 6.6-4.8.7-9.7 1.2-14.7 1.5-5 .3-10 .3-15 .1-10-.4-20-1.8-29.7-4.2-9.7-2.4-19.1-5.7-28.1-9.8-9-4.1-17.5-9-25.6-14.6-8-5.6-15.5-11.9-22.3-18.8-13.7-13.8-24.6-30.1-32-47.9-7.4-17.8-11.3-37.1-11.3-56.8 0-18.4 3.3-36.2 9.3-52.9 6-16.7 14.8-32.2 26.1-45.7 11.3-13.5 24.8-25 40.1-34 15.3-9 32.4-15.5 50.4-19.1 18.1-3.5 37.1-4.1 55.5-1.5 18.4 2.6 36.1 8.4 52.2 17.1 16.1 8.7 30.5 20.3 42.4 34.2 11.9 13.9 21.2 30 27.5 47.3 6.3 17.3 9.6 35.8 9.6 54.7 0 23.4-4.8 46.3-14.1 67.7-9.3 21.4-23 40.9-40.2 57.2-17.2 16.3-37.9 29.2-60.5 37.6-22.6 8.4-47.1 12.4-72 11.8-12.5-.3-25-1.8-37.1-4.4-12.1-2.6-23.9-6.4-35.1-11.2-11.3-4.8-22-10.7-32-17.7-10-7-19.2-14.9-27.5-23.7-16.8-17.5-29.9-38.3-38.3-61-8.4-22.7-12.3-47.1-11.2-71.5.3-6.1.9-12.1 1.7-18.1.8-6 1.9-12 3.3-17.9 2.8-11.8 6.8-23.3 12-34.3 5.2-11 11.6-21.5 19-31.2 7.4-9.7 15.9-18.7 25.2-26.8 9.3-8.1 19.4-15.3 30.1-21.3 21.5-12.1 45.6-19.4 70.3-21.3 6.2-.5 12.4-.6 18.7-.4 6.2.2 12.5.8 18.7 1.7 12.4 1.8 24.6 5 36.2 9.6 11.7 4.5 22.7 10.3 33 17.3 10.3 7 19.8 15.1 28.3 24.1 8.5 9.1 16 19 22.3 29.7 12.7 21.4 20.9 45.3 24 70.3 3.1 25-1.7 51.1-14.1 74.3-12.4 23.2-32.5 43.1-57.3 55.2-24.8 12.1-53.7 16.4-81.5 11.8-27.8-4.6-54.2-18.3-73.6-38.5-9.7-10.1-17.9-21.6-24.2-34.3-6.3-12.6-10.6-26.3-12.6-40.4-4-28.2 2.1-57.8 17.4-82.2 15.3-24.3 39.2-43.4 66.5-53.4 27.3-10 58-10.8 86.3-2.2 14.2 4.3 27.6 10.8 39.6 19.2 12 8.4 22.7 18.7 31.5 30.5 8.8 11.8 15.7 25 20.3 39.1 4.6 14.1 7 29 7 44 0 30-9.8 59.3-27.9 83.2-18.1 23.9-44.3 42.4-74.3 50.9-15 4.2-30.7 6.2-46.5 5.8-15.8-.4-31.5-3.2-46.4-8.4-29.7-10.4-55.3-30.7-72.6-56.6-8.7-12.9-15.3-27.1-19.7-42.1-4.4-15-6.6-30.7-6.6-46.5 0-31.5 10.3-62.2 29.5-87.1 19.1-24.9 46.7-43.9 78.1-53.1 31.4-9.2 65.3-7.9 95.8 3.7 30.5 11.6 57.2 33.4 75.1 61.2 17.9 27.8 27 61.2 25.9 94.8-1.1 33.6-12.3 66.2-31.9 92.9-19.6 26.7-47.5 47.1-79.5 57.6-32 10.5-67.1 10.9-99.4 1.1-32.3-9.8-61.2-29.9-82.1-57.4-20.9-27.5-33.6-61.3-36.3-96.8-2.7-35.5 4.7-71.5 21.2-103.1 16.5-31.6 41.2-58.5 71.1-77.1 29.9-18.6 64.9-29 100.4-30.4 35.5-1.4 71.1 7.1 102.5 24.5 31.4 17.4 58.2 43.3 76.8 74.6 18.6 31.3 29.1 67.9 30.1 105.1 1 37.2-7.5 74.5-24.7 107.1-17.2 32.6-42.7 60.6-73.4 80.7-30.7 20.1-66.4 32.4-102.9 35.6-36.5 3.2-73.5-2.7-107-17.1-33.5-14.4-62.9-37.2-85-65.7-22.1-28.5-36.9-62.4-43.1-98.2-6.2-35.8-3.7-73 7.3-107.2 11-34.2 30.6-65.2 56.4-89.8 25.8-24.6 57.5-42.8 91.5-53.2 34-10.4 70.1-12.9 105.4-7.3 35.3 5.6 69 19.3 98.1 39.9 29.1 20.6 53.2 47.8 70.1 79.1 16.9 31.3 26.5 66.6 27.9 102.5 1 37.9-5.3 72-19.8 104.7-14.5 32.7-36.5 61.5-63.8 83.8-27.3 22.3-59.7 38.1-94.1 46.3-34.4 8.2-70.4 8.7-105.1 1.5-34.7-7.2-67.5-22.9-94.7-45.4-27.2-22.5-48.7-51.6-62.3-84.3-13.6-32.7-19.1-68.7-16.1-104.1 3-35.4 14.4-69.9 33.3-99.8 18.9-29.9 45.3-55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1 32.9 12.4 62.5 32.4 86.3 58.2 23.8 25.8 41.6 57.4 52 91.5 10.4 34.1 13.4 70.6 8.8 106.1-4.6 35.5-17 69.7-36.3 99.6-19.3 29.9-45.3 55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1 32.9 12.4 62.5 32.4 86.3 58.2 23.8 25.8 41.6 57.4 52 91.5 10.4 34.1 13.4 70.6 8.8 106.1-4.6 35.5-17 69.7-36.3 99.6-19.3 29.9-45.3 55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1 32.9 12.4 62.5 32.4 86.3 58.2 23.8 25.8 41.6 57.4 52 91.5 10.4 34.1 13.4 70.6 8.8 106.1-4.6 35.5-17 69.7-36.3 99.6-19.3 29.9-45.3 55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1 32.9 12.4 62.5 32.4 86.3 58.2 23.8 25.8 41.6 57.4 52 91.5 10.4 34.1 13.4 70.6 8.8 106.1-4.6 35.5-17 69.7-36.3 99.6-19.3 29.9-45.3 55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1 32.9 12.4 62.5 32.4 86.3 58.2 23.8 25.8 41.6 57.4 52 91.5 10.4 34.1 13.4 70.6 8.8 106.1-4.6 35.5-17 69.7-36.3 99.6-19.3 29.9-45.3 55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1 32.9 12.4 62.5 32.4 86.3 58.2 23.8 25.8 41.6 57.4 52 91.5 10.4 34.1 13.4 70.6 8.8 106.1-4.6 35.5-17 69.7-36.3 99.6-19.3 29.9-45.3 55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1 32.9 12.4 62.5 32.4 86.3 58.2 23.8 25.8 41.6 57.4 52 91.5 10.4 34.1 13.4 70.6 8.8 106.1-4.6 35.5-17 69.7-36.3 99.6-19.3 29.9-45.3 55.3 75.9-73.6 30.6-18.3 65.5-29.4 101.1-32.5 35.6-3.1 71.4 1.7 104.3 14.1z" />
    </svg>
  ),
  netflix: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" />
    </svg>
  ),
  google: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  ),
}

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="absolute mx-auto left-1/2">
          <OrbitingCirclesDemo></OrbitingCirclesDemo>
        </div>
        <div className="relative z-10 grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
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

