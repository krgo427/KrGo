import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Industries from '../components/Industries'
import CallToAction from '../components/CallToAction'

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        <Industries />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
