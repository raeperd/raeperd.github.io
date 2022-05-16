import { getAllTagsByDir, getNotePreviewsByDir } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import TaggedNoteListView, { TaggedNoteListViewProps } from '../components/TaggedNoteListView';

export default TaggedNoteListView

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
      lastPageNumber: pagedNotes.lastPageNumber,
    },
  }
}
