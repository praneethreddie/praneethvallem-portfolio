import AnimatedSection from "./AnimatedSection";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="py-10 sm:py-16 px-2">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold font-inter hover:underline hover:text-accent cursor-pointer transition-colors">About Me</h2>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg mb-3 sm:mb-4 max-w-3xl">
          I’m passionate about building intelligent, modern web apps and automating tasks using AI and the latest tech. I thrive on integrating open-source tools, LLMs, and APIs to deliver supercharged solutions — all with a focus on keeping ahead of the curve.
        </p>
        <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 max-w-3xl">
          My workflow is powered by AI assistants, custom automations, and a toolkit of cutting-edge platforms. Whether it’s coding faster, analyzing data, or brainstorming creative ideas, I always put AI to work so I can deliver more, faster, and smarter.
        </p>

        {/* Technical Skills Section */}
        <div className="mb-1 flex items-center gap-1 sm:gap-2">
          <h3 className="text-2xl sm:text-3xl font-bold font-inter hover:underline hover:text-accent cursor-pointer transition-colors">Technical Skills</h3>
        </div>

        <FeaturesSectionWithHoverEffects />

        <div className="mt-4 sm:mt-6 text-center text-muted-foreground text-xs sm:text-sm animate-fade-in">
          <span className="inline-block px-3 py-1 bg-accent/10 rounded-full animate-fade-in">
            Always exploring the newest LLMs, APIs, and AI productivity hacks!
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
