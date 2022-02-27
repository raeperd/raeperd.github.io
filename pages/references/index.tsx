import NoteListView from '../../components/NoteListView';
import { getAllTagsByDir, getNotePreviewsByDir, NotePreview, Tag } from '../../lib/note';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';

export default function ReferencesPage(
  { tags, articles, pageNumber, isFirstPage, isLastPage }: ReferencesPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/references" />
      <NoteListView
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
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: ReferencesPageProps}> {
  const pagedArticles = getNotePreviewsByDir('references', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('references'),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
