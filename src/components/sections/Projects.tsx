import { ProjectCard } from "@/components/projects/ProjectCard";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/data/projects";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-28 md:py-40">
      <OutlineWord word="WORK" />
      <div className="container-x">
        <SectionHeading
          titleId="projects-title"
          index="03"
          eyebrow="Featured projects"
          title="Three applications, built end to end."
          highlight={["applications"]}
          description="Personal software projects that show how I approach real products. Open any case study for the full breakdown."
        />

        <div className="space-y-28 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} flip={i % 2 === 1} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
