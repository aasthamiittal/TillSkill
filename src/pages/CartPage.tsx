import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/Common/PageHeader'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { CTAButton } from '../components/Common/CTAButton'

export function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()
  const { isLoggedIn } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      navigate('/auth?returnUrl=/cart')
      return
    }
    showToast('Checkout coming soon.')
  }

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <PageHeader title="Your Cart" subtitle="Review your selected programs before checkout." />
        {items.length === 0 ? (
          <p>Your cart is currently empty. Browse our programs and add a course to begin.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="muted">{item.price}</p>
                  </div>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-actions">
              <CTAButton variant="outline" onClick={clearCart}>
                Clear cart
              </CTAButton>
              <CTAButton variant="primary" onClick={handleProceedToCheckout}>
                Proceed to checkout
              </CTAButton>
            </div>
          </>
        )}
        </div>
      </section>
    </div>
  )
}

