'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ShoppingCart, Plus } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import OptimizedImage from './OptimizedImage'
import type { Product } from '@/types/product'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onContactClick?: () => void
}

export default function ProductModal({ product, isOpen, onClose, onContactClick }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { addToCart } = useCart()

  if (!product) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const formatPrice = (price: { min: number; max: number }) => {
    if (price.min === price.max) {
      return `${price.min.toLocaleString()} BYN`
    }
    return `от ${price.min.toLocaleString()} до ${price.max.toLocaleString()} BYN`
  }

  const handleAddToCart = () => {
    if (!product) return

    addToCart(product, selectedColor || undefined)
    setIsAddedToCart(true)

    // Reset the animation after a short delay
    setTimeout(() => {
      setIsAddedToCart(false)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-sm sm:max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl mx-2 md:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
              {/* Левая часть - Галерея изображений */}
              <div className="lg:w-1/2 relative bg-zinc-50">
                {product.images.length > 0 ? (
                  <div className="relative h-48 sm:h-64 lg:h-full">
                    <OptimizedImage
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      fallbackClassName="h-full"
                      loading="eager"
                    />

                    {/* Кнопки навигации по изображениям */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-zinc-900" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-zinc-900" />
                        </button>
                      </>
                    )}

                    {/* Индикаторы изображений */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                        {product.images.map((image, index) => (
                          <button
                            key={`indicator-${image}`}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                              index === currentImageIndex
                                ? 'bg-white shadow-lg'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 sm:h-64 lg:h-full flex items-center justify-center bg-zinc-100">
                    <div className="text-center text-zinc-500">
                      <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
                      <p>Изображение недоступно</p>
                    </div>
                  </div>
                )}

                {/* Thumbnails - скрыты на мобильных */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 sm:p-4 hidden sm:block">
                    <div className="flex space-x-2 overflow-x-auto">
                      {product.images.map((image, index) => (
                        <button
                          key={`thumbnail-${image}`}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? 'border-white shadow-lg'
                              : 'border-white/50 hover:border-white'
                          }`}
                        >
                          <OptimizedImage
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            fallbackClassName="w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Правая часть - Информация о товаре */}
              <div className="lg:w-1/2 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-zinc-200">
                  <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                    <span className="px-2 md:px-3 py-1 bg-zinc-100 text-zinc-700 text-xs md:text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="px-2 md:px-3 py-1 bg-yellow-100 text-yellow-800 text-xs md:text-sm font-medium rounded-full hidden md:inline">
                        ⭐ Популярное
                      </span>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 hover:bg-zinc-100 rounded-full transition-colors duration-200"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-zinc-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Название и цена */}
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-zinc-900 mb-1 sm:mb-2 md:mb-3">{product.name}</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                          product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? '✓ В наличии' : '✗ Нет в наличии'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Описание */}
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 mb-1 sm:mb-2 md:mb-3">Описание</h3>
                    <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Цвета */}
                  {product.colors.length > 0 && (
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 mb-1 sm:mb-2 md:mb-3">Доступные цвета</h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border-2 transition-all duration-200 text-xs sm:text-sm md:text-base ${
                              selectedColor === color
                                ? 'border-zinc-900 bg-zinc-900 text-white'
                                : 'border-zinc-300 hover:border-zinc-500 text-zinc-700'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer - Кнопки действий */}
                <div className="p-3 sm:p-4 md:p-6 border-t border-zinc-200 bg-zinc-50">
                  <div className="flex flex-col space-y-2 sm:space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <motion.button
                      onClick={onContactClick}
                      className="flex-1 bg-zinc-900 text-white py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl font-semibold hover:bg-zinc-800 transition-colors duration-200 text-sm md:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Заказать консультацию
                    </motion.button>
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`md:flex-none px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm md:text-base flex items-center justify-center space-x-1 sm:space-x-2 ${
                        !product.inStock
                          ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                          : isAddedToCart
                            ? 'bg-green-500 text-white'
                            : 'border-2 border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:bg-zinc-100'
                      }`}
                      whileHover={product.inStock ? { scale: 1.02 } : {}}
                      whileTap={product.inStock ? { scale: 0.98 } : {}}
                    >
                      {isAddedToCart ? (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white flex items-center justify-center"
                          >
                            <span className="text-green-500 font-bold text-xs">✓</span>
                          </motion.div>
                          <span>Добавлено!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>В корзину</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-500 text-center mt-2 sm:mt-3 md:mt-4">
                    Бесплатная консультация и 3D-визуализация
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
