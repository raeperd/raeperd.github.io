import { getAllArticleTags, getArticlePreviews, NotePreview, Tag } from '../lib/note';
import NoteListView from '../components/NoteListView';
import { getPageSize, getSiteName } from '../lib/configuration';
import TagListHeader from '../components/TagListHeader';

export default function Index(
  { tags, title, articles, pageNumber, isLastPage, isFirstPage }: IndexProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/articles" />
      <NoteListView
        title={title}
        notes={articles}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface IndexProps {
  tags: Tag[],
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
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
