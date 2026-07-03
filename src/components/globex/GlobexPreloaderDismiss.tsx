'use client';

import { useEffect } from 'react';

function hideWithJQuery(): boolean {
  const w = window as unknown as Record<string, unknown>;
  const jQuery = w.jQuery as
    | ((selector: string) => { length: number; delay: (ms: number) => { fadeOut: (ms: number) => void } })
    | undefined;
  if (!jQuery) {
    return false;
  }
  const preloader = jQuery('.preloader');
  if (!preloader.length) {
    return false;
  }
  preloader.delay(200).fadeOut(500);
  return true;
}

/**
 * Globex script.js hides the preloader on window "load", which often fires before
 * Next.js hydrates and loads legacy JS. Dismiss the spinner on the client instead.
 */
export default function GlobexPreloaderDismiss() {
  useEffect(() => {
    const hidePreloader = () => {
      const preloader = document.querySelector<HTMLElement>('.preloader');
      if (!preloader || preloader.dataset.dismissed === 'true') {
        return;
      }
      preloader.dataset.dismissed = 'true';

      if (hideWithJQuery()) {
        return;
      }

      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      window.setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    };

    const timer = window.setTimeout(hidePreloader, 200);

    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', hidePreloader);
    };
  }, []);

  return null;
}
