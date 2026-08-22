"use client";

import Link from "next/link";
import { Building2, GalleryHorizontalEnd, Home, Map, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#story", label: "Story", icon: GalleryHorizontalEnd },
  { href: "/city", label: "City", icon: Map },
  { href: "/projects", label: "Projects", icon: Building2 }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="glass-nav" aria-label="Main navigation">
      <Link href="/" className="nav-brand" aria-label="Sustainable Urbanization home">
        <span>SU</span>
      </Link>
      <div className="nav-links">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));
          return (
            <Link className={`nav-link ${active ? "active" : ""}`} href={href} aria-label={label} key={href}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <button className="icon-button" type="button" aria-label="Menu">
        <Menu size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}
