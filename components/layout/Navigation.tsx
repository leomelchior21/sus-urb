"use client";

import Link from "next/link";
import { Building2, Home, Leaf, MapPinned } from "lucide-react";

const links = [
  { href: "/#home", label: "Home", icon: Home },
  { href: "/#sao-paulo", label: "São Paulo", icon: MapPinned },
  { href: "/#biomimicry", label: "Bio", icon: Leaf },
  { href: "/#projects", label: "City", icon: Building2 }
];

export function Navigation() {
  return (
    <nav className="glass-nav labeled-nav" aria-label="Main navigation">
      <div className="nav-links labeled">
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
