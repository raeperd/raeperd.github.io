import {
  getAllTags,
  getNotePreviewsByTag,
  getNumNotesByTag,
  NotePreview,
  Tag,
} from '../../../../lib/note';
import { getPageSize } from '../../../../lib/configuration';
import NoteListView from '../../../../components/NoteListView';
import TagListHeader from '../../../../components/TagListHeader';

export default function TagPageListPage(
  { tags, tag, articles, pageNumber, isFirstPage, isLastPage }: TagPageListProps,
) {
  return (
    <>
      <TagListHeader tags={tags} />
      <NoteListView
        title={tag}
        mainTitle={tag}
        basePath={`/tags/${tag}`}
        notes={articles}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type TagPageListProps = {
  tags: Tag[],
  tag: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string, pageNumber: string}}):
  Promise<{props: TagPageListProps}> {
  const pagedArticles = getNotePreviewsByTag(
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tags: getAllTags(),
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
    paths: getAllTags().flatMap((tag) => pathsFromTag(tag.name)),
    fallback: false,
  }
}

function pathsFromTag(tag: string) {
  const numPage = Math.ceil(getNumNotesByTag(tag) / getPageSize())
  return Array(numPage)
    .fill(0)
    .map((_, index) => (index + 1))
    .map((pageNumber) => ({ params: { tag, pageNumber: pageNumber.toString() } }))
}
