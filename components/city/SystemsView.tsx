"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cityProjects, systemOptions, type System } from "@/data/projects";

export function SystemsView() {
  const [system, setSystem] = useState<System>("Water");
  const related = cityProjects.filter((project) => project.systems.includes(system));

  return (
    <section className="systems-section" id="systems">
      <div className="section-heading dark">
        <p className="eyebrow">Systems mode</p>
        <h2>A CITY IS A SYSTEM OF SYSTEMS.</h2>
        <p>Choose an urban system and watch relationships become more important than individual buildings.</p>
      </div>
      <div className="system-tabs" role="tablist" aria-label="City systems">
        {systemOptions.map((option) => (
          <button className={`chip ${system === option ? "active" : ""}`} type="button" key={option} onClick={() => setSystem(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className="systems-stage">
        <svg viewBox="0 0 1000 560" className="systems-svg" aria-label={`${system} relationships across the city`}>
          <path className="system-flow" d="M80 280 C230 120 340 440 500 280 S770 130 930 275" />
          <path className="system-flow secondary" d="M125 430 C300 360 365 190 540 220 S720 410 875 140" />
          {related.map((project, index) => (
            <motion.g key={project.id} initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
              <circle cx={project.cityPosition.x * 10} cy={project.cityPosition.y * 5.6} r="18" />
              <text x={project.cityPosition.x * 10} y={project.cityPosition.y * 5.6 + 4}>{project.groupNumber}</text>
            </motion.g>
          ))}
        </svg>
        <div className="system-copy liquid-glass">
          <p className="eyebrow">{system} flow</p>
          <h3>{system === "Water" ? "Rain to roofs to gardens" : system === "Energy" ? "Solar gain to efficient buildings" : system === "Mobility" ? "Shorter trips, better public life" : `${system} connects design decisions`}</h3>
          <p>{related.length} projects currently connect to this system. The point is not one perfect building; it is how many choices reinforce each other.</p>
        </div>
      </div>
    </section>
  );
}
