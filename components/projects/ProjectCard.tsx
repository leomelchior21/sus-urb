import Image from "next/image";
import Link from "next/link";
import type { CityProject } from "@/data/projects";

export function ProjectCard({ project }: { project: CityProject }) {
  return (
    <article className="project-card">
      {project.heroImage && (
        <Image src={project.heroImage} alt={`Model image for ${project.projectName}`} width={900} height={1200} sizes="(max-width: 720px) 90vw, 30vw" />
      )}
      <div>
        <p className="eyebrow">{project.className} · Group {String(project.groupNumber).padStart(2, "0")} · {project.biomimicry}</p>
        <h3>{project.projectName}</h3>
        <p>{project.solution}</p>
        <Link href={`/projects/${project.id}`}>Open project</Link>
      </div>
    </article>
  );
}
