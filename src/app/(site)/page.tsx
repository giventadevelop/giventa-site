import type { Metadata } from 'next';
import HomeContent from './_content/HomeContent';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return <HomeContent />;
}
