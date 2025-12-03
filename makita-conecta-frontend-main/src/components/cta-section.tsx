"use client"

export function CTASection() {
  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--brand)",
        backgroundImage: `linear-gradient(135deg, var(--brand) 0%, var(--brand-ink) 100%)`,
      }}
    >
      <div className="max-w-3xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight text-balance">
          Pronto para abrir seu coração?
        </h2>

        <p className="text-lg md:text-xl mb-8 text-white opacity-90 text-balance">
          Comece sua jornada para encontrar o companheiro perfeito. Centenas de animais incríveis estão aguardando sua
          oportunidade de encontrar um lar amoroso.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-xl transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
            }}
          >
            Começar agora
          </button>
          <button className="px-8 py-3 rounded-lg font-bold text-lg text-white border-2 border-white transition-all hover:bg-white hover:text-gray-900 transform hover:scale-105 active:scale-95 hover:shadow-lg">
            Explorar animais
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm opacity-90">Suporte</div>
          </div>
          <div>
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm opacity-90">Seguro</div>
          </div>
          <div>
            <div className="text-2xl font-bold">+1K</div>
            <div className="text-sm opacity-90">Adoções</div>
          </div>
          <div>
            <div className="text-2xl font-bold">✓</div>
            <div className="text-sm opacity-90">Verificado</div>
          </div>
        </div>
      </div>
    </section>
  )
}