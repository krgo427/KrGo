import React from 'react'
import AccordionGallery from './AccordionGallery'
import educationBg from '../assets/education.png'

const industries = [
  { 
    name: 'Retail', 
    desc: 'Omnichannel platforms and inventory AI.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' 
  },
  { 
    name: 'Healthcare', 
    desc: 'Secure patient portals and predictive diagnostics.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' 
  },
  { 
    name: 'Education', 
    desc: 'Scalable e-learning and campus management.',
    image: educationBg,
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' 
  },
  { 
    name: 'Restaurants', 
    desc: 'Streamlined POS systems and delivery integrations.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    icon: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z' 
  },
  { 
    name: 'Manufacturing', 
    desc: 'IoT sensor analytics and supply chain automation.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' 
  },
  { 
    name: 'Finance', 
    desc: 'Fintech apps, secure ledgers, and fraud detection.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    name: 'Startups', 
    desc: 'Rapid MVPs and scalable cloud infrastructure.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z' 
  },
  { 
    name: 'E-Commerce', 
    desc: 'High-conversion storefronts and payment gateways.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' 
  },
]

export default function Industries() {
  const galleryItems = industries.map(ind => ({
    image: ind.image,
    label: ind.name,
    desc: ind.desc,
    icon: ind.icon,
    link: '#'
  }))

  return (
    <section id="industries" className="py-16 md:py-24 bg-white overflow-hidden relative min-h-[600px] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Header Text Centered */}
        <div className="max-w-2xl mx-auto mb-16 relative z-20 text-center">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Industries</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-6 tracking-tight">Who We Serve</h2>
          <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
            We deliver tailor-made technology solutions across a wide range of industries. Watch our capabilities expand.
          </p>
        </div>

        {/* Accordion Gallery Section */}
        <div className="w-full relative z-10 pt-4">
          <AccordionGallery 
            items={galleryItems} 
            height={460} 
            gap={12} 
            radius={20} 
            accentColor="#a855f7" 
            grayscale={false} 
            trigger="hover" 
          />
        </div>

      </div>
    </section>
  )
}
