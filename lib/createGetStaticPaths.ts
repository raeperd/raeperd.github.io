import { GetStaticPaths } from 'next';
import {
  ContentDirectory,
  getAllTagsByDir,
  getNumNotesByDir,
  getNumNotesByDirAndTag,
} from './note';
import { getPageSize } from './configuration';

export default function createGetStaticPaths(
  dir: ContentDirectory,
  useTags: boolean,
  usePageNumbers: boolean,
): GetStaticPaths {
  if (useTags && !usePageNumbers) {
    return () => getStaticTagPathsByDir(dir)
  }
  if (!useTags && usePageNumbers) {
    return () => getStaticPageNumberPathsByDir(dir)
  }
  if (useTags && usePageNumbers) {
    return () => getStaticTagPageNumberPathsByDir(dir)
  }
  throw new Error('Invalid options for createGetStaticPaths')
}

const getStaticTagPathsByDir = async (dir: ContentDirectory) => ({
  paths: getAllTagsByDir(dir).map((tag) => ({ params: { tag: tag.name } })),
  fallback: false,
})

const getStaticPageNumberPathsByDir = async (dir: ContentDirectory) => {
  const numPage = Math.ceil(getNumNotesByDir(dir) / getPageSize())
  return {
    paths: Array(numPage)
      .fill(0)
      .map((_, index) => (index + 1))
      .map((pageNumber) => ({ params: { pageNumber: pageNumber.toString() } })),
    fallback: false,
  }
}

const getStaticTagPageNumberPathsByDir = async (dir: ContentDirectory) => ({
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
