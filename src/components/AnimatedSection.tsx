
import { ReactNode } from "react";

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

const AnimatedSection = ({ id, className, children }: AnimatedSectionProps) => (
  <section
    id={id}
    tabIndex={-1}
    className={`animate-fade-in-up transition-all focus-visible:ring-2 ring-accent/70 ring-offset-2 outline-none ${className || ""}`}
  >
    {children}
  </section>
);

export default AnimatedSection;
