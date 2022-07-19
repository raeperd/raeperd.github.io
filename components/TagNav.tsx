import Link from 'next/link';
import { Tag } from '../lib/note';

export default function TagNav({ tags, basePath, isKeywords }: TagNavProps) {
  return (
    <nav id="tag-nav">
      {tags.map((tag) => (
        <Link key={tag.name} href={`${basePath}tags/${tag.name}`}>
          <a className="tag-link" data-cy="tag-link">
            <span itemProp={isKeywords ? 'keywords' : undefined}>{tag.name}</span>
            {tag.count && <span>{` (${tag.count})`}</span>}
          </a>
        </Link>
      ))}
    </nav>
  )
}

export interface TagNavProps {
  tags: Tag[],
  basePath: string,
  isKeywords?: boolean
}
