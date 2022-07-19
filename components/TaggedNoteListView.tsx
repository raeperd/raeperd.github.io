import NoteListView, { NoteListViewProps } from './NoteListView';
import TagNav, { TagNavProps } from './TagNav';

export default function TaggedNoteListView({
  tagPath, tags,
  header, notes, pagePath, pageNumber, isFirstPage, isLastPage, lastPageNumber,
}: TaggedNoteListViewProps) {
  return (
    <>
      <TagNav tags={tags} basePath={tagPath} />
      <NoteListView
        header={header}
        notes={notes}
        pagePath={pagePath}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        lastPageNumber={lastPageNumber}
      />
    </>
  )
}

export interface TaggedNoteListViewProps extends Omit<TagNavProps, 'basePath'>, NoteListViewProps {
  tagPath: string,
}
