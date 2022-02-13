import Github from '../public/github.svg';
import Twitter from '../public/twitter.svg';
import Instagram from '../public/instagram.svg';

export function SocialNav({ socials }: { socials: SocialProps[] }) {
  const siteNameToSvg = {
    github: <Github />,
    twitter: <Twitter />,
    instagram: <Instagram />,
  }

  return (
    <nav className="social">
      {socials.filter((social) => social.userId !== null)
        .map((social) => (
          <a href={`//${social.siteName}.com/${social.userId}`} key={social.siteName}>
            {siteNameToSvg[social.siteName]}
          </a>
        ))}
    </nav>
  )
}

export interface SocialProps {
  siteName: 'instagram' | 'github' | 'twitter',
  userId: string | null
}
