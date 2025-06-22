# Коллекции Firebase для изображений сайта MAESTRO

## 📸 Секция "Популярные решения" (ShopSection.tsx)

### Расположение в коде
- **Файл:** `src/components/ShopSection.tsx`
- **Строки:** 221-264 (секция "Популярные решения")

### Коллекция Firebase
**Название:** `products`

**Путь в Storage:** `products/{productId}/{filename}`

### Как загружать изображения

1. **Создать товар в коллекции `products`:**
```json
{
  "name": "Шкафы распашные на заказ",
  "category": "Шкафы распашные",
  "price": {
    "min": 800,
    "max": 2500
  },
  "description": "Наши шкафы распашные идеально вписываются в любой интерьер, делаются на заказ, с учётом особенностей помещения и личных предпочтений.",
  "colors": ["Венге", "Дуб беленый", "Орех", "Белый"],
  "images": ["products/productId/main.jpg", "products/productId/interior.jpg"],
  "inStock": true,
  "featured": true
}
```

2. **Загрузить изображение в Firebase Storage:**
   - Путь: `products/{productId}/main.jpg`
   - Рекомендуемый размер: 800x600px или выше
   - Форматы: `.jpg`, `.jpeg`, `.png`, `.webp`

### Текущее состояние
❌ **Проблема:** В секции отображается placeholder вместо реального изображения из Firebase

✅ **Решение:** Загрузить товары в коллекцию `products` с изображениями

### Пример кода для добавления товара:
```typescript
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// 1. Загружаем изображение
const imageRef = ref(storage, `products/${productId}/main.jpg`)
await uploadBytes(imageRef, imageFile)
const imageUrl = await getDownloadURL(imageRef)

// 2. Добавляем товар
await addDoc(collection(db, 'products'), {
  name: "Шкафы распашные на заказ",
  category: "Шкафы распашные",
  price: { min: 800, max: 2500 },
  description: "Описание товара...",
  colors: ["Венге", "Дуб беленый"],
  images: [imageUrl],
  inStock: true,
  featured: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🎯 Рекомендации для админа

1. **Добавить 3-4 товара** в категории "Шкафы распашные"
2. **Установить `featured: true`** для показа в секции "Популярные решения"
3. **Загрузить качественные фотографии** размером минимум 800x600px
4. **Использовать названия файлов:** `main.jpg`, `interior.jpg`, `detail.jpg`

## 🔄 Автоматическое обновление

После добавления товаров в Firebase:
- Секция "Популярные решения" автоматически подгрузит первый товар с `featured: true`
- Изображение заменит текущий placeholder
- Описание обновится из поля `description`
