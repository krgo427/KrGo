import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HelpAssistFloat() {
  const [showBorder, setShowBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const ctaSection = document.getElementById('cta-section');
      if (ctaSection) {
        const ctaRect = ctaSection.getBoundingClientRect();
        // Calculate button approximate position (bottom-6 is 24px, h-14 is 56px)
        const buttonTop = window.innerHeight - (24 + 56);
        const buttonBottom = window.innerHeight - 24;
        
        // Check if the button overlaps with the CTA section
        if (ctaRect.top <= buttonBottom && ctaRect.bottom >= buttonTop) {
          setShowBorder(true);
        } else {
          setShowBorder(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link
      to="/contact"
      className={`fixed bottom-6 right-6 bg-accent text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,174,239,0.4)] transition-all duration-300 z-50 hover:scale-110 hover:-translate-y-1 group hover:brightness-110 ${
        showBorder ? 'border-2 border-white' : 'border-2 border-transparent'
      }`}
      aria-label="Get Help / Assistance"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {/* Tooltip */}
      <span className="absolute right-16 bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-slate-700">
        Need Help?
      </span>
    </Link>
  )
}
