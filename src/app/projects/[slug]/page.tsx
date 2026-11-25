import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { projects } from "@/data/projects";
import { getProject, getProjects } from "@/lib/server-assets";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: `${project.name} — ${project.description}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} · Lihle Guma`,
      description: project.description,
      url: `/projects/${project.slug}`,
      ...(project.image ? { images: [{ url: project.image }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const all = getProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const project = all[index];
  if (!project) notFound();

  const next = all[(index + 1) % all.length] ?? project;
  return <ProjectDetail project={project} next={next} />;
}
