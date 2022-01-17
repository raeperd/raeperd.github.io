import NoteListView from '../../../components/NoteListView'
import { getNumReferences, getReferencePreviews, NotePreview } from '../../../lib/note';
import { getPageSize, getSiteName } from '../../../lib/configuration';

export default function ReferenceListPage(
  { title, articles, pageNumber, isFirstPage, isLastPage }: ReferenceListPageProps,
) {
  return (
    <NoteListView
      title={title}
      notes={articles}
      basePath="/references"
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type ReferenceListPageProps = {
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ReferenceListPageProps }> {
  const pagedArticles = getReferencePreviews(parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export async function getStaticPaths() {
  const numPage = Math.ceil(getNumReferences() / getPageSize())
  return {
    paths: Array(numPage)
      .fill(0)
      .map((_, index) => (index + 1))
      .map((pageNumber) => ({ params: { pageNumber: pageNumber.toString() } })),
    fallback: false,
  }
}
