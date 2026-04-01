
import HeroSection from "@/components/home/HeroSection";
import LogoStrip from "@/components/home/LogoStrip";
import HowItWorks from "@/components/home/HowItWorks";
import MetricsBanner from "@/components/home/MetricsBanner";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/ui/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <LogoStrip />
      <HowItWorks />
      <MetricsBanner />
      <Testimonials />
      <CTASection 
        title="Ready to get started?"
        subtitle="Join thousands of satisfied customers"
        primaryLabel="Get Started"
        primaryHref="/signup"
        secondaryLabel="Learn More"
        secondaryHref="/about"
      />
    </div>
  );
}