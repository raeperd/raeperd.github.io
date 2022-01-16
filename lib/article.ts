import { getNotePreviewsByDirectory, PagedNotePreview } from './note';

// eslint-disable-next-line import/prefer-default-export
export function getArticlePreviews(pageNumber: number, pageSize: number): PagedNotePreview {
  return getNotePreviewsByDirectory('articles', pageNumber, pageSize)
}
