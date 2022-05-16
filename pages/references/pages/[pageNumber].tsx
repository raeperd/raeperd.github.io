import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDir } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import TaggedNoteListView, { TaggedNoteListViewProps } from '../../../components/TaggedNoteListView';

export default TaggedNoteListView

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: TaggedNoteListViewProps }> {
  const pagedArticles = getNotePreviewsByDir('references', parseInt(params.pageNumber, 10), getPageSize())
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
      lastPageNumber: pagedArticles.lastPageNumber,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', false, true)
