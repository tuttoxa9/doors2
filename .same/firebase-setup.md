# Настройка Firebase для проекта MAESTRO

## 🔥 Firestore Database

### 1. Создание коллекции `products`

**Путь:** Database → Firestore Database → Start collection

**Collection ID:** `products`

### 2. Правила безопасности (Security Rules)

Перейдите в **Database → Firestore Database → Rules** и замените содержимое:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Публичное чтение товаров
    match /products/{productId} {
      allow read: if true;
      // Запись только для аутентифицированных пользователей
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### 3. Индексы для оптимизации

**Автоматически будут созданы после первых запросов, но можно создать заранее:**

1. **Составной индекс:**
   - Collection: `products`
   - Fields: `category` (Ascending), `createdAt` (Descending)
   - Query scope: Collection

2. **Индекс для featured товаров:**
   - Collection: `products`
   - Fields: `featured` (Ascending), `createdAt` (Descending)
   - Query scope: Collection

---

## 💾 Firebase Storage

### 1. Настройка Storage Rules

Перейдите в **Storage → Rules** и замените содержимое:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Публичное чтение изображений товаров
    match /products/{productId}/{fileName} {
      allow read: if true;
      // Загрузка только для аутентифицированных пользователей
      allow write: if request.auth != null
        && resource.size < 5 * 1024 * 1024 // максимум 5MB
        && resource.contentType.matches('image/.*'); // только изображения
    }
  }
}
```

### 2. Структура папок в Storage

```
/products/
  ├── product1-id/
  │   ├── main.jpg
  │   ├── interior.jpg
  │   └── details.jpg
  ├── product2-id/
  │   ├── image1.png
  │   └── image2.webp
  └── ...
```

---

## 🔐 Authentication (для админки)

### 1. Включение Authentication

1. Перейдите в **Authentication → Get started**
2. Выберите вкладку **Sign-in method**
3. Включите **Email/Password**

### 2. Создание админского пользователя

1. Перейдите в **Authentication → Users**
2. Нажмите **Add user**
3. Введите email и пароль для админа
4. После создания нажмите на пользователя
5. В разделе **Custom claims** добавьте:
   ```json
   {"admin": true}
   ```

---

## 📊 Тестовые данные

### Добавление через консоль Firestore

1. Перейдите в **Database → Firestore Database**
2. Нажмите **Start collection**
3. Collection ID: `products`
4. Добавьте документ с такой структурой:

```json
{
  "name": "Шкаф-купе Классик",
  "category": "Шкафы-купе",
  "price": {
    "min": 800,
    "max": 1200
  },
  "description": "Элегантный 2-створчатый шкаф-купе с зеркальными фасадами.",
  "colors": ["Венге", "Дуб беленый", "Белый"],
  "images": [],
  "inStock": true,
  "featured": true,
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}
```

---

## ⚙️ Проверка подключения

### Тест в браузере

1. Откройте сайт: https://same-ykrh93wer9x-latest.netlify.app
2. Перейдите в раздел "Магазин"
3. Если товары есть в БД - они отобразятся
4. Если БД пуста - покажется соответствующее сообщение

### Проверка в консоли браузера

```javascript
// Откройте DevTools → Console и выполните:
console.log('Firebase config:', firebase.apps[0].options);
```

---

## 🚨 Возможные проблемы

### 1. Ошибка "Permission denied"
- **Причина:** Неправильные Rules
- **Решение:** Проверьте правила Firestore и Storage

### 2. Товары не загружаются
- **Причина:** Пустая база данных
- **Решение:** Добавьте тестовые товары через консоль

### 3. Изображения не отображаются
- **Причина:** Неправильные пути или Rules Storage
- **Решение:** Проверьте пути в поле `images` и правила Storage

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Убедитесь что Firebase config корректный
3. Проверьте правила безопасности
