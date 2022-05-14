import { SocialProps } from '../components/SocialNav';

export function getPageSize(): number {
  return 10
}

export function getSiteName(): string {
  return 'raeperd.github.io'
}

export function getDefaultAuthor(): string {
  return 'raeperd'
}

export function getSocialNavProps(): SocialProps[] {
  return [
    { siteName: 'github', userId: getGithubName() },
    { siteName: 'linkedin', userId: 'raeperd' },
    { siteName: 'notion', userId: 'raeperd.notion.site/raeperd-5f287d810fa94048b45c917d2375e013' },
    { siteName: 'cv', userId: 'github.com/raeperd/resume/raw/main/resume.pdf' },
  ]
}

export function getGithubName(): string {
  return 'raeperd'
}
