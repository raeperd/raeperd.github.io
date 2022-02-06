import { SocialProps } from '../components/SocialNav';

export function getPageSize(): number {
  return process.env.PAGE_SIZE
    ? parseInt(process.env.PAGE_SIZE, 10) : 3
}

export function getSiteName(): string {
  return process.env.SITE_NAME
    ? process.env.SITE_NAME : 'Paper'
}

export function getDefaultAuthor(): string {
  return process.env.AUTHOR
    ? process.env.AUTHOR : 'author'
}

export function getSocialNavProps(): SocialProps[] {
  return [
    { siteName: 'github', userId: getGithubName() },
    { siteName: 'twitter', userId: process.env.TWITTER ? process.env.TWITTER : null },
    { siteName: 'instagram', userId: process.env.INSTAGRAM ? process.env.INSTAGRAM : null },
  ]
}

export function getGithubName(): string {
  const githubName = process.env.GITHUB
  if (!githubName) {
    throw Error('No github name found')
  }
  return githubName
}
