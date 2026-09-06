import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextSlider from './TextSlider'
import { SoftwareMockup, AnalyticsMockup, AIMockup, CloudMockup } from './HeroMockups'

const heroMockups = [
  { component: SoftwareMockup, alt: 'Software Development' },
  { component: AnalyticsMockup, alt: 'Data Analytics' },
  { component: AIMockup, alt: 'AI & ML' },
  { component: CloudMockup, alt: 'Cloud Native' }
]

export default function Hero() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroMockups.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-bg via-white to-blue-50 dark:bg-slate-950 dark:bg-none pt-32 md:pt-24 lg:pt-32 pb-16 flex items-center relative overflow-hidden transition-colors duration-300"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="md:col-span-6 flex flex-col text-center md:text-left">
          <div className="inline-flex max-w-[90%] mx-auto md:max-w-none md:mx-0 items-center justify-center gap-2 bg-blue-50/80 dark:bg-white/5 backdrop-blur-sm border border-blue-100 dark:border-white/10 text-primary dark:text-white text-xs font-semibold px-4 py-2 rounded-full mb-8 mt-4 md:mt-0 shadow-sm transition-colors duration-300">
            <span className="relative flex h-2.5 w-2.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Building Software. Driving Decisions with Data.
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-secondary dark:text-white leading-[1.1] mb-6 mx-auto md:mx-0 transition-colors duration-300">
            Build. <span className="text-primary">Analyze.</span> Automate.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0 transition-colors duration-300">
            KrGo Technology Solutions helps businesses grow through Software Development, Data Analytics, AI Automation, Cloud Technologies, and Business Intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:justify-center md:justify-start gap-4 mb-12">
            <Link to="/contact" className="btn-primary text-base px-8 py-4 shadow-xl shadow-primary/20 hover:-translate-y-1 w-full sm:w-auto">
              Get Started
            </Link>
            <a href="#services" className="btn-outline text-base px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm dark:border-white/10 dark:text-white hover:bg-white hover:dark:bg-white/10 hover:-translate-y-1 w-full sm:w-auto transition-colors duration-300">
              Explore Services
            </a>
          </div>

          {/* Stats / Tech Tags */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 opacity-80">
            {['Software Development', 'Data Analytics', 'AI & ML', 'Cloud Native'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-300 text-xs sm:text-sm font-medium rounded-md shadow-sm transition-colors duration-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image / Graphic Area */}
        <div className="hidden md:flex md:col-span-6 justify-center relative items-center">
          <div className="relative w-full max-w-2xl aspect-video rounded-3xl z-10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-300/20 rounded-3xl transform rotate-3 scale-105 transition-transform duration-700 ease-in-out hover:rotate-1 hover:scale-100 z-10 pointer-events-none"></div>
            
            {heroMockups.map((MockupObj, index) => {
              const MockupComponent = MockupObj.component;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentImgIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                  }`}
                >
                  <MockupComponent />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
