import Script from 'next/script';

/**
 * Loads Globex legacy CSS/JS from public/globex/assets so styles are available
 * from first paint (same pattern as mosc-temp SyroStaticAssets).
 */
export default function GlobexStaticAssets() {
  const base = '/globex/assets';
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={`${base}/css/bootstrap.css`} data-globex-static="true" />
      <link rel="stylesheet" href={`${base}/css/style.css`} data-globex-static="true" />
      <link rel="stylesheet" href={`${base}/css/responsive.css`} data-globex-static="true" />
      <link rel="stylesheet" href={`${base}/css/color-switcher-design.css`} data-globex-static="true" />
      <link
        id="theme-color-file"
        rel="stylesheet"
        href={`${base}/css/color-themes/default-theme.css`}
        data-globex-static="true"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Nunito+Sans:wght@300;600;700;800;900&display=swap"
        data-globex-static="true"
      />
      <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
      <link rel="icon" href="/images/favicon.png" type="image/x-icon" />

      <Script id="globex-next-site-flag" strategy="beforeInteractive">
        {`window.__GLOBEX_NEXT_SITE__ = true;`}
      </Script>
      <Script src={`${base}/js/jquery.js`} strategy="beforeInteractive" />
      <Script src={`${base}/js/popper.min.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/bootstrap.min.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/jquery.mCustomScrollbar.concat.min.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/jquery.fancybox.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/appear.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/parallax.min.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/tilt.jquery.min.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/jquery.paroller.min.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/owl.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/wow.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/nav-tool.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/jquery-ui.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/script.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/globex-next-init.js`} strategy="afterInteractive" />
      <Script src={`${base}/js/color-settings.js`} strategy="afterInteractive" />
    </>
  );
}
