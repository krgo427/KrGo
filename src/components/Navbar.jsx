import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import logoImg from '../assets/logo.png'

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-secondary shadow-lg' : 'bg-secondary/95 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-1 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoImg} 
            alt="KrGo Tech Logo" 
            className="h-8 md:h-10 w-auto object-contain transform group-hover:scale-105 transition-transform"
            onError={(e) => {
              // Fallback to old logo if image is not found
              e.target.onerror = null; 
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-xl items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-lg">KG</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight leading-none">
              <span className="text-white">Kr</span><span className="text-primary">Go</span> <span className="text-white font-bold">Tech</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Technology Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href === '/#services' && location.pathname === '/' && location.hash === '#services');
            
            return (
            <li key={link.href}>
              {link.href.startsWith('/#') ? (
                <a
                  href={link.href}
                  className={`font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-300 hover:text-white'}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className={`font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-300 hover:text-white'}`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          )})}
        </ul>

        {/* CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <Link to="/contact" className="btn-primary text-sm px-5 py-2 min-h-0 shadow-lg shadow-primary/20">
            Get a Proposal
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-secondary border-t border-white/10 px-4 py-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white font-medium py-2 px-2 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-slate-300 hover:text-white font-medium py-2 px-2 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-4">
            <button 
              onClick={() => { toggleTheme(); setMenuOpen(false); }} 
              className="flex items-center gap-2 text-slate-300 hover:text-white font-medium py-2 px-2 hover:bg-white/5 rounded-lg transition-colors text-left"
            >
              {theme === 'dark' ? (
                <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> Light Mode</>
              ) : (
                <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> Dark Mode</>
              )}
            </button>
            <Link 
              to="/contact" 
              className="btn-primary w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Get a Proposal
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
