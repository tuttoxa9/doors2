'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Product } from '@/types/product'

interface UseProductsResult {
  products: Product[]
  isLoading: boolean
  isError: boolean
  error: string | null
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setIsError(false)
        setError(null)

        // Создаем запрос к коллекции products, сортированный по дате создания
        const q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc')
        )

        const querySnapshot = await getDocs(q)
        const fetchedProducts: Product[] = []

        for (const doc of querySnapshot.docs) {
          const data = doc.data()

          // Преобразуем Firestore timestamps в Date объекты
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
          }

          fetchedProducts.push(product)
        }

        setProducts(fetchedProducts)
      } catch (err) {
        console.error('Ошибка при загрузке товаров:', err)
        setIsError(true)
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return {
    products,
    isLoading,
    isError,
    error,
  }
}
