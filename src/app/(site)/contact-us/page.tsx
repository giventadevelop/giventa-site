import type { Metadata } from 'next';
import ContactUsContent from '../_content/ContactUsContent';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function ContactUsPage() {
  return <ContactUsContent />;
}
