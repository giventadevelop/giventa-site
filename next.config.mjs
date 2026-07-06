/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eventapp-media-bucket.s3.us-east-2.amazonaws.com',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tabs',
    ],
  },
  serverExternalPackages: [
    'sharp',
    'stripe',
    'xlsx',
    '@zxing/library',
    '@zxing/browser',
    'svix',
    'jsonwebtoken',
  ],
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  env: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_IS_SATELLITE: process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE,
    NEXT_PUBLIC_CLERK_DOMAIN: process.env.NEXT_PUBLIC_CLERK_DOMAIN,
    NEXT_PUBLIC_PRIMARY_DOMAIN: process.env.NEXT_PUBLIC_PRIMARY_DOMAIN,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_PRIMARY_DOMAIN: process.env.NEXT_PUBLIC_PRIMARY_DOMAIN,
    NEXT_PUBLIC_CLERK_IS_SATELLITE: process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE,
    NEXT_PUBLIC_CLERK_DOMAIN: process.env.NEXT_PUBLIC_CLERK_DOMAIN,
    API_JWT_USER: process.env.AMPLIFY_API_JWT_USER || process.env.API_JWT_USER,
    API_JWT_PASS: process.env.AMPLIFY_API_JWT_PASS || process.env.API_JWT_PASS,
    NEXT_PUBLIC_API_BASE_URL:
      process.env.AMPLIFY_NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_TENANT_ID:
      process.env.AMPLIFY_NEXT_PUBLIC_TENANT_ID || process.env.NEXT_PUBLIC_TENANT_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.AMPLIFY_NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_ENV:
      process.env.NEXT_PUBLIC_APP_ENV ||
      (process.env.NODE_ENV === 'production' ? 'production' : 'local'),
    NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID:
      process.env.AMPLIFY_NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID,
    AMPLIFY_NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID:
      process.env.AMPLIFY_NEXT_PUBLIC_GOOGLE_ADSENSE_SHARED_PUBLISHER_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_PAYMENT_METHOD_DOMAIN_ID:
      process.env.AMPLIFY_NEXT_PUBLIC_PAYMENT_METHOD_DOMAIN_ID ||
      process.env.NEXT_PUBLIC_PAYMENT_METHOD_DOMAIN_ID,
  },
};

export default nextConfig;
