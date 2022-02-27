import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../lib/note';
import NoteListView, { NoteListViewProps } from '../../components/NoteListView';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';
import createGetStaticPaths from '../../lib/createGetStaticPaths';

export default function TagPage(
  { tags, tag, notes, pageNumber, isFirstPage, isLastPage }: TagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="" />
      <NoteListView
        header={tag}
        noteBasePath={`/tags/${tag}`}
        notes={notes}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface TagPageProps extends NoteListViewProps{
  tags: Tag[]
  tag: string,
}

export async function getStaticProps({ params }: {params: {tag: string}}):
  Promise<{props: TagPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      tag: params.tag,
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', true, false)
