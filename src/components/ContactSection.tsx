
import AnimatedSection from "./AnimatedSection";
import { MessageCircle, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  // State for dialog/modal prompt
  const [showDialog, setShowDialog] = useState(false);
  // Store form data for later use in dialog
  const [draftData, setDraftData] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    setDraftData({ name, email, message });
    setShowDialog(true);
  }

  // Email and WhatsApp draft logic
  function handleSend(option: "email" | "whatsapp") {
    if (!draftData) return;
    const { name, email, message } = draftData;
    const subject = `Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    if (option === "email") {
      const mailto = `mailto:ramana8096008301@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailto, "_blank");
    } else {
      // WhatsApp: use +91 8096008301 correctly
      const whatsapp = `https://wa.me/918096008301?text=${encodeURIComponent(subject + "\n" + body)}`;
      window.open(whatsapp, "_blank");
    }

    setShowDialog(false);
    setDraftData(null);
    formRef.current?.reset();
  }

  return (
    <AnimatedSection id="contact" className="py-10 sm:py-16 px-2 bg-muted/60">
      <div className="container mx-auto max-w-xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 animate-fade-in">
          <MessageCircle className="text-accent w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl font-bold font-inter hover:underline hover:text-accent cursor-pointer transition-colors">
            Contact
          </h2>
        </div>
        <p className="mb-4 sm:mb-6 text-muted-foreground text-sm sm:text-base text-center">
          Want to work together or have a question? Send me a message!
        </p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-background rounded-xl border border-border p-3 sm:p-6 flex flex-col gap-3 sm:gap-4 shadow"
          aria-label="Contact form"
        >
          <label className="sr-only" htmlFor="name">
            Name
          </label>
          <input
            className="border rounded p-2 sm:p-3 bg-muted/40"
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            required
            aria-required="true"
          />
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded p-2 sm:p-3 bg-muted/40"
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            autoComplete="email"
            required
            aria-required="true"
          />
          <label className="sr-only" htmlFor="message">
            Message
          </label>
          <textarea
            className="border rounded p-2 sm:p-3 bg-muted/40 resize-none h-24 sm:h-28"
            id="message"
            name="message"
            placeholder="Your Message"
            required
            aria-required="true"
          />
          <Button
            type="submit"
            className="inline-flex justify-center items-center px-3 sm:px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold shadow hover:scale-110 focus-visible:ring-2 ring-accent transition-transform duration-200 animate-fade-in text-sm sm:text-base"
          >
            Send Message
          </Button>
        </form>
      </div>
      {/* Dialog for choosing Email or WhatsApp */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How would you like to send your message?</DialogTitle>
            <DialogDescription>
              Choose your preferred method to send your message.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="default"
              onClick={() => handleSend("email")}
              className="w-full flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Send by Email
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSend("whatsapp")}
              className="w-full flex items-center gap-2"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
              Send by WhatsApp
            </Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => { setShowDialog(false); setDraftData(null); }}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
}
