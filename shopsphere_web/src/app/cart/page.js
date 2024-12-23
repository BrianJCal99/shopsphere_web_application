'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity, clearCart } from "@/app/features/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div className="relative overflow-x-auto">
              <h2 className="my-4 text-lg font-bold">Your Cart<span className="mx-2 text-gray-600">({totalQuantity} Items)</span></h2>
              {items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <section>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Unit Price</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                          <td className="px-6 py-4">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-6 py-4">
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
                          </td>
                          <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="my-4">
                    <h3 className="my-4">Total: ${totalPrice.toFixed(2)}</h3>
                    <button onClick={() => dispatch(clearCart())} className="bg-red-500 text-white px-4 py-2 my-2">
                      Clear Cart
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}

export default CartPage