import './index.css'
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import PortfolioPage from './pages/PortfolioPage'
import IndustriesPage from './pages/IndustriesPage'
import Blog from './pages/Blog'
import ContactPage from './pages/ContactPage'
import ServiceDetailsPage from './pages/ServiceDetailsPage'
import CaseStudyMateshwari from './pages/CaseStudyMateshwari'
import WhatsAppFloat from './components/WhatsAppFloat'

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/:slug" element={<ServiceDetailsPage />} />
        <Route path="/case-studies/mateshwari-industries" element={<CaseStudyMateshwari />} />
      </Routes>
      <WhatsAppFloat />
    </>
  )
}

export default App
