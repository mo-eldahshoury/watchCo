import React from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

interface CartPageProps {
  onBackToShop: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onBackToShop }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg my-12 text-gray-900">
      {/* زر Back to shop */}
      <button
        onClick={onBackToShop}
        className="flex items-center text-gray-600 hover:text-black mb-6 font-semibold transition"
      >
        ← Back to Shop
      </button>

      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <button
            onClick={onBackToShop}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {/* قائمة المنتجات */}
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* التحكم في الكمية */}
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* السعر الإجمالي للمنتج الواحد */}
                  <span className="font-bold w-24 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  {/* زر الحذف */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* الإجمالي والأزرار */}
          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">
              Total Price: <span className="text-green-600">{formatPrice(totalPrice)}</span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={clearCart}
                className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Clear Cart
              </button>
              
              {/* زر Checklist / Checkout */}
              <button
                onClick={() => alert('Proceeding to Checklist / Checkout successfully!')}
                className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                Checklist / Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};