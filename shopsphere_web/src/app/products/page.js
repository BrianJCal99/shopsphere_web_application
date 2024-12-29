/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

export default function ProductList() {
  const [isClient, setIsClient] = useState(false)
  const { items } = useSelector((state) => state.items);

  useEffect(() => {
    setIsClient(true)
  }, []);

  if (!isClient){
    return null;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
