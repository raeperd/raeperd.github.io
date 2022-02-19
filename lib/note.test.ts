import {
  getAllArticleTags,
  getAllTags,
  getNoteByStaticPath,
  getNotePreviewsByDir,
  getNoteStaticPaths,
} from './note';

test('getArticlePreviews', () => {
  const pageSize = 1
  const articles = getNotePreviewsByDir('', 1, pageSize)

  expect(articles.pageSize).toBe(pageSize)
  expect(articles.notes).toHaveLength(pageSize)
})

test('getArticleStaticPaths', () => {
  const articleSlugs = getNoteStaticPaths()
  expect(articleSlugs.length).toBeGreaterThanOrEqual(1)
})

test('findFirstArticleByPath', () => {
  const articleStaticPath = getNoteStaticPaths()
  articleStaticPath.forEach(
    (path) => expect(getNoteByStaticPath(path).staticPath).toBe(path),
  )
})

test('getAllTags', () => {
  const tags = getAllTags()
  expect(tags.length).toBeGreaterThanOrEqual(1)
})

test('getAllArticleTags', () => {
  const tags = getAllArticleTags()
  expect(tags.length).toBeGreaterThanOrEqual(1)
})
