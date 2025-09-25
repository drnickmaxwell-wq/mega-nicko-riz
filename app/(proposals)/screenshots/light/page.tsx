"use client";
import dynamic from "next/dynamic";
import { SMHLayouts, SMHTokens } from "@/lib/design/smh.design";
import { HeroSection, CardsGrid, CTASection } from "@/components/renderer/SectionRenderer";

// robust dynamic imports (default OR named export)
const Header     = dynamic(() => import("@/components/layout/Header").then(m => m.default ?? (m as any).Header), { ssr:false });
const Footer     = dynamic(() => import("@/components/layout/Footer").then(m => m.default ?? (m as any).Footer), { ssr:false });
const ActionDock = dynamic(() => import("@/components/layout/ActionDock").then(m => m.default ?? (m as any).ActionDock), { ssr:false });

export default function Page() {
  const sections = SMHLayouts?.homepage?.sections || SMHLayouts?.layoutByPage?.homepage?.sections || [];
  return (
    <>
      <Header />
      {sections.map((s: any, i: number) => {
        if (s.name === "hero")     return <HeroSection key={i} section={s} />;
        if (s.name === "services") return <CardsGrid key={i} section={s} kind="cards" />;
        if (s.name === "cta")      return <CTASection key={i} section={s} tokens={SMHTokens} />;
        if (s.name === "about")    return <CardsGrid key={i} section={s} kind="stats" />;
        if (s.name === "location") return <CardsGrid key={i} section={s} kind="contactInfo" />;
        return null;
      })}
      <Footer />
      <ActionDock />
    </>
  );
}
