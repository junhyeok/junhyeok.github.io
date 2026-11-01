import fs from "fs";
import path from "path";
import matter from "gray-matter";

const awardsDir = path.join(
  process.cwd(),
  "content/awards"
);

export function getAwards() {
  const files = fs.readdirSync(awardsDir);

  const awards = files.map((file) => {
    const slug = file.replace(".mdx", "");

    const source = fs.readFileSync(
      path.join(awardsDir, file),
      "utf8"
    );

    const { data } = matter(source);

    return {
      slug,
      ...data,
    };
  });

  return awards.sort(
    (a: any, b: any) =>
      Number(b.year) - Number(a.year)
  );
}

export function getAward(slug: string) {
  const filePath = path.join(
    awardsDir,
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