# API примеры для админ-панели MAESTRO

## 🔧 Настройка Firebase в админке

```typescript
// firebase-admin.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAmDcb4Mpuz8-BihRcGmcPuwv9TR78MjF0",
  authDomain: "doors-8531d.firebaseapp.com",
  projectId: "doors-8531d",
  storageBucket: "doors-8531d.appspot.com",
  messagingSenderId: "1010091745434",
  appId: "1:1010091745434:web:a07b88554757541dcf7f23",
  measurementId: "G-0L57FE34HY"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
```

---

## 📝 CRUD операции для товаров

### 1. Создание товара

```typescript
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface ProductFormData {
  name: string
  category: 'Шкафы-купе' | 'Встроенные шкафы' | 'Гардеробные' | 'Детские шкафы'
  priceMin: number
  priceMax: number
  description: string
  colors: string[]
  images: File[]
  inStock: boolean
  featured: boolean
}

async function createProduct(formData: ProductFormData) {
  try {
    // 1. Создаем документ товара
    const docRef = await addDoc(collection(db, 'products'), {
      name: formData.name,
      category: formData.category,
      price: {
        min: formData.priceMin,
        max: formData.priceMax
      },
      description: formData.description,
      colors: formData.colors,
      images: [], // Сначала пустой массив
      inStock: formData.inStock,
      featured: formData.featured,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })

    // 2. Загружаем изображения
    const imageUrls: string[] = []
    for (let i = 0; i < formData.images.length; i++) {
      const file = formData.images[i]
      const fileName = `image_${i + 1}.${file.name.split('.').pop()}`
      const storageRef = ref(storage, `products/${docRef.id}/${fileName}`)

      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)
      imageUrls.push(downloadURL)
    }

    // 3. Обновляем документ с URL изображений
    await updateDoc(doc(db, 'products', docRef.id), {
      images: imageUrls,
      updatedAt: Timestamp.now()
    })

    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }
}
```

### 2. Получение всех товаров

```typescript
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

async function getAllProducts() {
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }))

    return { success: true, products }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, error: error.message }
  }
}
```

### 3. Получение товара по ID

```typescript
import { doc, getDoc } from 'firebase/firestore'

async function getProductById(id: string) {
  try {
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        success: true,
        product: {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate()
        }
      }
    } else {
      return { success: false, error: 'Product not found' }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return { success: false, error: error.message }
  }
}
```

### 4. Обновление товара

```typescript
import { doc, updateDoc } from 'firebase/firestore'

async function updateProduct(id: string, formData: Partial<ProductFormData>) {
  try {
    const docRef = doc(db, 'products', id)

    const updateData: any = {
      updatedAt: Timestamp.now()
    }

    if (formData.name) updateData.name = formData.name
    if (formData.category) updateData.category = formData.category
    if (formData.priceMin !== undefined || formData.priceMax !== undefined) {
      const currentProduct = await getDoc(docRef)
      const currentPrice = currentProduct.data()?.price || {}
      updateData.price = {
        min: formData.priceMin ?? currentPrice.min,
        max: formData.priceMax ?? currentPrice.max
      }
    }
    if (formData.description) updateData.description = formData.description
    if (formData.colors) updateData.colors = formData.colors
    if (formData.inStock !== undefined) updateData.inStock = formData.inStock
    if (formData.featured !== undefined) updateData.featured = formData.featured

    await updateDoc(docRef, updateData)
    return { success: true }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: error.message }
  }
}
```

### 5. Удаление товара

```typescript
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject, listAll } from 'firebase/storage'

async function deleteProduct(id: string) {
  try {
    // 1. Удаляем все изображения из Storage
    const storageRef = ref(storage, `products/${id}`)
    try {
      const listResult = await listAll(storageRef)
      await Promise.all(
        listResult.items.map(itemRef => deleteObject(itemRef))
      )
    } catch (storageError) {
      console.warn('Error deleting images:', storageError)
    }

    // 2. Удаляем документ из Firestore
    await deleteDoc(doc(db, 'products', id))

    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }
}
```

---

## 🖼️ Работа с изображениями

### Загрузка изображения

```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

async function uploadProductImage(productId: string, file: File, imageIndex: number) {
  try {
    const fileName = `image_${imageIndex + 1}.${file.name.split('.').pop()}`
    const storageRef = ref(storage, `products/${productId}/${fileName}`)

    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    return { success: true, url: downloadURL }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { success: false, error: error.message }
  }
}
```

### Удаление изображения

```typescript
import { ref, deleteObject } from 'firebase/storage'

async function deleteProductImage(imagePath: string) {
  try {
    const imageRef = ref(storage, imagePath)
    await deleteObject(imageRef)
    return { success: true }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { success: false, error: error.message }
  }
}
```

---

## 📊 Статистика и аналитика

### Получение статистики товаров

```typescript
async function getProductStats() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const products = querySnapshot.docs.map(doc => doc.data())

    const stats = {
      total: products.length,
      inStock: products.filter(p => p.inStock).length,
      featured: products.filter(p => p.featured).length,
      byCategory: {
        'Шкафы-купе': products.filter(p => p.category === 'Шкафы-купе').length,
        'Встроенные шкафы': products.filter(p => p.category === 'Встроенные шкафы').length,
        'Гардеробные': products.filter(p => p.category === 'Гардеробные').length,
        'Детские шкафы': products.filter(p => p.category === 'Детские шкафы').length
      },
      priceRange: {
        min: Math.min(...products.map(p => p.price.min)),
        max: Math.max(...products.map(p => p.price.max)),
        average: products.reduce((sum, p) => sum + (p.price.min + p.price.max) / 2, 0) / products.length
      }
    }

    return { success: true, stats }
  } catch (error) {
    console.error('Error getting stats:', error)
    return { success: false, error: error.message }
  }
}
```

---

## 🔒 Аутентификация админа

### Вход в систему

```typescript
import { signInWithEmailAndPassword } from 'firebase/auth'

async function adminLogin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Проверяем, есть ли права админа
    const token = await user.getIdTokenResult()
    if (!token.claims.admin) {
      throw new Error('Access denied: Admin privileges required')
    }

    return { success: true, user }
  } catch (error) {
    console.error('Error signing in:', error)
    return { success: false, error: error.message }
  }
}
```

### Проверка прав доступа

```typescript
import { onAuthStateChanged } from 'firebase/auth'

function checkAdminAccess(callback: (isAdmin: boolean) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const token = await user.getIdTokenResult()
        callback(!!token.claims.admin)
      } catch (error) {
        console.error('Error checking admin status:', error)
        callback(false)
      }
    } else {
      callback(false)
    }
  })
}
```

---

## 🎛️ Пример React хука для админки

```typescript
import { useState, useEffect } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    const result = await getAllProducts()
    if (result.success) {
      setProducts(result.products)
      setError(null)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const createProduct = async (formData: ProductFormData) => {
    const result = await createProduct(formData)
    if (result.success) {
      await fetchProducts() // Обновляем список
    }
    return result
  }

  const updateProduct = async (id: string, formData: Partial<ProductFormData>) => {
    const result = await updateProduct(id, formData)
    if (result.success) {
      await fetchProducts() // Обновляем список
    }
    return result
  }

  const deleteProduct = async (id: string) => {
    const result = await deleteProduct(id)
    if (result.success) {
      await fetchProducts() // Обновляем список
    }
    return result
  }

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  }
}
```
