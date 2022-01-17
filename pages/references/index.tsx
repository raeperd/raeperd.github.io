import NoteListView from '../../components/NoteListView';
import { getAllReferenceTags, getReferencePreviews, NotePreview, Tag } from '../../lib/note';
import { getPageSize, getSiteName } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';

export default function ReferencesPage(
  { tags, title, articles, pageNumber, isFirstPage, isLastPage }: ReferencesPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/references" />
      <NoteListView
        title={title}
        notes={articles}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type ReferencesPageProps = {
  tags: Tag[],
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
      tags: getAllReferenceTags(),
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
