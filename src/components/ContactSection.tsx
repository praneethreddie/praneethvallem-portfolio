import { Github, Linkedin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
      <h2
        className="text-4xl sm:text-5xl tracking-[-1.5px] text-foreground mb-12"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Get in <em className="not-italic text-muted-foreground">touch</em>
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:Praneethreddyvallem@gmail.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Praneethreddyvallem@gmail.com
            </a>
            <a
              href="https://wa.me/918096008301"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              +91 8096008301
            </a>
            <a
              href="https://www.linkedin.com/in/praneethreddyvallem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Linkedin className="w-4 h-4" />
              linkedin.com/in/praneethreddyvallem
            </a>
            <a
              href="https://github.com/praneethreddie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              github.com/praneethreddie
            </a>
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-6">
          <p
            className="text-2xl text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Let's build something <em className="not-italic text-muted-foreground">together.</em>
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:Praneethreddyvallem@gmail.com"
              className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground hover:scale-[1.03] transition-transform"
            >
              Send Email
            </a>
            <a
              href="https://wa.me/918096008301"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground hover:scale-[1.03] transition-transform"
            >
              WhatsApp
            </a>
          </div>
          <a
            href="https://drive.google.com/file/d/1_S3lY7HOEo43PmE_86OYc0ebKhHp4nfH/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            View Resume ↗
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Praneeth Reddy. All rights reserved.
      </div>
    </section>
  );
};

export default ContactSection;
