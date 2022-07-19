import { getNotePreviewsByDir } from '../lib/note';
import NoteListView, { NoteListViewProps } from '../components/NoteListView';
import { getPageSize } from '../lib/configuration';
import getProfile, { Profile } from '../lib/profile';
import { SocialNav } from '../components/SocialNav';

export default function Index(
  {
    profile,
    header, notes, pagePath, pageNumber, isLastPage, isFirstPage, lastPageNumber,
  }: IndexProps,
) {
  return (
    <>
      <ProfileContainer profile={profile} />
      <NoteListView
        header={header}
        notes={notes}
        pagePath={pagePath}
        pageNumber={pageNumber}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        lastPageNumber={lastPageNumber}
      />
    </>
  )
}

function ProfileContainer({ profile }: {profile: Profile }) {
  return (
    <div id="profile-container" itemScope itemType="https://schema.org/Person">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={profile.image} alt="Profile" itemProp="image" data-cy="profile-image" />
      <div id="bio-container">
        <h1 data-cy="profile-name" itemProp="name">{profile.name}</h1>
        <p data-cy="profile-bio">{profile.bio}</p>
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
      header: null,
      notes: pagedArticles.notes,
      pagePath: '/',
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
      lastPageNumber: pagedArticles.lastPageNumber,
    },
  }
}
