import React from 'react'
import MagicBento from './MagicBento'
import AutoHorizontalSlider from './AutoHorizontalSlider'

const processSteps = [
  {
    step: '01 Discovery',
    title: 'Requirement Analysis',
    desc: 'We deeply understand your business needs, target audience, and project objectives.'
  },
  {
    step: '02 Planning',
    title: 'Strategic Planning',
    desc: 'We map out the architecture, tech stack, and timeline to ensure a clear roadmap.'
  },
  {
    step: '03 Design',
    title: 'UI/UX Design',
    desc: 'We create intuitive, engaging, and premium wireframes and high-fidelity visual designs.'
  },
  {
    step: '04 Build',
    title: 'Development',
    desc: 'Our engineers build the solution using scalable, secure, and modern technology stacks.'
  },
  {
    step: '05 Testing',
    title: 'Rigorous QA & Testing',
    desc: 'Comprehensive quality assurance testing ensures a bug-free, secure, and performant product.'
  },
  {
    step: '06 Launch',
    title: 'Deployment & Support',
    desc: 'We seamlessly deploy to secure cloud environments and provide continuous maintenance.'
  }
];

export default function DevelopmentProcess() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0712] relative overflow-hidden bento-section">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Our Workflow</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">How We Deliver Excellence</h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light">
            A proven, step-by-step approach to turning your ideas into scalable, real-world technology solutions.
          </p>
        </div>

        {/* Desktop Bento Grid (hidden md:block) */}
        <div className="hidden md:block">
          <MagicBento />
        </div>

        {/* Mobile Automatic Horizontal Slider (md:hidden) */}
        <div className="md:hidden">
          <AutoHorizontalSlider interval={3200}>
            {processSteps.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#120F17] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between h-[230px] shadow-lg text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full pointer-events-none"></div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-block mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </AutoHorizontalSlider>
        </div>
      </div>
    </section>
  )
}
