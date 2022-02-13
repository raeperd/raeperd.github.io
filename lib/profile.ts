import axios from 'axios';
import { SocialProps } from '../components/SocialNav';
import { getGithubName, getSocialNavProps } from './configuration';

export default async function getProfile(): Promise<Profile> {
  const githubProfile = await getGithubProfile()
  return {
    image: githubProfile.avatar_url,
    name: githubProfile.name,
    bio: githubProfile.bio,
    socials: getSocialNavProps(),
  }
}

export interface Profile {
  image: string
  name: string
  bio: string
  socials: SocialProps[]
}

function getGithubProfile(): Promise<GithubProfile> {
  return axios.get<GithubProfile>(`https://api.github.com/users/${getGithubName()}`)
    .then((response) => response.data)
}

interface GithubProfile {
  avatar_url: string,
  name: string,
  bio: string
}
