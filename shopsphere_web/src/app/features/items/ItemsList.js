/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "@/app/features/items/itemsSlice";
import { addItem } from "@/app/features/cart/cartSlice";

export default function ItemsList() {
  const dispatch = useDispatch();

  const { items, totalQuantity, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems()); // Fetch items when the component loads
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading items...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const handleAddToCart = (item, quantity) => {
    dispatch(addItem({ 
      id: item.id, 
      name: item.name, 
      price: item.price,
      quantity: quantity 
    }));
  };

  return (
    <section>
        <div className="flex justify-center">
            <h1 className="text-xl font-bold">Shop</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
        <div key={item.id} className="basis-1/2 max-w-sm rounded overflow-hidden shadow-lg m-6">
            <img
                className="w-full" 
                src={item.image} 
                alt={item.name}
            />        
            <div className="px-6 py-4">
                <div className="text-red-700 font-bold text-xl mb-2">${item.price}</div>
                <div className="font-bold text-lg mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">{item.description}</p>
            </div>
            <div className="px-6 py-4">
              <button 
              onClick={() => handleAddToCart(item, 1)}
              className="mx-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  ADD TO CART
              </button>
            </div>
            <div className="px-6 py-4">
              <button 
              onClick={() => handleAddToCart(item, -1)}
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  -
              </button>
              <button 
              onClick={() => handleAddToCart(item, 1)}
              className="mx-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  REMOVE
              </button>
              <button 
              onClick={() => handleAddToCart(item, 1)}
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                  +
              </button>
            </div>
        </div>
        ))}
        </div>
    </section>
  );
}
