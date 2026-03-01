import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { AboutUsPage } from './pages/AboutUsPage.tsx'
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { ProgramDetailPage } from './pages/ProgramDetailPage'
import { EnrolPage } from './pages/EnrolPage'
import { ContactPage } from './pages/ContactPage'
import { ForCorporatesPage } from './pages/ForCorporatesPage'
import { IntroSessionsPage } from './pages/IntroSessionsPage'
import { StudySupportPage } from './pages/StudySupportPage'
import { AuthPage } from './pages/AuthPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { MyCoursesPage } from './pages/MyCoursesPage'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'

export function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/who-we-are" element={<Navigate to="/about-us" replace />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/:slug" element={<ProgramDetailPage />} />
                <Route path="/enrol" element={<EnrolPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/for-corporates" element={<ForCorporatesPage />} />
                <Route path="/intro-sessions" element={<IntroSessionsPage />} />
                <Route path="/study-support" element={<StudySupportPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/register/:slug" element={<RegistrationPage />} />
                <Route path="/my-courses" element={<MyCoursesPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </CartProvider>
  )
}

