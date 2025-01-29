import React from "react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-[70vh] w-full mb-12">
      <Image
        src="https://images.pexels.com/photos/442116/pexels-photo-442116.jpeg"
        alt="Kaunis viinitarha riveineen"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 max-w-3xl">Napa Valleyn piilotettuja helmiä etsimässä</h2>
        <p className="text-lg mb-6 max-w-2xl">
          Tutustu vähemmän tunnettuihin viinitiloihin, jotka tuottavat joitakin Kalifornian kuuluisimman viinialueen
          hienoimmista viineistä.
        </p>
        <a
          href="#"
          className="inline-block bg-burgundy-700 text-white px-6 py-2 rounded hover:bg-burgundy-800 transition-colors"
        >
          Lue lisää
        </a>
      </div>
    </section>
  )
}

