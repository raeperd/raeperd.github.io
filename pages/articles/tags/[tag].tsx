import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView, { NoteListViewProps } from '../../../components/NoteListView';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ArticleTagPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: ArticleTagPageProps,
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

interface ArticleTagPageProps extends NoteListViewProps{
  tags: Tag[],
}

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: ArticleTagPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('articles', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      header: `Articles #${params.tag}`,
      notes: pagedArticles.notes,
      pagePath: `/articles/tags/${params.tag}/`,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('articles', true, false)
