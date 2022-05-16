import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import TaggedNoteListView, { TaggedNoteListViewProps } from '../../../components/TaggedNoteListView';

export default TaggedNoteListView

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: TaggedNoteListViewProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('articles', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      tagPath: '/articles/',
      header: `Articles #${params.tag}`,
      notes: pagedArticles.notes,
      pagePath: `/articles/tags/${params.tag}/`,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
      lastPageNumber: pagedArticles.lastPageNumber,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('articles', true, false)
