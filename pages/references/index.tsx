import NoteListView, { NoteListViewProps } from '../../components/NoteListView';
import { getAllTagsByDir, getNotePreviewsByDir, Tag } from '../../lib/note';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';

export default function ReferencesPage(
  { tags, notes, pageNumber, isFirstPage, isLastPage }: ReferencesPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/references" />
      <NoteListView
        notes={notes}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface ReferencesPageProps extends NoteListViewProps {
  tags: Tag[],
}

export async function getStaticProps(): Promise<{props: ReferencesPageProps}> {
  const pagedArticles = getNotePreviewsByDir('references', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('references'),
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
