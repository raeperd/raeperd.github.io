import { GetStaticPaths } from 'next';
import { getAllTagsByDir, getNotePreviewsByDirAndTag, Note } from '../../../lib/note';
import createGetStaticPaths from '../../../lib/createGetStaticPaths';
import AlgorithmsPage, { AlgorithmsPageProps } from '../../algorithms';

export default function AlgorithmTagPage(
  { tags, title, algorithms }: AlgorithmsPageProps,
) {
  return (
    <AlgorithmsPage tags={tags} title={title} algorithms={algorithms} />
  )
}

export async function getStaticProps({ params }: {params: {tag: string}})
  : Promise<{props: AlgorithmsPageProps}> {
  const pagedArticles = getNotePreviewsByDirAndTag('algorithms', params.tag, 1, 100)
  return {
    props: {
      tags: getAllTagsByDir('algorithms'),
      title: `Algorithms #${params.tag}`,
      algorithms: pagedArticles.notes as Note[],
    },
  }
}

export const getStaticPaths: GetStaticPaths = createGetStaticPaths('algorithms', true, false)
