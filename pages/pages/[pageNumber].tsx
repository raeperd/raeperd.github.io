import { GetStaticPaths } from 'next';
import { getNotePreviewsByDir, NotePreview } from '../../lib/note';
import NoteListView from '../../components/NoteListView';
import { getPageSize, getSiteName } from '../../lib/configuration';
import { getStaticPageNumberPathsByDir, PageNumberUrlQuery } from '../../lib/page';

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

export const getStaticPaths: GetStaticPaths<PageNumberUrlQuery> = () => getStaticPageNumberPathsByDir('')
