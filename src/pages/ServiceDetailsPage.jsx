import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { servicesBySlug } from "../data/servicesData";
import CallToAction from "../components/CallToAction";

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const service = servicesBySlug[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl font-bold text-secondary mb-3">Service not found</h1>
            <p className="text-gray-500 mb-6">Please go back and choose a valid service.</p>
            <Link to="/#services" className="btn-primary">
              Back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 min-h-screen bg-gray-50">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full mb-20">
          <Link to="/#services" className="inline-flex items-center gap-2 text-primary font-bold hover:text-blue-700 transition-colors uppercase tracking-wider text-sm mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to services
          </Link>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-secondary p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">{service.title}</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto relative z-10 leading-relaxed">{service.shortDescription}</p>
            </div>
            
            <div className="p-8 md:p-12 lg:p-16">
              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                <h2 className="text-2xl font-bold text-secondary mb-4">Overview</h2>
                <p className="leading-relaxed">{service.details}</p>
              </div>

              <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-secondary mb-6">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                      <div className="mt-0.5 bg-accent/10 rounded-full p-1 text-accent flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
