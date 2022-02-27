import { GetStaticPaths } from 'next';
import {
  getAllTagsByDir,
  getNotePreviewsByDirAndTag,
  NotePreview,
  Tag,
} from '../../../../lib/note';
import { getPageSize } from '../../../../lib/configuration';
import NoteListView from '../../../../components/NoteListView';
import TagListHeader from '../../../../components/TagListHeader';
import createGetStaticPaths from '../../../../lib/createGetStaticPaths';

export default function TagPageListPage(
  { tags, tag, articles, pageNumber, isFirstPage, isLastPage }: TagPageListProps,
) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="" />
      <NoteListView
        header={tag}
        noteBasePath={`/tags/${tag}`}
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
  const pagedArticles = getNotePreviewsByDirAndTag(
    '',
    params.tag,
    parseInt(params.pageNumber, 10),
    getPageSize(),
  )
  return {
    props: {
      tags: getAllTagsByDir(''),
      tag: params.tag,
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('', true, true)
