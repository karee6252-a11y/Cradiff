import type { MetadataRoute } from "next";

const BASE = "https://cardiffinternational.edu";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/academics", "/gallery", "/careers", "/contact"];
  const now = new Date();
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
