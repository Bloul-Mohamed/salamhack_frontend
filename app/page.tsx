import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
// import { TemplateShowcase } from "@/components/template-showcase"
import { TestimonialSection } from "@/components/testimonial-section"
import { PricingSection } from "@/components/pricing-section"
// import { ResumeScoreChecker } from "@/components/resume-score-checker"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <FeatureSection />
      {/* <TemplateShowcase /> */}
      {/* <ResumeScoreChecker /> */}
      <TestimonialSection />
      <PricingSection />
    </div>
  )
}