import NoteListView, { NoteListViewProps } from './NoteListView';
import TagListHeader, { TagListHeaderProps } from './TagListHeader';

export default function TaggedNoteListView({
  tagPath, tags,
  header, notes, pagePath, pageNumber, isFirstPage, isLastPage,
}: TaggedNoteListViewProps) {
  return (
    <>
      <TagListHeader tags={tags} basePath={tagPath} />
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

interface TaggedNoteListViewProps extends Omit<TagListHeaderProps, 'basePath'>, NoteListViewProps {
  tagPath: string,
}
