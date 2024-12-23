/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "@/app/features/items/itemsSlice";
import { addItem, removeItem, updateQuantity } from "@/app/features/cart/cartSlice";

export default function ItemsList() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.items);
  const cartItems = useSelector((state) => state.cart.items); // Access cart items from the store

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems()); // Fetch items when the component loads
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading items...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const getCartItem = (itemId) =>
    cartItems.find((cartItem) => cartItem.id === itemId);

  return (
    <section>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold">Shop</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const cartItem = getCartItem(item.id);

          return (
            <div
              key={item.id}
              className="basis-1/2 max-w-sm rounded overflow-hidden shadow-lg m-6"
            >
              <img
                className="w-full"
                src={item.image}
                alt={item.name}
              />
              <div className="px-6 py-4">
                <div className="text-red-700 font-bold text-xl mb-2">
                  ${item.price.toFixed(2)}
                </div>
                <div className="font-bold text-lg mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">{item.description}</p>
              </div>
              {!cartItem ? (
                <div className="px-6 py-4">
                  <button
                    onClick={() => dispatch(addItem({id: item.id, name: item.name, price: item.price, quantity: 1}))}
                    className="mx-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    ADD TO CART
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(updateQuantity({id: item.id, quantity: cartItem.quantity - 1}))}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    -
                  </button>
                  <span className="font-bold text-lg">{cartItem.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({id: item.id, quantity: cartItem.quantity + 1}))}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="mx-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    REMOVE
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
