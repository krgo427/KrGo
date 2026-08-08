import React, { useState } from 'react'
import { API_BASE_URL, LEADS_API_PATH } from '../config/siteConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', projectType: '', callRequestTime: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      errs.phone = 'Please enter a valid 10-digit phone number.'
    }
    if (!form.projectType.trim()) {
      errs.projectType = 'Please specify the project type.'
    }
    if (!form.callRequestTime) {
      errs.callRequestTime = 'Please select a preferred call time.'
    }
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    
    try {
      setSubmitting(true)

      // 1. Send to Supabase (so it appears in the Admin Portal)
      const { supabase } = await import('../config/supabaseClient');
      const { error: sbError } = await supabase.from('contact_requests').insert([{
        name: form.name.trim(),
        email: null,
        phone: form.phone.trim(),
        message: `Project Type: ${form.projectType}\nCall Time: ${form.callRequestTime}\nMessage: ${form.message.trim()}`
      }]);
      
      if (sbError) {
        throw new Error("Failed to save to database.");
      }

      // 2. Send Email to krgo427@gmail.com via FormSubmit
      try {
        await fetch("https://formsubmit.co/ajax/krgo427@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: "New Consultation Request - KrGo",
            Name: form.name.trim(),
            Phone: form.phone.trim(),
            ProjectType: form.projectType.trim(),
            CallRequestTime: form.callRequestTime,
            Message: form.message.trim() || "No message provided."
          })
        });
      } catch (emailError) {
        console.warn("Failed to send email notification, but saved to DB:", emailError);
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Submit Error:', error)
      setSubmitError('Could not submit your request. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Info */}
        <div>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="section-title text-left">Ready to Transform Your Business?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Fill in the form and we'll get back to you within a few hours. Let's discuss how our technology solutions can accelerate your growth.
          </p>

          <div className="space-y-6 mt-8 hidden md:block">
            <h3 className="text-secondary font-bold text-lg">What happens next?</h3>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="text-secondary font-semibold">We schedule a call</h4>
                <p className="text-sm text-gray-500 mt-1">We'll reach out at your requested time to understand your exact needs.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="text-secondary font-semibold">Get a custom strategy</h4>
                <p className="text-sm text-gray-500 mt-1">We'll provide a free proposal and a clear timeline for your project.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="text-secondary font-semibold">Launch & Scale</h4>
                <p className="text-sm text-gray-500 mt-1">We build your solution and help your business grow effortlessly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="card">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Success!</h3>
              <p className="text-gray-500 mb-4">
                Your request has been sent successfully. We will contact you soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', phone: '', projectType: '', callRequestTime: '', message: '' })
                }}
                className="text-primary font-medium hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h3 className="text-xl font-bold text-secondary mb-1">Get a Free Consultation</h3>
              <p className="text-gray-400 text-sm mb-4">We'll call you back within 2 hours.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1" htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Sharma"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                      errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-bg'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1" htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                      errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-bg'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1" htmlFor="projectType">
                    Project Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="projectType"
                    name="projectType"
                    type="text"
                    value={form.projectType}
                    onChange={handleChange}
                    placeholder="e.g. Custom ERP, AI Chatbot, Website"
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                      errors.projectType ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-bg'
                    }`}
                  />
                  {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
                </div>

                {/* Call Request Time */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1" htmlFor="callRequestTime">
                    Call Request Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="callRequestTime"
                    name="callRequestTime"
                    type="datetime-local"
                    value={form.callRequestTime}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                      errors.callRequestTime ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-bg'
                    }`}
                  />
                  {errors.callRequestTime && <p className="text-red-500 text-xs mt-1">{errors.callRequestTime}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-1" htmlFor="message">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements..."
                  rows={3}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition border-gray-200 bg-bg"
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? 'Submitting...' : 'Send My Request →'}
              </button>
              <p className="text-center text-xs text-gray-400">
                No spam. We'll only contact you regarding your inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
