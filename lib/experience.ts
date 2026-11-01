import fs from "fs";
import path from "path";
import matter from "gray-matter";

const expDir = path.join(
  process.cwd(),
  "content/experience"
);

export function getExperiences() {
  const files = fs.readdirSync(expDir);

  const experiences = files.map((file) => {
    const slug = file.replace(".mdx", "");

    const source = fs.readFileSync(
      path.join(expDir, file),
      "utf8"
    );

    const { data } = matter(source);

    return {
      slug,
      ...data,
    };
  });

  return experiences.sort(
    (a: any, b: any) =>
      new Date(b.start).getTime() -
      new Date(a.start).getTime()
  );
}

export function getExperience(slug: string) {
  const filePath = path.join(
    expDir,
    `${slug}.mdx`
  );

  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const { data, content } = matter(source);

  return {
    slug,
    frontmatter: data,
    source: content,
  };
}