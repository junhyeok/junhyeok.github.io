import fs from "fs";
import path from "path";
import matter from "gray-matter";

const teachingDir = path.join(
  process.cwd(),
  "content/teaching"
);

export function getTeaching() {
  const files = fs.readdirSync(teachingDir);

  const teaching = files.map((file) => {
    const slug = file.replace(".mdx", "");

    const source = fs.readFileSync(
      path.join(teachingDir, file),
      "utf8"
    );

    const { data } = matter(source);

    return {
      slug,
      ...data,
    };
  });

  return teaching.sort(
    (a: any, b: any) =>
      Number(b.year) - Number(a.year)
  );
}

export function getTeachingItem(slug: string) {
  const filePath = path.join(
    teachingDir,
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