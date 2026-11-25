/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL SITE CONFIGURATION
 *  Edit this file to change contact details, links and copy that
 *  appears across the whole portfolio.
 *
 *  Any link left as an empty string ("") is rendered as a clearly
 *  disabled "coming soon" control — never as a dead or fake link.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Lihle Guma",
  title: "Full-Stack Developer",
  location: "Johannesburg, South Africa",
  positioning:
    "I'm a self-taught full-stack developer passionate about engineering modern web applications, scalable digital products and interactive user experiences.",
  heroIntro:
    "I'm Lihle Guma — a Full-Stack Developer turning ideas into functional digital experiences.",

  /** Public site URL. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** ── Contact details (edit here) ─────────────────────────── */
  contact: {
    /** e.g. "lihle@example.com" */
    email: "",
    /** e.g. "https://www.linkedin.com/in/your-handle" */
    linkedin: "",
    /** e.g. "https://github.com/your-handle" */
    github: "",
  },

  /**
   * CV file. Drop your PDF into /public/cv/ using this exact file name
   * and the Download CV buttons switch on automatically.
   */
  cv: {
    path: "/cv/Lihle-Guma-CV.pdf",
    downloadName: "Lihle-Guma-CV.pdf",
  },

  /** Navigation (ids match the section ids on the page) */
  nav: [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
