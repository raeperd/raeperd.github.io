import { getAllTagsByDir, getNotePreviewsByDir, NotePreview, Tag } from '../../lib/note';
import { getPageSize } from '../../lib/configuration';
import NoteListView from '../../components/NoteListView';
import TagListHeader from '../../components/TagListHeader';

export default function TagsPage(
  { tags, notes, pageNumber, isFirstPage, isLastPage }: TagsPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="" />
      <NoteListView
        notes={notes}
        noteBasePath="/tags"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface TagsPageProps {
  tags: Tag[],
  notes: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: TagsPageProps}> {
  const pagedNotes = getNotePreviewsByDir('', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      notes: pagedNotes.notes,
      pageNumber: pagedNotes.pageNumber,
      isFirstPage: pagedNotes.isFirstPage,
      isLastPage: pagedNotes.isLastPage,
    },
  }
}
