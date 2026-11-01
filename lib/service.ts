import fs from "fs";
import path from "path";
import matter from "gray-matter";

const serviceDir = path.join(
  process.cwd(),
  "content/service"
);

export function getServices() {
  const files = fs.readdirSync(serviceDir);

  const service = files.map((file) => {
    const slug = file.replace(".mdx", "");

    const source = fs.readFileSync(
      path.join(serviceDir, file),
      "utf8"
    );

    const { data } = matter(source);

    return {
      slug,
      ...data,
    };
  });

  return service.sort(
    (a: any, b: any) =>
      Number(b.year) - Number(a.year)
  );
}