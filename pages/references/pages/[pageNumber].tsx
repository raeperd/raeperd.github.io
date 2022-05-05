import { GetStaticPaths } from 'next';
import NoteListView, { NoteListViewProps } from '../../../components/NoteListView'
import { getAllTagsByDir, getNotePreviewsByDir, Tag } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import TagListHeader from '../../../components/TagListHeader';

export default function ReferenceListPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: PagedReferencePageProps,
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

interface PagedReferencePageProps extends NoteListViewProps {
  tags: Tag[],
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: PagedReferencePageProps }> {
  const pagedArticles = getNotePreviewsByDir('references', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('references'),
      header: 'References',
      notes: pagedArticles.notes,
      pagePath: '/references/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', false, true)
// () => getStaticPageNumberPathsByDir('references')
