export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MAESTRO",
    "alternateName": ["Maestro Works", "МАЭСТРО", "Мебель MAESTRO"],
    "description": "Изготовление качественных шкафов на заказ в Минске. Шкафы, гардеробные, детская мебель по индивидуальным размерам. Гарантия 5 лет, бесплатный замер.",
    "url": "https://maestroworks.ru",
    "telephone": "+375291565232",
    "email": "mebelkdomy.by@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Судмалиса, 13",
      "addressLocality": "Минск",
      "addressRegion": "Минская область",
      "postalCode": "220000",
      "addressCountry": "BY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.9045,
      "longitude": 27.5615
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 53.9045,
        "longitude": 27.5615
      },
      "geoRadius": "50000"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Минск"
      },
      {
        "@type": "State",
        "name": "Минская область"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "BYN",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Мебель на заказ",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Шкафы на заказ",
            "description": "Изготовление шкафов по индивидуальным размерам"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Детские шкафы",
            "description": "Безопасная мебель для детских комнат"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Гардеробные комнаты",
            "description": "Проектирование и изготовление гардеробных комнат"
          }
        }
      ]
    },
    "logo": "https://maestroworks.ru/favicon.svg",
    "image": "https://maestroworks.ru/showroom.webp",
    "sameAs": [
      "https://www.instagram.com/maestro_furniture",
      "https://vk.com/maestro_furniture",
      "https://t.me/maestro_furniture"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MAESTRO",
    "url": "https://maestroworks.ru",
    "description": "Официальный сайт компании MAESTRO - изготовление мебели на заказ в Минске",
    "publisher": {
      "@type": "Organization",
      "name": "MAESTRO"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://maestroworks.ru/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://maestroworks.ru"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Каталог",
        "item": "https://maestroworks.ru#shop"
      }
    ]
  };

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Шкафы на заказ",
    "description": "Качественные шкафы по индивидуальным размерам от мебельной мастерской MAESTRO в Минске",
    "brand": {
      "@type": "Brand",
      "name": "MAESTRO"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "MAESTRO",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Минск",
        "addressCountry": "BY"
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BYN",
      "lowPrice": "290",
      "highPrice": "2500",
      "offerCount": "50",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "MAESTRO"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127"
    },
    "category": "Мебель",
    "image": "https://maestroworks.ru/showroom.webp"
  };



  const reviewData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "MAESTRO"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Мария"
    },
    "reviewBody": "Заказывали шкафы в спальню. Качество превзошло все ожидания! Очень довольны результатом. Рекомендую MAESTRO всем, кто ищет качественную мебель на заказ."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productData)
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewData)
        }}
      />
    </>
  );
}
