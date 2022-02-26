import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, NotePreview, Tag } from '../../../lib/note';
import { getPageSize, getSiteName } from '../../../lib/configuration';
import TagListHeader from '../../../components/TagListHeader';
import NoteListView from '../../../components/NoteListView';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';

export default function ReferenceTagPage(
  { tags, title, articles, tag, pageNumber, isFirstPage, isLastPage }: ReferenceTagPageProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/references" />
      <NoteListView
        title={title}
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

type ReferenceTagPageProps = {
  tags: Tag[],
  title: string,
  tag: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: ReferenceTagPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('references', params.tag, 1, getPageSize())
  return {
    props: {
      tags: getAllTagsByDir('references'),
      title: getSiteName(),
      tag: params.tag,
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('references', true, false)
