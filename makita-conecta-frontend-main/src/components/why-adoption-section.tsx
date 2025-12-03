"use client"

import { Heart, Home, Smile, TrendingUp } from "lucide-react"

const BENEFITS = [
  {
    icon: Heart,
    title: "Você salva uma vida",
    description: "Cada adoção libera espaço e recursos para salvar mais animais em necessidade.",
  },
  {
    icon: Home,
    title: "Ganhe um companheiro leal",
    description: "Animais adotados oferecem amor incondicional e lealdade por toda a vida.",
  },
  {
    icon: Smile,
    title: "Melhora seu bem-estar",
    description: "Animais de estimação reduzem estresse e aumentam a felicidade geral.",
  },
  {
    icon: TrendingUp,
    title: "Escolha responsável",
    description: "Nós garantimos que todos os animais passam por triagem de saúde completa.",
  },
]

export function WhyAdoptSection() {
  return (
    <section
      id="por-que-adotar"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--sky)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--ink)" }}>
            Por que adotar?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--brand-ink)" }}>
            A adoção é um ato de amor que transforma duas vidas: a do animal e a sua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="p-6 rounded-2xl transition-all hover:shadow-xl hover:scale-105 animate-fade-in"
                style={{
                  backgroundColor: "#fff",
                  animationDelay: `${index * 0.1}s`,
                  border: `2px solid var(--sky)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-transform hover:scale-110"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--ink)" }}>
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--brand-ink)" }}>
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div
          className="mt-16 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8 animate-fade-in"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--ink)" }}>
              Processo simples e seguro
            </h3>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: "var(--brand-ink)" }}>
              Nosso processo de adoção é cuidadosamente desenvolvido para garantir que cada animal encontre o lar
              perfeito e que você tenha toda a orientação necessária.
            </p>
            <button
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Saiba como funciona
            </button>
          </div>
          <div className="flex-1">
            <div
              className="bg-gray-100 rounded-2xl h-64 md:h-80 flex items-center justify-center"
              style={{ backgroundColor: "var(--sky)" }}
            >
              <img
                src="/fam-lia-abra-ando-cachorro-adotado.jpg"
                alt="Processo de adoção seguro"
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}