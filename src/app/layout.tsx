import type { Metadata } from 'next';
import './globals.css';
import '@/styles/admin-theme.css';
import GoogleAdSenseScript from '@/components/ads/GoogleAdSenseScript';
import GiventaAppProviders from '@/components/GiventaAppProviders';
import { getSharedAdsensePublisherIdForMeta } from '@/lib/adsense/sharedPublisherId';
import { getClerkProviderSatelliteProps } from '@/lib/clerkSatellite';
import { headers } from 'next/headers';

const adsensePublisherId = getSharedAdsensePublisherIdForMeta();

const CLERK_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  process.env.AMPLIFY_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  '';

export const metadata: Metadata = {
  title: {
    template: '%s | Giventa',
    default: 'Giventa — IT Solutions',
  },
  description: 'Giventa provides best-in-class IT solutions and consulting services.',
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.AMPLIFY_NEXT_PUBLIC_APP_URL || '';

  let clerkProviderProps: Record<string, unknown> = { afterSignOutUrl: '/' };

  try {
    const headersList = await headers();
    const hostname = headersList.get('host') || '';
    clerkProviderProps = getClerkProviderSatelliteProps(hostname);
    if (appUrl && !clerkProviderProps.isSatellite) {
      clerkProviderProps.allowedRedirectOrigins = [appUrl];
    }
  } catch {
    clerkProviderProps = getClerkProviderSatelliteProps();
    if (appUrl && !clerkProviderProps.isSatellite) {
      clerkProviderProps.allowedRedirectOrigins = [appUrl];
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content={adsensePublisherId} />
      </head>
      <body className="globex-site hidden-bar-wrapper" suppressHydrationWarning>
        <GoogleAdSenseScript />
        {CLERK_KEY ? (
          <GiventaAppProviders clerkPublishableKey={CLERK_KEY} clerkProviderProps={clerkProviderProps}>
            {children}
          </GiventaAppProviders>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
