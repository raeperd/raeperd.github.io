import { GetStaticPaths } from 'next';
import NoteListView, { NoteListViewProps } from '../../../components/NoteListView'
import { getNotePreviewsByDir } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ArticleListPage(
  { header, notes, pageNumber, isFirstPage, isLastPage }: ArticleListPageProps,
) {
  return (
    <NoteListView
      header={header}
      notes={notes}
      noteBasePath="/articles"
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type ArticleListPageProps = NoteListViewProps

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: ArticleListPageProps }> {
  const pagedArticles = getNotePreviewsByDir('articles', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      header: 'Articles',
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('articles', false, true)
