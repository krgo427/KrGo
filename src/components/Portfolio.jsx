import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clgScreenshot from '../assets/clg.jpg'
import schoolScreenshot from '../assets/school.png'

const allProjects = [
  {
    id: 'mateshwari-industries',
    title: 'Mateshwari Industries',
    status: 'LIVE CLIENT',
    industry: 'Manufacturing',
    description: "Designed and developed the official website for Mateshwari Industries, a premium edible oil manufacturing company. The platform strengthens the company's online presence with a modern, responsive interface and detailed product showcase.",
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    liveLink: 'https://mateshwariindustries.in',
    caseStudyLink: '/case-studies/mateshwari-industries',
    image: '/screenshots/mateshwari.png'
  },
  {
    id: 'college-erp',
    title: 'College ERP System',
    status: 'DEMO',
    industry: 'EdTech',
    description: "A comprehensive ERP platform built to digitize and manage student records, grades, and faculty workflows effortlessly.",
    liveLink: 'https://vocal-fudge-3ea55d.netlify.app/',
    image: clgScreenshot
  },
  {
    id: 'school-erp',
    title: 'School ERP System',
    status: 'DEMO',
    industry: 'EdTech',
    description: "A robust school management system designed for seamless attendance tracking, academic administration, and report cards.",
    liveLink: 'https://gkschool.vercel.app/',
    image: schoolScreenshot
  }
]

const StatusBadge = ({ status }) => {
  const isLive = status === 'LIVE CLIENT'
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
      isLive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    }`}>
      {status}
    </span>
  )
}

export default function Portfolio({ preview = false }) {
  const navigate = useNavigate()

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-[#0b1120] relative text-white border-t border-white/5">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
            Case Studies
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light">
            Real technology solutions built to solve real business challenges.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {allProjects.map((p) => (
            <div 
              key={p.id} 
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 md:p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-blue-900/20"
            >
              {/* Preview Image */}
              <div className="mb-6 w-full overflow-hidden rounded-xl border border-white/10 relative">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                />
              </div>

              {/* Tags */}
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status={p.status} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.industry}</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 font-light">
                {p.description}
              </p>
              
              {/* Footer / CTA */}
              <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                <Link to={p.caseStudyLink || p.liveLink} className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
                  {p.caseStudyLink ? 'Read Case Study' : 'View Demo'}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                {p.technologies && (
                  <div className="flex gap-1.5">
                    {p.technologies.slice(0,2).map(t => (
                      <span key={t} className="text-[10px] px-2 py-1 bg-white/5 rounded text-slate-300">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Compact CTA */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900/50 to-slate-800/50 border border-blue-500/20 p-8 md:p-12 text-center flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to build something amazing?</h3>
            <p className="text-sm text-blue-100/70 font-light">From robust ERP systems to intelligent AI integrations, we have the expertise to elevate your business.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto shrink-0">
            <Link to="/contact" className="btn-primary py-3 px-6 text-sm flex-1 md:flex-none text-center">
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
