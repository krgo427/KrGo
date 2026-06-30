import React from 'react'

const techCategories = [
  {
    category: 'Frontend',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    techs: ['Node.js', 'FastAPI', 'Express.js']
  },
  {
    category: 'Databases',
    techs: ['PostgreSQL', 'MongoDB', 'MySQL']
  },
  {
    category: 'Data & AI',
    techs: ['Python', 'Pandas', 'NumPy', 'Power BI', 'TensorFlow', 'Scikit-learn']
  },
  {
    category: 'Cloud & DevOps',
    techs: ['Docker', 'AWS', 'GitHub', 'Vercel']
  }
]

export default function TechnologyStack() {
  return (
    <section className="py-20 md:py-32 bg-[#0b1120] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Technology Stack</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">Built on Modern Technology</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We utilize the latest and most robust frameworks and tools to build scalable and high-performance solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((cat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">{cat.category}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.techs.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-primary/20 text-blue-200 border border-primary/30 rounded-lg text-sm font-medium shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
