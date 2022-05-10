import { getAllTagsByDir, getNotePreviewsByDir, Note } from '../lib/note';
import TaggedNoteTableView, { TaggedNoteTableViewProps } from '../components/TaggedNoteTableView';
import { getPageSize } from '../lib/configuration';

export default TaggedNoteTableView

export async function getStaticProps(): Promise<{props: TaggedNoteTableViewProps}> {
  const pagedArticles = getNotePreviewsByDir('algorithms', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('algorithms'),
      tagPath: '/algorithms/',
      header: 'Algorithms',
      notes: pagedArticles.notes as Note[],
      pagePath: '/algorithms/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
