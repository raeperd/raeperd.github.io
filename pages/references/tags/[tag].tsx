import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Tag } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView, { NoteListViewProps } from '../../../components/NoteListView';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ReferenceTagPage(
  { tags, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }: ReferenceTagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/references/" />
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

interface ReferenceTagPageProps extends NoteListViewProps {
  tags: Tag[],
}

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: ReferenceTagPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('references', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('references'),
      header: `References #${params.tag}`,
      notes: pagedArticles.notes,
      pagePath: `/references/tags/${params.tag}/`,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', true, false)
