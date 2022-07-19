import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { AnchorHTMLAttributes } from 'react';
import { Note } from '../lib/note'
import TagNav from './TagNav';

export default function Article({ note }: NoteViewProps) {
  return (
    <article itemScope itemType="https://schema.org/BlogPosting">
      <header id="article-header">
        <div>
          <time className="article-meta" itemProp="datePublished" dateTime={note.date}>{note.date}</time>
          <span className="article-meta" itemProp="author">{note.author}</span>
        </div>
        <h1 id="article-title" itemProp="headline">{note.title}</h1>
        <TagNav tags={note.tags.map((tag) => ({ name: tag }))} basePath="/" isKeywords />
      </header>
      <ReactMarkdown
        components={{
          code: SyntaxHighlightedCodeBlock,
          a: ForcedAbsoluteAnchor,
        }}
        // @ts-expect-error rehypeSlug and rehypeAutoLinkHeadings are not supporting typescript
        rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]]}
        remarkPlugins={[remarkGfm, remarkMath]}
        id="article-body"
        itemProp="articleBody"
      >
        {note.content}
      </ReactMarkdown>
    </article>
  )
}

export interface NoteViewProps {
  note: Note,
}

function SyntaxHighlightedCodeBlock({ inline, className, children, ...props }: CodeProps) {
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
}

function ForcedAbsoluteAnchor({ href, children, ...props }
  : AnchorHTMLAttributes<HTMLAnchorElement>) {
  const shouldPreserve = href?.startsWith('http://') || href?.startsWith('https://')
    || href?.startsWith('/')
    || href?.startsWith('#')
  return <a href={shouldPreserve ? href : `/${href}`} {...props}>{children}</a>
}
