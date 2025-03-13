import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic resume building tools",
      features: ["1 resume", "3 templates", "Basic ATS check", "Export as PDF", "7-day history"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "Advanced features for job seekers",
      features: [
        "Unlimited resumes",
        "All templates",
        "Advanced ATS optimization",
        "AI content suggestions",
        "Export in all formats",
        "30-day history",
        "Cover letter generator",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: "$29",
      period: "/month",
      description: "Complete career solution",
      features: [
        "Everything in Pro",
        "LinkedIn profile optimization",
        "Job match recommendations",
        "1-on-1 resume review",
        "Interview preparation",
        "Priority support",
        "Unlimited history",
      ],
      cta: "Get Premium",
      popular: false,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that fits your needs
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-md" : "shadow-sm"}`}>
              {plan.popular && (
                <div className="rounded-t-lg bg-primary py-1 text-center text-xs font-medium text-primary-foreground">
                  MOST POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="sm" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}

