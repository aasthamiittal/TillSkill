import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage'
import { WhoWeArePage } from './pages/WhoWeArePage'
import { ProgramsPage } from './pages/ProgramsPage'
import { EnrolPage } from './pages/EnrolPage'
import { ContactPage } from './pages/ContactPage'
import { IntroSessionsPage } from './pages/IntroSessionsPage'
import { StudySupportPage } from './pages/StudySupportPage'
import { AuthPage } from './pages/AuthPage'
import { CartPage } from './pages/CartPage'
import { CartProvider } from './context/CartContext'

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/who-we-are" element={<WhoWeArePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/enrol" element={<EnrolPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/intro-sessions" element={<IntroSessionsPage />} />
            <Route path="/study-support" element={<StudySupportPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  )
}

