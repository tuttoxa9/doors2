import { NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/types/product';

export async function GET() {
  const baseUrl = 'https://maestroworks.ru';
  const lastBuildDate = new Date().toUTCString();

  let rssItems: Array<{
    title: string;
    description: string;
    link: string;
    pubDate: string;
    guid: string;
  }> = [];

  try {
    // Получаем товары из Firebase
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc'),
      limit(10) // Ограничиваем количество товаров в RSS
    );

    const querySnapshot = await getDocs(q);

    const formatPrice = (price: { min: number; max: number }) => {
      if (price.min === price.max) {
        return `${price.min.toLocaleString()} BYN`;
      }
      return `от ${price.min.toLocaleString()} BYN`;
    };

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const product: Product = {
        id: doc.id,
        name: data.name || '',
        category: data.category || '',
        price: {
          min: data.price?.min || 0,
          max: data.price?.max || 0,
        },
        description: data.description || '',
        colors: Array.isArray(data.colors) ? data.colors : [],
        images: Array.isArray(data.images) ? data.images : [],
        inStock: Boolean(data.inStock),
        featured: Boolean(data.featured),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };

      rssItems.push({
        title: `${product.featured ? '⭐ ' : ''}${product.name}`,
        description: `${product.description} Цена: ${formatPrice(product.price)}. Категория: ${product.category}.${product.inStock ? '' : ' Нет в наличии.'}`,
        link: `${baseUrl}#shop`,
        pubDate: product.createdAt.toUTCString(),
        guid: `${baseUrl}/products/${product.id}`,
      });
    }

    // Добавляем общие новости, если товаров мало
    if (rssItems.length < 5) {
      rssItems.push({
        title: 'Акция: Скидка 15% на заказы до конца года',
        description: 'При заказе любого шкафа до 31 декабря действует скидка 15%. Также бесплатная 3D-визуализация и доставка по Минску!',
        link: baseUrl,
        pubDate: new Date('2024-11-15').toUTCString(),
        guid: `${baseUrl}/promotions/year-end-discount`,
      });
    }

  } catch (error) {
    console.error('Ошибка при загрузке товаров для RSS:', error);

    // В случае ошибки используем базовые новости
    rssItems = [
      {
        title: 'MAESTRO - Мебель на заказ в Минске',
        description: 'Изготовление качественных шкафов, гардеробных и встроенной мебели по индивидуальным размерам. Бесплатный замер и 3D-визуализация.',
        link: baseUrl,
        pubDate: new Date().toUTCString(),
        guid: `${baseUrl}/about`,
      },
      {
        title: 'Акция: Скидка 15% на заказы до конца года',
        description: 'При заказе любого шкафа до 31 декабря действует скидка 15%. Также бесплатная 3D-визуализация и доставка по Минску!',
        link: baseUrl,
        pubDate: new Date('2024-11-15').toUTCString(),
        guid: `${baseUrl}/promotions/year-end-discount`,
      }
    ];
  }

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MAESTRO - Шкафы на заказ в Минске</title>
    <description>Новости и обновления от компании MAESTRO. Изготовление качественной мебели на заказ в Минске. Шкафы, гардеробные, детская мебель по индивидуальным размерам.</description>
    <link>${baseUrl}</link>
    <language>ru-RU</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <managingEditor>info@maestroworks.ru (MAESTRO)</managingEditor>
    <webMaster>info@maestroworks.ru (MAESTRO)</webMaster>
    <category>Мебель</category>
    <category>Интерьер</category>
    <category>Дизайн</category>
    <category>Минск</category>
    <ttl>1440</ttl>
    <image>
      <url>${baseUrl}/favicon.svg</url>
      <title>MAESTRO</title>
      <link>${baseUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
    ${rssItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="false">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <category>Мебель на заказ</category>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
