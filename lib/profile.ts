export default async function getProfile(): Promise<Profile> {
  return {
    image: 'https://avatars.githubusercontent.com/u/41039751?v=4',
    name: 'raeperd',
    email: 'raeperd117@gmail.com',
    bio: 'can win',
  }
}

export interface Profile {
  image: string,
  name: string,
  email: string
  bio: string
}
