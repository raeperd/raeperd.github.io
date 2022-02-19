import NoteListView from '../../../../../components/NoteListView'
import {
  getAllTagsByDir,
  getNotePreviewsByDirAndTag,
  getNumReferencesByTag,
  NotePreview,
  Tag,
} from '../../../../../lib/note';
import { getPageSize, getSiteName } from '../../../../../lib/configuration';
import TagListHeader from '../../../../../components/TagListHeader';

export default function PagedReferenceTagPage(
  { tags, title, articles, tag, pageNumber, isFirstPage, isLastPage }: PagedReferenceTagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/references" />
      <NoteListView
        title={title}
        mainTitle={tag}
        notes={articles}
        basePath={`/references/tags/${tag}`}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

type PagedReferenceTagPageProps = {
  tags: Tag[],
  tag: string,
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string, pageNumber: string}})
  : Promise<{ props: PagedReferenceTagPageProps }> {
  const pagedArticles = getNotePreviewsByDirAndTag(
    'references',
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tags: getAllTagsByDir('references'),
      tag: params.tag,
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
    paths: getAllTagsByDir('references').flatMap((tag) => pathsFromTag(tag.name)),
    fallback: false,
  }
}

function pathsFromTag(tag: string) {
  const numPage = Math.ceil(getNumReferencesByTag(tag) / getPageSize())
  return Array(numPage)
    .fill(0)
    .map((_, index) => index + 1)
    .map((pageNumber) => ({ params: { tag, pageNumber: pageNumber.toString() } }))
}
