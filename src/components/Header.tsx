import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, ShoppingCart, X } from "lucide-react";
import { navLinks } from "../data/products";

interface HeaderProps {
  currentView: 'shop' | 'cart';
  setCurrentView: (view: 'shop' | 'cart') => void;
  cartItemCount: number;
}

export function Header({ currentView, setCurrentView, cartItemCount }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (currentView !== 'shop') {
      setCurrentView('shop');
    }    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setCurrentView('shop')}
          className="flex items-center gap-2 font-bold text-xl cursor-pointer"
        >
          <Clock className="h-6 w-6" /> WatchCo
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className="text-sm font-medium hover:text-black/70 cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => setCurrentView(currentView === 'shop' ? 'cart' : 'shop')}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition cursor-pointer"
          >
            {currentView === 'shop' ? (
              <>
                <ShoppingCart className="h-4 w-4" /> Cart ({cartItemCount})
              </>
            ) : (
              "Back to Shop"
            )}
          </button>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setCurrentView(currentView === 'shop' ? 'cart' : 'shop')}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold"
          >
            <ShoppingCart className="h-4 w-4" /> ({cartItemCount})
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t bg-white md:hidden"
          >
            <div className="space-y-2 px-4 py-4">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href)}
                  className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentView(currentView === 'shop' ? 'cart' : 'shop');
                  setMobileOpen(false);
                }}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold bg-black text-white"
              >
                <ShoppingCart className="h-4 w-4" />
                {currentView === 'shop' ? `Cart (${cartItemCount})` : "Back to Shop"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}