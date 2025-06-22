'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface VideoBackgroundProps {
  className?: string
}

// Массив видео файлов
const videos = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video3.mp4'
]

export default function VideoBackground({ className = '' }: VideoBackgroundProps) {
  // Индекс текущего видео
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Ссылки на видео элементы для контроля воспроизведения
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Функция для контроля воспроизведения видео
  const controlVideoPlayback = useCallback((activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          // Запускаем активное видео с начала немедленно
          video.currentTime = 0
          video.play().catch(() => {
            // Игнорируем ошибки автовоспроизведения
          })
        } else {
          // Останавливаем неактивные видео с задержкой 1 секунда
          // чтобы сначала завершилась анимация opacity
          setTimeout(() => {
            video.pause()
          }, 1000)
        }
      }
    })
  }, [])

  // Эффект для смены видео каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 5000) // 5 секунд

    return () => clearInterval(interval)
  }, [])

  // Эффект для контроля воспроизведения при смене активного видео
  useEffect(() => {
    controlVideoPlayback(currentVideoIndex)
  }, [currentVideoIndex, controlVideoPlayback])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {videos.map((video, index) => (
        <video
          key={video}
          ref={(el) => {
            videoRefs.current[index] = el
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          playsInline
          src={video}
        />
      ))}
    </div>
  )
}
