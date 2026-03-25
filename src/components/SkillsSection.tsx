const skills = [
  { name: "Python", description: "Backend systems, data analysis, and automation scripts." },
  { name: "HTML", description: "Crafting semantic and accessible markup for modern web applications." },
  { name: "CSS", description: "Designing responsive and visually stunning user interfaces." },
  { name: "JavaScript", description: "Dynamic client-side functionality and server-side logic." },
  { name: "SQL", description: "Relational database design and query optimization." },
  { name: "MongoDB", description: "NoSQL databases for flexible, scalable data management." },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
      <h2
        className="text-4xl sm:text-5xl tracking-[-1.5px] text-foreground mb-12"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Technical <em className="not-italic text-muted-foreground">skills</em>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="liquid-glass rounded-2xl p-6 hover:scale-[1.03] transition-transform cursor-default group"
          >
            <h3 className="text-foreground text-lg font-medium mb-2">{skill.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
