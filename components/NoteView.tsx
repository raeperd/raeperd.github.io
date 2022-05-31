import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Note } from '../lib/note'
import TagListHeader from './TagListHeader';

export default function NoteView({ note }: NoteViewProps) {
  return (
    <article className="post-single">
      <header className="post-title">
        <p>
          <time>{note.date}</time>
          <span>{note.author}</span>
        </p>
        <h1>{note.title}</h1>
      </header>
      <TagListHeader tags={note.tags.map((tag) => ({ name: tag }))} basePath="/" />
      <section className="post-content">
        <ReactMarkdown
          components={SyntaxHighlight}
          // @ts-expect-error rehypeSlug and rehypeAutoLinkHeadings are not supporting typescript
          rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]]}
          remarkPlugins={[remarkGfm, remarkMath]}
        >
          {note.content}
        </ReactMarkdown>
      </section>
    </article>
  )
}

export interface NoteViewProps {
  note: Note,
}

const SyntaxHighlight: object = {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}
