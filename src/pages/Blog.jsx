import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Blog() {
  const posts = [
    { title: 'The Future of AI in Automation', date: 'October 12, 2026', category: 'AI' },
    { title: 'Why Next.js is the Best Choice for Web Apps', date: 'September 28, 2026', category: 'Web Development' },
    { title: 'Migrating to Cloud: A CTO’s Guide', date: 'September 15, 2026', category: 'Cloud Computing' },
    { title: 'Building Dashboards with Power BI and Python', date: 'August 30, 2026', category: 'Data Science' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Technical Insights</h1>
            <p className="text-xl text-gray-500">Thoughts, updates, and engineering deep-dives from the KrGo team.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {posts.map((post, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">{post.category}</span>
                <h2 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-6">{post.date}</p>
                <span className="text-primary font-semibold text-sm flex items-center gap-2">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
