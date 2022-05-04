import Link from 'next/link';
import { Tag } from '../lib/note';

export default function TagLink({ tag, tagBasePath }: {tag: Tag, tagBasePath: string}) {
  return (
    <Link
      key={tag.name}
      href={`${tagBasePath}/tags/${tag.name}`}
    >
      {stringFromTag(tag)}
    </Link>
  )
}

function stringFromTag(tag: Tag): string {
  const numTags = tag.count ? ` (${tag.count})` : ''
  return `${tag.name}${numTags}`
}
