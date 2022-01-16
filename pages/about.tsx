import { getAboutPageNote, Note } from '../lib/note';
import NoteView from '../components/NoteView';

export default function AboutPage({ article } : AboutPageProps) {
  return (
    <NoteView note={article} />
  )
}

type AboutPageProps = {
  article: Note,
}

export async function getStaticProps(): Promise<{ props: AboutPageProps }> {
  return { props: { article: getAboutPageNote() } }
}
