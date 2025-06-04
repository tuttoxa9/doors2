# База данных MAESTRO - Схема коллекций

## 📋 Общая информация

**Firebase Project ID:** `doors-8531d`
**Database:** Firestore
**Storage:** Firebase Storage (для изображений)

---

## 🗂️ Коллекция: `products`

Основная коллекция товаров для магазина шкафов-купе.

### 📝 Структура документа

```typescript
interface Product {
  id: string                    // Автоматический ID документа
  name: string                  // Название товара
  category: ProductCategory     // Категория товара
  price: {                     // Ценовой диапазон
    min: number                // Минимальная цена (в BYN)
    max: number                // Максимальная цена (в BYN)
  }
  description: string          // Описание товара
  colors: string[]            // Массив доступных цветов
  images: string[]            // Массив путей к изображениям в Storage
  inStock: boolean            // Есть ли в наличии
  featured: boolean           // Популярный товар (показать с меткой)
  createdAt: Timestamp        // Дата создания
  updatedAt: Timestamp        // Дата последнего обновления
}
```

### 🎯 Категории товаров (ProductCategory)

- `"Шкафы-купе"` - Классические шкафы-купе
- `"Встроенные шкафы"` - Встроенные решения
- `"Гардеробные"` - Гардеробные комнаты
- `"Детские шкафы"` - Детская мебель

### 📸 Работа с изображениями

**Storage путь:** `products/{productId}/{filename}`

**Форматы изображений:**
- Рекомендуемые: `.jpg`, `.jpeg`, `.png`, `.webp`
- Размер: до 5MB на изображение
- Рекомендуемые размеры: 800x600px или выше

**Пример пути в Storage:**
```
products/abc123def456/image1.jpg
products/abc123def456/image2.jpg
```

---

## 💰 Примеры данных для заполнения

### Шкаф-купе "Классик"
```json
{
  "name": "Шкаф-купе Классик 2-створчатый",
  "category": "Шкафы-купе",
  "price": {
    "min": 800,
    "max": 1200
  },
  "description": "Элегантный 2-створчатый шкаф-купе с зеркальными фасадами. Внутреннее наполнение включает полки для одежды, штангу для вешалок и ящики для аксессуаров.",
  "colors": ["Венге", "Дуб беленый", "Орех", "Белый"],
  "images": ["products/productId/main.jpg", "products/productId/interior.jpg"],
  "inStock": true,
  "featured": true,
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}
```

### Встроенный шкаф "Ниша"
```json
{
  "name": "Встроенный шкаф Ниша",
  "category": "Встроенные шкафы",
  "price": {
    "min": 1500,
    "max": 2500
  },
  "description": "Встроенное решение для максимального использования пространства. Изготавливается по индивидуальным размерам под конкретную нишу.",
  "colors": ["Дуб сонома", "Венге", "Белый глянец"],
  "images": ["products/productId/built-in-1.jpg"],
  "inStock": true,
  "featured": false,
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}
```

### Гардеробная "Люкс"
```json
{
  "name": "Гардеробная система Люкс",
  "category": "Гардеробные",
  "price": {
    "min": 3000,
    "max": 8000
  },
  "description": "Полноценная гардеробная система с освещением, островом, множеством полок и секций для разных типов одежды.",
  "colors": ["Орех темный", "Дуб беленый", "Комбинированный"],
  "images": ["products/productId/wardrobe-1.jpg", "products/productId/wardrobe-2.jpg"],
  "inStock": true,
  "featured": true,
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}
```

### Детский шкаф "Радуга"
```json
{
  "name": "Детский шкаф Радуга",
  "category": "Детские шкафы",
  "price": {
    "min": 600,
    "max": 900
  },
  "description": "Яркий и функциональный шкаф для детской комнаты. Безопасные материалы, удобная высота для ребенка.",
  "colors": ["Розовый", "Голубой", "Зеленый", "Желтый"],
  "images": ["products/productId/kids-1.jpg"],
  "inStock": true,
  "featured": false,
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}
```

---

## 🔧 Настройки Firestore

### Индексы
Рекомендуемые индексы для оптимизации запросов:

1. **Составной индекс для категории и даты:**
   - Collection: `products`
   - Fields: `category` (Ascending), `createdAt` (Descending)

2. **Индекс для популярных товаров:**
   - Collection: `products`
   - Fields: `featured` (Ascending), `createdAt` (Descending)

### Правила безопасности (Security Rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Чтение товаров разрешено всем
    match /products/{productId} {
      allow read: if true;
      // Запись только для аутентифицированных админов
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

---

## 📱 Для разработчика админки

### API эндпоинты для работы с товарами:

1. **Получение всех товаров:**
   ```typescript
   const products = await getDocs(collection(db, 'products'))
   ```

2. **Фильтрация по категории:**
   ```typescript
   const q = query(
     collection(db, 'products'),
     where('category', '==', 'Шкафы-купе')
   )
   ```

3. **Добавление нового товара:**
   ```typescript
   await addDoc(collection(db, 'products'), productData)
   ```

4. **Загрузка изображения:**
   ```typescript
   const imageRef = ref(storage, `products/${productId}/${fileName}`)
   await uploadBytes(imageRef, file)
   const downloadURL = await getDownloadURL(imageRef)
   ```

### Обязательные поля для валидации:
- ✅ `name` - не пустое
- ✅ `category` - один из допустимых типов
- ✅ `price.min` - больше 0
- ✅ `price.max` - больше или равно `price.min`
- ✅ `description` - не пустое
- ✅ `images` - минимум 1 изображение

---

## 📊 Текущее состояние БД

**Статус:** База данных пуста
**Необходимо:** Добавить товары через админ-панель
**Рекомендация:** Начать с 3-4 товаров в разных категориях
