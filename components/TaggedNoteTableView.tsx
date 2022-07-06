import Link from 'next/link';
import TagListHeader from './TagListHeader';
import MainTitle from './MainTitle';
import { TaggedNoteListViewProps } from './TaggedNoteListView';
import PaginationButton from './PaginationButton';
import { NotePreview } from '../lib/note';

export default function TaggedNoteTableView(
  {
    tagPath, tags, header, notes,
    pagePath, pageNumber, isFirstPage, isLastPage, lastPageNumber,
  }: TaggedNoteTableViewProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath={tagPath} />
      {header && <MainTitle title={header} />}
      <NoteTableNav notes={notes} />
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

export type TaggedNoteTableViewProps = TaggedNoteListViewProps

function NoteTableNav({ notes }: {notes: NotePreview[]}) {
  return (
    <table id="note-table-nav">
      <tr>
        <th>Problem</th>
        <th>Idea</th>
      </tr>
      {notes.map((note) => (
        <tr key={note.staticPath}>
          <td className="title"><Link href={`/${note.staticPath}`}>{note.title}</Link></td>
          <td>
            <Link href={`/${note.staticPath}`}><a data-cy="note-link">{note.idea}</a></Link>
          </td>
        </tr>
      ))}
    </table>
  );
}
