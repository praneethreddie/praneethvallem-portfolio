import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Video Background - fixed to viewport */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-background/25 z-[1]" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 liquid-glass backdrop-blur-md">
          <div className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
            <a
              href="#"
              className="text-3xl tracking-tight text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Praneeth<sup className="text-xs">®</sup>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="https://drive.google.com/file/d/1_S3lY7HOEo43PmE_86OYc0ebKhHp4nfH/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Resume
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center px-6 pt-32 pb-40">
          <h1
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Hi, I'm{" "}
            <em className="not-italic text-muted-foreground">Praneeth</em>{" "}
            Reddy
          </h1>

          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
            Full-Stack Developer & AI Enthusiast who uses AI and automation to
            solve real-world problems and boost productivity. Always on top of
            the latest tools and trends.
          </p>

          <div className="animate-fade-rise-delay-2 flex gap-4 mt-12">
            <a
              href="#projects"
              className="liquid-glass rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="liquid-glass rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
        </section>

        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
