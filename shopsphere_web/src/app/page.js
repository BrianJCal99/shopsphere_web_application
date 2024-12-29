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

export default function Example() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl">Shop with us</h2>
          <p className="mt-8 text-pretty text-lg font-medium sm:text-xl/8">
            Discover a world of fashion at your fingertips with our carefully curated collection of stylish, high-quality clothing, offering timeless elegance and on-trend designs to suit every occasion and personality.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base/7">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
