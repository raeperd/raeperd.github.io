import Head from 'next/head';
import path, { join } from 'path';
import { getNoteByStaticPath, getNoteStaticPaths, Note } from '../lib/note';
import Article from '../components/Article';

export default function NotePage({ note }: NotePageProps) {
  return (
    <>
      <Head>
        <title>{note.title}</title>
      </Head>
      <Article note={note} />
    </>
  )
}

type NotePageProps = {
  note: Note,
}

export async function getStaticProps({ params }: {params: {notePath: string[]}})
  : Promise<{ props: NotePageProps }> {
  return { props: { note: getNoteByStaticPath(join(...params.notePath)) } }
}

export async function getStaticPaths() {
  return {
    paths: getNoteStaticPaths()
      .map((notePath) => ({ params: { notePath: notePath.split(path.sep) } })),
    fallback: false,
  }
}
