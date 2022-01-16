import { Article, getAboutPageArticle } from '../lib/article';
import NoteView from '../components/NoteView';

export default function AboutPage({ article } : AboutPageProps) {
  return (
    <NoteView note={article} />
  )
}

type AboutPageProps = {
  article: Article,
}

export async function getStaticProps(): Promise<{ props: AboutPageProps }> {
  return { props: { article: getAboutPageArticle() } }
}
