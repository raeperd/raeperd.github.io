import Link from 'next/link';
import TagListHeader from '../components/TagListHeader';
import MainTitle from '../components/MainTitle';
import { getAllTagsByDir, getNotePreviewsByDir, Note, Tag } from '../lib/note';

export default function AlgorithmsPage({ tags, title, algorithms }: AlgorithmsPageProps) {
  return (
    <>
      <TagListHeader tags={tags} basePath="/algorithms/" />
      <MainTitle title={title} />
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

export interface AlgorithmsPageProps {
  tags: Tag[]
  title: string
  algorithms: Note[]
}

export async function getStaticProps(): Promise<{props: AlgorithmsPageProps}> {
  const pagedArticles = getNotePreviewsByDir('algorithms', 1, 100)
  return {
    props: {
      tags: getAllTagsByDir('algorithms'),
      title: 'Algorithms',
      algorithms: pagedArticles.notes as Note[],
    },
  }
}
