import React, { useState } from 'react';
import { FaSave, FaExclamationTriangle } from 'react-icons/fa';

const BillingSettings = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings || {
    business_name: 'KrGo Technology Solutions',
    business_address: '',
    business_email: '',
    business_phone: '',
    business_website: 'https://krgo.vercel.app/',
    invoice_prefix: 'KRGO-INV-2026-',
    default_currency: 'INR',
    default_notes: 'Thank you for choosing KrGo Technology Solutions.',
    default_terms: 'Payment is due by the stated due date. Services are provided according to the agreed scope of work.',
    bank_name: '',
    account_holder: '',
    account_number: '',
    ifsc_code: '',
    upi_id: '',
    gst_enabled: false,
    gstin: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Billing Settings</h2>
        <p className="text-gray-400 text-sm">Configure default information for your invoices.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Business Profile */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">Business Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Business Name</label>
              <input type="text" value={formData.business_name} onChange={e => handleChange('business_name', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Website</label>
              <input type="text" value={formData.business_website} onChange={e => handleChange('business_website', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
              <input type="email" value={formData.business_email} onChange={e => handleChange('business_email', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
              <input type="text" value={formData.business_phone} onChange={e => handleChange('business_phone', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">Address</label>
              <textarea rows="2" value={formData.business_address} onChange={e => handleChange('business_address', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* Invoice Defaults */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">Invoice Defaults</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Invoice Prefix</label>
              <input type="text" value={formData.invoice_prefix} onChange={e => handleChange('invoice_prefix', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Default Currency</label>
              <input type="text" value={formData.default_currency} onChange={e => handleChange('default_currency', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">Default Notes</label>
              <textarea rows="2" value={formData.default_notes} onChange={e => handleChange('default_notes', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none resize-none"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">Default Terms & Conditions</label>
              <textarea rows="2" value={formData.default_terms} onChange={e => handleChange('default_terms', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Bank Name</label>
              <input type="text" value={formData.bank_name} onChange={e => handleChange('bank_name', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Account Holder Name</label>
              <input type="text" value={formData.account_holder} onChange={e => handleChange('account_holder', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Account Number</label>
              <input type="text" value={formData.account_number} onChange={e => handleChange('account_number', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">IFSC Code</label>
              <input type="text" value={formData.ifsc_code} onChange={e => handleChange('ifsc_code', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1">UPI ID</label>
              <input type="text" value={formData.upi_id} onChange={e => handleChange('upi_id', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
            </div>
          </div>
        </div>

        {/* Future Tax Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-500 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
            Future Configuration
          </div>
          <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
            Tax Configuration
          </h3>
          <div className="mb-4 p-3 bg-gray-950 border border-gray-800 rounded-lg flex gap-3 text-sm text-gray-400">
            <FaExclamationTriangle className="text-yellow-500 shrink-0 mt-1" />
            <p>
              KrGo Technology Solutions is currently operating as an unregistered business. Tax features should remain disabled until formal registration (GST) is obtained. Do not enable this unless you have a valid GSTIN.
            </p>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <input 
              type="checkbox" 
              id="gst_enabled"
              checked={formData.gst_enabled} 
              onChange={e => handleChange('gst_enabled', e.target.checked)} 
              className="w-4 h-4 rounded bg-gray-900 border-gray-700 text-[#00AEEF] focus:ring-[#00AEEF]"
            />
            <label htmlFor="gst_enabled" className="text-sm font-medium text-white">Enable GST on Invoices</label>
          </div>

          {formData.gst_enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-800">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">GSTIN</label>
                <input type="text" placeholder="Enter valid GSTIN" value={formData.gstin} onChange={e => handleChange('gstin', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#00AEEF] outline-none" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#00AEEF] hover:bg-[#0095CC] text-white rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(0,174,239,0.3)]"
          >
            <FaSave /> Save Settings
          </button>
        </div>

      </form>
    </div>
  );
};

export default BillingSettings;
