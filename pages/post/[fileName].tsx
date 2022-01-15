import Head from 'next/head';
import { Article, findFirstArticleByFileName, getAllArticleFiles } from '../../lib/article';
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
        currentURL={`${serverURL}/post/${article.fileName}`}
      />
    </>
  )
}

type ArticlePageProps = {
  article: Article,
  disqusShortname: string | null,
  serverURL: string
}

export async function getStaticProps({ params }: {params: {fileName: string}})
  : Promise<{ props: ArticlePageProps }> {
  const article = findFirstArticleByFileName(params.fileName)
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
    paths: getAllArticleFiles().map((fileName) => ({ params: { fileName } })),
    fallback: false,
  }
}
