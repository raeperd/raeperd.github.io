import { getAllTags, getNotePreviews, NotePreview, Tag } from '../../lib/note';
import { getPageSize, getSiteName } from '../../lib/configuration';
import NoteListView from '../../components/NoteListView';
import TagListHeader from '../../components/TagListHeader';

export default function TagsPage(
  { tags, title, notes, pageNumber, isFirstPage, isLastPage }: TagsPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} />
      <NoteListView
        title={title}
        notes={notes}
        basePath="/tags"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface TagsPageProps {
  tags: Tag[],
  title: string,
  notes: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: TagsPageProps}> {
  const pagedNotes = getNotePreviews(1, getPageSize())
  return {
    props: {
      tags: getAllTags(),
      title: getSiteName(),
      notes: pagedNotes.notes,
      pageNumber: pagedNotes.pageNumber,
      isFirstPage: pagedNotes.isFirstPage,
      isLastPage: pagedNotes.isLastPage,
    },
  }
}
