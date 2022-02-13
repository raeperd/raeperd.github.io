import { getArticlePreviews, NotePreview } from '../lib/note';
import NoteListView from '../components/NoteListView';
import { getPageSize, getSiteName } from '../lib/configuration';
import getProfile, { Profile } from '../lib/profile';

export default function Index(
  { profile, title, articles, pageNumber, isLastPage, isFirstPage }: IndexProps,
) {
  return (
    <>
      <ProfileView profile={profile} />
      <NoteListView
        title={title}
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
      </div>
    </div>
  )
}

interface IndexProps {
  profile: Profile,
  title: string,
  articles: NotePreview[],
  pageNumber: number,
  isFirstPage: boolean,
  isLastPage: boolean
}

export async function getStaticProps(): Promise<{props: IndexProps}> {
  const pagedArticles = getArticlePreviews(1, getPageSize())
  return {
    props: {
      profile: await getProfile(),
      title: getSiteName(),
      articles: pagedArticles.notes,
      pageNumber: pagedArticles.pageNumber,
      isFirstPage: pagedArticles.isFirstPage,
      isLastPage: pagedArticles.isLastPage,
    },
  }
}
