import Link from 'next/link';
import { NotePreview } from '../lib/note';
import MainTitle from './MainTitle';
import PaginationButton, { PaginationButtonProps } from './PaginationButton';

export default function NoteListView(
  { header, notes, pagePath, pageNumber, isFirstPage, isLastPage, lastPageNumber }
    : NoteListViewProps,
) {
  return (
    <>
      {header && <MainTitle title={header} />}
      <NoteListNav notes={notes} />
      <PaginationButton
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        pagePath={pagePath}
        pageNumber={pageNumber}
        lastPageNumber={lastPageNumber}
      />
    </>
  )
}

export interface NoteListViewProps extends PaginationButtonProps {
  header: null | string,
  notes: NotePreview[],
}

function NoteListNav({ notes }: {notes: NotePreview[] }) {
  return (
    <nav id="note-list-nav">
      {notes.map((note) => (
        <Link href={`/${note.staticPath}`} passHref>
          <a data-cy="note-link">
            <time>{note.date}</time>
            <h2>{note.title}</h2>
          </a>
        </Link>
      ))}
    </nav>
  )
}
