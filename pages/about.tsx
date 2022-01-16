import { Article, getAboutPageArticle } from '../lib/article';
import ArticleView from '../components/ArticleView';

export default function AboutPage({ article } : AboutPageProps) {
  return (
    <ArticleView article={article} />
  )
}

type AboutPageProps = {
  article: Article,
}

export async function getStaticProps(): Promise<{ props: AboutPageProps }> {
  return { props: { article: getAboutPageArticle() } }
}
