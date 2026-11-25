import { existsSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site";
import { projects, type Project } from "@/data/projects";

/** True when a file exists inside /public (path like "/cv/file.pdf"). */
export function publicFileExists(publicPath: string) {
  const clean = publicPath.replace(/^\/+/, "");
  return existsSync(path.join(process.cwd(), "public", clean));
}

/** Returns the CV URL only if the PDF has actually been added. */
export function getCvHref(): string | null {
  return publicFileExists(siteConfig.cv.path) ? siteConfig.cv.path : null;
}

/** Projects with `image` cleared when the screenshot file is not present yet. */
export function getProjects(): Project[] {
  return projects.map((p) => ({
    ...p,
    image: p.image && publicFileExists(p.image) ? p.image : undefined,
  }));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
