import { GetStaticPaths } from 'next';
import NoteListView from '../../../components/NoteListView'
import { getAllTagsByDir, getNotePreviewsByDir, NotePreview, Tag } from '../../../lib/note';
import { getPageSize, getSiteName } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function PagedTagListPage(
  { tags, title, articles, pageNumber, isFirstPage, isLastPage }: PagedTagListPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="" />
      <NoteListView
        title={title}
        notes={articles}
        basePath="/tags"
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type PagedTagListPageProps = {
  tags: Tag[],
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {pageNumber: string}})
  : Promise<{ props: PagedTagListPageProps }> {
  const pagedArticles = getNotePreviewsByDir('', parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      tags: getAllTagsByDir(''),
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', false, true)
