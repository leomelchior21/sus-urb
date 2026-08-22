"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Layers3, Leaf, MapPinned, Route, Sparkles, SunMedium, Waves } from "lucide-react";
import { CityExplorer } from "@/components/city/CityExplorer";
import { SystemsView } from "@/components/city/SystemsView";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { biomimicryStories } from "@/data/biomimicry";
import { featuredImages, projectImages } from "@/data/images";
import { cityProjects } from "@/data/projects";

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" }
} as const;

const saoContrasts = [
  { first: "DENSITY", second: "GREEN SPACE", imageIndex: 1 },
  { first: "OPPORTUNITY", second: "INEQUALITY", imageIndex: 3 },
  { first: "RIVERS", second: "CONCRETE", imageIndex: 0 },
  { first: "MOBILITY", second: "LONG COMMUTES", imageIndex: 2 }
];

export function StoryExperience() {
  const hero = projectImages[46];
  const model = projectImages[31];
  const process = projectImages.slice(0, 16);

  return (
    <>
      <main>
        <section className="hero-section" id="home">
          <Image className="hero-image" src={hero.src} alt="Solarpunk architectural model with green platforms and towers." width={hero.width} height={hero.height} priority sizes="100vw" />
          <div className="hero-shade" />
          <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <motion.p className="eyebrow" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>7th grade · cultural fair · maker</motion.p>
            <motion.h1 aria-label="Sustainable Urbanization" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.28, duration: 0.9, ease: "easeOut" }}>
              <span className="mobile-title" aria-hidden="true">SUSTAIN<br />ABLE<br />URBAN<br />IZATION</span>
              <span className="desktop-title" aria-hidden="true">SUSTAINABLE<br />URBANIZATION</span>
            </motion.h1>
            <motion.h2 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.72 }}>Designing a Solarpunk City</motion.h2>
            <motion.div className="hero-actions" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
              <Link className="glass-button filled" href="#city">Enter the city</Link>
              <Link className="glass-button" href="#story">Discover the project</Link>
            </motion.div>
          </motion.div>
          <motion.div className="hero-panel liquid-glass" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.05, type: "spring", stiffness: 120 }}>
            <span>24 groups</span>
            <span>3 classes</span>
            <span>1 city</span>
          </motion.div>
          <ArrowDown className="scroll-cue" aria-hidden="true" />
        </section>

        <section className="scale-section" id="story">
          <motion.div {...reveal}>
            <p>24 GROUPS.</p>
            <p>24 STRUCTURES.</p>
            <p>ONE CITY.</p>
          </motion.div>
          <motion.div className="manifesto" {...reveal}>
            <span>THE BUILDING IS NOT THE PROJECT.</span>
            <strong>THE CITY IS THE PROJECT.</strong>
          </motion.div>
        </section>

        <section className="sao-section">
          <div className="section-heading">
            <p className="eyebrow">Sao Paulo</p>
            <h2>THE CITY WE HAVE</h2>
            <p>Sao Paulo is a city of contradictions: density and opportunity, but also heat, long trips, pressure on infrastructure, unequal access to public space, and rivers forced into concrete systems.</p>
          </div>
          <div className="contrast-grid">
            {saoContrasts.map((contrast) => {
              const image = featuredImages[contrast.imageIndex];
              return (
              <motion.article key={`${contrast.first}-${contrast.second}`} className="contrast-panel" {...reveal}>
                <Image src={image.src} alt={`Visual comparison for ${contrast.first} and ${contrast.second}`} width={900} height={1200} sizes="(max-width: 720px) 92vw, 25vw" />
                <div><span>{contrast.first}</span><span>vs</span><strong>{contrast.second}</strong></div>
              </motion.article>
              );
            })}
          </div>
          <div className="question-band">
            <p>IF WE COULD DESIGN PART OF A CITY AGAIN...</p>
            <h2>WHAT WOULD WE DO DIFFERENTLY?</h2>
          </div>
        </section>

        <section className="golden-section">
          <div className="golden-stage">
            <motion.div className="ring ring-one" whileInView={{ scale: 1, opacity: 1 }} initial={{ scale: 0.45, opacity: 0 }} viewport={{ once: true }} />
            <motion.div className="ring ring-two" whileInView={{ scale: 1, opacity: 1 }} initial={{ scale: 0.45, opacity: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }} />
            <motion.div className="ring ring-three" whileInView={{ scale: 1, opacity: 1 }} initial={{ scale: 0.45, opacity: 0 }} viewport={{ once: true }} transition={{ delay: 0.36 }} />
            <div className="golden-copy">
              <span>WHY · Solarpunk</span>
              <span>HOW · Biomimicry</span>
              <span>WHAT · Sustainable Urbanization</span>
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="section-heading dark">
            <p className="eyebrow">Why?</p>
            <h2>SOLARPUNK</h2>
            <p>Because imagining a better future changes how we design today. Solarpunk is not only a look; it is a philosophy of renewable energy, biodiversity, inclusion, appropriate technology, and community-centered cities.</p>
          </div>
          <div className="principle-row">
            {["optimism", "renewable energy", "public space", "biodiversity", "local solutions"].map((item) => <span key={item}>{item}</span>)}
          </div>
          <blockquote>What future do we want to build?</blockquote>
        </section>

        <section className="bio-section">
          <div className="section-heading">
            <p className="eyebrow">How?</p>
            <h2>BIOMIMICRY</h2>
            <p>Nature already solved many design problems. Students translated natural strategies into architecture, infrastructure, and public space.</p>
          </div>
          <div className="bio-stack">
            {biomimicryStories.map((story, index) => {
              const image = projectImages[story.imageIndex - 1];
              return (
                <motion.article key={story.name} className="bio-panel" {...reveal}>
                  <Image src={image.src} alt={`${story.name} inspiration shown through project material.`} width={image.width} height={image.height} sizes="(max-width: 720px) 100vw, 42vw" />
                  <div className="bio-info liquid-glass">
                    <p className="eyebrow">0{index + 1} · {story.name}</p>
                    <h3>{story.title}</h3>
                    <p>{story.principle}</p>
                    <div className="mini-list">{story.translation.map((item) => <span key={item}>{item}</span>)}</div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="planning-section">
          <div className="section-heading">
            <p className="eyebrow">Planning</p>
            <h2>A CITY NEEDS A PLAN</h2>
            <p>Buildings are only one layer. Sustainable urbanization connects land use, shade, water, mobility, energy, public policy, and daily life.</p>
          </div>
          <div className="planning-grid">
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
              <h3>Plano Diretor</h3>
              {["growth", "land use", "housing", "mobility", "environment", "infrastructure"].map((layer) => <span key={layer}>{layer}</span>)}
            </article>
          </div>
        </section>

        <section className="process-section">
          <div className="section-heading dark">
            <p className="eyebrow">Maker process</p>
            <h2>FROM OBSERVATION TO CITY MODEL</h2>
          </div>
          <div className="process-collage">
            {process.map((image, index) => (
              <motion.figure key={image.id} className={index % 3 === 0 ? "tall" : ""} {...reveal}>
                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 720px) 45vw, 18vw" />
                <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="mosaic-section">
          <div className="mosaic">
            {projectImages.slice(16, 40).map((image) => <Image key={image.id} src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="20vw" />)}
          </div>
          <div className="mosaic-copy">
            <span>24 PROJECTS.</span>
            <strong>ONE CITY.</strong>
          </div>
        </section>

        <CityExplorer />
        <SystemsView />

        <section className="projects-teaser">
          <div className="section-heading">
            <p className="eyebrow">24 student projects</p>
            <h2>EACH INTERVENTION HAS A ROLE.</h2>
          </div>
          <div className="project-card-grid">
            {cityProjects.slice(0, 6).map((project) => <ProjectCard project={project} key={project.id} />)}
          </div>
          <Link className="glass-button filled" href="/projects">See all projects</Link>
        </section>

        <section className="final-section">
          <Image src={model.src} alt="Tall interconnected city model with green terraces and SDG backdrop." width={model.width} height={model.height} sizes="100vw" />
          <div className="final-copy">
            <p>Not one technology. Not one green wall. Not one solar panel.</p>
            <h2>IT IS HOW EVERYTHING CONNECTS.</h2>
            <strong>THE BUILDING IS NOT THE PROJECT.<br />THE CITY IS THE PROJECT.</strong>
            <Link className="glass-button filled" href="#city">Explore the city again</Link>
          </div>
          <SunMedium className="final-icon sun" aria-hidden="true" />
          <Waves className="final-icon waves" aria-hidden="true" />
          <Leaf className="final-icon leaf" aria-hidden="true" />
          <Sparkles className="final-icon spark" aria-hidden="true" />
        </section>
      </main>
    </>
  );
}
