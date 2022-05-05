import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../lib/note';
import NoteListView, { NoteListViewProps } from '../../components/NoteListView';
import { getPageSize } from '../../lib/configuration';
import TagListHeader from '../../components/TagListHeader';
import createGetStaticPaths from '../../lib/createGetStaticPaths';

export default function TagPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: TagPageProps,
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

interface TagPageProps extends NoteListViewProps{
  tags: Tag[]
}

export async function getStaticProps({ params }: {params: {tag: string}}):
  Promise<{props: TagPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
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
