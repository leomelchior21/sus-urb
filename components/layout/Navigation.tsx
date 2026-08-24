"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Building2, CircleDot, Home, Landmark, Leaf, MapPinned, SunMedium } from "lucide-react";

const links = [
  { id: "home", href: "/#home", label: "Home", icon: Home },
  { id: "sao-paulo", href: "/#sao-paulo", label: "São Paulo", icon: MapPinned },
  { id: "solarpunk", href: "/#solarpunk", label: "Solar", icon: SunMedium },
  { id: "biomimicry", href: "/#biomimicry", label: "Bio", icon: Leaf },
  { id: "planning", href: "/#planning", label: "Master Plan", icon: Landmark },
  { id: "ods", href: "/#ods", label: "ODS", icon: CircleDot },
  { id: "projects", href: "/#projects", label: "City", icon: Building2 }
];

export function Navigation() {
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
    <nav className="glass-nav labeled-nav" aria-label="Main navigation">
      <div className="nav-links labeled" ref={navRef}>
        {links.map(({ id, href, label, icon: Icon }) => (
          <Link
            className={`nav-link ${activeId === id ? "active" : ""}`}
            href={href}
            aria-label={label}
            aria-current={activeId === id ? "page" : undefined}
            data-section={id}
            key={href}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
