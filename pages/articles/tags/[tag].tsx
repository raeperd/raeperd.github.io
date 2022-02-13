import { getAllArticleTags, getArticlePreviewsByTag, NotePreview, Tag } from '../../../lib/note';
import { getPageSize, getSiteName } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView from '../../../components/NoteListView';

export default function ArticleTagPage(
  { tags, title, articles, tag, pageNumber, isFirstPage, isLastPage }: ArticleTagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/articles" />
      <NoteListView
        title={title}
        mainTitle={tag}
        notes={articles}
        basePath={`/articles/tags/${tag}`}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type ArticleTagPageProps = {
  tags: Tag[],
  tag: string,
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: ArticleTagPageProps}> {
  const pagedArticles = getArticlePreviewsByTag(params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllArticleTags(),
      tag: params.tag,
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getAllArticleTags().map((tag) => ({ params: { tag: tag.name } })),
    fallback: false,
  }
}
