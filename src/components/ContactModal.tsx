'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check, Loader2, CheckCircle, XCircle } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+375291565232',
    comment: ''
  })
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/.netlify/functions/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmissionStatus('success')
        // Закрываем форму через 2 секунды после успешной отправки
        setTimeout(() => {
          onClose()
          setSubmissionStatus('idle')
          setFormData({ name: '', phone: '+375291565232', comment: '' })
        }, 2000)
      } else {
        setSubmissionStatus('error')
        setErrorMessage(result.error || 'Произошла ошибка при отправке заявки')
        setTimeout(() => setSubmissionStatus('idle'), 3000)
      }
    } catch (error) {
      setSubmissionStatus('error')
      setErrorMessage('Не удалось отправить заявку. Проверьте подключение к интернету.')
      setTimeout(() => setSubmissionStatus('idle'), 3000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'phone') {
      // Ensure phone starts with +375 and only allow 9 digits after
      if (value.startsWith('+375')) {
        const digits = value.slice(4).replace(/\D/g, '')
        if (digits.length <= 9) {
          setFormData({
            ...formData,
            phone: `+375${digits}`
          })
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const isPhoneValid = formData.phone.length === 13 // +375 + 9 digits

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-zinc-900 font-durik">Заказать консультацию</h3>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 transition-colors text-2xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="modal-name" className="block text-sm font-medium text-zinc-700 mb-2 font-durik">
              Имя
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Ваше имя"
              required
            />
          </div>
          <div>
            <label htmlFor="modal-phone" className="block text-sm font-medium text-zinc-700 mb-2 font-durik">
              Телефон
            </label>
            <div className="relative">
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all duration-200"
                required
              />
              {isPhoneValid && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Check className="w-5 h-5 text-black" />
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="modal-comment" className="block text-sm font-medium text-zinc-700 mb-2 font-durik">
              Комментарий
            </label>
            <textarea
              id="modal-comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Расскажите о ваших пожеланиях..."
            />
          </div>
          <motion.button
            type="submit"
            disabled={submissionStatus === 'loading'}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 font-durik flex items-center justify-center space-x-2 ${
              submissionStatus === 'success'
                ? 'bg-green-600 text-white'
                : submissionStatus === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
            } ${submissionStatus === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}`}
            whileHover={submissionStatus === 'idle' ? { scale: 1.02 } : {}}
            whileTap={submissionStatus === 'idle' ? { scale: 0.98 } : {}}
          >
            {submissionStatus === 'loading' && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            {submissionStatus === 'success' && (
              <CheckCircle className="w-5 h-5" />
            )}
            {submissionStatus === 'error' && (
              <XCircle className="w-5 h-5" />
            )}
            <span>
              {submissionStatus === 'loading' && 'Отправка...'}
              {submissionStatus === 'success' && 'Отправлено!'}
              {submissionStatus === 'error' && 'Ошибка'}
              {submissionStatus === 'idle' && 'Отправить заявку'}
            </span>
          </motion.button>
          {submissionStatus === 'error' && errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm text-center"
            >
              {errorMessage}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  )
}
