import Link from "next/link";
import { getPublications } from "@/lib/publications";

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">
        Publications
      </h1>

      <div>
        {publications.map((publication: any) => (
          <Link
            key={publication.slug}
            href={`/publications/${publication.slug}`}
            className="
              block
              py-3
              border-b
              border-zinc-900
              hover:border-zinc-600
              transition-colors
            "
          >
            <h2 className="font-medium">
              {publication.title}
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              {publication.venue}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}