import Link from 'next/link';
import TagListHeader from '../../components/TagListHeader';
import { getAllTagsByDir, getNotePreviewsByDir, Note, Tag } from '../../lib/note';

export default function AlgorithmsPage({ tags, algorithms }: AlgorithmsPageProps) {
  return (
    <>
      <TagListHeader tags={tags} tagBasePath="/algorithms" />
      <AlgorithmTable algorithms={algorithms} />
    </>
  )
}

function AlgorithmTable({ algorithms }: {algorithms: Note[]}) {
  return (
    <table className="algorithm-table">
      <tr>
        <th>Problem</th>
        <th>Idea</th>
        <th>Tags</th>
      </tr>
      {algorithms.map((algorithm) => (
        <tr>
          <td className="title"><Link href={algorithm.staticPath}>{algorithm.title}</Link></td>
          <td><Link href={algorithm.staticPath}>{algorithm.idea}</Link></td>
          <td>{algorithm.tags}</td>
        </tr>
      ))}
    </table>
  )
}

interface AlgorithmsPageProps {
  tags: Tag[]
  algorithms: Note[]
}

export async function getStaticProps(): Promise<{props: AlgorithmsPageProps}> {
  const pagedArticles = getNotePreviewsByDir('algorithms', 1, 100)
  return {
    props: {
      tags: getAllTagsByDir('algorithms'),
      algorithms: pagedArticles.notes as Note[],
    },
  }
}
