"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SocialLinks from "@/components/SocialLinks";
import AuroraBackground from "@/components/AuroraBackground";
import GlassCard from "@/components/GlassCard";
import Section from "@/components/Section";
import ContactRow from "@/components/ContactRow";
import PillNav from "@/components/PillNav";
import ProjectCard from "@/components/ProjectCard";
import ProjectHero from "@/components/ProjectHero";
import SkillList from "@/components/SkillList";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <main id="content" className="relative py-20">
      <AuroraBackground />
      <section id="home" className="container relative mb-16 overflow-hidden rounded-3xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {profile.name}
        </motion.h1>
        <p className="mt-1 text-base sm:text-lg md:text-xl text-amber-300 font-medium">Backend Java Developer</p>
        <p className="mt-2 text-base text-white/70">Spring Boot, многопоточность, CI/CD. Развиваюсь как backend‑инженер.</p>
        <motion.p
          className="mt-4 text-lg subtle-lead"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
        >
          {profile.summary}
        </motion.p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <Link className="inline-flex items-center rounded-xl px-5 py-2 bg-[hsl(var(--accent-green))]/90 text-black shadow-soft transition-all hover:bg-[hsl(var(--accent-green))] hover:shadow-lg" href="/contact">
              Связаться
            </Link>
          </div>
          <div className="justify-self-end relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image src="/profile.png" alt={profile.name} fill sizes="96px" className="object-cover" />
          </div>
        </div>
      </section>

      <Section id="summary" title="Summary" subtitle="Статус и быстрые ссылки">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] section-bg rounded-3xl" />
          <div className="grid gap-4 md:grid-cols-3 auto-rows-fr">
          <GlassCard className="p-6 md:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--fg))]/10 bg-[hsl(var(--fg))]/5 px-3 py-1.5 text-sm">
              <span className="text-green-300">✅</span> Open to work
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="text-sm font-semibold text-[hsl(var(--fg))]/90">Контакты</h3>
            <div className="mt-3">
              <ContactRow />
            </div>
          </GlassCard>
        </div>
        </div>
      </Section>

      <Section id="skills" title="Skills / Tools">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          {profile.skillsSections?.map((sec, idx) => (
            <GlassCard key={sec.title} className={`p-6 ${idx === 2 ? "lg:col-span-2" : ""}`}>
              <h3 className="text-base font-semibold text-white/90">{sec.title}</h3>
              <SkillList items={sec.items as unknown as string[]} />
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ProjectHero title={profile.projects[0].title} description={profile.projects[0].description} image={profile.projects[0].image}>
            <a className="rounded-xl px-3 py-1.5 text-sm bg-amber-400/15 hover:bg-amber-400/25" href={profile.projects[0].demo}>Demo</a>
            <a className="rounded-xl px-3 py-1.5 text-sm bg-teal-400/15 hover:bg-teal-400/25" href={profile.projects[0].repo}>Repo</a>
          </ProjectHero>
          {profile.projects.slice(1).map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      <PillNav />
    </main>
  );
}


