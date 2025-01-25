import React, { useState } from "react";

const ProductCard = ({ products, incrementQuantity, decrementQuantity }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handlePreviewImage = (product) => {
    setPreviewImage({ images: product.images, name: product.name });
  };

  const closePreviewImage = () => {
    console.log(previewImage);
    setPreviewImage(null);
  };

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <div
            className={`relative max-w-[21rem] flex mb-10 rounded-lg ${
              product.quantity > 0 ? "border-2 border-red-custom" : ""
            } `}
          >
            <button
              className="bg-red-custom overflow-hidden rounded-lg"
              onClick={() => handlePreviewImage(product)}
            >
              <picture>
                <source
                  media="(min-width: 768px )"
                  srcSet={product.images.tablet}
                />
                <source
                  media="(min-width: 1024px )"
                  srcSet={product.images.desktop}
                />
                <img
                  className="min-w-full hover:opacity-40"
                  src={product.images.mobile}
                  alt={product.name}
                />
              </picture>
            </button>
            {product.quantity > 0 ? (
              <div id="btn-qty">
                <button
                  className="w-5 h-5 rounded-full hover:bg-rose-custom-50 ease-in  flex justify-center items-center text-rose-custom-50 hover:text-red-custom"
                  onClick={() => decrementQuantity(product.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="2"
                    fill="none"
                    viewBox="0 0 10 2"
                  >
                    <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
                  </svg>
                </button>
                {product.quantity}
                <button
                  className="w-5 h-5 rounded-full hover:bg-rose-custom-50 ease-in  flex justify-center items-center text-rose-custom-50 hover:text-red-custom"
                  onClick={() => incrementQuantity(product.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="none"
                    viewBox="0 0 10 10"
                  >
                    <path
                      fill="currentColor"
                      d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => incrementQuantity(product.id)}
                id="btn-cart"
              >
                Add to Cart
              </button>
            )}
          </div>

          <div>
            <div className="text-rose-custom-500 text-sm">
              {product.category}
            </div>
            <div className="text-rose-custom-900 font-bold text-md">
              {product.name}
            </div>
            <div className="text-red-custom font-semibold text-md">
              ${product.price}
            </div>
          </div>
        </div>
      ))}

      {previewImage && (
        <button
          className="bg-black/90 w-screen h-screen fixed top-0 left-0"
          onClick={() => closePreviewImage()}
        >
          <div className="w-full h-full flex justify-center items-center p-5 ">
            <picture>
              <source
                media="(min-width: 768px )"
                srcSet={previewImage.images.tablet}
              />
              <source
                media="(min-width: 1024px )"
                srcSet={previewImage.images.desktop}
              />
              <img
                src={previewImage.images.mobile}
                alt={previewImage.name}
                className="rounded-xl overflow-hidden "
              />
            </picture>
          </div>
        </button>
      )}
    </>
  );
};

export default ProductCard;
