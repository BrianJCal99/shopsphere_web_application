import React from 'react'
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                  <Link href="/" className="flex items-center">
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShopSphere</span>
                  </Link>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <a href="#" className="hover:underline">Next React</a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">Tailwind</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <a href="#" className="hover:underline ">Github</a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">Discord</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <a href="#" className="hover:underline">Privacy Policy</a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">ShopSphere</Link>. All Rights Reserved.
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <Facebook />
                      <span className="sr-only">Facebook page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <Instagram />
                      <span className="sr-only">Instagram community</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <Twitter />
                      <span className="sr-only">Twitter page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <Linkedin />
                      <span className="sr-only">Linkedin page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <Youtube />
                      <span className="sr-only">Youtube page</span>
                  </a>
              </div>
          </div>
        </div>
    </footer>
  )
}

export default AppFooter