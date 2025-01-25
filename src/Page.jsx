import React, { useState, useEffect } from "react";
import { productsData } from "./products";
import ProductCard from "./components/ProductCard";
import ProductCart from "./components/ProductCart";

const Page = () => {
  const [products, setProducts] = useState([]);

  const incrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: 0 } : product
      )
    );
  };

  const startNewOrder = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, quantity: 0 }))
    );
  };

  useEffect(() => {
    const loadProductsAndImage = async () => {
      try {
        const productsWithImages = await Promise.all(
          productsData.map(async (product) => {
            const images = await product.images;
            return { ...product, images, quantity: 0 };
          })
        );
        setProducts(productsWithImages);
      } catch {
        console.log("Error fetching products");
      }
    };

    loadProductsAndImage();
  }, []);

  return (
    <div className="max-w-screen min-h-screen font-primary bg-rose-custom-100  p-8 lg:p-12 xl:p-20 grid justify-center gap-8 lg:grid-cols-3 relative">
      <div className="gap-8 grid justify-center lg:col-span-2">
        <h1 className="text-4xl font-bold text-rose-custom-900">Desserts</h1>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            products={products}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </div>
      </div>
      <div className="lg:col-span-1">
        <ProductCart
          products={products}
          removeProduct={removeProduct}
          startNewOrder={startNewOrder}
        />
      </div>
    </div>
  );
};

export default Page;
