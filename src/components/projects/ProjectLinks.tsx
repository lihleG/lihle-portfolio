import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Project } from "@/data/projects";

interface ProjectLinksProps {
  project: Project;
  /** Include the "Case study" button (used on the home page cards). */
  showCaseStudy?: boolean;
}

/** GitHub + live demo buttons. Unset URLs become disabled "coming soon" controls. */
export function ProjectLinks({ project, showCaseStudy = false }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {showCaseStudy ? (
        <MagneticButton
          href={`/projects/${project.slug}`}
          ariaLabel={`View the ${project.name} case study`}
          className="px-6 py-3"
        >
          Case study
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </MagneticButton>
      ) : null}
      <MagneticButton
        href={project.github || undefined}
        variant="secondary"
        className="px-5 py-3"
        disabledReason="Repository link coming soon"
        ariaLabel={`${project.name} GitHub repository`}
      >
        <FaGithub aria-hidden="true" className="size-4" />
        GitHub
      </MagneticButton>
      <MagneticButton
        href={project.liveUrl || undefined}
        variant="secondary"
        className="px-5 py-3"
        disabledReason="Live demo coming soon"
        ariaLabel={`${project.name} live demo`}
      >
        <ArrowUpRight aria-hidden="true" className="size-4" />
        Live demo
      </MagneticButton>
    </div>
  );
}
