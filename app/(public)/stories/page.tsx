import { redirect } from 'next/navigation';

export default function StoriesIndexPage() {
  redirect('/stories/filter/all');
}

