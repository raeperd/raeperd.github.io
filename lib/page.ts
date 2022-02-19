import { ParsedUrlQuery } from 'querystring';
import {
  ContentDirectory,
  getAllTagsByDir,
  getNumNotesByDir,
  getNumNotesByDirAndTag,
} from './note';
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

export const getStaticTagPageNumberPathsByDir = async (dir: ContentDirectory) => ({
  paths: getAllTagsByDir(dir).flatMap((tag) => pathsFromDirAndTag(dir, tag.name)),
  fallback: false,
})

function pathsFromDirAndTag(dir: ContentDirectory, tag: string) {
  const numPage = Math.ceil(getNumNotesByDirAndTag(dir, tag) / getPageSize())
  return Array(numPage)
    .fill(0)
    .map((_, index) => (index + 1))
    .map((pageNumber) => ({ params: { tag, pageNumber: pageNumber.toString() } }))
}

export interface TagPageNumberUrlQuery extends ParsedUrlQuery {
  pageNumber: string
  tag: string
}

export interface PageNumberUrlQuery extends ParsedUrlQuery {
  pageNumber: string
}

export interface TagUrlQuery extends ParsedUrlQuery {
  tag: string
}
