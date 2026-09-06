import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Ready to transform your business with technology? Get in touch with our team today.
          </p>
        </div>
        <Contact />

        {/* Resources / Legal Section */}
        <section className="bg-slate-50 dark:bg-slate-950 py-16 border-t border-gray-100 dark:border-white/10 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* FAQ Section */}
            <div id="faq" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-secondary dark:text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-white/10 rounded-lg bg-white dark:bg-slate-900 overflow-hidden cursor-pointer">
                  <summary className="flex items-center justify-between p-4 font-semibold text-secondary dark:text-slate-200 select-none">
                    What is your typical project timeline?
                    <span className="transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                    Timelines vary depending on project complexity. A standard website takes 2-4 weeks, while complex software or AI solutions may take 2-3 months. We provide detailed estimates during the consultation phase.
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-white/10 rounded-lg bg-white dark:bg-slate-900 overflow-hidden cursor-pointer">
                  <summary className="flex items-center justify-between p-4 font-semibold text-secondary dark:text-slate-200 select-none">
                    Do you provide post-launch support?
                    <span className="transition-transform group-open:rotate-180">↓</span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                    Yes! We offer ongoing maintenance, server hosting, and support packages to ensure your application runs smoothly and securely long after the initial launch.
                  </div>
                </details>
              </div>
            </div>

            {/* Privacy Policy */}
            <div id="privacy-policy" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">Privacy Policy</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-500 dark:text-slate-400">
                <p>At KrGo Technology Solutions, we are committed to protecting your privacy. We collect minimal information necessary to provide you with our services, such as your name, contact details, and project requirements.</p>
                <p>Your data is securely stored and is never sold to third parties. We use industry-standard security measures to protect against unauthorized access or data breaches.</p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div id="terms" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">Terms & Conditions</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-500 dark:text-slate-400">
                <p>By engaging with KrGo Technology Solutions, you agree to our standard service terms. All project scopes, timelines, and deliverables will be clearly outlined in a formal proposal before work begins.</p>
                <p>Payment terms, intellectual property rights, and confidentiality agreements will be customized per contract to ensure mutual protection and satisfaction.</p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
