import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../../../lib/note';
import { getPageSize } from '../../../../lib/configuration';
import NoteListView, { NoteListViewProps } from '../../../../components/NoteListView';
import TagListHeader from '../../../../components/TagListHeader';
import createGetStaticPaths from '../../../../lib/createGetStaticPaths';

export default function TagPageListPage(
  { tags, tag, header, notes, pageNumber, isFirstPage, isLastPage }: TagPageListProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="" />
      <NoteListView
        header={header}
        noteBasePath={`/tags/${tag}`}
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
  tag: string,
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
      tag: params.tag,
      header: params.tag,
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', true, true)
