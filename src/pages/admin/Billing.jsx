import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import logoUrl from '../../assets/logo.png';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaBriefcase, FaHandshake } from 'react-icons/fa';

const Billing = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    taxRate: 0,
    advanceReceived: 0,
    includedInPackage: 'Business Website\nAdmin Portal\nQR Campaign System\nQR Generation System\nQR Validation System\n3 Years Domain Registration',
    notes: 'Hosting/VPS charges are separate and will be billed only if required.\nOne minor website change/update is included free of charge after delivery.'
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('id, name, company, email, phone');
    if (data) setClients(data);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!formData.clientId) {
      alert("Please select a client.");
      return;
    }

    // Call window.print to open print dialog
    setTimeout(() => {
      window.print();
    }, 100);

    // Optionally save to DB
    const client = clients.find(c => c.id === formData.clientId);
    if (!client) return;

    try {
      const invoiceNumber = `INV-${new Date(formData.invoiceDate).getFullYear()}-${Date.now().toString().slice(-4)}`;
      const subtotal = formData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
      const advance = Number(formData.advanceReceived) || 0;
      const balance = subtotal - advance;
      const paymentStatusText = balance <= 0 ? "fully paid" : (advance > 0 ? "partially paid" : "unpaid");

      await supabase.from('bills').insert([{
        client_id: client.id,
        invoice_number: invoiceNumber,
        amount: balance,
        status: paymentStatusText
      }]);
    } catch (err) {
      console.log("Supabase save optional/failed");
    }
  };

  // Data for rendering the invoice
  const client = clients.find(c => c.id === formData.clientId) || {};
  const dateObj = new Date(formData.invoiceDate);
  const formattedDate = isNaN(dateObj) ? '' : dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const invoiceNumber = isNaN(dateObj) ? '' : `INV-${dateObj.getFullYear()}-${Date.now().toString().slice(-4)}`;
  const subtotal = formData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const advance = Number(formData.advanceReceived) || 0;
  const balance = subtotal - advance;
  const paymentStatus = balance <= 0 ? "FULLY PAID" : (advance > 0 ? "PARTIALLY PAID" : "UNPAID");

  const includedItems = formData.includedInPackage.split('\n').filter(i => i.trim() !== '');
  const noteItems = formData.notes.split('\n').filter(i => i.trim() !== '');

  return (
    <>
      {/* --- ADMIN UI (HIDDEN ON PRINT) --- */}
      <div className="print:hidden">
        <h1 className="text-3xl font-bold text-white mb-8">Premium Bill Generator (HTML)</h1>
        
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleGenerate} className="space-y-8">
            {/* CLIENT & DATE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-950/50 p-6 rounded-xl border border-gray-800/50">
              <div className="col-span-1">
                <label className="block text-gray-400 text-sm mb-2">Select Client</label>
                <select 
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF] appearance-none"
                >
                  <option value="">-- Select a Client --</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company || 'No Company'})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Invoice Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.invoiceDate}
                  onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* INVOICE ITEMS */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Invoice Items</h3>
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 items-end bg-gray-950/50 p-4 rounded-xl border border-gray-800/50">
                    <div className="flex-1 w-full">
                      <label className="block text-gray-500 text-xs mb-1">Description of Services</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Website Development + Admin Portal"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]"
                      />
                    </div>
                    <div className="w-full md:w-40">
                      <label className="block text-gray-500 text-xs mb-1">Amount (Rs.)</label>
                      <input 
                        type="number" 
                        min="0"
                        step="1"
                        required
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]"
                      />
                    </div>
                    {formData.items.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeItem(index)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg h-10 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                onClick={addItem}
                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors inline-block"
              >
                + Add Item
              </button>
            </div>

            {/* ADVANCE, INCLUDED, NOTES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Advance Received (Rs.)</label>
                  <input 
                    type="number"
                    min="0"
                    value={formData.advanceReceived}
                    onChange={(e) => setFormData({...formData, advanceReceived: e.target.value})}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>
                <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex flex-col justify-center h-40">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#00AEEF] hover:bg-[#0095CC] text-white font-bold text-lg rounded-xl transition-colors shadow-[0_0_15px_rgba(0,174,239,0.3)] flex justify-center items-center gap-2"
                  >
                    Download PDF
                  </button>
                  <p className="text-xs text-gray-500 mt-3 text-center">Uses native browser printing.</p>
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-gray-400 text-sm mb-2">Included In Package (One per line)</label>
                <textarea 
                  rows="7"
                  value={formData.includedInPackage}
                  onChange={(e) => setFormData({...formData, includedInPackage: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF] resize-none"
                ></textarea>
              </div>

              <div className="col-span-1">
                <label className="block text-gray-400 text-sm mb-2">Notes (One per line)</label>
                <textarea 
                  rows="7"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF] resize-none"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* --- INVOICE RENDER (HIDDEN UNLESS PRINTING) --- */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-print-area, #invoice-print-area * { visibility: visible; }
          #invoice-print-area {
            position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0;
            background-color: white !important;
            color: black !important;
          }
          /* Hide scrollbars and layout wrappers */
          body { margin: 0; padding: 0; background: white; }
          /* Ensure colors print correctly */
          * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        /* We also hide the print area completely when NOT printing */
        @media screen {
          #invoice-print-area { display: none; }
        }
      `}</style>

      <div id="invoice-print-area" className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[20mm] text-gray-800 font-sans box-border relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-16 border-b-4 border-gray-900 pb-8">
          {/* Logo & Company Info */}
          <div className="flex flex-col gap-5">
            <img src={logoUrl} alt="KrGo Logo" className="h-16 w-auto max-w-[200px] object-contain" />
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="font-bold text-gray-900 text-xl mb-1">KRGO Software Solutions</p>
              <p className="font-medium text-gray-700">Web Development & Digital Solutions</p>
              <p className="mt-2">+91 9325791196</p>
              <p>krgo427@gmail.com</p>
              <p>India</p>
            </div>
          </div>
          
          {/* Invoice Title & Meta */}
          <div className="text-right flex flex-col justify-between h-full">
            <h1 className="text-5xl font-light text-gray-300 uppercase tracking-widest mb-6 mt-2">Invoice</h1>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 self-end">
              <span className="font-semibold text-gray-900 text-right">Invoice No:</span>
              <span className="text-right text-gray-800">{invoiceNumber || 'INV-0000-0000'}</span>
              
              <span className="font-semibold text-gray-900 text-right">Date:</span>
              <span className="text-right text-gray-800">{formattedDate || 'DD Month YYYY'}</span>
            </div>
          </div>
        </div>

        {/* BILL TO */}
        <div className="mb-12">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Bill To</h3>
          <div className="text-gray-800 leading-relaxed">
            <p className="font-bold text-gray-900 text-xl">{client.name || 'Client Name'}</p>
            {client.company && <p className="text-lg">{client.company}</p>}
            {client.phone && <p className="mt-1 text-gray-600">{client.phone}</p>}
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-900 text-gray-900">
                <th className="py-4 px-2 font-bold text-center w-16 uppercase text-xs tracking-wider">Item</th>
                <th className="py-4 px-2 font-bold uppercase text-xs tracking-wider">Description</th>
                <th className="py-4 px-2 font-bold text-right w-40 uppercase text-xs tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-5 px-2 text-center text-gray-500">{index + 1}</td>
                  <td className="py-5 px-2 text-gray-900 font-medium">{item.description}</td>
                  <td className="py-5 px-2 text-right text-gray-900 font-bold">₹{(item.quantity * item.price).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SUMMARY SECTION */}
        <div className="flex justify-end mb-16">
          <div className="w-1/2">
            <div className="flex justify-between py-3 border-b border-gray-200 text-gray-600">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200 text-gray-600">
              <span className="font-medium">Advance Received</span>
              <span className="font-medium text-red-600">- ₹{advance.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-4 text-xl font-bold text-gray-900 border-b-4 border-gray-900">
              <span>Balance Due</span>
              <span>₹{balance.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-right mt-3">
              <span className={`text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest ${balance <= 0 ? 'bg-gray-100 text-gray-900' : (advance > 0 ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-900')}`}>
                Status: {paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* NOTES & INCLUDED */}
        <div className="grid grid-cols-2 gap-12 text-sm text-gray-600">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-widest text-xs border-b border-gray-200 pb-2">Included in Package</h3>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-gray-400">
              {includedItems.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-widest text-xs border-b border-gray-200 pb-2">Notes & Terms</h3>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-gray-400">
              {noteItems.map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="absolute bottom-[20mm] right-[20mm] w-56 text-center">
          {/* Signature Image (Loaded from public folder) */}
          <img src="/signature.png" alt="Signature" className="h-16 w-full object-contain mx-auto mb-2" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          {/* Fallback text if signature image fails to load */}
          <div className="hidden text-gray-800 font-serif italic text-3xl mb-2 w-full text-center">KrGo Admin</div>
          <div className="w-full border-t-2 border-gray-900 pt-3 text-xs font-bold text-gray-900 uppercase tracking-widest">
            Authorized Signature
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
