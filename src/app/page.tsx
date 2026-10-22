import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { LanguageLab } from "@/components/language-lab";
import { Marquee } from "@/components/marquee";
import { ProcessSection } from "@/components/process-section";
import { QuoteBand } from "@/components/quote-band";
import { WorkSection } from "@/components/work-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <WorkSection />
      <AboutSection />
      <QuoteBand />
      <LanguageLab />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
