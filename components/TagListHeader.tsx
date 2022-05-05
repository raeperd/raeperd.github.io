import Link from 'next/link';
import { Tag } from '../lib/note';

export default function TagListHeader({ tags, basePath }: TagListHeaderProps) {
  return (
    <header className="post-tags">
      {tags.map((tag) => (
        <Link key={tag.name} href={`${basePath}tags/${tag.name}`}>
          {stringFromTag(tag)}
        </Link>
      ))}
    </header>
  )
}

export interface TagListHeaderProps {
  tags: Tag[],
  basePath: string
}

function stringFromTag(tag: Tag): string {
  const numTags = tag.count ? ` (${tag.count})` : ''
  return `${tag.name}${numTags}`
}
