import path, { join, ParsedPath } from 'path';
import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { getDefaultAuthor } from './configuration';

export function getReferencePreviews(pageNumber: number, pageSize: number): PagedNotePreview {
  return getNotePreviewsByDirectory('references', pageNumber, pageSize)
}

export function getArticlePreviews(pageNumber: number, pageSize: number): PagedNotePreview {
  return getNotePreviewsByDirectory('articles', pageNumber, pageSize)
}

export function getNotePreviews(pageNumber: number, pageSize: number): PagedNotePreview {
  return getNotePreviewsByDirectory('/', pageNumber, pageSize)
}

export function getNumNotes(): number {
  return getNoteParsedPaths().length
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

export function getAllTags(): string[] {
  return getNoteParsedPaths()
    .map((parsedPath) => readNote(parsedPath))
    .flatMap((note) => note.tags)
}

export function getNotePreviewsByTag(tagToFind: string, pageNumber: number, pageSize: number)
  : PagedNotePreview {
  const notes = getAllNotesByTag(tagToFind)
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  return {
    notes: notes.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
    isFirstPage: pageNumber === 1,
    isLastPage: pageNumber === Math.ceil(notes.length / pageSize),
    pageNumber,
    pageSize,
  }
}

export function getNumNotesByTag(tag: string): number {
  return getAllNotesByTag(tag).length
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

function getNotePreviewsByDirectory(directory: string, pageNumber: number, pageSize: number)
  : PagedNotePreview {
  const notes = getNoteParsedPaths()
    .filter((parsedPath) => parsedPath.dir.indexOf(directory) > -1)
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

function getNoteParsedPaths(): ParsedPath[] {
  return getNoteStaticPaths()
    .map((staticPath) => toNoteParsedPath(staticPath))
}

function toNoteParsedPath(staticPath: string): ParsedPath {
  return path.parse(path.join(CONTENT_DIRECTORY, staticPath))
}

function getAllNotesByTag(tagToFind: string): NotePreview[] {
  return getNoteParsedPaths()
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
