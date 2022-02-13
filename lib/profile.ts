import { SocialProps } from '../components/SocialNav';
import { getSocialNavProps } from './configuration';

export default async function getProfile(): Promise<Profile> {
  return {
    image: 'https://avatars.githubusercontent.com/u/41039751?v=4',
    name: 'raeperd',
    email: 'raeperd117@gmail.com',
    bio: 'can win',
    socials: getSocialNavProps(),
  }
}

export interface Profile {
  image: string
  name: string
  email: string
  bio: string
  socials: SocialProps[]
}
