
import AnimatedSection from "./AnimatedSection";
// Use an allowed AI icon from lucide-react.
import { Brain, Zap, Cog } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const aiTools = [
  {
    name: "OpenAI (ChatGPT, GPT-4, Assistants)",
    description: "For brainstorming, coding, and automations in daily workflow.",
    icon: Brain,
  },
  {
    name: "Midjourney",
    description: "Generating creative assets and prototypes with generative AI.",
    icon: Zap,
  },
  {
    name: "LangChain",
    description: "Building advanced AI-powered workflows and automations.",
    icon: Cog,
  },
];

export default function AboutSection() {
  const [loading, setLoading] = useState(true);

  // Simulate animation with skeleton shimmer.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedSection id="about" className="py-10 sm:py-16 px-2">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 animate-fade-in">
          <Brain className="text-accent w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl font-bold font-inter hover:underline hover:text-accent cursor-pointer transition-colors">About Me</h2>
        </div>
        <p className="text-muted-foreground text-base sm:text-lg mb-3 sm:mb-4">
          I’m passionate about building intelligent, modern web apps and automating tasks using AI and the latest tech. I thrive on integrating open-source tools, LLMs, and APIs to deliver supercharged solutions — all with a focus on keeping ahead of the curve.
        </p>
        <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">
          My workflow is powered by AI assistants, custom automations, and a toolkit of cutting-edge platforms. Whether it’s coding faster, analyzing data, or brainstorming creative ideas, I always put AI to work so I can deliver more, faster, and smarter.
        </p>

        {/* Animated AI Tools Section */}
        <div className="mb-1 flex items-center gap-1 sm:gap-2">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent animate-pulse" />
          <h3 className="text-lg sm:text-xl font-semibold font-inter text-foreground tracking-tight hover:text-accent transition-colors cursor-pointer">AI Tools &amp; Platforms I Use</h3>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-2 sm:mt-4">
          {aiTools.map((tool, idx) =>
            loading ? (
              <Skeleton key={tool.name} className="h-28 sm:h-32 w-full" />
            ) : (
              <div
                key={tool.name}
                className="bg-muted/40 border border-border rounded-lg p-3 sm:p-4 flex flex-col items-center shadow-md hover:scale-105 active:scale-95 focus-within:scale-105 transition-transform animate-fade-in cursor-pointer"
                style={{ animationDelay: `${0.08 * idx + 0.1}s` }}
                tabIndex={0}
              >
                <tool.icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-1 sm:mb-2 animate-pulse" />
                <div className="font-bold text-foreground text-center mb-0.5 sm:mb-1">{tool.name}</div>
                <div className="text-muted-foreground text-xs sm:text-sm text-center">{tool.description}</div>
              </div>
            )
          )}
        </div>
        <div className="mt-4 sm:mt-6 text-center text-muted-foreground text-xs sm:text-sm animate-fade-in">
          <span className="inline-block px-3 py-1 bg-accent/10 rounded-full animate-fade-in">
            Always exploring the newest LLMs, APIs, and AI productivity hacks!
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
