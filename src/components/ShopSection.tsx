'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye, Filter, RotateCcw, ChevronDown } from 'lucide-react'
import { useState, useMemo } from 'react'
import ProductModal from './ProductModal'
import OptimizedImage from './OptimizedImage'
import { useProducts } from '@/hooks/useProducts'
import type { Product } from '@/types/product'

interface ShopSectionProps {
  onContactClick?: () => void
}

export default function ShopSection({ onContactClick }: ShopSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 10000 })
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'default'>('default')
  const { products, isLoading, isError, error } = useProducts()

  // Calculate actual price range from products
  const actualPriceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 10000 }

    const allPrices = products.flatMap(p => [p.price.min, p.price.max])
    return {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices)
    }
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const productMinPrice = product.price.min
      const productMaxPrice = product.price.max

      // Check if product price range overlaps with filter range
      return productMaxPrice >= priceFilter.min && productMinPrice <= priceFilter.max
    })

    // Sort products based on sortBy value
    if (sortBy === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price.min - b.price.min)
    } else if (sortBy === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price.min - a.price.min)
    }

    return filtered
  }, [products, priceFilter, sortBy])

  const resetFilters = () => {
    setPriceFilter({ min: actualPriceRange.min, max: actualPriceRange.max })
    setSortBy('default')
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const formatPrice = (price: { min: number; max: number }) => {
    if (price.min === price.max) {
      return `${price.min.toLocaleString()} BYN`
    }
    return `от ${price.min.toLocaleString()} BYN`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/showroom.webp"
            alt="Showroom MAESTRO"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Gradient overlay for smooth transition to zinc-50 */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-50 via-zinc-50/95 via-zinc-50/80 via-zinc-50/60 via-zinc-50/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block backdrop-blur-sm bg-white/20 rounded-2xl px-6 py-4 md:px-8 md:py-6 border border-white/30 shadow-2xl">
            <h1
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight drop-shadow-lg"
            >
              Наши проекты
            </h1>
            <p
              className="text-xl text-white/90 drop-shadow-md"
            >
              Каждый шкаф — это история успеха, воплощенная в дереве и стекле
            </p>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="pt-8 pb-20 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-zinc-900">
              Каталог
            </h2>

            {/* Compact Filter and Sort Controls */}
            {!isLoading && !isError && products.length > 0 && (
              <div className="flex items-center space-x-3">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'default')}
                    className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-zinc-700 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent cursor-pointer"
                  >
                    <option value="default">По умолчанию</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm transition-all duration-200 border ${
                    showFilters
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Фильтры</span>
                </button>
              </div>
            )}
          </div>

          {/* Compact and Beautiful Price Filter */}
          {showFilters && !isLoading && !isError && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-white to-zinc-50 rounded-xl p-5 shadow-md border border-zinc-200/60 mb-6 backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Price Range Section */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-sm font-semibold text-zinc-800">Цена</h3>
                    <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">
                      {actualPriceRange.min.toLocaleString()} - {actualPriceRange.max.toLocaleString()} BYN
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={priceFilter.min}
                        onChange={(e) => setPriceFilter(prev => ({ ...prev, min: Math.max(0, Number(e.target.value)) }))}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                        placeholder="От"
                      />
                    </div>
                    <span className="text-zinc-400 text-sm">—</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={priceFilter.max}
                        onChange={(e) => setPriceFilter(prev => ({ ...prev, max: Math.max(priceFilter.min, Number(e.target.value)) }))}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                        placeholder="До"
                      />
                    </div>
                  </div>
                </div>

                {/* Results and Reset Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:border-l sm:border-zinc-200 sm:pl-5">
                  <div className="text-center sm:text-left">
                    <div className="text-sm font-medium text-zinc-900">
                      {filteredProducts.length} товар{filteredProducts.length === 1 ? '' : filteredProducts.length < 5 ? 'а' : 'ов'}
                    </div>
                    <div className="text-xs text-zinc-500">найдено</div>
                  </div>

                  <button
                    onClick={resetFilters}
                    className="flex items-center justify-center space-x-1 px-3 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-lg transition-all duration-200 border border-zinc-200 hover:border-zinc-300"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Сбросить</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900" />
              <p className="mt-4 text-zinc-600">Загружаем товары...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-20 bg-red-50 rounded-2xl">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">Ошибка загрузки</h3>
                <p className="text-red-600 mb-2">Не удалось загрузить товары из базы данных.</p>
                {error && <p className="text-sm text-red-500 mb-6">{error}</p>}
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Попробовать снова
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && products.length === 0 && (
            <div className="text-center py-20 bg-zinc-50 rounded-2xl">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">Каталог товаров пуст</h3>
                <p className="text-zinc-600 mb-2">В данный момент наш каталог пополняется новыми товарами.</p>
                <p className="text-sm text-zinc-500 mb-6">Для добавления товаров используйте админ-панель</p>
                <button
                  onClick={onContactClick}
                  className="bg-zinc-900 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors duration-200"
                >
                  Связаться с нами
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !isError && products.length > 0 && (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">Товары не найдены</h3>
                  <p className="text-zinc-600 mb-4">Попробуйте изменить параметры фильтрации</p>
                  <button
                    onClick={resetFilters}
                    className="text-zinc-900 font-medium hover:text-zinc-700 transition-colors duration-200"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <OptimizedImage
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                            fallbackClassName="w-full aspect-square group-hover:bg-zinc-200 transition-colors duration-300"
                          />
                        ) : (
                          <div className="w-full aspect-square bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors duration-300">
                            <div className="text-center text-zinc-400">
                              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-sm">Изображение<br />не загружено</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-3">
                            <button className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors duration-200">
                              <Eye className="w-5 h-5 text-zinc-900" />
                            </button>
                          </div>
                        </div>
                        {product.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                              ⭐ Популярное
                            </span>
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Нет в наличии
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-500 font-medium">{product.category}</span>
                          <span className="text-lg font-bold text-zinc-900">{formatPrice(product.price)}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 mb-2">{product.name}</h3>
                        <p className="text-zinc-600 mb-4">{product.description}</p>

                        {product.colors.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {product.colors.slice(0, 3).map((color) => (
                              <span key={color} className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded">
                                {color}
                              </span>
                            ))}
                            {product.colors.length > 3 && (
                              <span className="text-xs text-zinc-500">+{product.colors.length - 3}</span>
                            )}
                          </div>
                        )}

                        <button className="flex items-center space-x-2 text-zinc-900 font-medium hover:text-zinc-700 transition-colors duration-200">
                          <span>Подробнее</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
        onContactClick={onContactClick}
      />

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="text-4xl font-bold mb-6"
          >
            Готовы создать шкаф мечты?
          </h2>
          <p
            className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto"
          >
            Свяжитесь с нами для бесплатной консультации и 3D-визуализации вашего будущего шкафа
          </p>
          <motion.button
            onClick={onContactClick}
            className="bg-white text-zinc-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-zinc-100 transition-colors duration-200 inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Получить консультацию</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>
    </div>
  )
}
