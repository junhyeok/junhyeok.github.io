// each work page

import { Suspense } from "react";
import { getProject, getProjects } from "@/lib/work";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import BackToTop from "@/components/BackToTop";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

async function ProjectContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">
        {project.frontmatter.title}
      </h1>

      <div className="mb-8">
        <div className="text-sm text-zinc-500">
          {project.frontmatter.type} • {project.frontmatter.year}
        </div>

        <div className="text-zinc-500 mt-1">
          {project.frontmatter.summary}
        </div>
      </div>



      <div className="prose prose-invert max-w-none">
        <MDXRemote source={project.source} />
      </div>
    </main>

    <BackToTop />
    </>
  );
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-8">Loading...</div>}>
      <ProjectContent params={params} />
    </Suspense>
  );
}