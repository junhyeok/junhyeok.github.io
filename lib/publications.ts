import fs from "fs";
import path from "path";
import matter from "gray-matter";

const pubDir = path.join(process.cwd(), "content/publications");

export function getPublications() {
  const files = fs.readdirSync(pubDir);

  const publications = files.map((file) => {
    const slug = file.replace(".md", "");

    const source = fs.readFileSync(
      path.join(pubDir, file),
      "utf8"
    );

    const { data } = matter(source);

    return {
      slug,
      ...data,
    };
  });

  return publications.sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}

export function getPublication(slug: string) {
  const filePath = path.join(pubDir, `${slug}.md`);

  const source = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(source);

  return {
    slug,
    frontmatter: data,
    content,
  };
}