import React from 'react'
import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 relative bg-primary overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Let's Build Your Next Technology Solution.
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Ready to scale your business with modern software, AI, and data solutions? Partner with KrGo Technology Solutions today.
        </p>
        <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-white text-primary font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
          Schedule a Consultation
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
