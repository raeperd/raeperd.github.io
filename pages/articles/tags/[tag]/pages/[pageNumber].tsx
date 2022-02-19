import NoteListView from '../../../../../components/NoteListView'
import {
  getAllTagsByDir,
  getNotePreviewsByDirAndTag,
  getNumArticlesByTag,
  NotePreview,
  Tag,
} from '../../../../../lib/note';
import { getPageSize, getSiteName } from '../../../../../lib/configuration';
import TagListHeader from '../../../../../components/TagListHeader';

export default function PagedArticlePage(
  { tags, title, articles, tag, pageNumber, isFirstPage, isLastPage }: PagedArticlePageProps,
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

type PagedArticlePageProps = {
  tags: Tag[],
  tag: string,
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string, pageNumber: string}})
  : Promise<{ props: PagedArticlePageProps }> {
  const pagedArticles = getNotePreviewsByDirAndTag(
    'articles',
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tags: getAllTagsByDir('articles'),
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
    paths: getAllTagsByDir('articles').flatMap((tag) => pathsFromTag(tag.name)),
    fallback: false,
  }
}

function pathsFromTag(tag: string) {
  const numPage = Math.ceil(getNumArticlesByTag(tag) / getPageSize())
  return Array(numPage)
    .fill(0)
    .map((_, index) => index + 1)
    .map((pageNumber) => ({ params: { tag, pageNumber: pageNumber.toString() } }))
}
