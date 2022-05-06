import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag } from '../../lib/note';
import NoteListView from '../../components/NoteListView';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';
import createGetStaticPaths from '../../lib/createGetStaticPaths';
import { TaggedNoteListViewProps } from '../../components/TaggedNoteListView';

export default function TagPage(
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
        pagePath={pagePath}
        notes={notes}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

export async function getStaticProps({ params }: {params: {tag: string}}):
  Promise<{props: TaggedNoteListViewProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      tagPath: '/',
      header: `#${params.tag}`,
      notes: pagedArticles.notes,
      pagePath: `/tags/${params.tag}/`,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', true, false)
