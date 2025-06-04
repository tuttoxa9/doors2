"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface SmoothRotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
  blurBackground?: boolean;
}

export default function SmoothRotatingText({
  texts,
  rotationInterval = 3000,
  className = "",
  blurBackground = true
}: SmoothRotatingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const measureRef = useRef<HTMLSpanElement>(null);

  // Измеряем размер следующего текста заранее
  useEffect(() => {
    if (measureRef.current) {
      measureRef.current.textContent = texts[currentTextIndex];
      const rect = measureRef.current.getBoundingClientRect();
      setContainerSize({
        width: Math.ceil(rect.width) + 48, // padding
        height: Math.ceil(rect.height) + 24 // padding
      });
    }
  }, [currentTextIndex, texts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

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
          type: "spring",
          damping: 18,
          stiffness: 150,
          duration: 1.6
        }}
        style={{
          minWidth: containerSize.width,
          minHeight: containerSize.height
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
              type: "spring",
              damping: 18,
              stiffness: 150,
              duration: 1.6
            }}
          />
        )}

        {/* Контейнер для текста */}
        <div className="relative z-10 px-6 py-3 flex items-center justify-center h-full w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              className={className}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              {texts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
