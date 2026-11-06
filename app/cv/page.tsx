import Section from "@/components/Section";

import { profile } from "@/content/cv/profile";
import { getExperiences } from "@/lib/experience";
import { getProjects } from "@/lib/work";
import { getPublications } from "@/lib/publications";
import { getTalks } from "@/lib/talks";
import { getAwards } from "@/lib/award";
import { getTeaching } from "@/lib/teaching";
import { getServices } from "@/lib/service";

export default function CVPage() {
  const projects = getProjects();
  const publications = getPublications();
  const experiences = getExperiences();
  const services = getServices();
  const teaching = getTeaching();
  const awards = getAwards();
  const talks = getTalks();

  // Recognition entries
  const recognitions = services.filter(
    (s: any) => s.recognition
  );

  // Group services by:
  // category -> venue -> role -> years
  const groupedServices = services.reduce(
    (acc: any, service: any) => {
      const category = service.category;

      if (!acc[category]) {
        acc[category] = {};
      }

      const venueKey =
        service.venue ??
        service.venueFull;

      if (!acc[category][venueKey]) {
        acc[category][venueKey] = {
          venue: service.venue,
          venueFull: service.venueFull,
          publisher: service.publisher,
          roles: {},
        };
      }

      const roleKey = service.role;

      if (
        !acc[category][venueKey].roles[roleKey]
      ) {
        acc[category][venueKey].roles[roleKey] = [];
      }

      acc[category][venueKey].roles[
        roleKey
      ].push(service.year);

      return acc;
    },
    {}
  );


  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold">
          {profile.name}
        </h1>

        <p className="text-zinc-400 mt-2">
          {profile.headline}
        </p>

        <p className="mt-4 text-zinc-300">
          {profile.summary}
        </p>

        <p className="mt-4 flex flex-wrap items-center gap-y-1 text-zinc-300">
          <span>{profile.location}</span>

          <span className="whitespace-nowrap">
            <span className="mx-2 text-zinc-600">·</span>
            <a href={`mailto:${profile.email}`} className="text-blue-400">
              Email 
            </a>
          </span>
          
          <span className="whitespace-nowrap">
            <span className="mx-2 text-zinc-600">·</span>
            <a href={profile.linkedin} className="text-blue-400" target="_blank" rel="noopener noreferrer">
              LinkedIn 
            </a>
          </span>
          
          <span className="whitespace-nowrap">
            <span className="mx-2 text-zinc-600">·</span>
            <a href={profile.googleScholar} className="text-blue-400" target="_blank" rel="noopener noreferrer">
              Google Scholar
            </a>
          </span>

        </p>
      </section>

      

      <Section title="Education">
        <div className="space-y-4">
          {profile.education.map((edu) => (
            <div key={edu.degree}>
              <div className="font-medium">{edu.degree}</div>
              <div className="text-zinc-400">
                {edu.institution} · {edu.year}
              </div>
              {edu.thesis && (
                <div className="text-zinc-500 text-sm italic mt-0.5">
                  {edu.thesis}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

{/*       <Section title="Research Interests">
        <ul className="list-disc pl-5">
          {profile.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </Section> */}

      <Section title="Experience">
        <div className="space-y-6">
          {experiences.map((exp: any) => (
            <div key={exp.slug}>
              <div className="font-medium">
                {exp.title}
              </div>

              <div className="text-zinc-400 text-sm">
                {exp.organization} • {exp.start}–{exp.end}
              </div>

              <div className="text-zinc-500 text-sm mt-1">
                {exp.summary}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Selected Publications">
        <div className="space-y-3">
          {publications.slice(0, 7).map((publication: any) => (
            <div key={publication.slug}>
              <div>{publication.title}</div>
              <div className="text-zinc-500 text-sm">
                {publication.venue}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Selected Talks">
        <div className="space-y-3">
          {talks.slice(0, 3).map((talk: any) => (
            <div key={talk.slug}>
              <div>{talk.title}</div>
              <div className="text-zinc-500 text-sm">
                {talk.venue}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Awards">
        <div className="space-y-3">
          {awards.slice(0, 5).map((award: any) => (
            <div key={award.slug}>
              <div>{award.title}</div>
              <div className="text-zinc-500 text-sm">
                {award.organization} • {award.year}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Teaching">
        <div className="space-y-3">
          {teaching.slice(0, 5).map((course: any) => (
            <div key={course.slug}>
              <div>{course.title}</div>
              <div className="text-zinc-500 text-sm">
                {course.institution} • {course.year}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Services">
        {recognitions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Recognition
            </h3>

            <div className="space-y-2">
              {recognitions.map((service: any) => (
                <div key={service.slug}>
                  <div className="font-semibold">
                    {service.recognition}
                  </div>

                  <div className="text-zinc-500 text-sm">
                    {service.publisher && `${service.publisher} `}
                    {service.venueFull}
                    {service.venue && ` (${service.venue})`}
                    {" • "}
                    {service.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {Object.entries(groupedServices).map(
          ([category, venues]: any) => (
            <div key={category} className="mb-6">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                {category === "Conference"
                  ? "Conferences"
                  : category === "Journal"
                  ? "Journals"
                  : category}
              </h3>

              <div className="space-y-4">
                {Object.values(venues).map((venue: any) => (
                  <div
                    key={venue.venue ?? venue.venueFull}
                  >
                    <div>
                      {venue.publisher && `${venue.publisher} `}
                      {venue.venueFull}
                      {venue.venue && ` (${venue.venue})`}
                    </div>

                    {Object.entries(venue.roles).map(
                      ([role, years]: any) => (
                        <div
                          key={role}
                          className="ml-3 text-zinc-500 text-sm"
                        >
                          {category === "Conference"
                            ? `${role} • ${years
                                .sort(
                                  (a: string, b: string) =>
                                    Number(a) - Number(b)
                                )
                                .join(", ")}`
                            : role}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </Section>


      <Section title="Projects">
        <div className="space-y-3">
          {projects.slice(0, 5).map((project: any) => (
            <div key={project.slug}>
              <div>{project.title}</div>
              <div className="text-zinc-500 text-sm">
                {project.organization}
                {project.year}
              </div>
            </div>
          ))}
        </div>
      </Section>


    </div>
  );
}