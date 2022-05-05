import NoteListView, { NoteListViewProps } from '../components/NoteListView';
import { getAllTagsByDir, getNotePreviewsByDir } from '../lib/note';
import { getPageSize } from '../lib/configuration';
import TagListHeader, { TagListHeaderProps } from '../components/TagListHeader';

export default function ReferencesPage(
  { tags, basePath, header, notes, pagePath, pageNumber, isFirstPage, isLastPage }
    : ReferencesPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath={basePath} />
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

interface ReferencesPageProps extends TagListHeaderProps, NoteListViewProps {
}

export async function getStaticProps(): Promise<{props: ReferencesPageProps}> {
  const pagedArticles = getNotePreviewsByDir('references', 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('references'),
      basePath: '/references/',
      header: 'References',
      notes: pagedArticles.notes,
      pagePath: '/references/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
