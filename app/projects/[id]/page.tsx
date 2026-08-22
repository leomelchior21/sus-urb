import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { cityProjects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return cityProjects.map((project) => ({ id: project.id }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  return (
    <>
      <Navigation />
      <main className="project-detail">
        <section className="project-hero-detail">
          {project.heroImage && <Image src={project.heroImage} alt={`Hero image for ${project.projectName}`} width={1200} height={1600} priority sizes="100vw" />}
          <div className="project-hero-copy liquid-glass">
            <Link href="/projects" className="back-link"><ArrowLeft size={18} aria-hidden="true" /> All projects</Link>
            <p className="eyebrow">{project.className} · Group {String(project.groupNumber).padStart(2, "0")} · {project.biomimicry}</p>
            <h1>{project.projectName}</h1>
            <p>{project.solution}</p>
          </div>
        </section>

        <section className="detail-grid">
          <article>
            <h2>The Urban Challenge</h2>
            <p>{project.urbanChallenge}</p>
          </article>
          <article>
            <h2>Our Idea</h2>
            <p>{project.solution}</p>
          </article>
          <article>
            <h2>Biomimicry</h2>
            <p>{project.biomimicry} strategies shape the building form and its role in the city.</p>
          </article>
          <article>
            <h2>Urban Role</h2>
            <p>{project.urbanFunction.join(", ")}</p>
          </article>
        </section>

        <section className="detail-band">
          <div>
            <h2>Sustainability Strategies</h2>
            {project.sustainabilityStrategies.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div>
            <h2>Systems</h2>
            {project.systems.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div>
            <h2>SDGs</h2>
            {project.sdgs.map((item) => <span key={item}>SDG {item}</span>)}
          </div>
        </section>

        <section className="project-gallery">
          {project.galleryImages?.map((src, index) => (
            <Image key={src} src={src} alt={`${project.projectName} gallery image ${index + 1}`} width={index === 0 ? 1200 : 900} height={index === 0 ? 1600 : 1200} sizes="(max-width: 720px) 100vw, 40vw" />
          ))}
        </section>

        <section className="student-voice">
          <p className="eyebrow">Student voice</p>
          <blockquote>{project.studentQuote}</blockquote>
        </section>
      </main>
    </>
  );
}
