import React, { useState, useEffect } from "react";
import emptyCartImg from "../assets/illustration-empty-cart.svg";

const ProductCart = ({ products, removeProduct, startNewOrder }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPerProduct, setTotalPerProduct] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const totalQuantity = products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    const getTotalPerProduct = products.map((product) =>
      (product.quantity * Number(product.price)).toFixed(2)
    );

    setCartQuantity(totalQuantity);
    setTotalPerProduct(getTotalPerProduct);
  }, [products]);

  const hasProducts =
    totalPerProduct.length > 0 && totalPerProduct.some((total) => total > 0);

  const totalPrice = totalPerProduct.reduce(
    (acc, total) => acc + Number(total),
    0
  );

  return (
    <>
      <div className=" bg-rose-custom-50 rounded-lg p-6 max-h-fit ">
        <h1 className="text-2xl font-semibold text-red-custom">
          Your Cart ({cartQuantity})
        </h1>

        {hasProducts ? (
          <>
            {totalPerProduct.map(
              (total, index) =>
                total > 0 && (
                  <>
                    <div
                      key={products[index].id}
                      className="flex justify-between items-center border-b-2 py-5 border-rose-custom-500/10 bg-blend-saturation"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-rose-custom-900">
                          {products[index].name}
                        </div>
                        <div className="flex gap-4 font-semibold text-sm">
                          <div className="text-red-custom ">
                            {products[index].quantity}x
                          </div>
                          <div className="text-rose-custom-500/95 font-normal">
                            @ ${products[index].price}
                          </div>
                          <div className="text-rose-custom-500">${total}</div>
                        </div>
                      </div>
                      <button
                        className="border-2 rounded-full p-0.5 border-rose-custom-300 text-rose-custom-300 hover:border-rose-custom-900 hover:text-rose-custom-900"
                        onClick={() => removeProduct(products[index].id)}
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
                            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )
            )}

            <div className="flex justify-between items-center py-5 ">
              <div className="text-sm font-semibold text-rose-custom-900/85">
                Order Total
              </div>
              <div className="text-3xl font-bold text-rose-custom-900">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
            <div className="flex py-4 px-5 bg-rose-custom-100 rounded-md gap-2">
              <img src="icons/icon-carbon-neutral.svg" alt="" />
              <div className="text-rose-custom-900 text-sm h-fit">
                This is<span className="font-semibold"> carbon-neutral </span>
                delivery
              </div>
            </div>
            <button onClick={() => setOrderConfirmed(true)} id="btn-primary">
              Confirm Order
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center my-5">
            <img
              src={emptyCartImg}
              alt="Illustration Empty Cart"
              className="max-w-36"
            />
            <p className="mt-5 font-semibold text-sm text-rose-custom-500">
              Your added items will appear here
            </p>
          </div>
        )}
      </div>

      {/* order confirmed container */}
      {orderConfirmed && (
        <div className="h-screen w-screen fixed bottom-0 left-0 bg-black/50 z-[999] flex flex-col justify-end items-center md:justify-center">
          <div className="bg-rose-custom-50 p-5 rounded-t-xl md:rounded-xl w-full md:max-w-lg">
            <div className="w-full flex flex-col gap-5 py-5">
              <div className="max-w-10">
                <img
                  src="icons/icon-order-confirmed.svg"
                  alt="Icon Order Confirmed"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <h1 className="text-4xl font-bold mr-10 text-rose-custom-900">
                  Order Confirmed
                </h1>
                <p className="text-rose-custom-500 text-sm">
                  We Hope you enjoy your food!
                </p>
              </div>
            </div>
            <div className="bg-rose-custom-100 rounded-t-lg px-5 w-full overflow-y-auto max-h-72">
              {totalPerProduct.map((product, index) => (
                <>
                  {product > 0 && (
                    <div className="flex justify-between items-center">
                      <div
                        key={products[index].id}
                        className="flex border-b-2 py-5 border-rose-custom-500/10"
                      >
                        <div className="rounded-lg overflow-hidden max-w-14 mr-5">
                          <img
                            src={products[index].images.thumbnail}
                            alt={products[index].name}
                          />
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="font-semibold text-rose-custom-900 whitespace-nowrap max-w-36 md:max-w-40 overflow-ellipsis overflow-hidden">
                            {products[index].name}
                          </div>
                          <div className="flex">
                            <div className="mr-3 text-red-custom font-bold">
                              {products[index].quantity}x
                            </div>
                            <div className="text-rose-custom-500 font-semibold">
                              @ ${products[index].price}x
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-rose-custom-900">
                        ${product}
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
            <div className="flex w-full justify-between items-center py-6 px-5 bg-rose-custom-100 rounded-b-lg">
              <div className="text-sm font-semibold text-rose-custom-500">
                Order Total
              </div>
              <div className="text-2xl font-bold text-rose-custom-900">
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <button
              onClick={() => {
                setOrderConfirmed(false);
                startNewOrder();
              }}
              id="btn-primary"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCart;
