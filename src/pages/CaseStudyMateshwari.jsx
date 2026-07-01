import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CallToAction from '../components/CallToAction'

export default function CaseStudyMateshwari() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="bg-gray-50 py-12 md:py-16 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">Case Study • Food Manufacturing</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mb-4 tracking-tight">Mateshwari Industries</h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto">
              Strengthening a legacy brand's online presence through a modern, fast, and SEO-optimized web platform.
            </p>
            <a href="https://mateshwariindustries.in" target="_blank" rel="noopener noreferrer" className="btn-primary py-3.5 px-8">
              Visit Live Website
            </a>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
            
            <div>
              <h2 className="text-xl font-bold text-secondary mb-3">Project Overview</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Mateshwari Industries required a professional digital presence to showcase their trusted edible oil products to a wider B2B and B2C audience. We designed and developed a high-performance web platform focusing on brand identity, product presentation, and customer engagement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-secondary mb-3">Business Challenge</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                The company lacked an official website, making it difficult for potential distributors and customers to verify their brand authenticity and explore their product catalog online. They needed a solution that was not just a digital brochure, but a fast, accessible platform for lead generation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-secondary mb-3">Our Solution</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We developed a highly optimized static website using Next.js and React. The focus was on a clean UI/UX, extremely fast load times, and an intuitive product showcase to build immediate trust with visitors.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div>
                <h3 className="text-base font-bold text-secondary mb-3">Technology Stack</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Next.js</li>
                  <li>• React</li>
                  <li>• Tailwind CSS</li>
                  <li>• TypeScript</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-bold text-secondary mb-3">Website Features</h3>
                <ul className="space-y-1.5 text-gray-600 text-sm">
                  <li>• Responsive Design</li>
                  <li>• SEO Optimized</li>
                  <li>• Fast Performance</li>
                  <li>• Product Showcase</li>
                  <li>• Inquiry Forms</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-secondary mb-3">Final Outcome</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                The new website successfully established a premium digital footprint for Mateshwari Industries, leading to increased online inquiries and stronger brand credibility among national distributors.
              </p>
            </div>

            <div className="pt-6 text-center border-t border-gray-100">
              <Link to="/" className="text-primary font-bold hover:underline">
                ← Back to Home
              </Link>
            </div>
            
          </div>
        </section>
        
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
