import { GetStaticPaths } from 'next';
import NoteListView from '../../../components/NoteListView'
import { getNotePreviewsByDir, NotePreview } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ReferenceListPage(
  { articles, pageNumber, isFirstPage, isLastPage }: ReferenceListPageProps,
) {
  return (
    <NoteListView
      notes={articles}
      noteBasePath="/references"
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type ReferenceListPageProps = {
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ReferenceListPageProps }> {
  const pagedArticles = getNotePreviewsByDir('references', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', false, true)
// () => getStaticPageNumberPathsByDir('references')
