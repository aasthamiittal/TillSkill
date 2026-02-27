import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage'
import { AboutUsPage } from './pages/AboutUsPage'
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { ProgramDetailPage } from './pages/ProgramDetailPage'
import { EnrolPage } from './pages/EnrolPage'
import { ContactPage } from './pages/ContactPage'
import { IntroSessionsPage } from './pages/IntroSessionsPage'
import { StudySupportPage } from './pages/StudySupportPage'
import { AuthPage } from './pages/AuthPage'
import { CartPage } from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'

export function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
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
                <Route path="/intro-sessions" element={<IntroSessionsPage />} />
                <Route path="/study-support" element={<StudySupportPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </CartProvider>
  )
}

