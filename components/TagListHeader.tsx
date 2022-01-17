import Link from 'next/link';
import { Tag } from '../lib/note';

export default function TagListHeader({ tags, basePath }: {tags: Tag[], basePath: string}) {
  return (
    <header className="post-tags">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`${basePath}/tags/${tag.name}`}
        >
          {`${tag.name}${tag.count ? ` (${tag.count})` : ''}`}
        </Link>
      ))}
    </header>
  )
}
