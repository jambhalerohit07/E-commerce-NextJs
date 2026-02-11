'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import Link from 'next/link';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.emptyCart}>
            <h1 style={styles.title}>Your Cart is Empty</h1>
            <p style={styles.emptyText}>
              Add some products to your cart to see them here.
            </p>
            <Link href="/products" style={styles.shopButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Shopping Cart</h1>
          <button onClick={handleClearCart} style={styles.clearButton}>
            Clear Cart
          </button>
        </div>

        <div style={styles.cartLayout}>
          <div style={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.product.id} style={styles.cartItem}>
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  style={styles.itemImage}
                />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemTitle}>{item.product.title}</h3>
                  <p style={styles.itemCategory}>{item.product.category}</p>
                  <p style={styles.itemPrice}>
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div style={styles.itemActions}>
                  <div style={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity - 1)
                      }
                      style={styles.quantityButton}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.quantity + 1)
                      }
                      style={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <p style={styles.itemTotal}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Items ({totalItems})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div style={styles.summaryDivider}></div>
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button style={styles.checkoutButton}>
              Proceed to Checkout
            </button>
            <Link href="/products" style={styles.continueLink}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  clearButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  emptyCart: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
  },
  emptyText: {
    color: '#6b7280',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  shopButton: {
    display: 'inline-block',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    fontWeight: '500',
    textDecoration: 'none',
  },
  cartLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '2rem',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  cartItem: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover' as const,
    borderRadius: '0.375rem',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  itemCategory: {
    fontSize: '0.875rem',
    color: '#6b7280',
    textTransform: 'capitalize' as const,
    marginBottom: '0.5rem',
  },
  itemPrice: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#111827',
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '0.75rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
  },
  quantityButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  quantity: {
    minWidth: '2rem',
    textAlign: 'center' as const,
    fontWeight: '500',
  },
  itemTotal: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    textDecoration: 'underline',
  },
  summary: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    height: 'fit-content',
  },
  summaryTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    color: '#6b7280',
  },
  summaryDivider: {
    borderTop: '1px solid #e5e7eb',
    margin: '1rem 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '1rem',
  },
  continueLink: {
    display: 'block',
    textAlign: 'center' as const,
    color: '#3b82f6',
    fontSize: '0.875rem',
    textDecoration: 'none',
  },
};
