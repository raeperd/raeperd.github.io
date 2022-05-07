import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag } from '../../../../../lib/note';
import { getPageSize } from '../../../../../lib/configuration';
import createGetStaticPaths from '../../../../../lib/createGetStaticPaths';
import TaggedNoteListView, { TaggedNoteListViewProps } from '../../../../../components/TaggedNoteListView';

export default TaggedNoteListView

export async function getStaticProps({ params }: {params: {tag: string, pageNumber: string}})
  : Promise<{ props: TaggedNoteListViewProps }> {
  const pagedArticles = getNotePreviewsByDirAndTag(
    'references',
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tags: getAllTagsByDir('references'),
      tagPath: '/references/',
      header: `References #${params.tag}`,
      notes: pagedArticles.notes,
      pagePath: `/references/tags/${params.tag}/`,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', true, true)
