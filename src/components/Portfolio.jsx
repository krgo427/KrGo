import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const allProjects = [
  {
    id: 'mateshwari-industries',
    title: 'Mateshwari Industries',
    status: 'LIVE CLIENT',
    industry: 'Food Manufacturing',
    description: "Designed and developed the official website for Mateshwari Industries, an edible oil manufacturing company.\n\nThe platform strengthens the company's online presence by showcasing products, certifications, business information and customer enquiry options through a modern responsive website.",
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    highlights: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Product Showcase', 'Inquiry Forms'],
    liveLink: 'https://mateshwariindustries.in',
    caseStudyLink: '/case-studies/mateshwari-industries',
    featured: true,
    image: 'https://image.thum.io/get/width/1200/crop/800/https://mateshwariindustries.in/'
  },
  {
    id: 'college-erp',
    title: 'College ERP Management System',
    status: 'DEMO',
    industry: 'Education Technology',
    description: "A demo ERP platform developed to manage students, grades, academic records and faculty workflows.",
    liveLink: 'https://vocal-fudge-3ea55d.netlify.app/',
    featured: false,
    image: '/screenshots/college.png'
  },
  {
    id: 'school-erp',
    title: 'School ERP Management System',
    status: 'DEMO',
    industry: 'Education Technology',
    description: "A demo school management system for attendance, report cards and academic administration.",
    liveLink: 'https://gkschool.vercel.app/',
    featured: false,
    image: '/screenshots/gkschool.png'
  }
]

const StatusBadge = ({ status }) => {
  const isLive = status === 'LIVE CLIENT'
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm ${
      isLive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'
    }`}>
      {status}
    </span>
  )
}

const BrowserMockup = ({ imageSrc }) => (
  <div className="w-full h-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col group-hover:scale-105 transition-transform duration-700 ease-in-out">
    {/* Browser Header */}
    <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2 shrink-0 w-full relative z-10">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 h-6 w-1/2 bg-white rounded-md border border-gray-200 flex items-center justify-center">
        <span className="text-[10px] text-gray-400 font-medium">mateshwariindustries.in</span>
      </div>
    </div>
    {/* Browser Body with Real Screenshot */}
    <div className="flex-1 bg-gray-50 relative overflow-hidden group/img">
      <img 
        src={imageSrc} 
        alt="Project Screenshot" 
        className="w-full h-auto object-cover object-top transition-transform duration-[2s] ease-in-out group-hover/img:-translate-y-[20%]"
      />
    </div>
  </div>
)

export default function Portfolio({ preview = false }) {
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()
  
  const categories = ['All', 'Live Projects', 'Demo Projects']
  
  const filteredProjects = allProjects.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Live Projects') return p.status === 'LIVE CLIENT';
    if (filter === 'Demo Projects') return p.status === 'DEMO';
    return true;
  })

  const featuredProject = filteredProjects.find(p => p.featured)
  const demoProjects = filteredProjects.filter(p => !p.featured)

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">Case Studies</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary mb-6 tracking-tight">Case Studies</h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Real technology solutions built to solve real business challenges.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-24">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-secondary text-white shadow-md' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PART 1: Featured Project */}
        {featuredProject && (
          <div className="mb-12 md:mb-20 group">
            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col lg:flex-row transition-all duration-500 hover:shadow-2xl hover:border-gray-300">
              
              {/* Left Side: Large Screenshot Mockup */}
              <div className="lg:w-[55%] bg-gray-50 p-6 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
                <div className="w-full h-full max-w-2xl relative z-10 drop-shadow-2xl">
                  <BrowserMockup imageSrc={featuredProject.image} />
                </div>
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-green-500/5 to-blue-500/5 blur-3xl pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
              </div>
              
              {/* Right Side: Content */}
              <div className="lg:w-[45%] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white z-10 relative">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{featuredProject.industry}</span>
                  <StatusBadge status={featuredProject.status} />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-extrabold text-secondary mb-6">{featuredProject.title}</h3>
                
                <div className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 space-y-4">
                  {featuredProject.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Technologies</h4>
                    <div className="flex flex-col gap-2">
                      {featuredProject.technologies.map(tech => (
                        <span key={tech} className="text-sm font-semibold text-secondary">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Key Highlights</h4>
                    <div className="flex flex-col gap-2">
                      {featuredProject.highlights.map(hl => (
                        <span key={hl} className="text-sm font-semibold text-secondary flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary"></span>
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a href={featuredProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto text-center py-3.5 px-8">
                    Visit Website
                  </a>
                  <button onClick={() => navigate(featuredProject.caseStudyLink)} className="btn-outline bg-transparent border-gray-200 text-secondary hover:bg-gray-50 hover:border-gray-300 w-full sm:w-auto text-center py-3.5 px-8">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PART 2: Demo Projects (2 equal cards) */}
        {demoProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-12 md:mb-20">
            {demoProjects.map((p) => (
              <div 
                key={p.id} 
                className="group bg-white rounded-3xl border border-gray-200 p-8 md:p-10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <StatusBadge status={p.status} />
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{p.industry}</span>
                </div>
                
                <h3 className="text-2xl font-extrabold text-secondary mb-4">{p.title}</h3>
                
                <p className="text-gray-500 text-base leading-relaxed mb-8 flex-1">
                  {p.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link to={p.liveLink} className="inline-flex items-center gap-2 text-primary font-bold hover:text-blue-700 transition-colors">
                    View Project
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PART 3: Call To Action */}
        <div className="relative rounded-[2rem] overflow-hidden bg-secondary">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-[#0d1527] to-primary/40 opacity-90"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 p-10 md:p-16 lg:p-24 text-center max-w-4xl mx-auto flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Your Business Could Be Next</h3>
            <p className="text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed max-w-2xl">
              Whether you're a startup, educational institution, manufacturer or growing business, KrGo Technology Solutions can build modern software tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/contact" className="btn-primary w-full sm:w-auto py-4 px-8 text-base">
                Start Your Project
              </Link>
              <Link to="/contact" className="btn-outline bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 w-full sm:w-auto py-4 px-8 text-base">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
