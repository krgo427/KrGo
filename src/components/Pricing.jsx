import React from 'react'

const plans = [
  {
    name: 'BASIC',
    price: '₹5,000',
    desc: 'Start your business online',
    features: [
      'Professional website to attract local customers',
      'Customers can contact you directly from your website',
      'Mobile-friendly website (works on all devices)',
      'Fast delivery (2–3 days)',
      'Basic business information setup',
      '1 free revision',
    ],
    cta: 'Start My Website',
    highlight: false,
  },
  {
    name: 'STANDARD',
    price: '₹10,000',
    desc: 'Get more customers and enquiries',
    features: [
      'Everything in Basic',
      'Your business appears on Google (basic visibility setup)',
      'WhatsApp enquiry integration (instant customer contact)',
      'Contact form to collect customer enquiries',
      'Includes 2 free revisions to adjust your website',
      'Better design with multiple sections/pages',
      'Designed to increase customer enquiries',
    ],
    cta: 'Get My Business Online',
    highlight: true,
  },
  {
    name: 'PREMIUM',
    price: '₹20,000',
    desc: 'Grow your business and dominate locally',
    features: [
      'Everything in Standard',
      'Advanced SEO optimization (rank better on Google)',
      'Google Maps integration (customers can find your location easily)',
      'Google Business Profile setup',
      'Includes 5 free revisions for full flexibility',
      'Priority support (faster response)',
      'Performance tracking (see how many people visit your site)',
      'Complete setup so you don’t need to manage anything',
    ],
    cta: 'Book My Website',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Smart Investment for Growth</p>
          <h2 className="section-title">Get Your Business Online & Start Getting Customers</h2>
          <p className="section-subtitle">
            A one-time affordable investment with no hidden charges. Stop missing out on customers who are searching for you online.
          </p>
          
          <div className="mt-6 inline-flex text-center border border-accent/20 bg-accent/5 text-accent font-semibold px-4 py-2 rounded-full text-sm">
            Offer valid for first 10 businesses
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-start mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-8 flex flex-col h-full ${
                plan.highlight
                  ? 'border-primary bg-primary text-white shadow-2xl scale-105'
                  : 'border-gray-100 bg-white shadow-sm hover:shadow-md'
              } transition-shadow duration-200`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max">
                  <span className="bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-secondary'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-blue-100' : 'text-gray-400'}`}>{plan.desc}</p>
                <p className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-secondary'}`}>
                  {plan.price}
                </p>
                {plan.subtitle && (
                  <p className={`text-sm font-semibold mt-2 ${plan.highlight ? 'text-yellow-300' : 'text-primary'}`}>{plan.subtitle}</p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-accent' : 'text-accent'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm leading-snug ${plan.highlight ? 'text-blue-50' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                  plan.highlight
                    ? 'bg-white text-primary hover:bg-blue-50'
                    : 'bg-primary text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
