import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/work";

export default function WorkPage() {
  const projects = getProjects();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">
        Work
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((project: any) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-1000 p-2">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="
                  object-contain
                  grayscale
                  group-hover:grayscale-0
                  transition-all
                  duration-300
                "
              />
            </div>

            <div className="mt-3">
              <h2 className="mt-2 text-lg font-medium">
                {project.title}
              </h2>

              <div className="text-xs uppercase tracking-wide text-zinc-400 mt-1">
                {project.type} • {project.year}
              </div>

              <p className="text-sm text-zinc-400 mt-2">
                {project.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}