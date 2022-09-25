export default async function (): Promise<Profile> {
  if (!import.meta.env.PROD) {
    return {
      image: "https://avatars.githubusercontent.com/u/41039751?v=4",
      name: "raeperd",
      bio: "Talk is cheap",
    };
  }

  const githubProfile = await fetch(
    "https://api.github.com/users/raeperd"
  ).then((response) => response.json());
  return {
    image: githubProfile.avatar_url,
    name: githubProfile.name,
    bio: githubProfile.bio,
  };
}

export interface Profile {
  image: string;
  name: string;
  bio: string;
}
