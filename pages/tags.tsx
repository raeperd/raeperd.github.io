import { getAllTagsByDir, getNotePreviewsByDir } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import NoteListView from '../components/NoteListView';
import TagListHeader from '../components/TagListHeader';
import { TaggedNoteListViewProps } from '../components/TaggedNoteListView';

export default function TagsPage(
  {
    tags, tagPath,
    header, notes, pagePath, pageNumber, isFirstPage, isLastPage,
  }: TaggedNoteListViewProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath={tagPath} />
      <NoteListView
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

export async function getStaticProps(): Promise<{props: TaggedNoteListViewProps}> {
  const pagedNotes = getNotePreviewsByDir('', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      tagPath: '/',
      header: 'Tags',
      notes: pagedNotes.notes,
      pagePath: '/tags/',
      pageNumber: pagedNotes.pageNumber,
      isFirstPage: pagedNotes.isFirstPage,
      isLastPage: pagedNotes.isLastPage,
    },
  }
}
