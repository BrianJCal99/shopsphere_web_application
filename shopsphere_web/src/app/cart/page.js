'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity, clearCart } from "@/app/features/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="p-4">
              <h2 className="text-lg font-bold">Your Cart</h2>
              {items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <ul>
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between items-center my-2">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))}
                          className="mx-2 w-16 border"
                        />
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <button onClick={() => dispatch(clearCart())} className="bg-red-500 text-white px-4 py-2 mt-2">
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}

export default CartPage