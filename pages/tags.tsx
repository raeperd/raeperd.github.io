import { getAllTagsByDir, getNotePreviewsByDir, Tag } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import NoteListView, { NoteListViewProps } from '../components/NoteListView';
import TagListHeader from '../components/TagListHeader';

export default function TagsPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: TagsPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/" />
      <NoteListView
        header={header}
        notes={notes}
        pagePath={pagePath}
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
      pagePath: '/tags/',
      pageNumber: pagedNotes.pageNumber,
      isFirstPage: pagedNotes.isFirstPage,
      isLastPage: pagedNotes.isLastPage,
    },
  }
}
