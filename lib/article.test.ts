import { findFirstArticleByFileName, getAllArticleFiles, getArticlePreviews } from './article';

test('getArticlePreviews', () => {
  const pageSize = 1
  const articles = getArticlePreviews(1, pageSize)

  expect(articles.pageSize).toBe(pageSize)
  expect(articles.articles).toHaveLength(pageSize)
})

test('getAllArticleSlugs', () => {
  const articleSlugs = getAllArticleFiles()
  expect(articleSlugs.length).toBeGreaterThanOrEqual(1)
})

test('findFirstArticleBySlug', () => {
  const articleSlugs = getAllArticleFiles()
  articleSlugs.forEach((slug) => expect(findFirstArticleByFileName(slug).fileName).toBe(slug))
})
