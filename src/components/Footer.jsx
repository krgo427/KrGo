import React from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config/siteConfig'
import logoImg from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="md:col-span-2 pr-0 md:pr-10">
          <Link to="/" className="flex items-center gap-2 mb-6 group">
            <img 
              src={logoImg} 
              alt="KrGo Tech Logo" 
              className="h-16 md:h-20 w-auto object-contain transform group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-xl items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">KG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight leading-tight">
                <span className="text-white">Kr</span><span className="text-primary">Go</span> <span className="text-white font-bold">Tech</span>
              </span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            KrGo Technology Solutions is a premier technology partner delivering Data Science, Automation & AI, and Software & Website Development solutions worldwide. We build software and drive decisions with data.
          </p>
          <div className="flex items-center gap-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> 
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-4">
            {[
              { label: 'About Us', href: '/about' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-slate-400 hover:text-white hover:pl-1 text-sm transition-all duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">Services</h4>
          <ul className="space-y-4">
            {[
              { label: 'Data Science', href: '/services/data-science' },
              { label: 'Automation & AI', href: '/services/automation-ai' },
              { label: 'Software & Website Development', href: '/services/software-website-development' },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-slate-400 hover:text-white hover:pl-1 text-sm transition-all duration-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources & Social */}
        <div>
          <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">Resources</h4>
          <ul className="space-y-4 mb-8">
            {[
              { label: 'FAQs', href: '/#faq' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms & Conditions', href: '#' },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-slate-400 hover:text-white hover:pl-1 text-sm transition-all duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Connect</h4>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/krgo-software-solutions-7b2940409"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-primary text-slate-300 hover:text-white transition-all duration-300 text-sm font-semibold border border-white/10"
            >
              <svg className="w-4 h-4 text-primary group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium tracking-wide">
          <p>© {new Date().getFullYear()} KrGo Technology Solutions. All rights reserved.</p>
          <p>Innovating with Code & Data</p>
        </div>
      </div>
    </footer>
  )
}
