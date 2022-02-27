import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView, { NoteListViewProps } from '../../../components/NoteListView';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ArticleTagPage(
  { tags, notes, tag, pageNumber, isFirstPage, isLastPage }: ArticleTagPageProps,
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

interface ArticleTagPageProps extends NoteListViewProps{
  tags: Tag[],
  tag: string,
}

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: ArticleTagPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('articles', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      tag: params.tag,
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('articles', true, false)
