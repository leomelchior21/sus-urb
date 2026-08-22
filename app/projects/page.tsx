import { Navigation } from "@/components/layout/Navigation";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cityProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="subpage projects-page">
        <section className="section-heading">
          <p className="eyebrow">Project index</p>
          <h1>24 INTERVENTIONS. ONE CITY.</h1>
          <p>These entries use the group descriptions from the exhibition captions, with class and group as metadata only.</p>
        </section>
        <div className="project-card-grid all">
          {cityProjects.map((project) => <ProjectCard project={project} key={project.id} />)}
        </div>
      </main>
    </>
  );
}
