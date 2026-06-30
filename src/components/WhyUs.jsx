import React from 'react'

const reasons = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Modern Technology Stack',
    description: 'We use the latest frameworks like React, Node.js, and Python to ensure your solutions are future-proof.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'Scalable Architecture',
    description: 'Our solutions are built to grow with your business, handling increased traffic and data effortlessly.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Delivery',
    description: 'We value your time. We deploy agile methodologies to deliver projects swiftly without compromising quality.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Transparent Communication',
    description: 'We keep you in the loop at every stage. Clear updates, direct access to developers, and no hidden surprises.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Dedicated Support',
    description: 'Post-launch, our team remains available to ensure your application runs smoothly and securely.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Affordable Solutions',
    description: 'Enterprise-grade technology delivered at competitive prices that fit your budget.',
  }
]

const ReasonCard = ({ r }) => (
  <div className="flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
    <div className="w-14 h-14 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-6">
      {r.icon}
    </div>
    <h3 className="text-xl font-bold text-secondary mb-3">{r.title}</h3>
    <p className="text-gray-500 text-base leading-relaxed flex-grow">{r.description}</p>
  </div>
);

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">Why KrGo</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary mb-6 tracking-tight">
            The Right Technology Partner
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We don't just write code; we deliver strategic technology solutions that solve real business problems and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r) => (
            <ReasonCard key={r.title} r={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
