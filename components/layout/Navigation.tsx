"use client";

import Link from "next/link";
import { Building2, GalleryHorizontalEnd, Home, Leaf, Map } from "lucide-react";

const links = [
  { href: "/#home", label: "Home", icon: Home },
  { href: "/#story", label: "Story", icon: GalleryHorizontalEnd },
  { href: "/#biomimicry", label: "Bio", icon: Leaf },
  { href: "/#planning", label: "Plan", icon: Map },
  { href: "/#projects", label: "City", icon: Building2 }
];

export function Navigation() {
  return (
    <nav className="glass-nav" aria-label="Main navigation">
      <Link href="/" className="nav-brand" aria-label="Sustainable Urbanization home">
        <span>SU</span>
      </Link>
      <div className="nav-links">
        {links.map(({ href, label, icon: Icon }, index) => (
          <Link className={`nav-link ${index === 0 ? "active" : ""}`} href={href} aria-label={label} key={href}>
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
