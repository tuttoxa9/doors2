import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

interface CartItem {
  product: {
    id: string
    name: string
    category: string
    price: { min: number; max: number }
  }
  selectedColor?: string
  quantity: number
  price: number
}

interface OrderData {
  phone: string
  name?: string
  address?: string
  comment?: string
  items: CartItem[]
  totalItems: number
  totalPrice: number
  timestamp: string
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Обработка CORS preflight запроса
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    }
  }

  // Разрешаем только POST запросы
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Получаем переменные окружения
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing Telegram environment variables')
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server configuration error' })
      }
    }

    // Парсим данные заказа
    const orderData: OrderData = JSON.parse(event.body || '{}')

    if (!orderData.phone || !orderData.items || orderData.items.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Phone and items are required' })
      }
    }

    // Формируем сообщение для Telegram
    const itemsList = orderData.items.map(item =>
      `📦 ${item.product.name}\n` +
      `   Категория: ${item.product.category}\n` +
      `   ${item.selectedColor ? `Цвет: ${item.selectedColor}\n   ` : ''}` +
      `Количество: ${item.quantity} шт.\n` +
      `   Цена: ${item.price.toLocaleString()} BYN`
    ).join('\n\n')

    const message = `🛒 Новый заказ с сайта MAESTRO

👤 Клиент: ${orderData.name || 'Не указано'}
📞 Телефон: ${orderData.phone}
${orderData.address ? `📍 Адрес: ${orderData.address}` : ''}

📦 ТОВАРЫ:
${itemsList}

💰 ИТОГО: ${orderData.totalPrice.toLocaleString()} BYN
📊 Общее количество: ${orderData.totalItems} шт.

${orderData.comment ? `💬 Комментарий: ${orderData.comment}` : ''}

📅 Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Minsk' })}`

    // Отправляем сообщение в Telegram
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text()
      console.error('Telegram API error:', errorData)
      throw new Error('Failed to send message to Telegram')
    }

    // Firestore функциональность удалена для оптимизации
    console.log('Order processed successfully for Telegram:', orderData.phone)

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Заказ успешно отправлен!',
        orderId: `ORDER_${Date.now()}`
      })
    }

  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Произошла ошибка при отправке заказа. Попробуйте позже.'
      })
    }
  }
}
