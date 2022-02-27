import NoteListView, { NoteListViewProps } from '../../components/NoteListView';
import { getAllTagsByDir, getNotePreviewsByDir, Tag } from '../../lib/note';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';

export default function ArticlesPage(
  { tags, notes, pageNumber, isFirstPage, isLastPage }: ArticlePageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/articles" />
      <NoteListView
        notes={notes}
        noteBasePath="/articles"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface ArticlePageProps extends NoteListViewProps{
  tags: Tag[],
}

export async function getStaticProps(): Promise<{props: ArticlePageProps}> {
  const pagedArticles = getNotePreviewsByDir('articles', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
