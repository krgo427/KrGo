import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Portfolio from '../components/Portfolio'
import CallToAction from '../components/CallToAction'

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        <Portfolio preview={false} />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
