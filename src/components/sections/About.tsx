import { Compass, Layers, Puzzle } from "lucide-react";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { OutlineWord } from "@/components/ui/OutlineWord";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { siteConfig } from "@/config/site";

const TRAITS = [
  {
    icon: Compass,
    title: "Self-taught",
    text: "I learn by building — picking up new tools whenever a project calls for them.",
  },
  {
    icon: Puzzle,
    title: "Problem-solver",
    text: "I like understanding a problem properly before deciding how to solve it.",
  },
  {
    icon: Layers,
    title: "End-to-end builder",
    text: "Interface, API, database and deployment — I want to see a whole product through.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <OutlineWord word="ABOUT" />
      <div className="container-x">
        <SectionHeading
          titleId="about-title"
          index="01"
          eyebrow="About"
          title="A self-taught developer building complete products."
          highlight={["complete", "products"]}
        />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <Reveal>
              <p className="text-xl leading-relaxed text-white/90 md:text-2xl">{siteConfig.positioning}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                My path into software has been self-directed. I learn by building, getting things wrong and
                fixing them — a habit that has made me patient with hard problems and curious about how
                things work underneath.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                What draws me in most is the whole picture: shaping an idea, designing the interface,
                writing the front end and back end, modelling the data and shipping it. That is why the
                projects below are complete applications rather than isolated components.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                Based in {siteConfig.location}
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-4">
            {TRAITS.map((t, i) => (
              <li key={t.title}>
                <Reveal delay={0.1 * i}>
                  <SpotlightCard className="flex gap-5 p-6">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet/25 to-blue/20 text-white">
                      <t.icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">{t.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.text}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 md:mt-28">
          <ProcessFlow />
        </div>
      </div>
    </section>
  );
}
