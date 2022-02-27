import { getNotePreviewsByDir, NotePreview } from '../lib/note';
import NoteListView from '../components/NoteListView';
import { getPageSize } from '../lib/configuration';
import getProfile, { Profile } from '../lib/profile';
import { SocialNav } from '../components/SocialNav';

export default function Index(
  { profile, articles, pageNumber, isLastPage, isFirstPage }: IndexProps,
) {
  return (
    <>
      <ProfileView profile={profile} />
      <NoteListView
        notes={articles}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}

function ProfileView({ profile }: {profile: Profile }) {
  return (
    <div className="profile-container">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Profile" src={profile.image} />
      <div className="bio-container">
        <h1>{profile.name}</h1>
        <p>{profile.bio}</p>
        <SocialNav socials={profile.socials} />
      </div>
    </div>
  )
}

interface IndexProps {
  profile: Profile,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
  const pagedArticles = getNotePreviewsByDir('articles', 1, getPageSize())
  return {
    props: {
      profile: await getProfile(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
