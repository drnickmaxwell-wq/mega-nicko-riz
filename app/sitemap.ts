import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const routes = ["","/about","/team","/treatments","/fees","/contact","/video-consultations","/ai-smile-quiz","/appointments"].map((p)=>({
    url: url + p,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7
  }));
  return routes;
}
