import type { MarkdownInstance } from "astro";

export default function (posts: MarkdownInstance<Record<string, any>>[]) {
  const tagNameToCount = posts
    .flatMap((post) => post.frontmatter.tags)
    .reduce((toMap, tagName) => {
      toMap.set(tagName, (toMap.get(tagName) || 0) + 1);
      return toMap;
    }, new Map<string, number>());

  const tagFromName = (name: string) => {
    return {
      name,
      count: tagNameToCount.get(name) || 0,
    };
  };

  return Array.from(tagNameToCount.keys())
    .map((tagName) => tagFromName(tagName))
    .sort((left, right) => {
      if (left.count !== right.count) {
        return right.count - left.count;
      }
      if (left.name < right.name) {
        return -1;
      }
      return 1;
    });
}
