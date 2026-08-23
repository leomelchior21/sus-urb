"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Layers3, MapPinned, Route, Sprout, Users, Zap } from "lucide-react";
import { biomimicryStories } from "@/data/biomimicry";
import { cityProjects } from "@/data/projects";

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, ease: "easeOut" }
} as const;

const newImage = (name: string) => `/images/new/${name}`;

const saoImages = [
  {
    src: newImage("sao-paulo-aerial.jfif"),
    label: "Density",
    copy: "A city built upward, under pressure, full of possibility."
  },
  {
    src: newImage("sao-paulo-flood.jfif"),
    label: "Water",
    copy: "When rivers and rain meet too much concrete, infrastructure becomes visible."
  },
  {
    src: newImage("sao-paulo-traffic.jfif"),
    label: "Mobility",
    copy: "Every commute is also a design consequence."
  }
];

const bioImages: Record<string, string> = {
  Honeycomb: newImage("bio-sunflower.png"),
  Moss: newImage("bio-moss.png"),
  Mangrove: newImage("bio-mangrove.png"),
  Termite: newImage("bio-termite.png"),
  Cactus: newImage("bio-cactus.png")
};

const processImages = [
  newImage("process-sketch-1.jpeg"),
  newImage("process-sketch-2.jpeg"),
  newImage("process-sketch-3.jpeg"),
  newImage("process-sketch-4.jpeg"),
  newImage("process-model-1.jpeg"),
  newImage("process-model-2.jpeg"),
  "/images/img-32.jpeg",
  "/images/img-47.jpeg"
];

export function StoryExperience() {
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], ["#061912", "#0b2a20", "#123b2d", "#245b3e"]);

  return (
    <main className="one-page">
      <motion.div className="scroll-background" style={{ backgroundColor: background }} aria-hidden="true" />

      <section className="hero-section refined" id="home">
        <Image
          className="hero-image"
          src={newImage("solarpunk-city.jpg")}
          alt="Green solarpunk architectural reference with terraces and integrated vegetation."
          width={900}
          height={1200}
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <motion.p className="eyebrow" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }}>
            7th grade · cultural fair · maker
          </motion.p>
          <motion.h1
            aria-label="Sustainable Urbanization"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.24, duration: 0.86, ease: "easeOut" }}
          >
            <span className="mobile-title" aria-hidden="true">SUSTAIN<br />ABLE<br />URBAN<br />IZATION</span>
            <span className="desktop-title" aria-hidden="true">SUSTAINABLE<br />URBANIZATION</span>
          </motion.h1>
          <motion.h2 initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.68 }}>
            Designing a Solarpunk City
          </motion.h2>
        </motion.div>
      </section>

      <section className="snapshot-section" id="story">
        <motion.div className="snapshot-grid" {...reveal}>
          <div>
            <span>24</span>
            <p>student groups</p>
          </div>
          <div>
            <span>24</span>
            <p>sustainable interventions</p>
          </div>
          <div>
            <span>1</span>
            <p>shared urban ecosystem</p>
          </div>
        </motion.div>
      </section>

      <section className="sao-section refined" id="sao-paulo">
        <div className="section-heading">
          <p className="eyebrow">Sao Paulo</p>
          <h2>THE CITY WE HAVE</h2>
          <p>Sao Paulo is not a simple problem. It is dense, productive, unequal, inventive, vulnerable, and alive. That complexity gave students a real place to question how cities grow.</p>
        </div>
        <div className="sao-editorial">
          {saoImages.map((image, index) => (
            <motion.article key={image.label} className={`sao-card sao-card-${index + 1}`} {...reveal}>
              <Image src={image.src} alt={`${image.label} reference image for Sao Paulo.`} width={1100} height={760} sizes="(max-width: 760px) 92vw, 31vw" />
              <div>
                <strong>{image.label}</strong>
                <p>{image.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="golden-section refined" id="golden-circle">
        <div className="golden-layout">
          <motion.div className="golden-orbit" {...reveal}>
            <span className="orbit-ring outer" />
            <span className="orbit-ring middle" />
            <span className="orbit-ring inner" />
            <div className="orbit-core">CITY</div>
            <div className="orbit-label why">WHY<br /><b>Solarpunk</b></div>
            <div className="orbit-label how">HOW<br /><b>Biomimicry</b></div>
            <div className="orbit-label what">WHAT<br /><b>Urbanization</b></div>
          </motion.div>
          <motion.div className="golden-text" {...reveal}>
            <p className="eyebrow">Golden circle</p>
            <h2>WHY, HOW, WHAT.</h2>
            <p>The project moves from vision to method to city-making: imagine a better future, learn from nature, then connect every intervention into one urban system.</p>
          </motion.div>
        </div>
      </section>

      <section className="solarpunk-section" id="solarpunk">
        <div className="section-heading dark">
          <p className="eyebrow">Why?</p>
          <h2>SOLARPUNK</h2>
          <p>Solarpunk is an optimistic design lens. It asks how people, ecosystems, and clean energy can support each other in everyday urban life.</p>
        </div>
        <div className="pillar-stage" aria-label="Human, nature, and energy pillars animation">
          <motion.div className="pillar human" whileInView={{ y: [18, -8, 18] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <Users aria-hidden="true" />
            <span>Human</span>
            <p>inclusive spaces, comfort, access, community</p>
          </motion.div>
          <motion.div className="pillar nature" whileInView={{ y: [-10, 16, -10] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
            <Sprout aria-hidden="true" />
            <span>Nature</span>
            <p>shade, water, biodiversity, living surfaces</p>
          </motion.div>
          <motion.div className="pillar energy" whileInView={{ y: [12, -14, 12] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
            <Zap aria-hidden="true" />
            <span>Energy</span>
            <p>solar power, passive cooling, efficient systems</p>
          </motion.div>
          <svg viewBox="0 0 900 520" className="pillar-lines" aria-hidden="true">
            <path d="M180 305 C310 150 590 150 720 305" />
            <path d="M205 325 C370 415 520 415 695 325" />
            <path d="M450 120 C390 245 395 335 450 438 C505 335 510 245 450 120" />
          </svg>
        </div>
      </section>

      <section className="bio-section refined" id="biomimicry">
        <div className="section-heading">
          <p className="eyebrow">How?</p>
          <h2>BIOMIMICRY</h2>
          <p>Nature becomes a design teacher: organisms, patterns, and ecosystems suggest strategies for comfort, resilience, structure, and adaptation.</p>
          <a className="deep-dive-link" href="https://biomimi.vercel.app/" target="_blank" rel="noreferrer">
            Open biomimicry deep dive <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="bio-bento">
          {biomimicryStories.map((story) => (
            <motion.article key={story.name} className="bio-bento-card" {...reveal}>
              <Image src={bioImages[story.name]} alt={`${story.name} biomimicry reference.`} width={900} height={900} sizes="(max-width: 760px) 88vw, 28vw" />
              <div>
                <h3>{story.title}</h3>
                <p>{story.principle}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="planning-section refined" id="planning">
        <div className="section-heading">
          <p className="eyebrow">Planning</p>
          <h2>A CITY NEEDS A PLAN</h2>
          <p>Sustainable urbanization connects land use, shade, water, mobility, energy, policy, and daily life. A building only works when the city around it works too.</p>
        </div>
        <div className="planning-grid refined">
          <article className="diagram-panel">
            <Layers3 aria-hidden="true" />
            <h3>Urban layers</h3>
            {["Housing", "Work", "Commerce", "Services", "Green Areas", "Mobility", "Water", "Energy", "Public Space"].map((layer) => <span key={layer}>{layer}</span>)}
          </article>
          <article className="zoning-panel">
            <Route aria-hidden="true" />
            <h3>What goes where?</h3>
            <div className="commute-line long" />
            <p>Separated uses create longer trips.</p>
            <div className="commute-line short" />
            <p>Mixed-use planning shortens movement and activates public space.</p>
          </article>
          <article className="diagram-panel">
            <MapPinned aria-hidden="true" />
            <h3>Master Plan</h3>
            {["growth", "land use", "housing", "mobility", "environment", "infrastructure"].map((layer) => <span key={layer}>{layer}</span>)}
          </article>
        </div>
      </section>

      <section className="process-section refined" id="process">
        <div className="section-heading dark">
          <p className="eyebrow">Maker process</p>
          <h2>FROM SKETCH TO CITY MODEL</h2>
          <p>Students moved between drawings, references, material tests, and physical models to turn sustainable ideas into an urban proposal.</p>
        </div>
        <div className="process-strip">
          {processImages.map((src, index) => (
            <motion.figure key={src} className={index === 2 || index === 6 ? "wide" : ""} {...reveal}>
              <Image src={src} alt="Student sketch or model-building process for the solarpunk city project." width={1000} height={760} sizes="(max-width: 760px) 72vw, 24vw" />
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="projects-teaser refined" id="projects">
        <div className="section-heading">
          <p className="eyebrow">24 ideas · one city</p>
          <h2>OUR SOLARPUNK CITY</h2>
        </div>
        <div className="project-bento-grid">
          {cityProjects.map((project, index) => (
            <motion.details key={project.id} className={`project-bento ${index % 7 === 0 ? "featured" : ""}`} {...reveal}>
              <summary>
                <span>{project.biomimicry}</span>
                <h3>{project.projectName}</h3>
                <p>{project.students}</p>
              </summary>
              <div className="project-bento-body">
                <p>{project.solution}</p>
                <div>
                  {project.systems.map((system) => <span key={system}>{system}</span>)}
                  {project.sdgs.map((sdg) => <span key={sdg}>SDG {sdg}</span>)}
                </div>
              </div>
            </motion.details>
          ))}
        </div>
      </section>
    </main>
  );
}
