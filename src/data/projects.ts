/**
 * ─────────────────────────────────────────────────────────────
 *  FEATURED PROJECTS
 *
 *  Only facts supplied by Lihle are filled in. Everything else is
 *  deliberately left empty so nothing is invented:
 *
 *   • techStack / features / challenges  → empty arrays render a
 *     tidy "to be added" note on the project page.
 *   • github / liveUrl                   → empty strings render a
 *     disabled "coming soon" button (no fake links).
 *   • image                              → set to a path inside /public
 *     (e.g. "/projects/stayeasy.png"). Until the file exists, an
 *     illustrated placeholder is shown automatically.
 *
 *  The `problem` lines are short, neutral paraphrases of each
 *  project's description — rewrite them in your own words.
 * ─────────────────────────────────────────────────────────────
 */

export type PreviewVariant = "listings" | "commerce" | "finance";

export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  github: string;
  liveUrl: string;
  /** Path inside /public, e.g. "/projects/stayeasy.png" */
  image?: string;
  /** Which illustrated placeholder to show until a screenshot exists */
  variant: PreviewVariant;
  /** Accent colour used for the glow behind the preview */
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "stayeasy",
    index: "01",
    name: "StayEasy",
    tagline: "Property & accommodation",
    description: "A property and accommodation web application.",
    problem: "Making it easier to find and manage property and accommodation online.",
    techStack: [],
    features: [],
    challenges: [],
    github: "",
    liveUrl: "",
    image: "/projects/stayeasy.png",
    variant: "listings",
    accent: "#8B5CF6",
  },
  {
    slug: "nexus-gadgets",
    index: "02",
    name: "Nexus Gadgets",
    tagline: "Ecommerce with a social edge",
    description:
      "An ecommerce platform featuring group purchasing, interactive shopping experiences and gamification.",
    problem: "Making online shopping more social and engaging through group purchasing and gamification.",
    techStack: [],
    features: ["Group purchasing", "Interactive shopping experiences", "Gamification"],
    challenges: [],
    github: "",
    liveUrl: "",
    image: "/projects/nexus-gadgets.png",
    variant: "commerce",
    accent: "#3B82F6",
  },
  {
    slug: "finflow",
    index: "03",
    name: "FinFlow",
    tagline: "Personal finance management",
    description:
      "A personal finance management application featuring financial dashboards, transactions, budgeting, savings goals and analytics.",
    problem:
      "Bringing everyday money management — transactions, budgets and savings goals — into one place.",
    techStack: [],
    features: ["Financial dashboards", "Transactions", "Budgeting", "Savings goals", "Analytics"],
    challenges: [],
    github: "",
    liveUrl: "",
    image: "/projects/finflow.png",
    variant: "finance",
    accent: "#6D7CF9",
  },
];
