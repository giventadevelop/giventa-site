import type { Metadata } from 'next';
import './globals.css';
import GoogleAdSenseScript from '@/components/ads/GoogleAdSenseScript';
import { getSharedAdsensePublisherIdForMeta } from '@/lib/adsense/sharedPublisherId';

const adsensePublisherId = getSharedAdsensePublisherIdForMeta();

export const metadata: Metadata = {
  title: {
    template: '%s | Giventa',
    default: 'Giventa — IT Solutions',
  },
  description: 'Giventa provides best-in-class IT solutions and consulting services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense account association (giventa.com owner Publisher ID) */}
        <meta name="google-adsense-account" content={adsensePublisherId} />
      </head>
      <body className="globex-site hidden-bar-wrapper">
        <GoogleAdSenseScript />
        {children}
      </body>
    </html>
  );
}
