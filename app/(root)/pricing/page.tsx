import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: { monthly: "$0", annual: "$0" },
      description: "Basic resume building tools",
      features: ["1 resume", "3 templates", "Basic ATS check", "Export as PDF", "7-day history"],
      limitations: ["Limited AI suggestions", "No cover letter generation", "No job matching"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: "$12", annual: "$8" },
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
      limitations: [],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: { monthly: "$29", annual: "$19" },
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
      limitations: [],
      cta: "Get Premium",
      popular: false,
    },
  ]

  return (
    <div className="container py-6 space-y-12 max-w-6xl">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that fits your needs. All plans include a 14-day free trial with no credit card required.
        </p>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual (Save 33%)</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col ${plan.popular ? "border-primary shadow-md relative" : "shadow-sm"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary py-1 text-center text-xs font-medium text-primary-foreground">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className={plan.popular ? "pt-8" : ""}>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price.monthly}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
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
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-center text-muted-foreground">
                        <span className="mr-2 text-sm">✕</span>
                        {limitation}
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
        </TabsContent>

        <TabsContent value="annual" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col ${plan.popular ? "border-primary shadow-md relative" : "shadow-sm"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary py-1 text-center text-xs font-medium text-primary-foreground">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className={plan.popular ? "pt-8" : ""}>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price.annual}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
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
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-center text-muted-foreground">
                        <span className="mr-2 text-sm">✕</span>
                        {limitation}
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
        </TabsContent>
      </Tabs>

      <div className="bg-muted rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Enterprise Solutions</h3>
            <p className="text-sm text-muted-foreground">
              Custom solutions for career centers, educational institutions, and recruiting agencies.
            </p>
            <Button variant="link" className="p-0">
              Contact Sales →
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Satisfaction Guaranteed</h3>
            <p className="text-sm text-muted-foreground">
              If you're not satisfied with our service, we offer a 30-day money-back guarantee.
            </p>
            <Button variant="link" className="p-0">
              Learn More →
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground">
              Find answers to common questions about our plans, features, and billing.
            </p>
            <Button variant="link" className="p-0">
              View FAQ →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

