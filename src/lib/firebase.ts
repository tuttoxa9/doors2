import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDYw0nAtJ51i5eSi-KFjKYlV3CttdBkJPc",
  authDomain: "doors-24bf2.firebaseapp.com",
  projectId: "doors-24bf2",
  storageBucket: "doors-24bf2.firebasestorage.app",
  messagingSenderId: "885264700582",
  appId: "1:885264700582:web:4698ca161e19b41bfd9067",
  measurementId: "G-5M6BG83ZGS"
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
