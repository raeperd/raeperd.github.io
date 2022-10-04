import type { MarkdownInstance } from "astro";

export default function (
  left: MarkdownInstance<Record<string, any>>,
  right: MarkdownInstance<Record<string, any>>
) {
  return (
    new Date(right.frontmatter.date).getTime() -
    new Date(left.frontmatter.date).getTime()
  );
}
