import { Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'About', url: '#about', icon: User },
    { name: 'Contact', url: '#contact', icon: FileText }
  ];

  return (
    <>
      <NavBar items={navItems} />
      <div className="fixed top-5 left-5 z-50">
        <ThemeToggle />
      </div>
    </>
  );
};

export default Navbar;
