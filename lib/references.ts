import { getNotePreviewsByDirectory, PagedNotePreview } from './note';

// eslint-disable-next-line import/prefer-default-export
export function getReferencePreviews(pageNumber: number, pageSize: number): PagedNotePreview {
  return getNotePreviewsByDirectory('references', pageNumber, pageSize)
}
