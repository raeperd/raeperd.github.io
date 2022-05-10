import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDir } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import TaggedNoteTableView, { TaggedNoteTableViewProps } from '../../../components/TaggedNoteTableView';

export default TaggedNoteTableView;

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: TaggedNoteTableViewProps }> {
  const pagedArticles = getNotePreviewsByDir('algorithms', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('algorithms'),
      tagPath: '/algorithms/',
      header: 'Algorithms',
      notes: pagedArticles.notes,
      pagePath: '/algorithms/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('algorithms', false, true)
