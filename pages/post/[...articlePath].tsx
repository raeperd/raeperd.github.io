import Head from 'next/head';
import path, { join } from 'path';
import { Article, getArticleByStaticPath, getArticleStaticPaths } from '../../lib/article';
import ArticleView from '../../components/ArticleView';
import { getDisqusShortname, getServerURL } from '../../lib/configuration';

export default function ArticlePage({ article, disqusShortname, serverURL }: ArticlePageProps) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <ArticleView
        article={article}
        disqusShortname={disqusShortname}
        currentURL={`${serverURL}/post/${article.staticPath}`}
      />
    </>
  )
}

type ArticlePageProps = {
  article: Article,
  disqusShortname: string | null,
  serverURL: string
}

export async function getStaticProps({ params }: {params: {articlePath: string[]}})
  : Promise<{ props: ArticlePageProps }> {
  const article = getArticleByStaticPath(join(...params.articlePath))
  return {
    props: {
      article,
      disqusShortname: getDisqusShortname(),
      serverURL: getServerURL(),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: getArticleStaticPaths().map((articlePath) => (
      { params: { articlePath: articlePath.split(path.sep) } })),
    fallback: false,
  }
}
