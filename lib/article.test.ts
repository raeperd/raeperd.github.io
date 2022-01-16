import { findFirstArticleByPath, getArticlePreviews, getArticleStaticPaths } from './article';

test('getArticlePreviews', () => {
  const pageSize = 1
  const articles = getArticlePreviews(1, pageSize)

  expect(articles.pageSize).toBe(pageSize)
  expect(articles.articles).toHaveLength(pageSize)
})

test('getArticleStaticPaths', () => {
  const articleSlugs = getArticleStaticPaths()
  expect(articleSlugs.length).toBeGreaterThanOrEqual(1)
})

test('findFirstArticleByPath', () => {
  const articleStaticPath = getArticleStaticPaths()
  articleStaticPath.forEach((slug) => expect(findFirstArticleByPath(slug).staticPath).toBe(slug))
})
