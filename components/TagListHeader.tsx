import Link from 'next/link';
import { Tag } from '../lib/note';

export default function TagListHeader({ tags }: {tags: Tag[]}) {
  return (
    <header className="post-tags">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`/tags/${tag.name}`}
        >
          {`${tag.name}${tag.count ? ` (${tag.count})` : ''}`}
        </Link>
      ))}
    </header>
  )
}
