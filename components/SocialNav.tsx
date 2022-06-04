import Github from '../public/github.svg';
import Twitter from '../public/twitter.svg';
import Instagram from '../public/instagram.svg';
import LinkedIn from '../public/linkedin.svg'
import Notion from '../public/notion.svg'
import Cv from '../public/cv.svg'

export function SocialNav({ socials }: { socials: SocialProps[] }) {
  const siteNameToSvg = {
    github: <Github />,
    twitter: <Twitter />,
    instagram: <Instagram />,
    linkedin: <LinkedIn />,
    notion: <Notion />,
    cv: <Cv />,
  }

  return (
    <nav className="social-nav">
      {socials.filter((social) => social.userId !== null)
        .map((social) => (
          <a href={buildSocialHref(social)} key={social.siteName}>
            {siteNameToSvg[social.siteName]}
          </a>
        ))}
    </nav>
  )
}

export interface SocialProps {
  siteName: 'github' | 'linkedin' | 'notion' | 'cv' | 'instagram' | 'twitter',
  userId: string | null
}

function buildSocialHref(social: SocialProps): string {
  if (social.siteName === 'linkedin') {
    return `//www.linkedin.com/in/${social.userId}`
  }
  if (social.siteName === 'notion' || social.siteName === 'cv') {
    return `//${social.userId}`
  }
  return `//${social.siteName}.com/${social.userId}`
}
