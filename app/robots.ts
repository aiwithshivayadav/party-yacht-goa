import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
      },
    ],
    sitemap: "https://partyyachtgoa.com/sitemap.xml",
    host: "https://partyyachtgoa.com",
  };
}
