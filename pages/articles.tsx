import NoteListView from '../components/NoteListView';
import { getAllTagsByDir, getNotePreviewsByDir } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import TagListHeader from '../components/TagListHeader';
import { TaggedNoteListViewProps } from '../components/TaggedNoteListView';

export default function ArticlesPage(
  { tags, tagPath, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }
    : TaggedNoteListViewProps,
) {
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

export async function getStaticProps(): Promise<{props: TaggedNoteListViewProps}> {
  const pagedArticles = getNotePreviewsByDir('articles', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      tagPath: '/articles/',
      header: 'Articles',
      notes: pagedArticles.notes,
      pagePath: '/articles/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
