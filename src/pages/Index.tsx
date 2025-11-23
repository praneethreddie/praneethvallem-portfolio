
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { DotScreenShader } from "@/components/ui/dot-shader-background";
import { AuroraBackground } from "@/components/ui/aurora-background";

// Main portfolio layout
export default function Index() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex flex-col bg-background font-inter relative">
      <div className="fixed inset-0 z-0">
        {isDark ? (
          <DotScreenShader />
        ) : (
          <AuroraBackground className="h-full w-full">
            <div />
          </AuroraBackground>
        )}
      </div>
      <Navbar />
      <main className="flex flex-col flex-1 relative z-10">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
