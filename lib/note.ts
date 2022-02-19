import path, { join, ParsedPath } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { getDefaultAuthor } from './configuration';

export function getReferencePreviews(pageNumber: number, pageSize: number): PagedNotePreview {
  return getNotePreviewsByDir('references', pageNumber, pageSize)
}

export function getNotePreviewsByDir(dir: ContentDirectory, pageNumber: number, pageSize: number)
  : PagedNotePreview {
  const notes = getNoteParsedPaths(dir)
    .map((parsedPath) => readNote(parsedPath))
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  return {
    notes: notes.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === Math.ceil(notes.length / pageSize),
    pageNumber,
    pageSize,
  }
}

export function getNumNotes(): number {
  return getNoteParsedPaths('').length
}

export function getNumArticles(): number {
  return getNoteParsedPaths('articles').length
}

export function getNumReferences(): number {
  return getNoteParsedPaths('references').length
}

export function getNoteByStaticPath(staticPathToFind: string): Note {
  const staticPathFound = getNoteStaticPaths()
    .find((staticPath) => staticPath === staticPathToFind)
  if (!staticPathFound) {
    throw new Error(`Given ${staticPathToFind} is not exists`)
  }
  return readNote(toNoteParsedPath(staticPathFound))
}

export function getNoteStaticPaths(): string[] {
  return readdirRecursiveSync(CONTENT_DIRECTORY)
    .filter((filePath) => filePath.startsWith(join(CONTENT_DIRECTORY, 'articles'))
      || filePath.startsWith(join(CONTENT_DIRECTORY, 'references')))
    .map((filePath) => filePath.replace(`${CONTENT_DIRECTORY}/`, ''))
}

export function getAboutPageNote(): Note {
  return readNote(path.parse(path.join(CONTENT_DIRECTORY, 'about.md')))
}

export function getAllTags(): Tag[] {
  return getAllTagsByDirectory('')
}

export function getAllArticleTags(): Tag[] {
  return getAllTagsByDirectory('articles')
}

export function getAllReferenceTags(): Tag[] {
  return getAllTagsByDirectory('references')
}

export function getNotePreviewsByTag(tagToFind: string, pageNumber: number, pageSize: number)
  : PagedNotePreview {
  return getNotePreviewsByDirAndTag('', tagToFind, pageNumber, pageSize)
}

export function getArticlePreviewsByTag(tagToFind: string, pageNumber: number, pageSize: number)
  : PagedNotePreview {
  return getNotePreviewsByDirAndTag('articles', tagToFind, pageNumber, pageSize)
}

export function getReferencePreviewsByTag(tagToFind: string, pageNumber: number, pageSize: number)
  : PagedNotePreview {
  return getNotePreviewsByDirAndTag('references', tagToFind, pageNumber, pageSize)
}

export function getNumNotesByTag(tag: string): number {
  return getAllNotesByTag(tag).length
}

export function getNumArticlesByTag(tag: string): number {
  return getAllArticleByTag(tag).length
}

export function getNumReferencesByTag(tag: string): number {
  return getAllReferenceByTag(tag).length
}

export interface Note extends NotePreview{
  tags: string[],
  content: string
}

export interface NotePreview {
  staticPath: string,
  title: string,
  date: string,
  author: string
}

export interface PagedNotePreview {
  notes: NotePreview[],
  pageNumber: number,
  pageSize: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export interface Tag {
  name: string,
  count?: number
}

export function getAllTagsByDirectory(dir: ContentDirectory): Tag[] {
  const tagToCount = getNoteParsedPaths(dir)
    .map((parsedPath) => readNote(parsedPath))
    .flatMap((note) => note.tags)
    .reduce((previousValue, currentValue) => {
      previousValue.set(currentValue, (previousValue.get(currentValue) || 0) + 1)
      return previousValue
    }, new Map<string, number>())
  return Array.from(tagToCount.keys())
    .map((name) => ({ name, count: tagToCount.get(name) || 0 }))
    .sort((left, right) => {
      if (left.count !== right.count) {
        return right.count - left.count
      }
      if (left.name < right.name) {
        return -1
      }
      return 1
    })
}

type ContentDirectory = '' | 'articles' | 'references'

function getNoteParsedPaths(dir: ContentDirectory): ParsedPath[] {
  return getNoteStaticPaths()
    .filter((staticPath) => staticPath.startsWith(dir))
    .map((staticPath) => toNoteParsedPath(staticPath))
    .filter((parsedPath) => !parsedPath.base.startsWith('.'))
}

function getNotePreviewsByDirAndTag(
  dir: ContentDirectory,
  tagToFind: string,
  pageNumber: number,
  pageSize: number,
)
  : PagedNotePreview {
  const notes = getAllNotesByDirAndTag(dir, tagToFind)
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  return {
    notes: notes.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === Math.ceil(notes.length / pageSize),
    pageNumber,
    pageSize,
  }
}

function toNoteParsedPath(staticPath: string): ParsedPath {
  return path.parse(path.join(CONTENT_DIRECTORY, staticPath))
}

function getAllNotesByTag(tagToFind: string): NotePreview[] {
  return getAllNotesByDirAndTag('', tagToFind)
}

function getAllArticleByTag(tagToFind: string): NotePreview[] {
  return getAllNotesByDirAndTag('articles', tagToFind)
}

function getAllReferenceByTag(tagToFind: string): NotePreview[] {
  return getAllNotesByDirAndTag('references', tagToFind)
}

function getAllNotesByDirAndTag(dir: ContentDirectory, tagToFind: string): NotePreview[] {
  return getNoteParsedPaths(dir)
    .map((parsedPath) => readNote(parsedPath))
    .filter((note) => note.tags.findIndex((tag) => tag === tagToFind) > -1)
}

const CONTENT_DIRECTORY = join(process.cwd(), 'lib', 'content')

function readNote(notePath: ParsedPath): Note {
  const filePath = join(notePath.dir, notePath.base)
  const fileContent = readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return {
    staticPath: filePath.replace(`${CONTENT_DIRECTORY}/`, ''),
    title: data.title ? data.title : notePath.name,
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
