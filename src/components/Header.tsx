'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'

type ActiveSection = 'main' | 'shop'

interface HeaderProps {
  scrollY: number
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
  onContactClick?: () => void
}

export default function Header({ scrollY, activeSection, setActiveSection, onContactClick }: HeaderProps) {
  const isScrolled = scrollY > 50
  const { getTotalItems, setIsCartOpen } = useCart()

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "glass-effect rounded-b-2xl rounded-t-2xl mx-6 mt-4 shadow-xl"
          : "bg-white/50 backdrop-blur-xl border border-white/30"
      )}
      animate={{
        y: isScrolled ? 0 : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 relative">
                <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-sm" />
                <div className="absolute top-0 right-0 w-2 h-6 bg-white rounded-sm" />
                <div className="absolute bottom-0 left-0 w-6 h-2 bg-white rounded-sm" />
              </div>
            </div>
            <span className="text-2xl font-bold text-zinc-900 tracking-wide font-pusia-bold">
              MAESTRO
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveSection('main')}
              className={cn(
                "px-6 py-2 rounded-full text-lg font-medium transition-all duration-200 border-2",
                activeSection === 'main'
                  ? "text-zinc-900 font-semibold bg-white border-white shadow-lg"
                  : "bg-zinc-900 text-white hover:bg-zinc-800 border-transparent"
              )}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('shop')}
              className={cn(
                "px-6 py-2 rounded-full text-lg font-medium transition-all duration-200 border-2",
                activeSection === 'shop'
                  ? "text-zinc-900 font-semibold bg-white border-white shadow-lg"
                  : "bg-zinc-900 text-white hover:bg-zinc-800 border-transparent"
              )}
            >
              Каталог
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Shopping Cart */}
            <AnimatePresence>
              {getTotalItems() > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-white text-zinc-900 p-3 rounded-full hover:bg-zinc-100 transition-colors duration-200 shadow-lg border border-zinc-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium"
                  >
                    {getTotalItems()}
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Contact Button */}
            <motion.button
              onClick={onContactClick}
              className="bg-zinc-900 text-white px-6 py-2 rounded-full font-medium hover:bg-zinc-800 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Связаться
            </motion.button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Shopping Cart */}
            <AnimatePresence>
              {getTotalItems() > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsCartOpen(true)}
                  className="relative bg-white text-zinc-900 p-2 rounded-full hover:bg-zinc-100 transition-colors duration-200 shadow-lg border border-zinc-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  >
                    {getTotalItems()}
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Mobile Navigation Button */}
            <button
              className={cn(
                "px-4 py-2 rounded-full font-medium transition-all duration-200 border-2",
                activeSection === 'main'
                  ? 'bg-white text-zinc-900 border-white shadow-lg font-semibold'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 border-transparent'
              )}
              onClick={() => setActiveSection(activeSection === 'main' ? 'shop' : 'main')}
            >
              {activeSection === 'main' ? 'Каталог' : 'Главная'}
            </button>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}
