import { getAllTags, getNotePreviewsByTag, NotePreview } from '../../lib/note';
import NoteListView from '../../components/NoteListView';
import { getPageSize } from '../../lib/configuration';

export default function TagPage(
  { tag, articles, pageNumber, isFirstPage, isLastPage }: TagPageProps,
) {
  return (
    <NoteListView
      title={tag}
      mainTitle={tag}
      basePath={`/tags/${tag}`}
      notes={articles}
      pageNumber={pageNumber}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
    />
  )
}

type TagPageProps = {
  tag: string,
  articles: NotePreview[]
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string}}):
  Promise<{props: TagPageProps}> {
  const pagedArticles = getNotePreviewsByTag(params.tag, 1, getPageSize())
  return {
    props: {
      tag: params.tag,
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getAllTags().map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}
