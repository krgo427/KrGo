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
              <li key={l.href}>
                <a href={l.href} className="text-slate-400 hover:text-white hover:pl-1 text-sm transition-all duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Connect</h4>
          <div className="flex gap-3">
            {[
              { label: 'LinkedIn', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
              { label: 'GitHub', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
              { label: 'Instagram', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:-translate-y-1 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
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
