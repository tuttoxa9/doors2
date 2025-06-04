import Head from 'next/head';

export default function SEOHead() {
  return (
    <Head>
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/fonts/Pusia_Bold.otf"
        as="font"
        type="font/otf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/videos/video1.mp4"
        as="video"
        type="video/mp4"
      />
      <link
        rel="preload"
        href="/showroom.webp"
        as="image"
        type="image/webp"
      />

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="mask-icon" href="/favicon.svg" color="#000000" />

      {/* Web app manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Additional meta tags for mobile */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="MAESTRO" />

      {/* Cache control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />

      {/* Additional business info */}
      <meta name="business:contact_data:locality" content="Минск" />
      <meta name="business:contact_data:region" content="Минская область" />
      <meta name="business:contact_data:country_name" content="Беларусь" />
      <meta name="business:contact_data:phone_number" content="+375291565232" />
      <meta name="business:contact_data:email" content="mebelkdomy.by@gmail.com" />

      {/* Rich snippets hints */}
      <meta name="subject" content="Изготовление мебели на заказ" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />

      {/* Speed up page loading */}
      <link rel="prefetch" href="/#shop" />

    </Head>
  );
}
