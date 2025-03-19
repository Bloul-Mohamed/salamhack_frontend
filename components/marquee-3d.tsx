import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"

// Replace the reviews array with CV-related content
const cvItems = [
  {
    title: "Resume Analysis",
    description: "AI-powered resume scanning to identify strengths and improvement areas.",
    icon: "https://avatar.vercel.sh/analysis",
  },
  {
    title: "ATS Optimization",
    description: "Ensure your resume passes through Applicant Tracking Systems with ease.",
    icon: "https://avatar.vercel.sh/ats",
  },
  {
    title: "Skills Assessment",
    description: "Identify key skills that make your profile stand out to employers.",
    icon: "https://avatar.vercel.sh/skills",
  },
  {
    title: "Career Insights",
    description: "Get personalized recommendations for career advancement opportunities.",
    icon: "https://avatar.vercel.sh/career",
  },
  {
    title: "Format Perfection",
    description: "Professional templates that highlight your experience effectively.",
    icon: "https://avatar.vercel.sh/format",
  },
  {
    title: "Job Matching",
    description: "Smart algorithms to match your profile with ideal job opportunities.",
    icon: "https://avatar.vercel.sh/jobs",
  },
]

// Update the rows with the new CV items
const firstRow = cvItems.slice(0, 3)
const secondRow = cvItems.slice(3)
const thirdRow = cvItems.slice(0, 3)
const fourthRow = cvItems.slice(3)

// Replace the ReviewCard component with CVFeatureCard
const CVFeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-40 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2 my-2",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={icon || "/placeholder.svg"} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{title}</figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-xs">{description}</blockquote>
    </figure>
  )
}

// Update the main component to include a title
export default function Marquee3D() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Cv Genius Builder
      </h1>
      <p className="text-lg mb-10 text-center max-w-2xl">
        Craft the perfect resume with our AI-powered tools and stand out to employers
      </p>

      <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform:
              "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:15s]">
            {firstRow.map((item, i) => (
              <CVFeatureCard key={`first-${i}`} {...item} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((item, i) => (
              <CVFeatureCard key={`second-${i}`} {...item} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:25s]">
            {thirdRow.map((item, i) => (
              <CVFeatureCard key={`third-${i}`} {...item} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:18s]">
            {fourthRow.map((item, i) => (
              <CVFeatureCard key={`fourth-${i}`} {...item} />
            ))}
          </Marquee>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  )
}

