"use client"

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--sky)" }}>
      <div className="max-w-3xl mx-auto text-center animate-fade-in">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance"
          style={{ color: "var(--ink)" }}
        >
          Encontre seu próximo <span style={{ color: "var(--accent)" }}>melhor amigo</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 text-balance leading-relaxed" style={{ color: "var(--brand-ink)" }}>
          Bem-vindo ao Makita Conecta! Uma plataforma dedicada a conectar animais incríveis com pessoas como você que
          estão prontas para oferecer amor, cuidado e um lar acolhedor.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-lg font-bold text-lg text-white transition-all hover:shadow-xl transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Encontrar meu novo amigo
          </button>
          <button
            className="px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg border-2 transform hover:scale-105 active:scale-95"
            style={{
              color: "var(--brand)",
              borderColor: "var(--brand)",
              backgroundColor: "transparent",
            }}
          >
            Conhecer a plataforma
          </button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">
          <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl md:text-4xl font-bold" style={{ color: "var(--accent)" }}>
              120+
            </div>
            <div className="text-sm md:text-base mt-1" style={{ color: "var(--brand-ink)" }}>
              Animais esperando
            </div>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl md:text-4xl font-bold" style={{ color: "var(--accent)" }}>
              85%
            </div>
            <div className="text-sm md:text-base mt-1" style={{ color: "var(--brand-ink)" }}>
              Taxa de sucesso
            </div>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-3xl md:text-4xl font-bold" style={{ color: "var(--accent)" }}>
              1.2K+
            </div>
            <div className="text-sm md:text-base mt-1" style={{ color: "var(--brand-ink)" }}>
              Famílias felizes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}