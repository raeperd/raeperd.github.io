import NoteListView from '../../components/NoteListView';
import { getAllTagsByDir, getNotePreviewsByDir, NotePreview, Tag } from '../../lib/note';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';

export default function ArticlesPage(
  { tags, articles, pageNumber, isFirstPage, isLastPage }: ArticlePageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/articles" />
      <NoteListView
        notes={articles}
        noteBasePath="/articles"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type ArticlePageProps = {
  tags: Tag[],
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: ArticlePageProps}> {
  const pagedArticles = getNotePreviewsByDir('articles', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
