/**
 * ─────────────────────────────────────────────────────────────
 *  PROFESSIONAL EXPERIENCE  (employment only — personal software
 *  projects live in src/data/projects.ts)
 *
 *  Add one object per role, newest first. Example:
 *
 *  {
 *    id: "acme-dev",
 *    company: "Company name",
 *    position: "Junior Developer",
 *    location: "Johannesburg, South Africa",   // optional
 *    start: "Jan 2025",
 *    end: "Present",                           // or e.g. "Dec 2025"
 *    responsibilities: ["What you were responsible for"],
 *    achievements: ["A real, verifiable outcome"],   // optional
 *  },
 *
 *  While the array is empty the section shows an honest placeholder.
 * ─────────────────────────────────────────────────────────────
 */

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location?: string;
  start: string;
  end: string;
  responsibilities: string[];
  achievements?: string[];
}

export const experience: ExperienceEntry[] = [];
