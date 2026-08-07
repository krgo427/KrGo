import React from 'react'
import MagicBento from './MagicBento'

export default function DevelopmentProcess() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0712] relative overflow-hidden bento-section">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Our Workflow</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">How We Deliver Excellence</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
            A proven, step-by-step approach to turning your ideas into scalable, real-world technology solutions.
          </p>
        </div>

        <MagicBento />
      </div>
    </section>
  )
}
