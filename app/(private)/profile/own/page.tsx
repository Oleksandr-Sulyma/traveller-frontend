import OwnStories from '@/components/Profile/OwnStories/OwnStories';
import { getOwnStories } from '@/lib/api/serverApi';

export default async function Saved() {
  const ownStories = await getOwnStories();

  if (!ownStories) return;
  return <OwnStories stories={ownStories.stories} page="profile" />;
}
