import { getAllTagsByDir, getNotePreviewsByDir } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import TaggedNoteListView, { TaggedNoteListViewProps } from '../components/TaggedNoteListView';

export default TaggedNoteListView

export async function getStaticProps(): Promise<{props: TaggedNoteListViewProps}> {
  const pagedArticles = getNotePreviewsByDir('references', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('references'),
      tagPath: '/references/',
      header: 'References',
      notes: pagedArticles.notes,
      pagePath: '/references/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
