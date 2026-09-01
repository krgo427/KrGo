import React from 'react'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/servicesData'
import AutoHorizontalSlider from './AutoHorizontalSlider'

const serviceIcons = {
  'data-analytics': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  'automation-ai': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  'software-website-development': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  )
}

export default function Services() {
  const navigate = useNavigate()

  const openServiceDetails = (slug) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/services/${slug}`)
  }

  const renderCard = (svc, keyStr) => (
    <div 
      key={keyStr} 
      onClick={() => openServiceDetails(svc.slug)}
      className="card bg-white border border-gray-100 group flex flex-col transition-all duration-300 cursor-pointer text-left hover:-translate-y-2 hover:shadow-xl h-full p-6 md:p-8"
    >
      <div
        className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
      >
        <div className="group-hover:[&_svg]:text-white">
          {serviceIcons[svc.slug] || (
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 transition-colors duration-300">{svc.title}</h3>
      <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 flex-grow transition-colors duration-300">{svc.shortDescription}</p>
      
      <span 
        className="text-primary font-bold text-xs md:text-sm group-hover:text-blue-700 mt-auto flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-wider"
      >
        Learn More <span aria-hidden="true" className="text-lg">→</span>
      </span>
    </div>
  )

  return (
    <section id="services" className="py-16 md:py-24 bg-white relative transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Enterprise Solutions</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mb-6 tracking-tight transition-colors duration-300">Complete Technology Solutions</h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto transition-colors duration-300">
            From custom software development to advanced AI integrations, we provide end-to-end technical expertise to accelerate your business.
          </p>
        </div>

        {/* Desktop Grid Layout (hidden md:grid) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map(svc => renderCard(svc, svc.slug))}
        </div>

        {/* Mobile Automatic Horizontal Slider (md:hidden) */}
        <div className="md:hidden">
          <AutoHorizontalSlider interval={3200}>
            {services.map(svc => (
              <div key={svc.slug} className="h-[340px]">
                {renderCard(svc, `mobile-${svc.slug}`)}
              </div>
            ))}
          </AutoHorizontalSlider>
        </div>
      </div>
    </section>
  )
}
