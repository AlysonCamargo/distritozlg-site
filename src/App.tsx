import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SEOProvider } from "@/components/SEOProvider";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import { ThemeProvider } from "@/components/ThemeProvider";

const queryClient = new QueryClient();

export const App = () => (
  <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 left-0 bg-white text-black p-2 z-50">
      Skip to main content
    </a>
    <div id="main-content">
      <ThemeProvider defaultTheme="light" storageKey="distritozlg-theme">
        <QueryClientProvider client={queryClient}>
          <SEOProvider>
            <CartProvider>
            <WishlistProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <CartDrawer />
                <WishlistDrawer />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/product/:id" element={<Index />} />
                    <Route path="/produto/:id" element={<Index />} />
                    <Route path="/politica-de-privacidade" element={<Privacy />} />
                    <Route path="/termos-de-uso" element={<Terms />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </WishlistProvider>
          </CartProvider>
        </SEOProvider>
        </QueryClientProvider>
      </ThemeProvider>
      <Analytics />
    </div>
  </>
);

export default App;
