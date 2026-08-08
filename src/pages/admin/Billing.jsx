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

      <div id="invoice-print-area" className="w-[210mm] min-h-[297mm] mx-auto bg-white p-[15mm] text-gray-800 font-sans box-border relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6 border-b-2 border-[#0B42A4] pb-6">
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="Logo" className="h-16 w-16 object-contain" />
            <div>
              <h1 className="text-[#0B42A4] text-3xl font-extrabold tracking-wide uppercase m-0 leading-none">KRGO</h1>
              <h2 className="text-gray-900 text-lg font-bold tracking-wide uppercase m-0 leading-tight">Software Solutions</h2>
              <p className="text-[#0B42A4] text-sm font-medium m-0">Web Development & Digital Solutions</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 text-sm text-gray-800 mt-2">
            <div className="flex items-center gap-3 justify-end">
              <span>+91 9325791196</span>
              <div className="w-6 h-6 rounded-full bg-[#0B42A4] text-white flex items-center justify-center text-xs"><FaPhoneAlt /></div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <span>krgo427@gmail.com</span>
              <div className="w-6 h-6 rounded-full bg-[#0B42A4] text-white flex items-center justify-center text-xs"><FaEnvelope /></div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <span>India</span>
              <div className="w-6 h-6 rounded-full bg-[#0B42A4] text-white flex items-center justify-center text-xs"><FaMapMarkerAlt /></div>
            </div>
          </div>
        </div>

        {/* INVOICE TITLE */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-[#0B42A4] flex-1"></div>
          <div className="w-2 h-2 rounded-full bg-[#0B42A4] mx-2"></div>
          <h2 className="text-3xl font-bold text-[#0B42A4] mx-4 tracking-widest">INVOICE</h2>
          <div className="w-2 h-2 rounded-full bg-[#0B42A4] mx-2"></div>
          <div className="h-px bg-[#0B42A4] flex-1"></div>
        </div>

        {/* INVOICE META */}
        <div className="flex border border-[#b4c8eb] rounded-lg overflow-hidden mb-6">
          <div className="flex-1 p-4 border-r border-[#b4c8eb]">
            <p className="text-[#0B42A4] text-xs font-semibold mb-1">Invoice No.</p>
            <p className="font-bold text-gray-900 text-lg">{invoiceNumber || 'INV-0000-0000'}</p>
          </div>
          <div className="flex-1 p-4">
            <p className="text-[#0B42A4] text-xs font-semibold mb-1">Date</p>
            <p className="font-bold text-gray-900 text-lg">{formattedDate || 'DD Month YYYY'}</p>
          </div>
        </div>

        {/* BILL TO */}
        <div className="border border-[#b4c8eb] rounded-lg relative pt-10 pb-4 px-6 mb-8 flex justify-between">
          <div className="absolute top-0 left-0 bg-[#0B42A4] text-white text-xs font-bold px-6 py-2 rounded-tl-lg rounded-br-lg">
            BILL TO
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0B42A4] text-white flex items-center justify-center"><FaUser /></div>
              <div>
                <p className="text-[#0B42A4] text-xs font-semibold leading-none">Client Name</p>
                <p className="text-gray-900 font-bold">{client.name || 'Client Name'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0B42A4] text-white flex items-center justify-center"><FaBriefcase /></div>
              <div>
                <p className="text-[#0B42A4] text-xs font-semibold leading-none">Business Name</p>
                <p className="text-gray-900 font-bold">{client.company || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0B42A4] text-white flex items-center justify-center"><FaPhoneAlt size={12} /></div>
              <div>
                <p className="text-[#0B42A4] text-xs font-semibold leading-none">Phone</p>
                <p className="text-gray-900 font-bold">{client.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pr-10 opacity-20 text-[#0B42A4]">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
              <circle cx="12" cy="15" r="4" fill="white" stroke="currentColor" strokeWidth="1.5"></circle>
              <text x="12" y="16.5" fontSize="5" textAnchor="middle" fill="currentColor" strokeWidth="0">₹</text>
            </svg>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="mb-6 rounded-lg overflow-hidden border border-[#b4c8eb]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B42A4] text-white text-sm">
                <th className="py-3 px-4 font-semibold text-center border-r border-[#0B42A4]/50 w-16">Sr. No.</th>
                <th className="py-3 px-4 font-semibold border-r border-[#0B42A4]/50">Description of Services</th>
                <th className="py-3 px-4 font-semibold text-center w-40">Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index} className="border-b border-[#b4c8eb] last:border-0">
                  <td className="py-4 px-4 text-center text-sm font-medium border-r border-[#b4c8eb]">{index + 1}</td>
                  <td className="py-4 px-4 text-sm font-medium border-r border-[#b4c8eb]">{item.description}</td>
                  <td className="py-4 px-4 text-center text-sm font-medium">Rs. {(item.quantity * item.price).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="border border-[#b4c8eb] rounded-lg relative pt-10 pb-4 px-0 mb-8 flex bg-white">
          <div className="absolute top-0 left-0 bg-[#0B42A4] text-white text-xs font-bold px-6 py-2 rounded-br-3xl">
            PAYMENT SUMMARY
          </div>
          
          <div className="w-2/3 px-6 space-y-4 border-r border-[#b4c8eb]">
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>Advance Received</span>
              <span>Rs. {advance.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-dashed border-[#b4c8eb] pt-3">
              <div className="flex justify-between text-base font-bold text-[#D93025]">
                <span>Balance Amount Payable</span>
                <span>Rs. {balance.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="w-1/3 flex flex-col items-center justify-center bg-[#E6F0FA] m-2 mt-[-1rem] rounded-lg py-4">
             <div className="text-[#0B42A4] mb-2">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                 <polyline points="14 2 14 8 20 8"></polyline>
                 <circle cx="12" cy="15" r="3" fill="currentColor"></circle>
                 <text x="12" y="16" fontSize="4" textAnchor="middle" fill="white" strokeWidth="0">₹</text>
               </svg>
             </div>
             <p className="text-[#0B42A4] text-xs font-semibold mb-1">Payment Status</p>
             <p className="text-[#0B42A4] text-lg font-bold uppercase">{paymentStatus}</p>
          </div>
        </div>

        {/* PACKAGE & NOTES */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="border border-[#b4c8eb] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-[#0B42A4] text-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-[#0B42A4] font-bold text-sm">INCLUDED IN PACKAGE</h3>
            </div>
            <ul className="space-y-2">
              {includedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-medium text-gray-800">
                  <div className="w-3 h-3 rounded-full bg-[#0B42A4] text-white flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[#b4c8eb] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-[#0B42A4] text-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 className="text-[#0B42A4] font-bold text-sm">NOTES</h3>
            </div>
            <ul className="space-y-2 list-disc pl-4">
              {noteItems.map((item, idx) => (
                <li key={idx} className="text-xs font-medium text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t-2 border-[#0B42A4] pt-6 flex justify-between items-end absolute bottom-[15mm] left-[15mm] right-[15mm]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0B42A4] text-white flex items-center justify-center text-xl">
              <FaHandshake />
            </div>
            <div>
              <p className="text-[#0B42A4] italic font-serif text-2xl leading-none">Thank you</p>
              <p className="text-gray-800 text-sm font-medium">for your business!</p>
            </div>
          </div>

          <div className="flex items-end gap-6">
            <div className="border-r border-[#b4c8eb] pr-6 pb-2">
              <p className="text-[#0B42A4] text-xs font-semibold">Prepared By</p>
              <p className="text-gray-900 font-bold text-sm">KRGO Software Solutions</p>
            </div>

            <div className="flex flex-col items-center justify-end w-40 relative">
              {/* Signature Image (Loaded from public folder) */}
              <img src="/signature.png" alt="Signature" className="h-16 object-contain absolute bottom-6" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
              {/* Fallback text if signature image fails to load */}
              <div className="hidden text-[#0B42A4] font-serif italic text-2xl absolute bottom-6 w-full text-center">KrGo Admin</div>
              <div className="w-full border-t border-gray-900 mt-16 pt-1 text-center text-xs font-medium text-gray-800">
                Authorized Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
