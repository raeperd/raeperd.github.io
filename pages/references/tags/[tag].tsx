import {
  getAllReferenceTags,
  getReferencePreviewsByTag,
  NotePreview,
  Tag,
} from '../../../lib/note';
import { getPageSize, getSiteName } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView from '../../../components/NoteListView';

export default function ReferenceTagPage(
  { tags, title, articles, pageNumber, isFirstPage, isLastPage }: ReferenceTagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/references" />
      <NoteListView
        title={title}
        notes={articles}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>

  )
}

type ReferenceTagPageProps = {
  tags: Tag[],
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: ReferenceTagPageProps}> {
  const pagedArticles = getReferencePreviewsByTag(params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllReferenceTags(),
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getAllReferenceTags().map((tag) => ({ params: { tag: tag.name } })),
    fallback: false,
  }
}
