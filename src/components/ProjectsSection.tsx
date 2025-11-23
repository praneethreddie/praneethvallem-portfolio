import AnimatedSection from "./AnimatedSection";
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
];

export default function ProjectsSection() {
  // State to manage which project is "expanded"
  const [expanded, setExpanded] = useState<string | null>(null);

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
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj) => {
            const isExpanded = expanded === proj.name;
            return (
              <div
                key={proj.name}
                className="group bg-background rounded-xl border border-border/70 shadow-sm hover:shadow-xl transition-shadow p-6 flex flex-col h-full animate-fade-in"
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
      </div>
    </AnimatedSection>
  );
}
