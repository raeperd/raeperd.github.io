import { getNotePreviewsByDir } from '../lib/note';
import NoteListView, { NoteListViewProps } from '../components/NoteListView';
import { getPageSize } from '../lib/configuration';
import getProfile, { Profile } from '../lib/profile';
import { SocialNav } from '../components/SocialNav';

export default function Index(
  { profile, notes, pageNumber, isLastPage, isFirstPage }: IndexProps,
) {
  return (
    <>
      <ProfileView profile={profile} />
      <NoteListView
        notes={notes}
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

interface IndexProps extends NoteListViewProps {
  profile: Profile,
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
  const pagedArticles = getNotePreviewsByDir('articles', 1, getPageSize())
  return {
    props: {
      profile: await getProfile(),
      notes: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
