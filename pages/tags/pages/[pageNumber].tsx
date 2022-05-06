import { GetStaticPaths } from 'next';
import NoteListView from '../../../components/NoteListView'
import { getAllTagsByDir, getNotePreviewsByDir } from '../../../lib/note';
import { getPageSize } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import { TaggedNoteListViewProps } from '../../../components/TaggedNoteListView';

export default function PagedTagListPage(
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

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: TaggedNoteListViewProps }> {
  const pagedArticles = getNotePreviewsByDir('', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      tagPath: '/',
      header: null,
      notes: pagedArticles.notes,
      pagePath: '/tags/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', false, true)
