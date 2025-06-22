import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDFpT1MQSqfa8SXG0fKRS_olUAheOJAEII",
  authDomain: "mebel-be602.firebaseapp.com",
  projectId: "mebel-be602",
  storageBucket: "mebel-be602.firebasestorage.app",
  messagingSenderId: "368556149445",
  appId: "1:368556149445:web:033463c32a4ee6a93c7eac",
  measurementId: "G-3H974WY264"
}

// Инициализируем Firebase
const app = initializeApp(firebaseConfig)

// Инициализируем Analytics только если поддерживается
let analytics: ReturnType<typeof getAnalytics> | null = null
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  }).catch((error) => {
    console.warn('Firebase Analytics не поддерживается:', error)
  })
}

// Экспортируем сервисы
export const db = getFirestore(app)
export const storage = getStorage(app)
export { analytics }
export default app
