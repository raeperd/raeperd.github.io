import { getAllTagsByDir, getNotePreviewsByDir, Note } from '../lib/note';
import TaggedNoteTableView, { TaggedNoteTableViewProps } from '../components/TaggedNoteTableView';

export default TaggedNoteTableView

export async function getStaticProps(): Promise<{props: TaggedNoteTableViewProps}> {
  const pagedArticles = getNotePreviewsByDir('algorithms', 1, 100)
  return {
    props: {
      tags: getAllTagsByDir('algorithms'),
      tagPath: '/algorithms/',
      header: 'Algorithms',
      notes: pagedArticles.notes as Note[],
    },
  }
}
