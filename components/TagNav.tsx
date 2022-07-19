import Link from 'next/link';
import { Tag } from '../lib/note';

export default function TagNav({ tags, basePath }: TagNavProps) {
  return (
    <nav id="tag-nav">
      {tags.map((tag) => (
        <Link key={tag.name} href={`${basePath}tags/${tag.name}`}>
          <a className="tag-link" data-cy="tag-link">{stringFromTag(tag)}</a>
        </Link>
      ))}
    </nav>
  )
}

export interface TagNavProps {
  tags: Tag[],
  basePath: string
}

function stringFromTag(tag: Tag): string {
  const numTags = tag.count ? ` (${tag.count})` : ''
  return `${tag.name}${numTags}`
}
