"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface SmoothRotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
  blurBackground?: boolean;
}

export default function SmoothRotatingText({
  texts,
  rotationInterval = 4500,
  className = "",
  blurBackground = true
}: SmoothRotatingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [nextTextIndex, setNextTextIndex] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Функция для измерения размера текста
  const measureText = useCallback((textIndex: number): Promise<{width: number, height: number}> => {
    return new Promise((resolve) => {
      if (measureRef.current && texts[textIndex]) {
        measureRef.current.textContent = texts[textIndex];

        requestAnimationFrame(() => {
          if (measureRef.current) {
            const rect = measureRef.current.getBoundingClientRect();
            resolve({
              width: Math.ceil(rect.width) + 48, // padding
              height: Math.ceil(rect.height) + 24 // padding
            });
          }
        });
      } else {
        resolve({ width: 0, height: 0 });
      }
    });
  }, [texts]);

  // Инициализируем размер для первого текста
  useEffect(() => {
    measureText(currentTextIndex).then(setContainerSize);
    setNextTextIndex((currentTextIndex + 1) % texts.length);
  }, [texts, currentTextIndex, measureText]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setIsTransitioning(true);

      // Сначала измеряем размер следующего текста и меняем размер контейнера
      const nextSize = await measureText(nextTextIndex);
      setContainerSize(nextSize);

      // Через небольшую задержку меняем текст
      setTimeout(() => {
        setCurrentTextIndex(nextTextIndex);
        setNextTextIndex((nextTextIndex + 1) % texts.length);
        setIsTransitioning(false);
      }, 300); // Треть времени анимации контейнера

    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval, nextTextIndex, measureText]);

  return (
    <div className="flex justify-center">
      {/* Невидимый элемент для измерения размера */}
      <span
        ref={measureRef}
        className={`invisible absolute pointer-events-none whitespace-nowrap ${className}`}
        style={{
          top: -9999,
          left: -9999,
          zIndex: -1
        }}
        aria-hidden="true"
      />

      {/* Анимированный контейнер */}
      <motion.div
        className="relative"
        animate={{
          width: containerSize.width,
          height: containerSize.height
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.8
        }}
        style={{
          overflow: "hidden"
        }}
      >
        {/* Блюр за текстом */}
        {blurBackground && (
          <motion.div
            className="absolute inset-0 backdrop-blur-md bg-black/25 rounded-xl"
            animate={{
              width: containerSize.width,
              height: containerSize.height
            }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.8
            }}
          />
        )}

        {/* Контейнер для текста */}
        <div className="relative z-10 px-6 py-3 flex items-center justify-center h-full w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              className={className}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)', scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)', scale: 0.95 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                opacity: { duration: 0.3 },
                filter: { duration: 0.4 }
              }}
            >
              {texts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
