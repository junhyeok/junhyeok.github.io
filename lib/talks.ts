import fs from "fs";
import path from "path";
import matter from "gray-matter";

const talksDir = path.join(
  process.cwd(),
  "content/talks"
);

export function getTalks() {
  const files = fs.readdirSync(talksDir);

  const talks = files.map((file) => {
    const slug = file.replace(".mdx", "");

    const source = fs.readFileSync(
      path.join(talksDir, file),
      "utf8"
    );

    const { data } = matter(source);

    return {
      slug,
      ...data,
    };
  });

  return talks.sort(
    (a: any, b: any) =>
      Number(b.year) - Number(a.year)
  );
}

export function getTalk(slug: string) {
  const filePath = path.join(
    talksDir,
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