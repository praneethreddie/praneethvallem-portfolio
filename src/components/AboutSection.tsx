const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
      <h2
        className="text-4xl sm:text-5xl tracking-[-1.5px] text-foreground mb-12"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        About <em className="not-italic text-muted-foreground">me</em>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            I'm passionate about building intelligent, modern web apps and automating tasks using AI and the latest tech. I thrive on integrating open-source tools, LLMs, and APIs to deliver supercharged solutions — all with a focus on keeping ahead of the curve.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            My workflow is powered by AI assistants, custom automations, and a toolkit of cutting-edge platforms. Whether it's coding faster, analyzing data, or brainstorming creative ideas, I always put AI to work so I can deliver more, faster, and smarter.
          </p>
          <div className="liquid-glass rounded-2xl px-6 py-4 inline-block">
            <p className="text-sm text-foreground">
              ✦ Always exploring the newest LLMs, APIs, and AI productivity hacks!
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="liquid-glass rounded-2xl p-6 space-y-4">
            <h3 className="text-foreground text-lg font-medium">Quick Facts</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border pb-2">
                <span>Location</span>
                <span className="text-foreground">Hyderabad, India</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span>Education</span>
                <span className="text-foreground">B.Tech CSE (AI & ML)</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span>University</span>
                <span className="text-foreground">JNTUH</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span>CGPA</span>
                <span className="text-foreground">7.0 / 10</span>
              </div>
              <div className="flex justify-between">
                <span>Languages</span>
                <span className="text-foreground">Telugu, Hindi, English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
