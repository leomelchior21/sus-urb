"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Building2, CircleDot, Home, Landmark, Leaf, MapPinned, SunMedium } from "lucide-react";
import type { Language } from "@/app/page";

const links = [
  { id: "home", href: "/#home", label: { en: "Home", pt: "Início" }, icon: Home },
  { id: "sao-paulo", href: "/#sao-paulo", label: { en: "São Paulo", pt: "São Paulo" }, icon: MapPinned },
  { id: "solarpunk", href: "/#solarpunk", label: { en: "Solarpunk", pt: "Solarpunk" }, icon: SunMedium },
  { id: "biomimicry", href: "/#biomimicry", label: { en: "Biomimicry", pt: "Biomimética" }, icon: Leaf },
  { id: "planning", href: "/#planning", label: { en: "Master Plan", pt: "Plano Diretor" }, icon: Landmark },
  { id: "ods", href: "/#ods", label: { en: "SDGs", pt: "ODS" }, icon: CircleDot },
  { id: "projects", href: "/#projects", label: { en: "City projects", pt: "Projetos da cidade" }, icon: Building2 }
];

interface NavigationProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Navigation({ language, onLanguageChange }: NavigationProps) {
  const [activeId, setActiveId] = useState(links[0].id);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    function updateActiveSection() {
      const marker = window.innerHeight * 0.35;
      let current = links[0];
      let nearest = links[0];
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const link of links) {
        const section = document.getElementById(link.id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - marker);
        if (distance < nearestDistance) {
          nearest = link;
          nearestDistance = distance;
        }

        if (rect.top <= marker && rect.bottom > marker) {
          current = link;
          break;
        }
      }

      if (current === links[0] && nearest.id !== links[0].id) {
        current = nearest;
      }

      setActiveId(current.id);
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    activeLink?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeId]);

  return (
    <>
      <div className="language-toggle" aria-label={language === "en" ? "Website language" : "Idioma do site"}>
        {(["en", "pt"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={language === option ? "active" : ""}
            aria-pressed={language === option}
            onClick={() => onLanguageChange(option)}
          >
            {option === "en" ? "EN" : "PT"}
          </button>
        ))}
      </div>
      <nav className="glass-nav labeled-nav" aria-label="Main navigation">
      <div className="nav-links labeled" ref={navRef}>
        {links.map(({ id, href, label, icon: Icon }) => (
          <Link
            className={`nav-link ${activeId === id ? "active" : ""}`}
            href={href}
            aria-label={label[language]}
            aria-current={activeId === id ? "page" : undefined}
            data-section={id}
            key={href}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label[language]}</span>
          </Link>
        ))}
      </div>
      </nav>
    </>
  );
}
