/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

const links = [
  { name: "Men's Collection", href: '/products/men' },
  { name: "Women's Collection", href: '/products/women' },
  { name: "Kid's Collection", href: '/products/kids' },
  { name: 'New Arrivals', href: '/products/new_arrivals' },
  { name: 'Seasonal Collections', href: '/products/seasonal_collections' },
]
const stats = [
  { name: 'Shops worldwide', value: '100' },
  { name: 'Customers', value: '1M+' },
  { name: 'Clothing & Accessories', value: '100k+' },
  { name: 'Orders', value: '1B+' },
  { name: 'Years', value: '25+' },
]

const callouts = [
  {
    name: "Men's Collection",
    description: "A great collection of men clothing",
    imageSrc: '/mens_fashion.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '/products/men',
  },
  {
    name: "Women's Collection",
    description: "A great collection of women clothing",
    imageSrc: '/womens_fashion.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '/products/women',
  },
  {
    name: "Kid's Collection",
    description: "A great collection of kids clothing",
    imageSrc: '/kids_fashion.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '/products/kids',
  },
  {
    name: "New Arrivals",
    description: "Latest fashion trends",
    imageSrc: '/new_arrivals.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '/products/new_arrivals',
  },
  {
    name: "Seasonal Collections",
    description: 'Find your winter clothing',
    imageSrc: '/seasonal_collection.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '/products/seasonal_collections',
  },
  {
    name: "Our Brands",
    description: 'Browse our partner brands',
    imageSrc: '/brands.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '/brands',
  },
]

export default function Example() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl pt-6 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl">Shop With Us</h2>
          <p className="mt-8 text-pretty text-lg font-medium sm:text-xl/8">
            Discover a world of fashion at your fingertips with our carefully curated collection of stylish, high-quality clothing, offering timeless elegance and on-trend designs to suit every occasion and personality.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Our Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 lg:space-y-0">
            {callouts.map((callout) => (
              <Link key={callout.name} href={callout.href}>
              <div className="group">
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full rounded-lg bg-white object-cover max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  
                    {callout.name}
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-5 place-items-center">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-center">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-center">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
