import { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import {
  PopularSection,
  BestSellersSection,
  RecentSection,
} from "./components/Collections";
import { Features } from "./components/Features";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { CartPage } from "./components/CartPage";

function MainContent() {
  const [currentView, setCurrentView] = useState<'shop' | 'cart'>('shop');
  const { cart } = useCart();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 text-gray-900 flex flex-col justify-between">
      <div>
        <Header
          currentView={currentView}
          setCurrentView={setCurrentView}
          cartItemCount={totalCartCount}
        />

        {currentView === 'shop' ? (
          <main>
            <Hero />
            <div id="popular"><PopularSection /></div>
            <div id="bestsellers"><BestSellersSection /></div>
            <div id="recent"><RecentSection /></div>
            <div id="features"><Features /></div>
            <div id="newsletter"><Newsletter /></div>
          </main>
        ) : (
          <CartPage onBackToShop={() => setCurrentView('shop')} />
        )}
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}