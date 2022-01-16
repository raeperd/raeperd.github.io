import NoteListView from '../components/NoteListView';
import { getArticlePreviews, NotePreview } from '../lib/note';
import { getPageSize, getSiteName } from '../lib/configuration';

export default function ArticlesPage(
  { title, articles, pageNumber, isFirstPage, isLastPage }: ArticlePageProps,
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

type ArticlePageProps = {
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: ArticlePageProps}> {
  const pagedArticles = getArticlePreviews(1, getPageSize())
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
