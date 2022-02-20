import { GetStaticPaths } from 'next';
import NoteListView from '../../../../../components/NoteListView'
import {
  getAllTagsByDir,
  getNotePreviewsByDirAndTag,
  NotePreview,
  Tag,
} from '../../../../../lib/note';
import { getPageSize, getSiteName } from '../../../../../lib/configuration';
import TagListHeader from '../../../../../components/TagListHeader';
import createGetStaticPaths from '../../../../../lib/createGetStaticPaths';

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

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', true, true)
