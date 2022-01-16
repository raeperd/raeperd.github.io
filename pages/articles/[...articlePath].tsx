import Head from 'next/head';
import path, { join } from 'path';
import { getNoteByStaticPath, getNoteStaticPaths, Note } from '../../lib/note';
import NoteView from '../../components/NoteView';

export function toArticleHref(articleStaticPath: string): string {
  return `/articles/${articleStaticPath}`
}

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <NoteView note={article} />
    </>
  )
}

type ArticlePageProps = {
  article: Note,
}

export async function getStaticProps({ params }: {params: {articlePath: string[]}})
  : Promise<{ props: ArticlePageProps }> {
  return { props: { article: getNoteByStaticPath(join(...params.articlePath)) } }
}

export async function getStaticPaths() {
  return {
    paths: getNoteStaticPaths()
      .map((articlePath) => ({ params: { articlePath: articlePath.split(path.sep) } })),
    fallback: false,
  }
}
