import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { siteConfig } from "@/config/site";
import { experience } from "@/data/experience";
import { getCvHref, getProjects } from "@/lib/server-assets";
import { isSet } from "@/lib/utils";

export default function HomePage() {
  const cvHref = getCvHref();
  const projects = getProjects();

  // Structured data for search engines — only facts that are configured
  const sameAs = [siteConfig.contact.github, siteConfig.contact.linkedin].filter(isSet);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressCountry: "ZA" },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero cvHref={cvHref} />
      <About />
      <Skills />
      <Projects projects={projects} />
      <Experience entries={experience} />
      <Contact cvHref={cvHref} />
    </>
  );
}
