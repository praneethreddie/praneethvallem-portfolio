import AnimatedSection from "./AnimatedSection";
import SphereImageGrid from "./SphereImageGrid";
import { Folder, Link as LinkIcon, Plus, Minus } from "lucide-react";
import Project3DLogo from "./Project3DLogo";
import React, { useState } from "react";

// Unsplash images based on the description/tech
const projectLogos: { [key: string]: string } = {
  uplyft: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=120&h=80&fit=cover",
  aircursor: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=80&fit=cover",
  Dreamer: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=120&h=80&fit=cover",
  "promtly ai": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&h=80&fit=cover",
};

// Short description helpers
const getShortDescription = (desc: string, length = 90) => {
  if (desc.length <= length) return desc;
  return desc.slice(0, length).trim() + "...";
};

// User's actual open-source projects from https://github.com/praneethreddie
const projects = [
  {
    name: "unhmegle",
    description:
      "A modern, real-time video chat application inspired by Omegle, built with React, Node.js, and WebRTC. Talk to strangers, make friends.",
    tech: ["React", "Node.js", "WebRTC", "JavaScript", "CSS", "HTML"],
    link: "https://github.com/praneethreddie/unhmegle",
    web: "https://uhmegle-e1kz.onrender.com/",
  },
  {
    name: "aircursor",
    description:
      "Air Cursor is a Python-based application that allows you to control your computer's cursor and perform window management actions using hand gestures captured through your webcam. It utilizes computer vision and hand tracking technology to create a touchless interface for your computer.",
    tech: ["Python"],
    link: "https://github.com/praneethreddie/aircursor",
  },
  {
    name: "Dreamer",
    description:
      "A dream interpretation tool that analyzes your dreams using Google Gemini API and generates image prompts for visualization.",
    tech: ["CSS", "JavaScript", "HTML"],
    link: "https://github.com/praneethreddie/Dreamer",
    web: "https://dreamerr.netlify.app/",
  },
  // --- New project "promtly ai" ---
  {
    name: "promtly ai",
    description:
      "Promtly.AI is a web application designed to help users enhance and optimize their AI prompts for better results when working with AI systems like ChatGPT, Claude, or other large language models.",
    tech: ["React", "TypeScript", "AI"],
    link: "https://github.com/praneethreddie/promtly.ai",
    web: "https://timely-moonbeam-c9de7b.netlify.app/",
  },
  // --- New project "realtime-webrtc-vlm" ---
  {
    name: "realtime-webrtc-vlm",
    description:
      "A real-time object detection system that streams video from your phone to a browser and overlays detection results using WebRTC technology.",
    tech: ["WebRTC", "Python", "Docker", "JavaScript"],
    link: "https://github.com/praneethreddie/realtime-webrtc-vlm",
  },
  // --- New project "admybrand" ---
  {
    name: "admybrand",
    description:
      "A complete landing page showcasing the ADmyBRAND AI Suite - an AI-powered marketing platform that helps businesses create content, analyze campaigns, and maintain brand consistency.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/praneethreddie/admybrand",
    web: "https://admybranddeploy.vercel.app/",
  },
];

export default function ProjectsSection() {
  // State to manage which project is "expanded"
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'sphere' | 'grid'>('sphere');

  // Create a duplicated list for the sphere to make it look full (approx 40 items)
  const sphereProjects = Array(10).fill(projects).flat();

  // Prepare image data for the sphere component
  const projectImages = sphereProjects.map((proj, index) => ({
    id: `${proj.name}-${index}`,
    src: projectLogos[proj.name] || "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=120&h=80&fit=cover",
    component: <div className="w-full h-full flex items-center justify-center scale-75"><Project3DLogo project={proj.name} /></div>,
    alt: proj.name,
    title: proj.name,
    description: proj.description,
    link: proj.link,
    web: proj.web,
    tech: proj.tech,
  }));

  return (
    <AnimatedSection id="projects" className="py-16 lg:py-24 bg-muted/40">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center font-inter">
          Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-10">
          Here are some of my open-source and productivity-focused projects. Discover more on my{" "}
          <a
            href="https://github.com/praneethreddie"
            className="underline hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>.
        </p>

        {/* View Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-secondary/50 p-1 rounded-lg inline-flex border border-border/50 backdrop-blur-sm">
            <button
              onClick={() => setViewMode('sphere')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'sphere' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              3D Sphere
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Sphere View */}
        {viewMode === 'sphere' && (
          <div className="flex justify-center mb-12 animate-fade-in">
            <SphereImageGrid images={projectImages} containerSize={600} sphereRadius={280} autoRotate={true} />
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {projects.map((proj) => {
              const isExpanded = expanded === proj.name;
              return (
                <div
                  key={proj.name}
                  className="group bg-background rounded-xl border border-border/70 shadow-sm hover:shadow-xl transition-shadow p-6 flex flex-col h-full"
                  tabIndex={0}
                  aria-label={proj.name}
                >
                  {/* 3D Logo and Title Row */}
                  <div className="flex items-center mb-3 gap-3">
                    <Project3DLogo project={proj.name} />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Folder className="text-foreground w-5 h-5" aria-hidden />
                        <h3 className="font-semibold text-lg md:text-xl text-foreground group-hover:text-foreground transition-colors truncate">
                          {proj.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs mt-2">
                        {proj.tech.map((t) => (
                          <span key={t} className="bg-primary/10 py-1 px-2 rounded font-medium text-primary">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Description with More/Less toggle */}
                  <div className="mb-2 flex-1">
                    <span className="text-muted-foreground text-sm leading-relaxed block">
                      {isExpanded ? proj.description : getShortDescription(proj.description)}
                    </span>
                    {proj.description.length > 90 && (
                      <button
                        className="mt-1 text-foreground hover:underline hover-scale text-xs flex gap-1 items-center font-medium"
                        onClick={() =>
                          setExpanded(isExpanded ? null : proj.name)
                        }
                        aria-label={isExpanded ? "Show less" : "Show more"}
                      >
                        {isExpanded ? (
                          <>
                            Show less <Minus className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            Show more <Plus className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {/* View links aligned at the bottom */}
                  <div className="mt-auto flex flex-col gap-2">
                    {/* If project has live web link, show "Web App" link */}
                    {"web" in proj && proj.web && (
                      <a
                        href={proj.web}
                        className="flex items-center text-green-600 hover:underline underline-offset-2 font-medium text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={0}
                      >
                        <LinkIcon className="w-4 h-4 mr-1" /> Web App
                      </a>
                    )}
                    <a
                      href={proj.link}
                      className="flex items-center text-foreground hover:underline underline-offset-2 font-medium text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={0}
                    >
                      <LinkIcon className="w-4 h-4 mr-1" /> View Project
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
