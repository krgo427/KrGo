import React from 'react'

const processSteps = [
  { step: '01', title: 'Requirement Analysis', desc: 'We deeply understand your business needs, target audience, and project objectives.' },
  { step: '02', title: 'Planning', desc: 'We map out the architecture, tech stack, and timeline to ensure a clear roadmap.' },
  { step: '03', title: 'UI/UX Design', desc: 'We create intuitive, engaging, and premium wireframes and visual designs.' },
  { step: '04', title: 'Development', desc: 'Our engineers build the solution using scalable and modern technology stacks.' },
  { step: '05', title: 'Testing', desc: 'Rigorous QA testing ensures a bug-free, secure, and performant product.' },
  { step: '06', title: 'Deployment', desc: 'We seamlessly deploy your application to secure cloud environments.' },
  { step: '07', title: 'Maintenance & Support', desc: 'We provide continuous monitoring, updates, and improvements post-launch.' }
]

export default function DevelopmentProcess() {
  return (
    <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Our Workflow</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mb-6 tracking-tight">How We Deliver Excellence</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            A proven, step-by-step approach to turning your ideas into scalable, real-world technology solutions.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-100 via-primary to-blue-100 -translate-y-1/2 z-0 opacity-50 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {processSteps.slice(0, 4).map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-6xl font-black text-gray-50 absolute right-4 top-4 group-hover:text-blue-50 transition-colors z-0 select-none">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-primary/30">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-12 relative z-10 max-w-4xl mx-auto">
            {processSteps.slice(4).map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-6xl font-black text-gray-50 absolute right-4 top-4 group-hover:text-blue-50 transition-colors z-0 select-none">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-primary/30">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
