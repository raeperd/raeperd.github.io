import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Note } from '../../../lib/note';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import TaggedNoteTableView, { TaggedNoteTableViewProps } from '../../../components/TaggedNoteTableView';
import { getPageSize } from '../../../lib/configuration';

export default TaggedNoteTableView

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: TaggedNoteTableViewProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('algorithms', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('algorithms'),
      tagPath: '/algorithms/',
      header: `Algorithms #${params.tag}`,
      notes: pagedArticles.notes as Note[],
      pagePath: `/algorithms/tags/${params.tag}/`,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
      lastPageNumber: pagedArticles.lastPageNumber,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('algorithms', true, false)
