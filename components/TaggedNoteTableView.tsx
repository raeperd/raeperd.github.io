import Link from 'next/link';
import TagListHeader from './TagListHeader';
import MainTitle from './MainTitle';
import { TaggedNoteListViewProps } from './TaggedNoteListView';
import { NoteListViewProps } from './NoteListView';
import PaginationButton from './PaginationButton';

export default function TaggedNoteTableView(
  {
    tagPath, tags,
    header, notes, pagePath, pageNumber, isFirstPage, isLastPage,
  }: TaggedNoteTableViewProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath={tagPath} />
      <NoteTableView
        header={header}
        notes={notes}
        pagePath={pagePath}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

export type TaggedNoteTableViewProps = TaggedNoteListViewProps

function NoteTableView(
  { header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: NoteListViewProps,
) {
  return (
    <>
      {header && <MainTitle title={header} />}
      <table className="algorithm-table">
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
      <PaginationButton
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        pagePath={pagePath}
        pageNumber={pageNumber}
      />
    </>
  )
}
