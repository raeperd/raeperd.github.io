import { GetStaticPaths } from 'next';
import NoteListView, { NoteListViewProps } from '../../../../../components/NoteListView'
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../../../../lib/note';
import { getPageSize } from '../../../../../lib/configuration';
import TagListHeader from '../../../../../components/TagListHeader';
import createGetStaticPaths from '../../../../../lib/createGetStaticPaths';

export default function PagedArticlePage(
  { tags, notes, tag, pageNumber, isFirstPage, isLastPage }: PagedArticlePageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/articles" />
      <NoteListView
        header={tag}
        notes={notes}
        noteBasePath={`/articles/tags/${tag}`}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface PagedArticlePageProps extends NoteListViewProps{
  tags: Tag[],
  tag: string,
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
      header: params.tag,
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('articles', true, true)
