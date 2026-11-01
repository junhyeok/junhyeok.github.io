import { MetadataRoute } from "next";
import { getProjects } from "@/lib/work";
import { getPublications } from "@/lib/publications";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://junhyeok.github.io";

  const projects = getProjects().map((project: any) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  const publications = getPublications().map((pub: any) => ({
    url: `${baseUrl}/publications/${pub.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
    },
    ...projects,
    ...publications,
  ];
}