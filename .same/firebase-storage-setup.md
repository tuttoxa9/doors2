# Настройка Firebase Storage для корректной работы с изображениями

## Проблемы и решения

### 1. CORS (Cross-Origin Resource Sharing)

Firebase Storage может блокировать запросы из-за CORS политик. Для решения:

1. Создайте файл `cors.json` в корне проекта:
```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

2. Настройте CORS через Google Cloud CLI:
```bash
gsutil cors set cors.json gs://doors-24bf2.firebasestorage.app
```

### 2. Правила безопасности

Убедитесь, что правила Firebase Storage разрешают чтение:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Поддерживаемые форматы изображений

- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ WebP (.webp)
- ✅ GIF (.gif)
- ✅ SVG (.svg)

### 4. Оптимизация загрузки

- Изображения загружаются асинхронно
- Используется lazy loading для улучшения производительности
- Автоматические fallback при ошибках загрузки
- Placeholder во время загрузки

### 5. Структура хранения изображений

Рекомендуемая структура папок в Firebase Storage:

```
products/
  ├── category1/
  │   ├── product1_1.webp
  │   ├── product1_2.jpg
  │   └── product1_3.png
  ├── category2/
  │   ├── product2_1.webp
  │   └── product2_2.jpg
  └── ...
```

### 6. Добавление изображений

В Firestore документ продукта должен содержать массив путей:

```javascript
{
  name: "Шкаф-купе Premium",
  images: [
    "products/shkaf-kupe/premium_1.webp",
    "products/shkaf-kupe/premium_2.jpg",
    "products/shkaf-kupe/premium_3.png"
  ]
  // ... другие поля
}
```

### 7. Troubleshooting

**Проблема:** Изображения не загружаются
**Решение:**
1. Проверьте CORS настройки
2. Убедитесь в правильности путей
3. Проверьте правила безопасности Firebase Storage

**Проблема:** Медленная загрузка
**Решение:**
1. Оптимизируйте размер изображений
2. Используйте WebP формат
3. Настройте CDN через Firebase Hosting
