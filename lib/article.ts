import path, { join, ParsedPath } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { getDefaultAuthor } from './configuration';

export function getArticlePreviews(pageNumber: number, pageSize: number): PagedArticlePreview {
  const articles = getArticleParsedPaths()
    .map((parsedPath) => readArticle(parsedPath))
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  return {
    articles: articles.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === Math.ceil(articles.length / pageSize),
    pageNumber,
    pageSize,
  }
}

export function getNumArticles(): number {
  return getArticleParsedPaths().length
}

export function getArticleByStaticPath(staticPathToFind: string): Article {
  const staticPathFound = getArticleStaticPaths()
    .find((staticPath) => staticPath === staticPathToFind)
  if (!staticPathFound) {
    throw new Error(`Given ${staticPathToFind} is not exists`)
  }
  return readArticle(toArticleParsedPath(staticPathFound))
}

export function getArticleStaticPaths(): string[] {
  return readdirRecursiveSync(ARTICLE_DIRECTORY)
    .map((filePath) => filePath.replace(`${ARTICLE_DIRECTORY}/`, ''))
}

export function getAboutPageArticle(): Article {
  return readPage('about.md')
}

export function getAllTags(): string[] {
  return getArticleParsedPaths()
    .map((parsedPath) => readArticle(parsedPath))
    .flatMap((article) => article.tags)
}

export function getArticlePreviewsByTag(tagToFind: string, pageNumber: number, pageSize: number)
  : PagedArticlePreview {
  const articles = getAllArticlesByTag(tagToFind)
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  return {
    articles: articles.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === Math.ceil(articles.length / pageSize),
    pageNumber,
    pageSize,
  }
}

export function getNumArticlesByTag(tag: string): number {
  return getAllArticlesByTag(tag).length
}

export interface Article extends ArticlePreview{
  tags: string[],
  content: string
}

export interface ArticlePreview {
  staticPath: string,
  title: string,
  date: string,
  author: string
}

export interface PagedArticlePreview {
  articles: ArticlePreview[],
  pageNumber: number,
  pageSize: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

function getArticleParsedPaths(): ParsedPath[] {
  return getArticleStaticPaths()
    .map((staticPath) => toArticleParsedPath(staticPath))
}

function toArticleParsedPath(staticPath: string): ParsedPath {
  return path.parse(path.join(ARTICLE_DIRECTORY, staticPath))
}

function getAllArticlesByTag(tagToFind: string): ArticlePreview[] {
  return getArticleParsedPaths()
    .map((parsedPath) => readArticle(parsedPath))
    .filter((article) => article.tags.findIndex((tag) => tag === tagToFind) > -1)
}

function readPage(file: string): Article {
  return readArticle(path.parse(path.join(PAGE_DIRECTORY, file)))
}

const PAGE_DIRECTORY = join(process.cwd(), 'lib', 'content')
const ARTICLE_DIRECTORY = join(PAGE_DIRECTORY, 'article')

function readArticle(articlePath: ParsedPath): Article {
  const filePath = join(articlePath.dir, articlePath.base)
  const fileContent = readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return {
    staticPath: filePath.replace(`${ARTICLE_DIRECTORY}/`, ''),
    title: data.title ? data.title : articlePath.name,
    date: data.date
      ? data.date.toDateString()
      : statSync(filePath).birthtime.toDateString(),
    tags: data.tags ? data.tags : [],
    author: data.author ? data.author : getDefaultAuthor(),
    content,
  }
}

function readdirRecursiveSync(directoryPath: string): string[] {
  return readdirSync(directoryPath).flatMap((fileName) => {
    const filePath = join(directoryPath, fileName)
    return statSync(filePath).isDirectory() ? readdirRecursiveSync(filePath) : [filePath]
  })
}
