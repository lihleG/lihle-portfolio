/**
 * Pre-build reminder. Prints (never fails) a list of things still to fill in
 * so nothing ships by accident as a "coming soon" placeholder.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => readFileSync(path.join(root, p), "utf8");
const todo = [];

const site = read("src/config/site.ts");
for (const key of ["email", "linkedin", "github"]) {
  const m = site.match(new RegExp(`${key}:\\s*"([^"]*)"`));
  if (!m || !m[1].trim()) todo.push(`src/config/site.ts → contact.${key} is empty`);
}

const cv = site.match(/path:\s*"([^"]+\.pdf)"/);
if (cv && !existsSync(path.join(root, "public", cv[1]))) {
  todo.push(`public${cv[1]} is missing (Download CV buttons stay disabled)`);
}

const projects = read("src/data/projects.ts");
for (const key of ["github", "liveUrl"]) {
  const empty = (projects.match(new RegExp(`${key}:\\s*""`, "g")) ?? []).length;
  if (empty) todo.push(`src/data/projects.ts → ${empty} project(s) have an empty ${key}`);
}
const noTech = (projects.match(/techStack:\s*\[\s*\]/g) ?? []).length;
if (noTech) todo.push(`src/data/projects.ts → ${noTech} project(s) have no techStack`);
const noChallenges = (projects.match(/challenges:\s*\[\s*\]/g) ?? []).length;
if (noChallenges) todo.push(`src/data/projects.ts → ${noChallenges} project(s) have no technical challenges`);

if (/export const experience: ExperienceEntry\[\] = \[\s*\];/.test(read("src/data/experience.ts"))) {
  todo.push("src/data/experience.ts → no employment entries yet");
}

for (const env of ["RESEND_API_KEY", "CONTACT_TO_EMAIL", "NEXT_PUBLIC_SITE_URL"]) {
  if (!process.env[env]) todo.push(`env ${env} is not set (see .env.example)`);
}

if (todo.length) {
  console.log("\n⚠  Portfolio checklist — still to fill in:");
  todo.forEach((t) => console.log("   • " + t));
  console.log("");
} else {
  console.log("✓ Portfolio checklist: nothing outstanding.");
}
