
const Footer = () => (
  <footer className="w-full border-t bg-background border-border mt-auto py-8">
    <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
      <div>
        © {new Date().getFullYear()} Praneeth Reddy. All rights reserved.
      </div>
      <div className="flex gap-4">
        <a
          href="mailto:praneethreddyvallem@gmail.com"
          className="hover:text-accent transition-colors"
        >
          Email
        </a>
        <a
          href="https://github.com/praneethreddie"
          target="_blank"
          rel="noopener"
          className="hover:text-accent transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener"
          className="hover:text-accent transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="tel:8096008301"
          className="hover:text-accent transition-colors"
        >
          Phone
        </a>
        <a
          href="https://wa.me/8096008301"
          target="_blank"
          rel="noopener"
          className="hover:text-accent transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
