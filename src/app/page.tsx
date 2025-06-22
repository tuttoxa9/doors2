'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'

// Lazy load компонентов для оптимизации
const MainSection = lazy(() => import('@/components/MainSection'))
const ShopSection = lazy(() => import('@/components/ShopSection'))

const Footer = lazy(() => import('@/components/Footer'))
const ContactModal = lazy(() => import('@/components/ContactModal'))
const ShoppingCart = lazy(() => import('@/components/ShoppingCart'))

type ActiveSection = 'main' | 'shop'

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('main')
  const [scrollY, setScrollY] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)

  const handleOrderSubmit = async (orderData: {
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
  }) => {
    try {
      const response = await fetch('/.netlify/functions/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit order')
      }

      const result = await response.json()
      console.log('Order submitted successfully:', result)

      // You can add a success toast here
      alert('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.')
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Произошла ошибка при отправке заказа. Попробуйте позже.')
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sectionVariants = {
    enter: {
      x: '100%',
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  }

  const transition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5,
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        scrollY={scrollY}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onContactClick={() => setShowContactForm(true)}
      />

      <main className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeSection === 'main' ? (
            <motion.div
              key="main"
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <Suspense fallback={<div>Загрузка...</div>}>
                <MainSection
                  showContactForm={showContactForm}
                  setShowContactForm={setShowContactForm}
                />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="shop"
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <Suspense fallback={<div>Загрузка...</div>}>
                <ShopSection onContactClick={() => setShowContactForm(true)} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </main>



      <Suspense fallback={<div>Загрузка...</div>}>
        <Footer />
      </Suspense>

      {/* Global Contact Modal */}
      <Suspense fallback={null}>
        <ContactModal
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
        />
      </Suspense>

      {/* Shopping Cart */}
      <Suspense fallback={null}>
        <ShoppingCart onOrderSubmit={handleOrderSubmit} />
      </Suspense>
    </div>
  )
}
