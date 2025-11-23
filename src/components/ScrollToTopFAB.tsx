
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopFAB() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > 160);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="bg-accent text-accent-foreground rounded-full shadow-lg p-3 animate-fade-in hover:scale-110 transition-transform focus-visible:ring-2 ring-accent"
      tabIndex={0}
      style={{ boxShadow: "0 2px 12px 0 rgba(99,102,241,.17)" }}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
