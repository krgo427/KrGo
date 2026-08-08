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
import HelpAssistFloat from './components/HelpAssistFloat'
import ClickSpark from './components/ClickSpark'

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Clients from './pages/admin/Clients'
import Requests from './pages/admin/Requests'
import Billing from './pages/admin/Billing'

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
    <ClickSpark sparkColor="#00AEEF" sparkSize={10} sparkRadius={20} sparkCount={10} duration={400}>
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
        
        {/* Admin Portal Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="requests" element={<Requests />} />
          <Route path="billing" element={<Billing />} />
        </Route>
      </Routes>
      <HelpAssistFloat />
    </ClickSpark>
  )
}

export default App
