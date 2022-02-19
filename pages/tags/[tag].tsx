import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, NotePreview, Tag } from '../../lib/note';
import NoteListView from '../../components/NoteListView';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';
import { getStaticTagPathsByDir, TagUrlQuery } from '../../lib/page';

export default function TagPage(
  { tags, tag, articles, pageNumber, isFirstPage, isLastPage }: TagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="" />
      <NoteListView
        title={tag}
        mainTitle={tag}
        basePath={`/tags/${tag}`}
        notes={articles}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type TagPageProps = {
  tags: Tag[]
  tag: string,
  articles: NotePreview[]
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string}}):
  Promise<{props: TagPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      tag: params.tag,
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths<TagUrlQuery> = () => getStaticTagPathsByDir('')
