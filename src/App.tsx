import { useCallback, useEffect, useState } from "react";

import Categories from "./components/sections/Categories";
import Header from "./components/layout/Header";
import HomeHero from "./components/sections/HomeHero";
import Showcase from "./components/sections/Showcase";
import Partners from "./components/sections/Partners";
import BrowseBrands from "./components/sections/BrowseBrands";
import Newsletter from "./components/sections/Newsletter";
import Footer from "./components/layout/Footer";
import { clearProductsCache, getFallbackProducts, getProducts } from "./services/products";
import type { Product } from "./types/products";

type ProductsStatus = "loading" | "ready" | "fallback";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<ProductsStatus>("loading");

  const loadProducts = useCallback((fresh = false) => {
    if (fresh) clearProductsCache();

    setStatus("loading");

    getProducts()
      .then((items) => {
        setProducts(items);
        setStatus("ready");
      })
      .catch(() => {
        setProducts(getFallbackProducts());
        setStatus("fallback");
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <Categories />
        <Showcase primary products={products} status={status} onRetry={() => loadProducts(true)} />
        <Partners />
        <Showcase secondary headingId="showcase-all" products={products} status={status} />
        <Partners />
        <BrowseBrands />
        <Showcase secondary headingId="showcase-after-brands" products={products} status={status} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default App;
