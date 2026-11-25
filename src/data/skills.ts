import type { IconType } from "react-icons";
import { FaCss3Alt, FaGitAlt, FaHtml5, FaNodeJs, FaPython, FaReact } from "react-icons/fa6";
import {
  SiDjango,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbApi, TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export type SkillCategoryId = "frontend" | "backend" | "databases" | "tools";

export interface Skill {
  name: string;
  icon: IconType;
  /** Brand colour used for the hover glow */
  color: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  blurb: string;
  skills: Skill[];
}

/** Deliberately no ratings, percentages or years of experience. */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces for the web and mobile.",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "React Native", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "Servers, APIs and application logic.",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "Django", icon: SiDjango, color: "#44B78B" },
      { name: "C#", icon: TbBrandCSharp, color: "#9B4F96" },
      { name: "ASP.NET Core", icon: SiDotnet, color: "#512BD4" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    blurb: "Relational and document data stores.",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "Version control, APIs and deployment.",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "REST APIs", icon: TbApi, color: "#8B5CF6" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
    ],
  },
];
