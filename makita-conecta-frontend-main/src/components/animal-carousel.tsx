"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

const MOCK_ANIMALS = [
  {
    id: 1,
    name: "Luna",
    breed: "Gato Siamês",
    age: "2 anos",
    image: "/gato-siam-s-cinza-em-sala.jpg",
  },
  {
    id: 2,
    name: "Max",
    breed: "Cão Labrador",
    age: "1 ano",
    image: "/cachorro-labrador-dourado.jpg",
  },
  {
    id: 3,
    name: "Bella",
    breed: "Cão Poodle",
    age: "3 anos",
    image: "/poodle-branco-fofo.jpg",
  },
  {
    id: 4,
    name: "Oliver",
    breed: "Gato Persa",
    age: "1 ano",
    image: "/gato-persa-laranja.jpg",
  },
  {
    id: 5,
    name: "Sophie",
    breed: "Cão Golden Retriever",
    age: "2 anos",
    image: "/golden-retriever-f-mea.jpg",
  },
]

export function AnimalCarousel() {
  const [scroll, setScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll_carousel = (direction: "left" | "right") => {
    if (!containerRef.current) return
    const scrollAmount = 320
    const newScroll = direction === "left" ? Math.max(0, scroll - scrollAmount) : scroll + scrollAmount

    containerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    })
    setScroll(newScroll)
  }

  return (
    <section id="animais" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--ink)" }}>
            Animais esperando por você
          </h2>
          <p className="text-lg" style={{ color: "var(--brand-ink)" }}>
            Conheça alguns dos nossos companheiros incríveis disponíveis para adoção
          </p>
        </div>

        <div className="relative group">
          {/* Carousel container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {MOCK_ANIMALS.map((animal, index) => (
              <div
                key={animal.id}
                className="flex-shrink-0 w-72 animate-fade-in transition-transform hover:scale-105 cursor-pointer group/card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => (window.location.href = `/animal/${animal.id}`)}
              >
                <div
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundColor: "var(--sky)" }}
                >
                  {/* Animal image */}
                  <div className="relative overflow-hidden bg-gray-200 h-64">
                    <img
                      src={animal.image || "/placeholder.svg"}
                      alt={animal.name}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                    />

                    {/* Like button */}
                    <button
                      className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-md transition-all hover:scale-110 active:scale-95"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Favoritar ${animal.name}`}
                    >
                      <Heart className="w-5 h-5" style={{ color: "var(--accent)" }} />
                    </button>
                  </div>

                  {/* Card info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--ink)" }}>
                      {animal.name}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "var(--brand-ink)" }}>
                      {animal.breed} • {animal.age}
                    </p>
                    <button
                      className="w-full py-2 rounded-lg font-semibold transition-all hover:shadow-lg transform hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "#fff",
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/animal/${animal.id}`
                      }}
                    >
                      Ver perfil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => scroll_carousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--brand)" }}
            aria-label="Carousel anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll_carousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "var(--brand)" }}
            aria-label="Próximo carousel"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mt-12">
          <button
            className="px-8 py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Ver todos os animais
          </button>
        </div>
      </div>
    </section>
  )
}