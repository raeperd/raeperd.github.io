import Link from 'next/link';
import { Tag } from '../lib/note';

export default function TagListHeader({ tags, tagBasePath }: {tags: Tag[], tagBasePath: string}) {
  return (
    <header className="post-tags">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`${tagBasePath}/tags/${tag.name}`}
        >
          {stringFromTag(tag)}
        </Link>
      ))}
    </header>
  )
}

function stringFromTag(tag: Tag): string {
  const numTags = tag.count ? ` (${tag.count})` : ''
  return `${tag.name}${numTags}`
}
