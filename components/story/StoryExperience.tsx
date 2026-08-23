"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ExternalLink, HelpCircle, MapPinned, Route, Sparkles, Sprout, SunMedium, Users, Zap } from "lucide-react";
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
    src: newImage("sao-paulo-aerial.jpg"),
    label: "Density",
    copy: "A city built upward, under pressure, full of possibility."
  },
  {
    src: newImage("sao-paulo-flood.jpg"),
    label: "Water",
    copy: "When rivers and rain meet too much concrete, infrastructure becomes visible."
  },
  {
    src: newImage("sao-paulo-traffic.jpg"),
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

const solarpunkImages = [
  { src: newImage("solarpunk-terrace.jpg"), label: "Terraces" },
  { src: newImage("solarpunk-sketch.jpg"), label: "Concept" },
  { src: newImage("solarpunk-city.jpg"), label: "City" }
];

type QuestionTopic = "Sustainable Urbanization" | "Solarpunk" | "Biomimicry" | "SDGs / ODS" | "Projects";

const questionBank: Record<QuestionTopic, string[]> = {
  "Sustainable Urbanization": [
    "What makes a city sustainable besides having green buildings?",
    "Why is it important to think about the whole city instead of designing one building alone?",
    "How can the location of a building affect transportation and people's daily lives?",
    "Why does a sustainable city need different types of spaces, such as housing, work, services, and green areas?",
    "How can adding more vegetation change the temperature and comfort of a city?",
    "What could happen if a city grows without enough planning?",
    "How can the way we use land affect flooding and rainwater absorption?",
    "Why are public spaces important when planning a sustainable city?",
    "How can a city balance the needs of people, nature, and infrastructure?",
    "If you could change one thing about Sao Paulo to make it more sustainable, what would you change and why?"
  ],
  Solarpunk: [
    "What is Solarpunk, and what kind of future does it imagine?",
    "How is a Solarpunk city different from a typical futuristic city we see in movies?",
    "Why is nature an important part of the Solarpunk movement?",
    "What role does technology have in a Solarpunk city?",
    "Why is Solarpunk about more than just adding plants to buildings?",
    "How can architecture help create the optimistic future imagined by Solarpunk?",
    "What is one Solarpunk idea that you can identify in our city model? Explain it.",
    "How could a Solarpunk city improve people's quality of life?",
    "Why are community and shared public spaces important in Solarpunk?",
    "If you could add one new Solarpunk idea to our city, what would you create and why?"
  ],
  Biomimicry: [
    "What is biomimicry, and how is it different from simply making a building look like nature?",
    "Why can nature be a useful source of ideas for architects and engineers?",
    "How can studying how an organism works help us solve a city problem?",
    "How can honeycomb structures inspire the organization of architectural spaces?",
    "How can moss inspire a different way of thinking about building walls?",
    "What can architects learn from mangrove roots when designing structures?",
    "How can termite mounds inspire buildings that stay comfortable without using as much air conditioning?",
    "What can cactus shapes teach us about protecting buildings from strong sunlight and heat?",
    "Choose one biomimicry example from our project. What natural strategy is being copied, and what problem does it solve?",
    "If you could study another plant or animal to improve a city, what would you choose and what could we learn from it?"
  ],
  "SDGs / ODS": [
    "What are the Sustainable Development Goals, and why were they created?",
    "Which SDG is most connected to our Sustainable Urbanization project? Why?",
    "How can a global goal like an SDG influence a decision made in one neighborhood or building?",
    "What does SDG 11 - Sustainable Cities and Communities - mean in practice?",
    "How can clean energy help a city achieve some of the SDGs?",
    "How are environmental problems and social problems connected in the SDGs?",
    "Choose one feature of our city and explain which SDG it could help achieve.",
    "Can one project contribute to more than one SDG? Give an example and explain how.",
    "Why can't governments achieve the SDGs only by building new technology?",
    "If you had to choose one SDG as the most important for Sao Paulo today, which would you choose and why?"
  ],
  Projects: [
    "What urban problem is your group trying to solve, and how does your project respond to it?",
    "Explain your project to me as if I had never seen it before. What does it do and why is it important?",
    "What is the most sustainable feature of your project, and why did your group choose it?",
    "What biomimicry idea did your group use, and how did you transform it into an architectural solution?",
    "How does your project connect to the Solarpunk movement?",
    "Which SDG is most connected to your project, and how does your solution contribute to it?",
    "Why did your group place this project in this part of the city?",
    "How does your project affect or connect with the buildings and spaces around it?",
    "If your project were actually built in Sao Paulo, what benefits could it bring and what challenges might it face?",
    "If your group had one more month to improve the project, what would you change and why?"
  ]
};

const odsOptions = [
  {
    id: "11",
    title: "Sustainable Cities and Communities",
    focus: "The heart of the exhibition: housing, mobility, public space, resilience, and inclusive urban life.",
    lookFor: ["mixed-use neighborhoods", "safe public areas", "flood-aware planning", "access to services"]
  },
  {
    id: "7",
    title: "Affordable and Clean Energy",
    focus: "Connects to solar panels, passive cooling, daylight, and buildings that need less energy to stay comfortable.",
    lookFor: ["solar energy", "shading", "natural ventilation", "efficient systems"]
  },
  {
    id: "13",
    title: "Climate Action",
    focus: "Helps students explain heat islands, heavy rain, flood risk, and the need for cities that adapt to climate pressure.",
    lookFor: ["cooler surfaces", "rain gardens", "urban trees", "resilient infrastructure"]
  },
  {
    id: "15",
    title: "Life on Land",
    focus: "Makes biodiversity visible through green roofs, living walls, corridors, soil, and habitats inside the city.",
    lookFor: ["native plants", "pollinator areas", "green corridors", "soil protection"]
  },
  {
    id: "6",
    title: "Clean Water and Sanitation",
    focus: "Links water-sensitive design to drainage, reuse, infiltration, and cleaner urban rivers.",
    lookFor: ["rainwater capture", "permeable ground", "wetlands", "water reuse"]
  }
];

function GuidingQuestion({ topic }: { topic: QuestionTopic }) {
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const questions = questionBank[topic];

  function drawQuestion() {
    setQuestionIndex((current) => {
      if (questions.length === 1) return 0;
      let next = Math.floor(Math.random() * questions.length);
      while (next === current) {
        next = Math.floor(Math.random() * questions.length);
      }
      return next;
    });
  }

  return (
    <motion.div className="question-block" {...reveal}>
      <button className="question-button" type="button" onClick={drawQuestion}>
        <Sparkles size={18} aria-hidden="true" />
        Ask a guiding question
      </button>
      {questionIndex !== null ? (
        <motion.div className="question-card" initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} key={`${topic}-${questionIndex}`}>
          <HelpCircle size={22} aria-hidden="true" />
          <div>
            <span>{topic}</span>
            <p>{questions[questionIndex]}</p>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

export function StoryExperience() {
  const [activeOds, setActiveOds] = useState(odsOptions[0]);
  const { scrollYProgress } = useScroll();
  const background = useTransform(scrollYProgress, [0, 0.16, 0.28, 0.4, 1], ["#061912", "#2b0c0d", "#143326", "#174d36", "#245b3e"]);

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
            <span aria-hidden="true">SUSTAINABLE<br />URBANIZATION</span>
          </motion.h1>
          <motion.h2 initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.68 }}>
            Designing a Solarpunk City
          </motion.h2>
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
        <GuidingQuestion topic="Sustainable Urbanization" />
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
        <div className="solarpunk-gallery">
          {solarpunkImages.map((image) => (
            <motion.figure key={image.src} {...reveal}>
              <Image src={image.src} alt={`${image.label} solarpunk visual reference.`} width={820} height={620} sizes="(max-width: 760px) 68vw, 24vw" />
              <figcaption><SunMedium size={15} aria-hidden="true" /> {image.label}</figcaption>
            </motion.figure>
          ))}
        </div>
        <GuidingQuestion topic="Solarpunk" />
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
        <GuidingQuestion topic="Biomimicry" />
      </section>

      <section className="planning-section refined" id="planning">
        <div className="section-heading">
          <p className="eyebrow">Master Plan</p>
          <h2>SAO PAULO AS A SYSTEM</h2>
          <p>The Master Plan is the city's growth agreement: it connects where people live, how they move, where nature is protected, and how land should serve public life.</p>
        </div>
        <div className="master-plan-grid">
          <article className="master-plan-card featured">
            <MapPinned aria-hidden="true" />
            <span>01</span>
            <h3>Grow where the city already works</h3>
            <p>More homes, services, and jobs should be close to public transport and existing infrastructure, so growth creates shorter trips instead of more pressure.</p>
          </article>
          <article className="master-plan-card">
            <Users aria-hidden="true" />
            <span>02</span>
            <h3>Make housing part of sustainability</h3>
            <p>Social housing and access to the city matter because an ecological city cannot exclude the people who need the city most.</p>
          </article>
          <article className="master-plan-card">
            <Route aria-hidden="true" />
            <span>03</span>
            <h3>Plan land use and mobility together</h3>
            <p>Where buildings go changes traffic, walking, services, and time. Urban planning is also daily-life planning.</p>
          </article>
          <article className="master-plan-card">
            <Sprout aria-hidden="true" />
            <span>04</span>
            <h3>Treat climate as urban infrastructure</h3>
            <p>Green areas, permeable ground, shade, and water strategies are not decoration. They protect people from heat, floods, and environmental risk.</p>
          </article>
          <article className="master-plan-card">
            <SunMedium aria-hidden="true" />
            <span>05</span>
            <h3>Activate the ground floor</h3>
            <p>Streets become safer and more useful when buildings connect to sidewalks with entrances, shops, services, and shared public life.</p>
          </article>
          <article className="master-plan-card">
            <Sparkles aria-hidden="true" />
            <span>06</span>
            <h3>Land has a social role</h3>
            <p>Empty or underused land is not neutral. In a fairer city, land should help produce housing, services, nature, and opportunity.</p>
          </article>
        </div>
      </section>

      <section className="process-section refined" id="process">
        <div className="section-heading dark">
          <p className="eyebrow">Maker process</p>
          <h2>FROM SKETCH TO CITY MODEL</h2>
          <p>Students moved between drawings, references, material tests, and physical models to turn sustainable ideas into an urban proposal. Swipe sideways to see more process images.</p>
        </div>
        <div className="side-scroll-hint" aria-hidden="true">
          <span>Swipe</span>
          <i />
          <span>more images</span>
        </div>
        <div className="process-strip">
          {processImages.map((src, index) => (
            <motion.figure key={src} className={index === 2 || index === 6 ? "wide" : ""} {...reveal}>
              <Image src={src} alt="Student sketch or model-building process for the solarpunk city project." width={1000} height={760} sizes="(max-width: 760px) 72vw, 24vw" />
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="ods-section refined" id="ods">
        <div className="section-heading">
          <p className="eyebrow">ODS / SDGs</p>
          <h2>GLOBAL GOALS, LOCAL DECISIONS</h2>
          <p>The SDGs help students connect a model city to bigger questions: climate, housing, water, energy, biodiversity, and justice.</p>
        </div>
        <motion.div className="ods-explorer" {...reveal}>
          <label htmlFor="ods-select">Explore an ODS</label>
          <div className="select-shell">
            <select
              id="ods-select"
              value={activeOds.id}
              onChange={(event) => setActiveOds(odsOptions.find((ods) => ods.id === event.target.value) ?? odsOptions[0])}
            >
              {odsOptions.map((ods) => (
                <option key={ods.id} value={ods.id}>
                  ODS {ods.id} - {ods.title}
                </option>
              ))}
            </select>
            <ChevronDown size={20} aria-hidden="true" />
          </div>
          <article>
            <span>ODS {activeOds.id}</span>
            <h3>{activeOds.title}</h3>
            <p>{activeOds.focus}</p>
            <div>
              {activeOds.lookFor.map((item) => (
                <b key={item}>{item}</b>
              ))}
            </div>
          </article>
        </motion.div>
        <GuidingQuestion topic="SDGs / ODS" />
      </section>

      <section className="projects-teaser refined" id="projects">
        <div className="section-heading">
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
        <GuidingQuestion topic="Projects" />
      </section>
    </main>
  );
}
