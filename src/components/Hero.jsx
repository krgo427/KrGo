import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import hero1 from '../assets/hero1.png'
import hero2 from '../assets/hero2.png'
import hero3 from '../assets/hero3.png'
import hero4 from '../assets/hero4.png'
import hero5 from '../assets/hero5.png'
import TextSlider from './TextSlider'

const heroImages = [hero1, hero2, hero3, hero4, hero5]

export default function Hero() {
  const [currentImgIdx, setCurrentImgIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-bg via-white to-blue-50 dark:bg-slate-950 dark:bg-none pt-24 pb-16 flex items-center relative overflow-hidden transition-colors duration-300"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="md:col-span-7 flex flex-col text-center md:text-left">
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
        <div className="hidden md:flex md:col-span-5 justify-center relative">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-300/20 rounded-3xl transform rotate-6 scale-105 transition-transform duration-700 ease-in-out hover:rotate-2 hover:scale-100"></div>
            {heroImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`KrGo Technology Solutions Concept ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl transition-all duration-1000 ease-in-out ${idx === currentImgIdx ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  }`}
              />
            ))}

            {/* Floating Element - Example Data Viz */}
            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-primary/20 border border-gray-100 dark:border-white/10 z-20 animate-bounce transition-colors duration-300" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 dark:bg-primary/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent dark:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-xs font-bold text-secondary dark:text-white transition-colors duration-300">Performance</div>
              </div>
              <div className="text-2xl font-extrabold text-secondary dark:text-white transition-colors duration-300">+124%</div>
            </div>

            {/* Floating Element - Example Code */}
            <div className="absolute -top-6 -right-6 bg-secondary p-4 rounded-xl shadow-xl border border-gray-700 z-20 opacity-90 hidden lg:block">
              <pre className="text-[10px] text-green-400 font-mono">
                <code>
                  const optimize = async () =&gt; {'{\n'}
                  {'  '}await analyzeData();{'\n'}
                  {'  '}return scale();{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
