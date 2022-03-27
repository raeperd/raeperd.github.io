import Link from 'next/link';
import { NotePreview } from '../lib/note';
import MainTitle from './MainTitle';

export default function NoteListView(
  { header, notes, basePath, pageNumber, isFirstPage, isLastPage }
    : NoteListViewProps,
) {
  return (
    <>
      {header && <MainTitle title={header} />}
      {notes.map((note) => (
        <NotePreviewItem note={note} key={note.staticPath} />))}
      <nav className="main-nav">
        {!isFirstPage && (<PrevButton basePath={basePath || '/'} currentPageNumber={pageNumber} />)}
        {!isLastPage && (<NextButton basePath={basePath || '/'} currentPageNumber={pageNumber} />)}
      </nav>
    </>
  )
}

export interface NoteListViewProps {
  header: null | string,
  notes: NotePreview[],
  basePath?: string,
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean,
}

function NotePreviewItem({ note }: {note: NotePreview}) {
  return (
    <article className="post-entry">
      <h2>{note.title}</h2>
      <time>{note.date}</time>
      <Link href={`/${note.staticPath}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a />
      </Link>
    </article>
  )
}

function PrevButton({ basePath, currentPageNumber }: PagingButtonProps) {
  const prevPageLink = currentPageNumber === 2 ? `${basePath}` : `${basePath}pages/${currentPageNumber - 1}`
  return (
    <Link href={prevPageLink}>
      <a className="prev">&lt; Prev Page</a>
    </Link>
  )
}

function NextButton({ basePath, currentPageNumber }: PagingButtonProps) {
  return (
    <Link href={`${basePath}pages/${currentPageNumber + 1}`}>
      <a className="next">Next Page &gt;</a>
    </Link>
  )
}

type PagingButtonProps = {
  basePath: string,
  currentPageNumber: number
}
