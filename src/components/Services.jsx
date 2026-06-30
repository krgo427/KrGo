import React from 'react'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/servicesData'

const serviceIcons = {
  'software-development': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  ),
  'data-science-analytics': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  'ai-automation': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  'cloud-devops': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
  )
}

export default function Services() {
  const navigate = useNavigate()

  const openServiceDetails = (slug) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/services/${slug}`)
  }

  const renderCard = (svc, isMobile, keyStr) => (
    <div key={keyStr} className={`card group flex flex-col transition-all duration-300 ${isMobile ? 'w-[280px] sm:w-[320px] flex-shrink-0 relative' : 'hover:-translate-y-2 hover:shadow-xl'}`}>
      <button
        type="button"
        onClick={() => openServiceDetails(svc.slug)}
        className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
        aria-label={`Open ${svc.title} details`}
      >
        <div className="group-hover:[&_svg]:text-white">
          {serviceIcons[svc.slug] || (
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      </button>
      <h3 className="text-2xl font-bold text-secondary mb-3">{svc.title}</h3>
      <p className="text-gray-500 text-base leading-relaxed mb-8 flex-grow">{svc.shortDescription}</p>
      
      <button 
        onClick={() => openServiceDetails(svc.slug)}
        className="text-primary font-bold text-sm hover:text-blue-700 mt-auto flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-wider"
      >
        Learn More <span aria-hidden="true" className="text-lg">→</span>
      </button>
    </div>
  )

  return (
    <section id="services" className="py-20 md:py-32 bg-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Enterprise Solutions</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mb-6 tracking-tight">Complete Technology Solutions</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From custom software development to advanced AI integrations, we provide end-to-end technical expertise to accelerate your business.
          </p>
        </div>

        {/* Grid for all devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map(svc => renderCard(svc, false, svc.slug))}
        </div>
      </div>
    </section>
  )
}
