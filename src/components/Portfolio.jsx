import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const allProjects = [
  {
    title: 'Business Website & Portal',
    category: 'Software',
    description: 'A comprehensive corporate website with a secure client portal for a financial firm.',
    imgColor: 'bg-blue-100',
    icon: '💻'
  },
  {
    title: 'Inventory Management System',
    category: 'Software',
    description: 'A scalable ERP module to track stock, manage orders, and forecast inventory needs.',
    imgColor: 'bg-green-100',
    icon: '📦'
  },
  {
    title: 'Restaurant POS System',
    category: 'Software',
    description: 'A cloud-based point-of-sale system with real-time analytics and offline capabilities.',
    imgColor: 'bg-orange-100',
    icon: '🍔'
  },
  {
    title: 'Sales Analytics Dashboard',
    category: 'Data',
    description: 'An interactive Power BI dashboard visualizing regional sales data and KPIs.',
    imgColor: 'bg-purple-100',
    icon: '📈'
  },
  {
    title: 'Customer Churn Prediction',
    category: 'Data',
    description: 'A machine learning model predicting customer churn based on historical data.',
    imgColor: 'bg-teal-100',
    icon: '👥'
  },
  {
    title: 'AI Customer Support Chatbot',
    category: 'AI',
    description: 'An intelligent chatbot integrated with OpenAI to handle tier-1 customer inquiries.',
    imgColor: 'bg-indigo-100',
    icon: '🤖'
  },
  {
    title: 'Invoice OCR Automation',
    category: 'Automation',
    description: 'Automated data extraction from invoices using OCR and NLP technologies.',
    imgColor: 'bg-pink-100',
    icon: '🧾'
  },
  {
    title: 'Automated Marketing Workflows',
    category: 'Automation',
    description: 'Zapier-based automated workflows for lead nurturing and CRM updates.',
    imgColor: 'bg-yellow-100',
    icon: '⚙️'
  }
]

export default function Portfolio({ preview = false }) {
  const [filter, setFilter] = useState('All')
  
  const categories = ['All', 'Software', 'Data', 'AI', 'Automation']
  
  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter)
    
  const displayProjects = preview ? filteredProjects.slice(0, 6) : filteredProjects

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Our Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mb-6 tracking-tight">Featured Projects</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore how we've helped businesses transform their operations through custom technology solutions.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-secondary text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayProjects.map((p, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className={`h-48 ${p.imgColor} flex items-center justify-center text-6xl relative overflow-hidden`}>
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{p.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{p.category}</span>
                <h3 className="text-xl font-bold text-secondary mb-3">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{p.description}</p>
                <Link to="/portfolio" className="text-secondary font-bold text-sm hover:text-primary transition-colors flex items-center gap-2 group/btn">
                  View Case Study
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {preview && (
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-outline px-8 py-3">
              View All Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
