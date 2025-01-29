import React from "react"

export function Footer() {
  return (
    <footer className="bg-burgundy-900 text-white p-8 mt-12">
      <div className="container mx-auto">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Korkkikierre</h3>
          <p className="text-sm">Tutkimme viinin maailmaa, yksi siemaus kerrallaan.</p>
        </div>
        <div className="text-sm mt-4">
          <p>&copy; 2023 Korkkikierre. Kaikki oikeudet pidätetään.</p>
        </div>
      </div>
    </footer>
  )
}

