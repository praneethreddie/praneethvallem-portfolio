import { Award } from "lucide-react";

const education = [
  {
    degree: "B.E in CSE (AI & ML)",
    institution: "Jawaharlal Nehru Technological University, Hyderabad",
    period: "2022 – 2026",
    score: "CGPA: 7.0 (up to 6th semester)",
  },
  {
    degree: "Higher Secondary",
    institution: "Narayana Junior College, Hyderabad",
    period: "2020 – 2022",
    score: "83%",
  },
  {
    degree: "Class X",
    institution: "Gurkul Vindhyapeeth High School, Hyderabad",
    period: "2020",
    score: "100%",
  },
];

const certifications = [
  "Introduction to Python — Cisco Technologies (Sep 2023)",
  "Introduction to Data Science — Cisco Technologies (Mar 2024)",
  "Introduction to AI — IBM Skills Build (Dec 2023)",
  "Amazon Web Services — Udemy (Jan 2024)",
  "Oracle Cloud Infrastructure 2025 — AI Foundations Associate",
];

const EducationSection = () => {
  return (
    <section id="education" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
      <h2
        className="text-4xl sm:text-5xl tracking-[-1.5px] text-foreground mb-12"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Education & <em className="not-italic text-muted-foreground">certifications</em>
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Education */}
        <div className="space-y-6">
          <h3 className="text-foreground text-lg font-medium mb-4">Education</h3>
          {education.map((item) => (
            <div
              key={item.degree}
              className="liquid-glass rounded-2xl p-6 space-y-2"
            >
              <h4 className="text-foreground font-medium">{item.degree}</h4>
              <p className="text-muted-foreground text-sm">{item.institution}</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.period}</span>
                <span className="text-foreground">{item.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <h3 className="text-foreground text-lg font-medium mb-4">Certifications</h3>
          <div className="liquid-glass rounded-2xl p-6 space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <Award className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
