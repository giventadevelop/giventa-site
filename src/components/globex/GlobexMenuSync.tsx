'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    __globexSyncNavigation?: () => void;
  }
}

/**
 * Re-syncs mobile/sticky nav clones after React route or auth updates.
 * jQuery must not clone the full .main-menu (see globex-next-init.js).
 */
export default function GlobexMenuSync() {
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => {
      window.__globexSyncNavigation?.();
    };

    const timer = window.setTimeout(sync, 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
