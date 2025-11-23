
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between py-2 md:py-3 px-2 sm:px-4">
        <div className="text-xl sm:text-2xl font-bold text-foreground font-inter select-none">MyPortfolio</div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-accent hover:scale-110 transition-all px-2 py-1 font-medium text-base md:text-lg focus-visible:outline-2 focus-visible:rounded cursor-pointer"
                tabIndex={0}
              >
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(val => !val)}
            className="md:hidden p-2 rounded hover:bg-muted/50 hover:scale-110 transition focus-visible:outline"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile slide-down */}
      {menuOpen && (
        <div className="md:hidden animate-fade-in-up bg-background border-t border-border shadow-md">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 px-5 sm:px-8 hover:bg-accent/10 hover:scale-105 transition border-b border-border last:border-0 text-base sm:text-lg"
              onClick={() => setMenuOpen(false)}
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
