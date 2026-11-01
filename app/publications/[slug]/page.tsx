// each publication page

import { Suspense } from "react";
import { getPublication, getPublications } from "@/lib/publications";

export async function generateStaticParams() {
  const publications = getPublications();
  return publications.map((p) => ({ slug: p.slug }));
}

async function PublicationContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publication = getPublication(slug);

  if (!publication) {
    return <div>Publication not found</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
    <h1 className="text-4xl font-bold mb-3">
        {publication.frontmatter.title}
    </h1>

    <div className="text-zinc-400 mb-8">
        {publication.frontmatter.category} •{" "}
        {publication.frontmatter.venue}
    </div>

    <div className="mt-6">
        <a
            href={publication.frontmatter.paperurl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-zinc-400 hover:text-white"
        >
            PDF
        </a>
    </div>

    <div className="mt-8 text-zinc-300 leading-relaxed">
        <p>Abstract</p>

        {publication.content}
    </div>

    {publication.frontmatter.citation && (
        <div className="mt-10">
        <h2 className="font-semibold mb-2">
            Citation
        </h2>

        <p className="text-zinc-500 text-sm">
            {publication.frontmatter.citation}
        </p>
        </div>
    )}
    </main>
  );
}

export default function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-8">Loading...</div>}>
      <PublicationContent params={params} />
    </Suspense>
  );
}