import { GetStaticPaths } from 'next';
import NoteListView from '../../../components/NoteListView'
import { getNotePreviewsByDir, NotePreview } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ArticleListPage(
  { articles, pageNumber, isFirstPage, isLastPage }: ArticleListPageProps,
) {
  return (
    <NoteListView
      notes={articles}
      noteBasePath="/articles"
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type ArticleListPageProps = {
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ArticleListPageProps }> {
  const pagedArticles = getNotePreviewsByDir('articles', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('articles', false, true)
// () => getStaticPageNumberPathsByDir('articles')
