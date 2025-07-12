"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <Services />
        <Features />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </AuthProvider>
  )
}
