import { GetStaticPaths } from 'next';
import NoteListView, { NoteListViewProps } from '../../../components/NoteListView'
import { getAllTagsByDir, getNotePreviewsByDir, Tag } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function PagedTagListPage(
  { tags, header, notes, pageNumber, isFirstPage, isLastPage }: PagedTagListPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="" />
      <NoteListView
        header={header}
        notes={notes}
        basePath="/tags/"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

interface PagedTagListPageProps extends NoteListViewProps {
  tags: Tag[],
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: PagedTagListPageProps }> {
  const pagedArticles = getNotePreviewsByDir('', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      header: null,
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', false, true)
