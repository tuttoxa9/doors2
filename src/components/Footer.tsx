'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-zinc-100 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 relative">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-white rounded-sm" />
                <div className="absolute top-0 right-0 w-1.5 h-5 bg-white rounded-sm" />
                <div className="absolute bottom-0 left-0 w-5 h-1.5 bg-white rounded-sm" />
              </div>
            </div>
            <span className="text-xl font-bold text-zinc-900 font-pusia-bold">MAESTRO</span>
          </div>

          <div className="text-center md:text-left">
            <p className="text-zinc-600 font-pusia-bold">
              © 2025 Maestro. Все права защищены.
            </p>
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-900 transition-colors duration-200 font-pusia-bold">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
