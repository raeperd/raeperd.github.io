import NoteListView from '../../../components/NoteListView'
import { getAllTags, getNotePreviews, getNumNotes, NotePreview, Tag } from '../../../lib/note';
import { getPageSize, getSiteName } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';

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
  const pagedArticles = getNotePreviews(parseInt(params.pageNumber, 10), getPageSize())
  return {
    props: {
      tags: getAllTags(),
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export async function getStaticPaths() {
  const numPage = Math.ceil(getNumNotes() / getPageSize())
  return {
    paths: Array(numPage)
      .fill(0)
      .map((_, index) => (index + 1))
      .map((pageNumber) => ({ params: { pageNumber: pageNumber.toString() } })),
    fallback: false,
  }
}
