import type { Metadata } from 'next';
import AboutUsContent from '../_content/AboutUsContent';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}
