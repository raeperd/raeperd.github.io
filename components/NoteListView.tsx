import Link from 'next/link';
import { NotePreview } from '../lib/note';
import MainTitle from './MainTitle';
import PaginationButton, { PaginationButtonProps } from './PaginationButton';

export default function NoteListView(
  { header, notes, pagePath, pageNumber, isFirstPage, isLastPage }
    : NoteListViewProps,
) {
  return (
    <>
      {header && <MainTitle title={header} />}
      {notes.map((note) => (
        <NotePreviewItem note={note} key={note.staticPath} />))}
      <PaginationButton
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        pagePath={pagePath}
        pageNumber={pageNumber}
      />
    </>
  )
}

export interface NoteListViewProps extends PaginationButtonProps {
  header: null | string,
  notes: NotePreview[],
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
