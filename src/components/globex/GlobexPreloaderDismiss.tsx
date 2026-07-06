'use client';

import { useEffect } from 'react';

/**
 * Globex script.js hides the preloader on window "load", which often fires before
 * Next.js hydrates and loads legacy JS. Dismiss the spinner on the client instead.
 * Uses CSS only — jQuery fadeOut can fight React unmount and cause removeChild errors.
 */
export default function GlobexPreloaderDismiss() {
  useEffect(() => {
    const hidePreloader = () => {
      const preloader = document.querySelector<HTMLElement>('.preloader');
      if (!preloader || preloader.dataset.dismissed === 'true') {
        return;
      }
      preloader.dataset.dismissed = 'true';
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
