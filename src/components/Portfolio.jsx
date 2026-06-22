import React from 'react'
import clgImg from '../assets/clg.jpg'
import schoolImg from '../assets/school.png'

const projects = [
  {
    img: schoolImg,
    title: 'Modern Public School',
    type: 'Education',
    description:
      'A comprehensive website for a modern school with an event calendar, student portal, and admission forms.',
    tag: 'School',
    demoPath: 'https://gkschool.vercel.app/',
    accent: 'from-blue-400 to-indigo-500',
  },
  {
    img: clgImg,
    title: 'City Commerce College',
    type: 'Higher Education',
    description:
      'A professional college website featuring course catalogs, faculty directories, and online application tracking.',
    tag: 'College',
    demoPath: '/demo/college',
    accent: 'from-purple-400 to-fuchsia-500',
  }
]

const ProjectCard = ({ p, isMobile }) => (
  <a href={p.demoPath} target="_blank" rel="noopener noreferrer" className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 ${isMobile ? 'w-[280px] flex-shrink-0 relative' : 'hover:shadow-xl hover:-translate-y-1'}`}>
    <div className="relative overflow-hidden h-52">
      <img src={p.img} alt={`${p.title} website preview`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      <div className="absolute top-3 left-3">
        <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{p.tag}</span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">{p.type}</p>
      <h3 className="text-xl font-bold text-secondary mb-2">{p.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{p.description}</p>
    </div>
  </a>
);

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-12 md:py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our Work</p>
          <h2 className="section-title">Demo Projects We've Built</h2>
          <p className="section-subtitle">
            Here are some examples of websites we've designed for different types of small businesses in India.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} isMobile={false} />
          ))}
        </div>

        {/* Mobile Marquee */}
        <div className="sm:hidden relative max-w-[100vw] -mx-4 pb-6 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>
          <div className="flex overflow-hidden group">
            <div className="flex w-max animate-slow-marquee group-hover:[animation-play-state:paused]">
              <div className="flex gap-4 pr-4">
                {projects.map((p, idx) => <ProjectCard key={`p1-${idx}`} p={p} isMobile={true} />)}
              </div>
              <div className="flex gap-4 pr-4">
                {projects.map((p, idx) => <ProjectCard key={`p2-${idx}`} p={p} isMobile={true} />)}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slow-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-slow-marquee {
            animation: slow-marquee 25s linear infinite;
          }
        `}</style>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Want a website like these for your business?</p>
          <a href="#contact" className="btn-primary">Get Started Today</a>
        </div>
      </div>
    </section>
  )
}
