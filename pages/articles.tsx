import NoteListView, { NoteListViewProps } from '../components/NoteListView';
import { getAllTagsByDir, getNotePreviewsByDir, Tag } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import TagListHeader from '../components/TagListHeader';

export default function ArticlesPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: ArticlePageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/articles/" />
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

interface ArticlePageProps extends NoteListViewProps{
  tags: Tag[],
}

export async function getStaticProps(): Promise<{props: ArticlePageProps}> {
  const pagedArticles = getNotePreviewsByDir('articles', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      header: 'Articles',
      notes: pagedArticles.notes,
      pagePath: '/articles/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
