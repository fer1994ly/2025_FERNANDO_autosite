import { MetadataRoute } from "next";
import siteMetadata from "@/data/siteMetadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const defaultRoutes = ["", "dashboard", "privacy-policy", "terms-of-service"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return defaultRoutes;
}
