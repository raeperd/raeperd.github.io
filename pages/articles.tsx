import { getAllTagsByDir, getNotePreviewsByDir } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import TaggedNoteListView, { TaggedNoteListViewProps } from '../components/TaggedNoteListView';

export default TaggedNoteListView

export async function getStaticProps(): Promise<{props: TaggedNoteListViewProps}> {
  const pagedArticles = getNotePreviewsByDir('articles', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      tagPath: '/articles/',
      header: 'Articles',
      notes: pagedArticles.notes,
      pagePath: '/articles/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
      lastPageNumber: pagedArticles.lastPageNumber,
    },
  }
}
