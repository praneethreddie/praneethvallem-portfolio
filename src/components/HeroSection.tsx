import { Mail, Github, Linkedin, Phone, MessageCircle, Download } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const profilePicUrl =
  "/lovable-uploads/f41ea533-789d-477a-b648-e00a620ee382.png";

const RESUME_URL =
  "https://drive.google.com/file/d/1smPHomWOj9TjDg9NdnLdiPi9W0nPK6Zy/view?usp=sharing";

export default function HeroSection() {
  // --- Scroll reveal for CTA and icons
  return (
    <AnimatedSection
      id="home"
      className="w-full pt-8 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center min-h-[40vh] bg-gradient-to-b from-accent/5 via-transparent to-transparent relative"
    >
      {/* Resume Button Top Right */}
      <div className="absolute top-4 right-3 sm:top-5 sm:right-5 z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-foreground text-foreground font-medium shadow bg-accent/10 hover:bg-accent/20 transition hover:scale-105"
              aria-label="Open Resume"
            >
              Resume
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-full">
            <DialogHeader className="flex flex-col items-center gap-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <DialogTitle className="text-foreground text-2xl font-bold mb-2 text-center w-full md:w-auto">
                  Resume
                </DialogTitle>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Resume (opens Google Drive)"
                  className="self-center md:self-auto mt-2 md:mt-0"
                >
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 text-foreground font-semibold border-foreground border hover:bg-accent/10 hover:text-background transition hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </a>
              </div>
            </DialogHeader>
            <div className="px-2 pb-2 max-h-[60vh] overflow-y-auto font-inter text-[15px] text-foreground space-y-7 text-left">
              {/* CONTACT */}
              <section className="space-y-1 animate-fade-in">
                <h2 className="text-foreground font-semibold mb-1 text-lg">Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                  <div className="flex items-center gap-2 hover-scale cursor-pointer">
                    <Mail className="w-4 h-4 min-w-[16px]" />
                    <span className="font-semibold">Email:</span>
                    <a
                      href="mailto:Praneethreddyvallem@gmail.com"
                      className="ml-1 text-foreground underline break-all transition-colors hover:text-foreground/80" tabIndex={0}
                    >
                      Praneethreddyvallem@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 hover-scale cursor-pointer">
                    <Phone className="w-4 h-4 min-w-[16px]" />
                    <span className="font-semibold">Mobile:</span>
                    <a
                      href="tel:+918096008301"
                      className="ml-1 text-foreground underline transition-colors hover:text-foreground/80"
                    >
                      +91 8096008301
                    </a>
                  </div>
                  <div className="flex items-center gap-2 hover-scale cursor-pointer">
                    <Linkedin className="w-4 h-4 min-w-[16px]" />
                    <span className="font-semibold">LinkedIn:</span>
                    <a
                      href="https://www.linkedin.com/in/praneethreddyvallem"
                      target="_blank"
                      rel="noopener"
                      className="ml-1 text-foreground underline break-all transition-colors hover:text-foreground/80"
                    >
                      www.linkedin.com/in/praneethreddyvallem
                    </a>
                  </div>
                  <div className="flex items-center gap-2 hover-scale cursor-pointer">
                    <MessageCircle className="w-4 h-4 min-w-[16px]" />
                    <span className="font-semibold">WhatsApp:</span>
                    <a
                      href="https://wa.me/918096008301"
                      target="_blank"
                      rel="noopener"
                      className="ml-1 text-foreground underline transition-colors hover:text-foreground/80"
                    >
                      91 8096008301
                    </a>
                  </div>
                </div>
              </section>
              {/* OBJECTIVE */}
              <section className="animate-fade-in">
                <h2 className="text-foreground font-semibold mb-1 text-lg">Objective</h2>
                <p className="text-pretty leading-relaxed">
                  Motivated and detail-oriented B.Tech student seeking an opportunity to apply and enhance programming skills in a professional environment.
                  Committed to contributing to the success of a dynamic organization while gaining valuable industry experience.
                  Data-driven AI Engineer with a strong background in statistical analysis and predictive modeling. Proficient in programming languages such as Python, adept at leveraging big data to develop AI systems that optimize business processes.
                </p>
              </section>
              {/* ACADEMIC PROFILE */}
              <section className="animate-fade-in space-y-2">
                <h2 className="text-foreground font-semibold mb-1 text-lg">Academic Profile</h2>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <span className="font-medium">
                      BE in CSE (Artificial Intelligence &amp; Machine Learning)
                    </span>, Jawaharlal Nehru Technological University Hyderabad, 2022 - 2026
                    <div className="ml-4 text-muted-foreground">CGPA: 7 (up to 6th semester)</div>
                  </li>
                  <li>
                    <span className="font-medium">Higher Secondary</span>, Narayana Junior College, Hyderabad, 2020 - 2022
                    <div className="ml-4 text-muted-foreground">Passed out with 83%</div>
                  </li>
                  <li>
                    <span className="font-medium">Class X</span>, Gurkul Vindhyapeeth High School, Hyderabad, 2020
                    <div className="ml-4 text-muted-foreground">Passed out with 100%</div>
                  </li>
                </ul>
              </section>
              {/* CERTIFICATIONS */}
              <section className="animate-fade-in space-y-1">
                <h2 className="text-foreground font-semibold mb-1 text-lg">Certifications</h2>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Introduction to Python from Cisco Technologies (Sep 2023)</li>
                  <li>Introduction to Data Science from Cisco Technologies (Mar 2024)</li>
                  <li>Introduction to Artificial Intelligence from IBM Skills Build (Dec 2023)</li>
                  <li>Amazon Web Services from Udemy (Jan 2024)</li>
                  <li>Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (2025)</li>
                </ul>
              </section>
              {/* KEY SKILLS */}
              <section className="animate-fade-in space-y-1">
                <h2 className="text-foreground font-semibold mb-1 text-lg">Key Skills</h2>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li className="hover-scale transition-all">Programming Languages: C, Python</li>
                  <li className="hover-scale transition-all">Web Development (HTML, CSS, JavaScript)</li>
                  <li className="hover-scale transition-all">Database Management (SQL)</li>
                  <li className="hover-scale transition-all">Adaptability</li>
                  <li className="hover-scale transition-all">Communication skills</li>
                  <li className="hover-scale transition-all">Teamwork and Collaboration</li>
                  <li className="hover-scale transition-all">Familiar with modern Ai Tools</li>
                </ul>
              </section>
              {/* EXTRA CURRICULAR ACTIVITIES */}
              <section className="animate-fade-in">
                <h2 className="text-foreground font-semibold mb-1 text-lg">Extra Curricular Activities</h2>
                <ul className="list-disc list-inside pl-4">
                  <li className="hover-scale transition-all">Participated in District Level Skating Competition, March 2019</li>
                </ul>
              </section>
              {/* PERSONAL INFORMATION (At the bottom) */}
              <section className="animate-fade-in">
                <h2 className="text-foreground font-semibold mb-1 text-lg">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-pretty">
                  <div>
                    <span className="font-semibold">Residing Address:</span>{" "}
                    Flat no. 202 sai ragavendra arcade,Lb nagar, Hyderabad
                  </div>
                  <div>
                    <span className="font-semibold">Date of Birth:</span> 1st January 2005
                  </div>
                  <div>
                    <span className="font-semibold">Languages Known:</span> Telugu, Hindi, English
                  </div>
                  <div>
                    <span className="font-semibold">Interests:</span> Playing Cricket, Listening to Podcasts, Watching Movies
                  </div>
                </div>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Centered Profile and Info */}
      <div className="flex flex-col items-center px-2 w-full">
        <img
          src={profilePicUrl}
          alt="Praneeth Reddy"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-accent/40 shadow-lg object-cover bg-muted mb-4 sm:mb-6 hover:scale-105 transition-transform duration-300"
          width={128}
          height={128}
          loading="eager"
        />
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold font-inter mb-2 text-foreground text-center animate-fade-in-up transition-transform leading-tight px-2">
          Hi, I'm{" "}
          <span className="text-foreground hover:underline transition-all cursor-pointer">Praneeth Reddy</span>
        </h1>
        <p className="max-w-screen-sm text-base xs:text-lg sm:text-xl text-muted-foreground text-center mb-6 animate-fade-in px-2">
          I’m a <span className="font-semibold text-foreground hover:underline cursor-pointer">Full-Stack Developer</span> &amp; <span className="font-semibold text-foreground hover:underline cursor-pointer">AI Enthusiast</span> who uses AI and automation to solve real-world problems and boost productivity. Always on top of the latest tools and trends, I bring the future to my workflow.
        </p>
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center w-full">
          <a
            href="mailto:praneethreddyvallem@gmail.com"
            className="inline-flex items-center w-full xs:w-auto justify-center px-4 sm:px-6 py-2 bg-primary dark:bg-accent text-primary-foreground dark:text-white rounded-lg font-semibold shadow hover:scale-110 focus-visible:ring-2 ring-primary/40 dark:ring-accent/40 transition-transform animate-fade-in cursor-pointer"
            tabIndex={0}
          >
            <Mail className="w-5 h-5 mr-2 animate-pulse" />
            Get in Touch
          </a>
          <div className="flex flex-wrap gap-3 xs:gap-3 justify-center items-center w-full xs:w-auto">
            <a
              href="https://github.com/praneethreddie"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="rounded-full p-2 border border-accent/70 bg-background hover:bg-accent/20 hover:scale-110 focus-visible:ring-2 ring-accent transition shadow-md"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/praneethreddyvallem"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="rounded-full p-2 border border-accent/70 bg-background hover:bg-accent/20 hover:scale-110 focus-visible:ring-2 ring-accent transition shadow-md"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="tel:8096008301"
              aria-label="Phone"
              className="rounded-full p-2 border border-accent/70 bg-background hover:bg-accent/20 hover:scale-110 focus-visible:ring-2 ring-accent transition shadow-md"
            >
              <Phone className="w-6 h-6" color="#06b6d4" />
            </a>
            <a
              href="https://wa.me/918096008301"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="rounded-full p-2 border border-accent/70 bg-background hover:bg-accent/20 hover:scale-110 focus-visible:ring-2 ring-accent transition shadow-md"
            >
              <MessageCircle className="w-6 h-6" color="#22c55e" />
            </a>
          </div>
        </div>
      </div>
      {/* Floating Action Button for Scroll to Top */}
      <div className="fixed right-3 bottom-4 sm:right-5 sm:bottom-8 z-50">
        <ScrollToTopFAB />
      </div>
    </AnimatedSection>
  );
}

// NOTE: This file is getting pretty large. Please consider refactoring HeroSection into smaller focused components (e.g., ResumeDialog, ContactLinks, etc) for maintainability and reusability!

import ScrollToTopFAB from "./ScrollToTopFAB";
