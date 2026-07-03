'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GIVENTA_NAV_LINKS } from '@/components/globex/navConfig';

function isNavActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/' || pathname === '/home';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function GlobexNavMenu() {
  const pathname = usePathname();

  return (
    <ul className="navigation clearfix">
      {GIVENTA_NAV_LINKS.map(({ href, label }) => (
        <li key={href} className={isNavActive(pathname, href) ? 'current' : undefined}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}
