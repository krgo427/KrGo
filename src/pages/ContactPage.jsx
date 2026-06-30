import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Ready to transform your business with technology? Get in touch with our team today.
          </p>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  )
}
