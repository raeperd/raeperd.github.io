import Link from 'next/link';
import TagListHeader, { TagListHeaderProps } from './TagListHeader';
import { NoteListViewProps } from './NoteListView';
import MainTitle from './MainTitle';
import { NotePreview } from '../lib/note';

export default function TaggedNoteTableView(
  { header, tagPath, tags, notes }: TaggedNoteTableViewProps,
) {
  return (
    <>
      {header && <MainTitle title={header} />}
      <TagListHeader tags={tags} basePath={tagPath} />
      <NoteTableView algorithms={notes} />
    </>
  )
}

export interface TaggedNoteTableViewProps extends Omit<TagListHeaderProps, 'basePath'>, Pick<NoteListViewProps, 'notes' | 'header'> {
  tagPath: string,
}

export function NoteTableView({ algorithms }: { algorithms: NotePreview[] }) {
  return (
    <table className="algorithm-table">
      <tr>
        <th>Problem</th>
        <th>Idea</th>
      </tr>
      {algorithms.map((algorithm) => (
        <tr>
          <td className="title"><Link href={algorithm.staticPath}>{algorithm.title}</Link></td>
          <td><Link href={algorithm.staticPath}>{algorithm.idea}</Link></td>
        </tr>
      ))}
    </table>
  )
}
