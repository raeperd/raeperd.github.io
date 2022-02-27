import { GetStaticPaths } from 'next';
import NoteListView, { NoteListViewProps } from '../../../components/NoteListView'
import { getNotePreviewsByDir } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ReferenceListPage(
  { header, notes, pageNumber, isFirstPage, isLastPage }: ReferenceListPageProps,
) {
  return (
    <NoteListView
      header={header}
      notes={notes}
      basePath="/references/"
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type ReferenceListPageProps = NoteListViewProps

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ReferenceListPageProps }> {
  const pagedArticles = getNotePreviewsByDir('references', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      header: 'References',
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', false, true)
// () => getStaticPageNumberPathsByDir('references')
