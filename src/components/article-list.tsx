import React from "react"
import Image from "next/image"

const articles = [
  {
    title: "Viinin ja ruoan yhdistämisen taito",
    description: "Opi yhdistämään suosikkiviinisi täydellisesti herkullisten ruokien kanssa.",
    image: "https://images.pexels.com/photos/5379876/pexels-photo-5379876.jpeg",
  },
  {
    title: "Italian viinialueiden tutkiminen",
    description: "Matka Italian monipuolisten viinimaisemien läpi.",
    image: "https://images.pexels.com/photos/8810040/pexels-photo-8810040.jpeg",
  },
  {
    title: "Luonnonviinien nousu",
    description: "Tutustu kasvavaan luonnollisen ja biodynaamisen viininvalmistuksen trendiin.",
    image: "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg",
  },
  {
    title: "Samppanja: Kuplien takana",
    description:
      "Tutustu maailman juhlavimman kuohuviinin rikkaaseen historiaan ja monimutkaiseen valmistusprosessiin.",
    image: "https://images.pexels.com/photos/5980651/pexels-photo-5980651.jpeg",
  },
]

export function ArticleList() {
  return (
    <section className="lg:w-3/4">
      <h2 className="text-2xl font-bold mb-8">Viimeisimmät artikkelit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, i) => (
          <article key={i} className="bg-white overflow-hidden rounded shadow-sm transition-shadow hover:shadow-md">
            <div className="relative h-64 w-full">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a href="#" className="text-burgundy-700 hover:text-burgundy-900 font-semibold">
                Lue lisää →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

