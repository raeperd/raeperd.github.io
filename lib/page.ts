import { ParsedUrlQuery } from 'querystring';
import { ContentDirectory, getAllTagsByDir, getNumNotesByDir } from './note';
import { getPageSize } from './configuration';

export const getStaticTagPathsByDir = async (dir: ContentDirectory) => ({
  paths: getAllTagsByDir(dir).map((tag) => ({ params: { tag: tag.name } })),
  fallback: false,
})

export const getStaticPageNumberPathsByDir = async (dir: ContentDirectory) => {
  const numPage = Math.ceil(getNumNotesByDir(dir) / getPageSize())
  return {
    paths: Array(numPage)
      .fill(0)
      .map((_, index) => (index + 1))
      .map((pageNumber) => ({ params: { pageNumber: pageNumber.toString() } })),
    fallback: false,
  }
}

export interface PageNumberUrlQuery extends ParsedUrlQuery {
  pageNumber: string
}

export interface TagUrlQuery extends ParsedUrlQuery {
  tag: string
}
