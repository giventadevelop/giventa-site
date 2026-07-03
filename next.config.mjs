/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID:
      process.env.AMPLIFY_NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID,
    AMPLIFY_NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID:
      process.env.AMPLIFY_NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID,
  },
};

export default nextConfig;
