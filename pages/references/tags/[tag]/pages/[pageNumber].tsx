import { GetStaticPaths } from 'next';
import NoteListView, { NoteListViewProps } from '../../../../../components/NoteListView'
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../../../../lib/note';
import { getPageSize } from '../../../../../lib/configuration';
import TagListHeader from '../../../../../components/TagListHeader';
import createGetStaticPaths from '../../../../../lib/createGetStaticPaths';

export default function PagedReferenceTagPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }:
    PagedReferenceTagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/references/" />
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

interface PagedReferenceTagPageProps extends NoteListViewProps {
  tags: Tag[],
}

export async function getStaticProps({ params }: {params: {tag: string, pageNumber: string}})
  : Promise<{ props: PagedReferenceTagPageProps }> {
  const pagedArticles = getNotePreviewsByDirAndTag(
    'references',
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tags: getAllTagsByDir('references'),
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
