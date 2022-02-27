import { getAllTagsByDir, getNotePreviewsByDir, Tag } from '../../lib/note';
import { getPageSize } from '../../lib/configuration';
import NoteListView, { NoteListViewProps } from '../../components/NoteListView';
import TagListHeader from '../../components/TagListHeader';

export default function TagsPage(
  { tags, header, notes, pageNumber, isFirstPage, isLastPage }: TagsPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="" />
      <NoteListView
        header={header}
        notes={notes}
        noteBasePath="/tags"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface TagsPageProps extends NoteListViewProps {
  tags: Tag[],
}

export async function getStaticProps(): Promise<{props: TagsPageProps}> {
  const pagedNotes = getNotePreviewsByDir('', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      header: 'Tags',
      notes: pagedNotes.notes,
      pageNumber: pagedNotes.pageNumber,
      isFirstPage: pagedNotes.isFirstPage,
      isLastPage: pagedNotes.isLastPage,
    },
  }
}
