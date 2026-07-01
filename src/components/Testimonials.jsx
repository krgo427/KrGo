import React from 'react'

const testimonials = [
  {
    name: 'Ramesh Gupta',
    business: 'Gupta Medical Store, Jaipur',
    avatar: 'RG',
    color: 'bg-blue-600',
    rating: 4,
    text: "I didn't know much about websites, but my son said we needed one for the pharmacy. The KrGo team was very patient and set it up for us. Now people find our shop address on Google much easier.",
  },
  {
    name: 'Priya Sharma',
    business: 'Priya Beauty Parlour, Pune',
    avatar: 'PS',
    color: 'bg-pink-500',
    rating: 5,
    text: "Honestly I was delaying getting a website because I thought it would be too expensive. But they made a very nice booking page for my parlor at a good price. I get at least 3-4 appointments directly from the site every week now.",
  },
  {
    name: 'Vikash Singh',
    business: 'Singh Furniture Works, Lucknow',
    avatar: 'VS',
    color: 'bg-amber-600',
    rating: 4,
    text: "Good work by the team. They delivered the website in exactly 3 days like they promised. There was a small spelling mistake initially but they fixed it immediately when I told them. Very happy overall.",
  },
  {
    name: 'Anita Patel',
    business: 'Patel Tiffin Service, Surat',
    avatar: 'AP',
    color: 'bg-green-600',
    rating: 5,
    text: "Since we started the tiffin service from home, it was hard to reach new people. Having a website with a menu and a direct WhatsApp button really helped. People just click and send us their lunch orders.",
  },
  {
    name: 'Mohammed Raza',
    business: 'Raza Electricals, Hyderabad',
    avatar: 'MR',
    color: 'bg-purple-600',
    rating: 5,
    text: "We needed a corporate looking site for our electrical contracting business. KrGo understood the requirement perfectly. The design is clean, works well on mobile, and the team provided good support.",
  },
  {
    name: 'Sunita Devi',
    business: 'Sunita Tailoring House, Patna',
    avatar: 'SD',
    color: 'bg-rose-500',
    rating: 5,
    text: "Mujhe pehle laga ki boutique ke liye website zaroori nahi hai, par inhone kaafi simple tarike se samjhaya. Ab mera online portfolio dekh ke door se bhi customers aane lage hain. Kaam badiya kiya inlogon ne.",
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="w-[300px] sm:w-[350px] md:w-[400px] flex-shrink-0 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col relative whitespace-normal">
      <span className="absolute top-4 right-8 text-[80px] leading-none text-gray-50 font-serif select-none pointer-events-none">
        "
      </span>
      <Stars count={t.rating} />
      <p className="text-gray-600 text-base leading-relaxed mt-4 mb-6 relative z-10 flex-1">
        "{t.text}"
      </p>
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
        <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <span className="text-white font-bold text-xs">{t.avatar}</span>
        </div>
        <div>
          <p className="font-semibold text-secondary text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs">{t.business}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-12 md:py-16 bg-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        {/* Header */}
        <div className="text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Client Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Clients Say</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Real stories from real business owners across India who grew their businesses online.
          </p>
        </div>
      </div>

      {/* Infinite Slider */}
      <div className="relative max-w-[1600px] mx-auto pb-10">
        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-hidden group">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8">
              {testimonials.map((t, idx) => (
                <TestimonialCard t={t} key={`block1-${idx}`} />
              ))}
            </div>
            <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8">
              {testimonials.map((t, idx) => (
                <TestimonialCard t={t} key={`block2-${idx}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mt-8 flex justify-between items-center text-center gap-2 sm:gap-8">
          {[
            { value: '15+', label: 'Happy Clients' },
            { value: '4.7★', label: 'Average Rating' },
            { value: '100%', label: 'On-Time Delivery' },
          ].map((badge) => (
            <div key={badge.label} className="flex flex-col items-center flex-1">
              <span className="text-xl sm:text-3xl font-bold text-primary leading-tight">{badge.value}</span>
              <span className="text-gray-500 text-[10px] sm:text-sm mt-1 whitespace-nowrap">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  )
}
