import React from "react"
import Image from "next/image"

const categories = ["Punaviinit", "Valkoviinit", "Kuohuviinit", "Viinialueet", "Viininmaistelu"]

const popularPosts = [
  {
    title: "Top 10 viiniä alle 20€",
    image: "https://images.pexels.com/photos/1479706/pexels-photo-1479706.jpeg",
  },
  {
    title: "Kuinka säilyttää viiniä oikein",
    image: "https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg",
  },
  {
    title: "Viininmaistelu 101: Aloittelijan opas",
    image: "https://images.pexels.com/photos/66636/pexels-photo-66636.jpeg",
  },
]

export function Sidebar() {
  return (
    <aside className="lg:w-1/4">
      <div className="bg-white p-6 mb-8 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Kategoriat</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <a href="#" className="text-burgundy-700 hover:text-burgundy-900">
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Suosituimmat artikkelit</h3>
        <ul className="space-y-4">
          {popularPosts.map((post, i) => (
            <li key={i} className="flex items-center space-x-4">
              <div className="relative w-16 h-16 overflow-hidden rounded">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} layout="fill" objectFit="cover" />
              </div>
              <a href="#" className="text-burgundy-700 hover:text-burgundy-900 font-medium">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

