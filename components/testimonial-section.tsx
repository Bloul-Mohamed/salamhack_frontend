import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "The AI suggestions helped me highlight achievements I would have never thought to include. I got three interview calls within a week of updating my resume!",
      author: "Sarah J.",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    {
      quote:
        "As a recent graduate, I had no idea how to make my resume stand out. ResumeAI guided me through the entire process and helped me land my first tech job.",
      author: "Michael T.",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
    },
    {
      quote:
        "The ATS optimization feature is a game-changer. My applications are finally getting through to actual humans instead of being filtered out by algorithms.",
      author: "Priya K.",
      role: "Data Analyst",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PK",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Success Stories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how our platform has helped job seekers land their dream roles
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <span className="absolute -left-2 -top-2 text-6xl text-primary/20">"</span>
                    <p className="relative z-10 italic text-muted-foreground">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="text-primary mr-2">+</span> 10,000 successful job applications and counting
          </div>
        </div>
      </div>
    </section>
  )
}

