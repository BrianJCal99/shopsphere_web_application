/* eslint-disable @next/next/no-img-element */
'use client'

import React, {useEffect, useState} from "react";
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { addItem, removeItem, updateQuantity } from "@/app/features/cart/cartSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ItemPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  // Access items from the Redux store
  const items = useSelector((state) => state.items.items);

  // Find the item matching the dynamic `id`
  const item = items.find((item) => item.id.toString() === id);

  const [selectedColor, setSelectedColor] = useState(item?.colors?.length > 0 ? item?.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(item?.sizes?.length > 0 ? item?.sizes[0] : null);

  // Check if the item is in the cart and update UI accordingly
  const cartItem = useSelector((state) =>
    state.cart.items.find((cartItem) => cartItem.id.toString() === id.toString())
  );

  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient){
    return null;
  }

  // Handle case when the item is not found
  if (!item) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
          Product not found.
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="p-[80px]">

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={item.images[0].alt}
            src={item.images[0].src}
            className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={item.images[1].alt}
              src={item.images[1].src}
              className="aspect-[3/2] w-full rounded-lg object-cover"
            />
            <img
              alt={item.images[2].alt}
              src={item.images[2].src}
              className="aspect-[3/2] w-full rounded-lg object-cover"
            />
          </div>
          <img
            alt={item.images[3].alt}
            src={item.images[3].src}
            className="hidden size-full rounded-lg object-cover lg:block"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{item.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${item.price}</p>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center gap-x-3">
                    {item.colors.map((color) => (
                      <Radio
                        key={color.color}
                        value={color}
                        aria-label={color.color}
                        disabled={!color.inStock}
                        className={classNames(
                          color.inStock
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed',
                            'ring-indigo-600 relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1'
                        )}
                      >
                        {color.inStock ? (
                          <span
                          aria-hidden="true"
                          style={{ backgroundColor: color.hex }}
                          className="pointer-events-none size-8 rounded-full border border-black/10"
                        />
                        ):(
                          <span
                          aria-hidden="true"
                          style={{ backgroundColor: color.hex }}
                          className="pointer-events-none size-8 rounded-full border border-black/10"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 size-full stroke-2 text-gray-200"
                            >
                              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {item.sizes.map((size) => (
                      <Radio
                        key={size.size}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                        )}
                      >
                        <span>{size.size}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 size-full stroke-2 text-gray-200"
                            >
                              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
              
              {!cartItem ? (
                <button
                type="button"
                onClick={() => dispatch(addItem({id: item.id, name: item.name, price: item.price, quantity: 1, image: item.images[0], color: selectedColor.color, size: selectedSize.size}))}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
              ):(
                <button
                type="button"
                onClick={() => dispatch(removeItem(item.id))}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Remove
              </button>
              )}
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{item.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
