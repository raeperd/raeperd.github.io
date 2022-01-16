import Head from 'next/head';
import path, { join } from 'path';
import { Article, getArticleByStaticPath, getArticleStaticPaths } from '../../lib/article';
import ArticleView from '../../components/ArticleView';

export function toArticleHref(articleStaticPath: string): string {
  return `/articles/${articleStaticPath}`
}

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <ArticleView article={article} />
    </>
  )
}

type ArticlePageProps = {
  article: Article,
}

export async function getStaticProps({ params }: {params: {articlePath: string[]}})
  : Promise<{ props: ArticlePageProps }> {
  return { props: { article: getArticleByStaticPath(join(...params.articlePath)) } }
}

export async function getStaticPaths() {
  return {
    paths: getArticleStaticPaths()
      .map((articlePath) => ({ params: { articlePath: articlePath.split(path.sep) } })),
    fallback: false,
  }
}
