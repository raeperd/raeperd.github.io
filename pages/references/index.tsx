import NoteListView from '../../components/NoteListView';
import { getReferencePreviews, NotePreview } from '../../lib/note';
import { getPageSize, getSiteName } from '../../lib/configuration';

export default function ReferencesPage(
  { title, articles, pageNumber, isFirstPage, isLastPage }: ReferencesPageProps,
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

type ReferencesPageProps = {
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: ReferencesPageProps}> {
  const pagedArticles = getReferencePreviews(1, getPageSize())
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
