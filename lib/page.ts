import { ParsedUrlQuery } from 'querystring';
import { ContentDirectory, getAllTagsByDir } from './note';

export const getStaticTagPathsByDir = async (dir: ContentDirectory) => ({
  paths: getAllTagsByDir(dir).map((tag) => ({ params: { tag: tag.name } })),
  fallback: false,
})

export interface TagUrlQuery extends ParsedUrlQuery {
  tag: string
}
