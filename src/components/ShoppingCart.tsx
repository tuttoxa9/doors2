'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, Phone, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import OptimizedImage from './OptimizedImage'

interface OrderData {
  phone: string
  name?: string
  address?: string
  comment?: string
  items: Array<{
    product: {
      id: string
      name: string
      category: string
      price: { min: number; max: number }
    }
    selectedColor?: string
    quantity: number
    price: number
  }>
  totalItems: number
  totalPrice: number
  timestamp: string
}

interface ShoppingCartProps {
  onOrderSubmit?: (orderData: OrderData) => void
}

export default function ShoppingCart({ onOrderSubmit }: ShoppingCartProps) {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice, isCartOpen, setIsCartOpen } = useCart()
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [orderData, setOrderData] = useState({
    phone: '',
    name: '',
    address: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} BYN`
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderData.phone.trim()) return

    setIsSubmitting(true)

    try {
      const order = {
        ...orderData,
        items: items.map(item => ({
          product: item.product,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
          price: item.product.price.min
        })),
        totalItems: getTotalItems(),
        totalPrice: getTotalPrice(),
        timestamp: new Date().toISOString()
      }

      if (onOrderSubmit) {
        await onOrderSubmit(order)
      }

      // Clear cart and close modal
      clearCart()
      setShowOrderForm(false)
      setIsCartOpen(false)
      setOrderData({ phone: '', name: '', address: '', comment: '' })
    } catch (error) {
      console.error('Ошибка отправки заказа:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setOrderData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300,
              mass: 0.8
            }}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-md sm:max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.1)] border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between p-3 sm:p-6 border-b border-zinc-200/60 bg-gradient-to-r from-white to-zinc-50"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 400 }}
                  className="p-2 sm:p-3 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg sm:rounded-xl shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-zinc-900" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900">Корзина</h2>
                  <motion.p
                    key={getTotalItems()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-sm text-zinc-500"
                  >
                    {getTotalItems()} {getTotalItems() === 1 ? 'товар' : getTotalItems() < 5 ? 'товара' : 'товаров'}
                  </motion.p>
                </motion.div>
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 sm:p-2 hover:bg-zinc-100 rounded-full transition-colors duration-200 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600" />
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto max-h-64 sm:max-h-96">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 sm:p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1, damping: 15, stiffness: 400 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-sm"
                  >
                    <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-400" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-base sm:text-lg font-semibold text-zinc-900 mb-2"
                  >
                    Корзина пуста
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm sm:text-base text-zinc-500"
                  >
                    Добавьте товары из каталога
                  </motion.p>
                </motion.div>
              ) : (
                <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedColor || 'default'}`}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{
                        delay: index * 0.05,
                        type: 'spring',
                        damping: 20,
                        stiffness: 300
                      }}
                      className="flex items-center space-x-3 p-3 sm:p-4 bg-gradient-to-r from-zinc-50 to-white rounded-xl sm:rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Product Image */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.images && item.product.images.length > 0 ? (
                          <OptimizedImage
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            fallbackClassName="w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-zinc-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-zinc-900 truncate text-sm sm:text-base">{item.product.name}</h3>
                        <p className="text-xs sm:text-sm text-zinc-500">{item.product.category}</p>
                        {item.selectedColor && (
                          <p className="text-xs text-zinc-400">Цвет: {item.selectedColor}</p>
                        )}
                        <p className="text-xs sm:text-sm font-medium text-zinc-900 mt-1">
                          {formatPrice(item.product.price.min)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1 bg-white rounded-lg sm:rounded-xl p-1 shadow-sm border border-zinc-200">
                        <motion.button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 sm:p-2 hover:bg-zinc-100 rounded-md sm:rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-600" />
                        </motion.button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="w-6 sm:w-8 text-center font-semibold text-zinc-900 select-none text-sm"
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 sm:p-2 hover:bg-zinc-100 rounded-md sm:rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-600" />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 sm:p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 text-red-500"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !showOrderForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3 sm:p-6 border-t border-zinc-200/60 bg-gradient-to-r from-zinc-50 to-white"
              >
                <motion.div
                  className="flex items-center justify-between mb-3 sm:mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-base sm:text-lg font-semibold text-zinc-900">Итого:</span>
                  <motion.span
                    key={getTotalPrice()}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-lg sm:text-xl font-bold text-zinc-900"
                  >
                    {formatPrice(getTotalPrice())}
                  </motion.span>
                </motion.div>
                <motion.div
                  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => setShowOrderForm(true)}
                    className="flex-1 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:from-zinc-800 hover:to-zinc-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Оформить заказ
                  </motion.button>
                  <motion.button
                    onClick={clearCart}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-zinc-300 text-zinc-700 rounded-lg sm:rounded-xl font-semibold hover:border-zinc-500 hover:bg-zinc-50 transition-all duration-200 text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Очистить
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Order Form */}
            {showOrderForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-6 border-t border-zinc-200 bg-zinc-50"
              >
                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-3 sm:mb-4">Оформление заказа</h3>
                <form onSubmit={handleOrderSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1 sm:mb-2">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Номер телефона *
                    </label>
                    <input
                      type="tel"
                      value={orderData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+375XXXXXXXXX"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-none outline-none rounded-2xl bg-gray-200 shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] text-sm sm:text-base"
                      autoComplete="tel"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1 sm:mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={orderData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ваше имя"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-none outline-none rounded-2xl bg-gray-200 shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] text-sm sm:text-base"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1 sm:mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Адрес доставки
                    </label>
                    <input
                      type="text"
                      value={orderData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Город, улица, дом"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-none outline-none rounded-2xl bg-gray-200 shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] text-sm sm:text-base"
                      autoComplete="address-line1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1 sm:mb-2">
                      Комментарий к заказу
                    </label>
                    <textarea
                      value={orderData.comment}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      placeholder="Дополнительные пожелания..."
                      rows={2}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-none outline-none rounded-2xl bg-gray-200 shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out focus:bg-white focus:scale-105 focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff] resize-none text-sm sm:text-base"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !orderData.phone.trim()}
                      className="flex-1 bg-zinc-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Отправка...</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Отправить заказ</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-zinc-300 text-zinc-700 rounded-lg sm:rounded-xl font-semibold hover:border-zinc-500 transition-colors duration-200 text-sm sm:text-base"
                    >
                      Назад
                    </button>
                  </div>
                </form>

                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl">
                  <p className="text-xs sm:text-sm text-yellow-800">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    Мы свяжемся с вами в течение 30 минут для уточнения деталей заказа
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
