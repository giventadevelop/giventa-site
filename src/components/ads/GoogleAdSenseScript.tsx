import Script from 'next/script';
import { getSharedAdsensePublisherIdForMeta } from '@/lib/adsense/sharedPublisherId';

/**
 * Loads the AdSense script for giventa.com site verification and auto ads.
 * Same client ID as documented in google_adsense_shared_publisher_giventa.html.
 */
export default function GoogleAdSenseScript() {
  const publisherId = getSharedAdsensePublisherIdForMeta();

  return (
    <Script
      id="google-adsense"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`}
      strategy="afterInteractive"
    />
  );
}
