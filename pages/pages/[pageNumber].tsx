import { getNotePreviewsByDir, getNumNotesByDir, NotePreview } from '../../lib/note';
import NoteListView from '../../components/NoteListView';
import { getPageSize, getSiteName } from '../../lib/configuration';

export default function ArticleListPage(
  { title, articles, pageNumber, isFirstPage, isLastPage }: ArticleListPageProps,
) {
  return (
    <NoteListView
      title={title}
      notes={articles}
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type ArticleListPageProps = {
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ArticleListPageProps }> {
  const pagedArticles = getNotePreviewsByDir('', parseInt(params.pageNumber, 10), getPageSize())
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
  const numPage = Math.ceil(getNumNotesByDir('') / getPageSize())
  return {
    paths: Array(numPage)
      .fill(0)
      .map((_, index) => (index + 1))
      .map((pageNumber) => ({ params: { pageNumber: pageNumber.toString() } })),
    fallback: false,
  }
}
