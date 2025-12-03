"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AnimalCarousel } from "@/components/animal-carousel"
import { WhyAdoptSection } from "@/components/why-adoption-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AnimalCarousel />
      <WhyAdoptSection />
      <CTASection />
      <Footer />
    </main>
  )
}