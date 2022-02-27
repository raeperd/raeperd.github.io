import { GetStaticPaths } from 'next';
import NoteListView from '../../../../../components/NoteListView'
import {
  getAllTagsByDir,
  getNotePreviewsByDirAndTag,
  NotePreview,
  Tag,
} from '../../../../../lib/note';
import { getPageSize } from '../../../../../lib/configuration';
import TagListHeader from '../../../../../components/TagListHeader';
import createGetStaticPaths from '../../../../../lib/createGetStaticPaths';

export default function PagedReferenceTagPage(
  { tags, articles, tag, pageNumber, isFirstPage, isLastPage }: PagedReferenceTagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/references" />
      <NoteListView
        header={tag}
        notes={articles}
        noteBasePath={`/references/tags/${tag}`}
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
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', true, true)
