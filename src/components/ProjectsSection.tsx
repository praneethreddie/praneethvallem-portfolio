import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import StackedProjectCards from "@/components/ui/glass-cards";

const projects = [
  {
    title: "unhmegle",
    description: "A modern, real-time video chat application inspired by Omegle, built with React, Node.js, and WebRTC.",
    tech: ["React", "Node.js", "WebRTC"],
    github: "https://github.com/praneethreddie/unhmegle",
    live: "https://uhmegle-e1kz.onrender.com/",
  },
  {
    title: "aircursor",
    description: "Control your computer's cursor using hand gestures captured through your webcam with computer vision.",
    tech: ["Python", "OpenCV"],
    github: "https://github.com/praneethreddie/aircursor",
  },
  {
    title: "Dreamer",
    description: "A dream interpretation tool that analyzes dreams using Google Gemini API and generates image prompts.",
    tech: ["JavaScript", "CSS", "Gemini API"],
    github: "https://github.com/praneethreddie/Dreamer",
    live: "https://dreamerr.netlify.app/",
  },
  {
    title: "promtly",
    description: "A extension that enhance and optimize AI prompts for better results with ChatGPT, Claude, and other LLMs.",
    tech: ["React", "TypeScript", "AI"],
    github: "https://github.com/praneethreddie/promptly-extension-/blob/main/README.md",
    Demo: "https://www.linkedin.com/posts/praneethreddyvallem_your-prompts-probably-suck-mine-did-too-activity-7413911619845517312-b4dl?utm_source=share&utm_medium=member_desktop&rcm=ACoAADx7214B_u5Q0EqIOzLaZV4M7auU5throxI",
    Download: "https://github.com/praneethreddie/promptly-extension-/archive/refs/heads/main.zip",
  },
  {
    title: "realtime-webrtc-vlm",
    description: "Real-time object detection streaming video from phone to browser with WebRTC overlay results.",
    tech: ["WebRTC", "Python", "Docker"],
    github: "https://github.com/praneethreddie/realtime-webrtc-vlm",
  },
  {
    title: "admybrand",
    description: "Landing page for ADmyBRAND AI Suite — an AI-powered marketing platform for content and campaigns.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/praneethreddie/admybrand",
    live: "https://admybranddeploy.vercel.app/",
  },
  {
    title: "JNTU Results Bot",
    description: "A Telegram bot that fetches JNTUH student academic results when provided with a roll number.",
    tech: ["Python", "Telegram API"],
    github: "https://github.com/praneethreddie/jnturesultsbot",
    live: "https://t.me/jnturesultscheckerbot",
  },
  {
    title: "VC Discovery Dashboard",
    description: "A high-fidelity VC discovery interface designed for professional venture capital workflows. Build with Next.js, Clerk, and AI-powered enrichment to help VCs discover, manage, and track high-growth startups globally.",
    tech: ["Next.js", "Clerk", "AI"],
    github: "https://github.com/praneethreddie/dashboard-for-vc",
    live: "https://dashboard-for-vc-cvai.vercel.app",
  },
  {
    title: "Fahh - Sound on Error",
    description: "A VS Code extension that plays a 'fahh' sound whenever your code encounters an error. Never miss a mistake again!",
    tech: ["VS Code", "TypeScript", "Audio"],
    github: "https://github.com/praneethreddie/fahh-sound-on-error",
    Download: "https://github.com/praneethreddie/fahh-sound-on-error/releases/tag/fahh",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let lastY = window.scrollY;

    const updateVisibility = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const currentY = window.scrollY;

      // Show controls while the projects section overlaps the viewport.
      const isInView = rect.top < viewportHeight * 0.85 && rect.bottom > viewportHeight * 0.15;
      setShowScrollButtons(isInView);

      if (currentY !== lastY) {
        setScrollDirection(currentY > lastY ? "down" : "up");
        lastY = currentY;
      }
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDirectionalScroll = () => {
    if (scrollDirection === "up") {
      scrollToTop();
      return;
    }
    scrollToBottom();
  };

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
      <h2
        className="text-4xl sm:text-5xl tracking-[-1.5px] text-foreground mb-12"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Projects
      </h2>

      <StackedProjectCards projects={projects} />

      {showScrollButtons && (
        <div className="fixed right-5 bottom-5 z-[120] flex flex-col gap-3">
          <button
            type="button"
            onClick={handleDirectionalScroll}
            aria-label={scrollDirection === "up" ? "Go to top" : "Go to bottom"}
            className="liquid-glass rounded-full p-3 text-foreground border border-white/35 bg-white/12 hover:bg-white/24 transition-colors"
          >
            {scrollDirection === "up" ? (
              <ArrowUp className="w-6 h-6" />
            ) : (
              <ArrowDown className="w-6 h-6" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
