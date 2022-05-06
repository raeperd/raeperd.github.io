import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView from '../../../components/NoteListView';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import { TaggedNoteListViewProps } from '../../../components/TaggedNoteListView';

export default function ArticleTagPage(
  {
    tags, tagPath,
    header, notes, pagePath, pageNumber, isFirstPage, isLastPage,
  }: TaggedNoteListViewProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath={tagPath} />
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

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: TaggedNoteListViewProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('articles', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('articles'),
      tagPath: '/articles/',
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
