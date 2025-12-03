"use client"

import { Heart, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: "#fff",
        borderColor: "rgba(47, 27, 18, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "var(--brand)" }}
              >
                <Heart className="w-6 h-6" />
              </div>
              <span className="font-bold" style={{ color: "var(--brand)" }}>
                Makita Conecta
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--brand-ink)" }}>
              Conectando animais com famílias que os amam.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: "var(--ink)" }}>
              Plataforma
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Encontrar animais
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Como funciona
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4" style={{ color: "var(--ink)" }}>
              Informações
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Contato
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4" style={{ color: "var(--ink)" }}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Termos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: "var(--brand-ink)" }}
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderColor: "rgba(47, 27, 18, 0.1)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0" style={{ color: "var(--brand-ink)" }}>
              © 2025 Makita Conecta. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg transition-all hover:scale-110"
                style={{ backgroundColor: "var(--sky)", color: "var(--brand)" }}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg transition-all hover:scale-110"
                style={{ backgroundColor: "var(--sky)", color: "var(--brand)" }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg transition-all hover:scale-110"
                style={{ backgroundColor: "var(--sky)", color: "var(--brand)" }}
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}