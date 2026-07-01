import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-8">About KrGo</h1>
          <p className="text-xl text-gray-500 mb-12">Helping businesses leverage modern technology to grow smarter.</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Our Vision</h2>
            <p>To become a trusted technology partner delivering Software, Data, AI, and Cloud solutions worldwide.</p>
            
            <h2 className="text-2xl font-bold text-secondary mt-12 mb-4">Our Mission</h2>
            <p>We believe that technology should be an enabler, not a bottleneck. Our mission is to democratize access to enterprise-grade software and data solutions for businesses of all sizes, enabling them to make data-driven decisions and automate their workflows efficiently.</p>
            
            <h2 className="text-2xl font-bold text-secondary mt-12 mb-4">Core Values</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Innovation:</strong> Always pushing boundaries and exploring modern tech.</li>
              <li><strong>Quality:</strong> Delivering robust, scalable, and secure solutions.</li>
              <li><strong>Transparency:</strong> Open communication with our clients at every step.</li>
              <li><strong>Reliability:</strong> We build systems you can depend on.</li>
              <li><strong>Continuous Learning:</strong> Evolving with the ever-changing technology landscape.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
