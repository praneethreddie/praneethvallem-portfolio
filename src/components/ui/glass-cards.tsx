import { Download, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface StackedProject {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  Download?: string;
  Demo?: string;
}

interface StackedProjectCardsProps {
  projects: StackedProject[];
}

export default function StackedProjectCards({ projects }: StackedProjectCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headingRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const detailsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeBoostRefs = useRef<boolean[]>([]);
  const [anchorProgress, setAnchorProgress] = useState(0);

  const boostCardReadability = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    activeBoostRefs.current[index] = true;
    gsap.to(card, {
      filter: "saturate(1.01) brightness(1.005)",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(255,255,255,0.02)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const updateAnchorProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalTravel = Math.max(1, rect.height + viewportHeight);
      const rawProgress = (viewportHeight - rect.top) / totalTravel;
      const nextProgress = Math.max(0, Math.min(1, rawProgress));
      setAnchorProgress(nextProgress);
    };

    const updateBackStackVisibility = () => {
      // Use a lower trigger line so the next card becomes active later,
      // avoiding a visible gap during handoff.
      const triggerLine = window.innerHeight * 0.5;
      let activeIndex = 0;

      containerRefs.current.forEach((container, index) => {
        if (!container) return;
        const { top } = container.getBoundingClientRect();
        if (top <= triggerLine) {
          activeIndex = index;
        }
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const details = detailsRefs.current[index];
        const heading = headingRefs.current[index];

        const behindCount = activeIndex - index;
        if (behindCount <= 0) {
          gsap.to(card, {
            autoAlpha: 1,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.set(card, { pointerEvents: "auto" });

          // Ensure the top/active card always keeps text fully visible,
          // including when user scrolls back upward.
          if (details) {
            gsap.set(details, {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
            });
          }
          if (heading) {
            gsap.set(heading, { opacity: 1 });
          }
          return;
        }

        if (behindCount > 2) {
          gsap.to(card, {
            autoAlpha: 0,
            duration: 0.28,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.set(card, { pointerEvents: "none" });
          return;
        }

        const visibleOpacity = behindCount === 1 ? 0.72 : 0.48;
        gsap.to(card, {
          autoAlpha: visibleOpacity,
          duration: 0.24,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.set(card, { pointerEvents: "auto" });
      });
    };

    const handleWindowScroll = () => {
      const hasBoostedCard = activeBoostRefs.current.some(Boolean);
      if (hasBoostedCard) {
        activeBoostRefs.current.forEach((isBoosted, index) => {
          if (!isBoosted) return;

          const card = cardRefs.current[index];
          if (!card) return;

          activeBoostRefs.current[index] = false;

          gsap.to(card, {
            filter: "saturate(1) brightness(1)",
            boxShadow: "0 0 0 0 rgba(0,0,0,0)",
            duration: 0.24,
            ease: "power2.out",
          });
        });
      }

      updateBackStackVisibility();
      updateAnchorProgress();
    };

    const handleWindowResize = () => {
      updateBackStackVisibility();
      updateAnchorProgress();
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleWindowResize);

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        const container = containerRefs.current[index];
        const heading = headingRefs.current[index];
        const details = detailsRefs.current[index];
        if (!card || !container) return;

        const targetScale = 1 - (projects.length - index - 1) * 0.04;

        gsap.set(card, {
          scale: 1,
          y: 28,
          opacity: 0,
          transformOrigin: "center top",
          filter: "saturate(1) brightness(1)",
        });

        if (details) {
          gsap.set(details, { opacity: 1, y: 0 });
        }

        if (heading) {
          gsap.set(heading, { opacity: 1 });
        }

        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        ScrollTrigger.create({
          trigger: container,
          start: "top 62%",
          end: "bottom 24%",
          scrub: true,
          onUpdate: (self) => {
            const scale = gsap.utils.interpolate(1, targetScale, self.progress);
            // Keep details fully visible while card is the main/top card.
            // Fade only near the end, when the next card takes focus.
            const fadeStart = 0.78;
            const fadeProgress = Math.max(0, Math.min(1, (self.progress - fadeStart) / (1 - fadeStart)));
            const detailsOpacity = 1 - fadeProgress;
            const detailsYOffset = gsap.utils.interpolate(0, 14, fadeProgress);
            const headingOpacity = gsap.utils.interpolate(1, 0.58, fadeProgress);

            gsap.set(card, {
              scale: Math.max(scale, targetScale),
              transformOrigin: "center top",
            });
            if (details) {
              gsap.set(details, {
                opacity: detailsOpacity,
                y: detailsYOffset,
                pointerEvents: detailsOpacity < 0.15 ? "none" : "auto",
              });
            }
            if (heading) {
              gsap.set(heading, { opacity: headingOpacity });
            }
          },
        });
      });
    }, sectionRef);

    updateBackStackVisibility();
    updateAnchorProgress();

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleWindowResize);
      ctx.revert();
    };
  }, [projects.length]);

  const dynamicStickyTop = Math.max(-12, 3 - anchorProgress * 16);
  const dynamicTopPadding = Math.max(1.5, 10 - anchorProgress * 12);

  return (
    <div ref={sectionRef} className="w-full">
      {projects.map((project, index) => {
        return (
          <div
            key={project.title}
            ref={(el) => {
              containerRefs.current[index] = el;
            }}
            className="h-[100vh] sm:h-[104vh] flex items-start justify-center sticky"
            style={{
              top: `${dynamicStickyTop}vh`,
              paddingTop: `${dynamicTopPadding}vh`,
            }}
          >
            <div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="relative w-full max-w-4xl rounded-2xl p-[2px]"
              style={{
                top: `calc(-2vh + ${index * 30}px)`,
                background:
                  "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.04) 76deg, rgba(255,255,255,0.01) 180deg, rgba(255,255,255,0.03) 294deg, rgba(255,255,255,0) 360deg)",
              }}
            >
              <article
                onClick={() => boostCardReadability(index)}
                className="liquid-glass rounded-2xl p-7 sm:p-9 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] backdrop-blur-md relative overflow-hidden"
              >
                <div>
                  <h3
                    ref={(el) => {
                      headingRefs.current[index] = el;
                    }}
                    className="relative z-[1] text-3xl sm:text-4xl text-foreground mb-3 tracking-tight"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {project.title}
                  </h3>
                  <div
                    ref={(el) => {
                      detailsRefs.current[index] = el;
                    }}
                    className="relative z-[1]"
                  >
                    <p className="text-foreground/95 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-7">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm px-3.5 py-1.5 rounded-full border border-white/25 bg-white/5 text-foreground/85"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base text-white px-5 py-2 rounded-full border border-white/25 bg-white/2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-white/6 hover:border-white/45 transition-colors"
                      >
                        <Github className="w-5 h-5" /> Code
                      </a>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-base text-white px-5 py-2 rounded-full border border-white/25 bg-white/2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-white/6 hover:border-white/45 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" /> Live
                        </a>
                      )}

                      {project.Download && (
                        <a
                          href={project.Download}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-base text-white px-5 py-2 rounded-full border border-white/25 bg-white/2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-white/6 hover:border-white/45 transition-colors"
                        >
                          <Download className="w-5 h-5" /> Download
                        </a>
                      )}

                      {project.Demo && (
                        <a
                          href={project.Demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-base text-white px-5 py-2 rounded-full border border-white/25 bg-white/2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-white/6 hover:border-white/45 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        );
      })}

      {/* Extra trailing space keeps the final card centered before section exits. */}
      <div aria-hidden="true" className="h-[92vh] sm:h-[110vh]" />
    </div>
  );
}
