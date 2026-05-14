import { MetadataRoute } from "next";

const BASE = "https://partyyachtgoa.com";

const YACHT_SLUGS = [
  "sunset-42","mv-krishna","orca","polaris","prestige-36",
  "malini","shantam","blue-fin","fun-liner","manta-ray","sea-ray",
];

const EXPERIENCE_SLUGS = [
  "sunset-cruise","birthday-party","bachelor-party","couple-yacht-date",
  "corporate-events","dj-yacht-party","proposal-setup","fireworks-celebration",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/yachts`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/experiences`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const yachtPages: MetadataRoute.Sitemap = YACHT_SLUGS.map((slug) => ({
    url: `${BASE}/yachts/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const experiencePages: MetadataRoute.Sitemap = EXPERIENCE_SLUGS.map((slug) => ({
    url: `${BASE}/experiences/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...yachtPages, ...experiencePages];
}
