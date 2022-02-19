import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, NotePreview, Tag } from '../../../lib/note';
import { getPageSize, getSiteName } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView from '../../../components/NoteListView';
import { getStaticTagPathsByDir, TagUrlQuery } from '../../../lib/page';

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
  const pagedArticles = getNotePreviewsByDirAndTag('articles', params.tag, 1, getPageSize())
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

export const getStaticPaths: GetStaticPaths<TagUrlQuery> = () => getStaticTagPathsByDir('articles')
