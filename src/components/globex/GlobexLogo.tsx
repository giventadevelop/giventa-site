import Link from 'next/link';
import { SITE_CONTACT } from '@/lib/siteContact';

type GlobexLogoProps = {
  variant?: 'header' | 'footer' | 'sticky' | 'mobile';
};

const sizes: Record<NonNullable<GlobexLogoProps['variant']>, { width: number; height: number }> = {
  header: { width: SITE_CONTACT.logoWidth, height: SITE_CONTACT.logoHeight },
  footer: { width: SITE_CONTACT.logoWidth, height: SITE_CONTACT.logoHeight },
  sticky: { width: 120, height: 40 },
  mobile: { width: SITE_CONTACT.logoWidth, height: SITE_CONTACT.logoHeight },
};

export default function GlobexLogo({ variant = 'header' }: GlobexLogoProps) {
  const { width, height } = sizes[variant];

  return (
    <Link href="/" aria-label="Giventa home">
      <img
        src={SITE_CONTACT.logoSrc}
        alt="Giventa"
        width={width}
        height={height}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />
    </Link>
  );
}
