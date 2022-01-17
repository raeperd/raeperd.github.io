import NoteListView from '../../components/NoteListView';
import { getAllArticleTags, getArticlePreviews, NotePreview, Tag } from '../../lib/note';
import { getPageSize, getSiteName } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';

export default function ArticlesPage(
  { tags, title, articles, pageNumber, isFirstPage, isLastPage }: ArticlePageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} />
      <NoteListView
        title={title}
        notes={articles}
        basePath="/articles"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type ArticlePageProps = {
  tags: Tag[],
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: ArticlePageProps}> {
  const pagedArticles = getArticlePreviews(1, getPageSize())
  return {
    props: {
      tags: getAllArticleTags(),
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
