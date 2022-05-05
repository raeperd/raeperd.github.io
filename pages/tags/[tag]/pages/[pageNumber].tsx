import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../../../lib/note';
import { getPageSize } from '../../../../lib/configuration';
import NoteListView, { NoteListViewProps } from '../../../../components/NoteListView';
import TagListHeader from '../../../../components/TagListHeader';
import createGetStaticPaths from '../../../../lib/createGetStaticPaths';

export default function TagPageListPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: TagPageListProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/" />
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

interface TagPageListProps extends NoteListViewProps{
  tags: Tag[],
}

export async function getStaticProps({ params }: {params: {tag: string, pageNumber: string}}):
  Promise<{props: TagPageListProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag(
    '',
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tags: getAllTagsByDir(''),
      header: params.tag,
      notes: pagedArticles.notes,
      pagePath: `/tags/${params.tag}/`,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', true, true)
