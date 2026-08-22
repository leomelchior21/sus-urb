"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, RotateCcw, Search, X } from "lucide-react";
import { biomimicryOptions, cityProjects, systemOptions, type Biomimicry, type ClassName, type System } from "@/data/projects";

type FilterState = {
  className: "All" | ClassName;
  biomimicry: "All" | Biomimicry;
  system: "All" | System;
};

const classOptions = ["All", "7A", "7B", "7C"] as const;

export function CityExplorer({ compact = false }: { compact?: boolean }) {
  const [filters, setFilters] = useState<FilterState>({ className: "All", biomimicry: "All", system: "All" });
  const [selectedId, setSelectedId] = useState(cityProjects[0].id);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const selected = cityProjects.find((project) => project.id === selectedId) ?? cityProjects[0];
  const filtered = useMemo(
    () =>
      cityProjects.filter(
        (project) =>
          (filters.className === "All" || project.className === filters.className) &&
          (filters.biomimicry === "All" || project.biomimicry === filters.biomimicry) &&
          (filters.system === "All" || project.systems.includes(filters.system))
      ),
    [filters]
  );
  const filteredIds = new Set(filtered.map((project) => project.id));

  const selectProject = (id: string) => {
    setSelectedId(id);
    setSheetOpen(true);
  };

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section className={compact ? "city-section compact" : "city-section"} id="city">
      <div className="section-heading light">
        <p className="eyebrow">Interactive city</p>
        <h2>OUR SOLARPUNK CITY</h2>
        <p>Explore 24 interventions as one urban ecosystem. Class filters highlight metadata only; they do not split the city into districts.</p>
      </div>

      <div className="city-shell">
        <div className="filter-strip" aria-label="Quick filters">
          {[...classOptions, ...biomimicryOptions, ...systemOptions.slice(0, 4)].map((value) => {
            const key = classOptions.includes(value as never) ? "className" : biomimicryOptions.includes(value as never) ? "biomimicry" : "system";
            const active = filters[key] === value;
            return (
              <button
                className={`chip ${active ? "active" : ""}`}
                type="button"
                key={`${key}-${value}`}
                onClick={() => setFilters((current) => ({ ...current, [key]: active ? "All" : value } as FilterState))}
              >
                {value}
              </button>
            );
          })}
        </div>

        <div className="city-toolbar">
          <button className="glass-button" type="button" onClick={() => setSheetOpen(true)}>
            <Filter size={17} aria-hidden="true" />
            Filter city
          </button>
          <button className="icon-button dark" type="button" onClick={() => setScale((value) => Math.min(value + 0.18, 1.8))} aria-label="Zoom in">
            <Search size={17} aria-hidden="true" />
          </button>
          <button className="icon-button dark" type="button" onClick={resetView} aria-label="Reset view">
            <RotateCcw size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="city-map-frame" aria-label="Interactive city map">
          <motion.div
            className="city-map"
            drag
            dragMomentum={false}
            dragConstraints={{ left: -90, right: 90, top: -70, bottom: 70 }}
            animate={{ scale, x: offset.x, y: offset.y }}
            onDragEnd={(_, info) => setOffset((current) => ({ x: current.x + info.offset.x * 0.18, y: current.y + info.offset.y * 0.18 }))}
            onDoubleClick={() => setScale((value) => (value > 1 ? 1 : 1.55))}
          >
            <svg className="city-base" viewBox="0 0 1000 640" role="img" aria-label="Abstract map of one interconnected city">
              <defs>
                <linearGradient id="park" x1="0" x2="1">
                  <stop offset="0" stopColor="#9fcb77" />
                  <stop offset="1" stopColor="#4f9464" />
                </linearGradient>
                <linearGradient id="water" x1="0" x2="1">
                  <stop offset="0" stopColor="#67bec1" />
                  <stop offset="1" stopColor="#236f73" />
                </linearGradient>
              </defs>
              <path className="river" d="M-20 420 C170 320 250 500 420 408 S720 280 1020 385" />
              <path className="transit" d="M80 120 C260 245 405 172 560 260 S760 450 930 510" />
              <path className="transit second" d="M85 555 C220 440 340 470 486 340 S716 165 930 135" />
              <g className="blocks">
                {Array.from({ length: 36 }).map((_, index) => (
                  <rect
                    key={index}
                    x={60 + (index % 9) * 102}
                    y={72 + Math.floor(index / 9) * 126}
                    width={52 + (index % 3) * 12}
                    height={42 + (index % 4) * 11}
                    rx="7"
                  />
                ))}
              </g>
              <g className="parks">
                <ellipse cx="190" cy="365" rx="84" ry="48" />
                <ellipse cx="690" cy="210" rx="96" ry="55" />
                <ellipse cx="820" cy="505" rx="74" ry="42" />
              </g>
            </svg>

            {cityProjects.map((project) => {
              const active = selected.id === project.id;
              const inFilter = filteredIds.has(project.id);
              return (
                <button
                  type="button"
                  key={project.id}
                  className={`hotspot ${active ? "active" : ""} ${inFilter ? "" : "muted"}`}
                  style={{ left: `${project.cityPosition.x}%`, top: `${project.cityPosition.y}%` }}
                  onClick={() => selectProject(project.id)}
                  aria-label={`${project.projectName}, ${project.className} group ${project.groupNumber}`}
                >
                  <span>{String(project.groupNumber).padStart(2, "0")}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        <aside className="project-preview liquid-glass">
          <p className="eyebrow">{selected.className} · Group {String(selected.groupNumber).padStart(2, "0")}</p>
          <h3>{selected.projectName}</h3>
          <p>{selected.solution}</p>
          <div className="meta-grid">
            <span>{selected.biomimicry}</span>
            {selected.systems.slice(0, 3).map((system) => (
              <span key={system}>{system}</span>
            ))}
          </div>
          <Link className="glass-button filled" href={`/projects/${selected.id}`}>Explore project</Link>
        </aside>
      </div>

      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            className="bottom-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <button className="sheet-close" type="button" onClick={() => setSheetOpen(false)} aria-label="Close project preview">
              <X size={20} aria-hidden="true" />
            </button>
            <p className="eyebrow">{selected.className} · Group {String(selected.groupNumber).padStart(2, "0")}</p>
            <h3>{selected.projectName}</h3>
            <p>{selected.solution}</p>
            <div className="filter-grid">
              <label>
                Class
                <select value={filters.className} onChange={(event) => setFilters((current) => ({ ...current, className: event.target.value as FilterState["className"] }))}>
                  {classOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label>
                Biomimicry
                <select value={filters.biomimicry} onChange={(event) => setFilters((current) => ({ ...current, biomimicry: event.target.value as FilterState["biomimicry"] }))}>
                  <option>All</option>
                  {biomimicryOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label>
                System
                <select value={filters.system} onChange={(event) => setFilters((current) => ({ ...current, system: event.target.value as FilterState["system"] }))}>
                  <option>All</option>
                  {systemOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </div>
            <Link className="glass-button filled" href={`/projects/${selected.id}`}>Explore project</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
