import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaEye, FaArrowLeft, FaUserCheck } from 'react-icons/fa';
import InvoicePreview from './InvoicePreview';
import { formatCurrency } from '../../../utils/currency';
import { supabase } from '../../../config/supabaseClient';

const InvoiceEditor = ({ initialData, settings, onSave, onCancel }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [savedClients, setSavedClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');

  useEffect(() => {
    fetchSavedClients();
  }, []);

  const fetchSavedClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .or('is_deleted.is.null,is_deleted.eq.false')
      .order('name', { ascending: true });

    if (!error && data) {
      setSavedClients(data);
    }
  };

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);
    if (!clientId) return;

    const found = savedClients.find(c => c.id === clientId);
    if (found) {
      const fullAddressParts = [
        found.address,
        found.city,
        [found.state, found.pincode].filter(Boolean).join(' '),
        found.gstin ? `GSTIN: ${found.gstin}` : null
      ].filter(Boolean);

      setInvoice(prev => ({
        ...prev,
        client_name: found.name || '',
        client_company: found.company || '',
        client_email: found.email || '',
        client_phone: found.phone || '',
        client_address: fullAddressParts.join('\n')
      }));
    }
  };
  
  const defaultInvoiceData = {
    invoice_number: settings?.invoice_prefix + Date.now().toString().slice(-4),
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    status: 'Pending',
    client_name: '',
    client_company: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    project_name: '',
    reference_number: '',
    invoice_type: 'Initial Payment',
    currency: settings?.default_currency || 'INR',
    items: [{ service_name: '', description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    discount: 0,
    total_amount: 0,
    advance_payment: 0,
    payment_date: '',
    balance_due: 0,
    tax_type: '',
    tax_rate: 0,
    tax_amount: 0,
    notes: settings?.default_notes || 'Thank you for choosing KrGo Technology Solutions.',
    terms: settings?.default_terms || 'Payment is due by the stated due date. Services are provided according to the agreed scope of work.',
  };

  const [invoice, setInvoice] = useState(initialData || defaultInvoiceData);

  // Recalculate totals whenever items, discount, or tax change
  useEffect(() => {
    const subtotal = invoice.items.reduce((acc, item) => acc + ((Number(item.quantity) || 1) * Number(item.rate)), 0);
    const discount = Number(invoice.discount) || 0;
    let taxableAmount = subtotal - discount;
    let taxAmount = 0;
    
    if (settings?.gst_enabled && invoice.tax_rate) {
      taxAmount = (taxableAmount * Number(invoice.tax_rate)) / 100;
    } else {
      // If we wanted to allow manual tax override without gst_enabled, we could use invoice.tax_amount directly, 
      // but the prompt says tax config is disabled by default.
    }

    const total = taxableAmount + taxAmount;
    const advance = Number(invoice.advance_payment) || 0;
    const balance = invoice.status?.toLowerCase() === 'paid' ? 0 : (total - advance);

    setInvoice(prev => ({
      ...prev,
      subtotal,
      tax_amount: taxAmount,
      total_amount: total,
      balance_due: balance
    }));
  }, [invoice.items, invoice.discount, invoice.tax_rate, invoice.advance_payment, invoice.status, settings?.gst_enabled]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    
    // Auto calculate line amount
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = (Number(newItems[index].quantity) || 1) * Number(newItems[index].rate);
    }
    
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { service_name: '', description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!invoice.client_name.trim()) {
      alert("Please enter a Client Name.");
      return;
    }
    
    if (invoice.items.length === 0) {
      alert("Please add at least one line item.");
      return;
    }

    // Check if items have names
    const invalidItem = invoice.items.find(item => !item.service_name.trim());
    if (invalidItem) {
      alert("Please provide a Service name for all line items.");
      return;
    }

    onSave(invoice);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onCancel} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
          <FaArrowLeft /> Back
        </button>
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <FaEye /> {isPreview ? 'Edit Form' : 'Live Preview'}
          </button>
          <button 
            type="submit"
            form="invoice-form"
            className="flex items-center gap-2 px-4 py-2 bg-[#00AEEF] hover:bg-[#0095CC] text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(0,174,239,0.3)]"
          >
            <FaSave /> Save Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* EDITOR FORM */}
        <div className={`space-y-6 ${isPreview ? 'hidden xl:block opacity-50 pointer-events-none' : 'block'}`}>
          <form id="invoice-form" onSubmit={handleSubmit} className="space-y-8 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
            
            {/* Meta Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Invoice Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Invoice Number *</label>
                  <input type="text" value={invoice.invoice_number} onChange={e => setInvoice({...invoice, invoice_number: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
                  <select value={invoice.status} onChange={e => setInvoice({...invoice, status: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none">
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Invoice Date *</label>
                  <input type="date" value={invoice.invoice_date} onChange={e => setInvoice({...invoice, invoice_date: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none" style={{ colorScheme: 'dark' }} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Business Name</label>
                  <input type="text" value={invoice.project_name} onChange={e => setInvoice({...invoice, project_name: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Invoice Type</label>
                  <select value={invoice.invoice_type || 'Standard'} onChange={e => setInvoice({...invoice, invoice_type: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none">
                    <option value="Standard">Standard</option>
                    <option value="Initial Payment">Initial Payment</option>
                    <option value="Partial Payment">Partial Payment</option>
                    <option value="Final Payment">Final Payment</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                <h3 className="text-lg font-semibold text-white">Client Details</h3>
                <div className="flex items-center gap-2">
                  <FaUserCheck className="text-[#00AEEF] text-xs" />
                  <span className="text-xs text-gray-400 font-medium">Select Saved Client:</span>
                </div>
              </div>

              {/* Saved Client Quick-Select Dropdown */}
              <div className="mb-4 bg-gray-950/80 p-3 rounded-xl border border-[#00AEEF]/30">
                <select 
                  value={selectedClientId}
                  onChange={e => handleSelectClient(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-xs focus:border-[#00AEEF] outline-none"
                >
                  <option value="">-- Choose Saved Client (Auto-fill) --</option>
                  {savedClients.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? `(${c.company})` : ''} {c.phone ? `- ${c.phone}` : ''}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-500 mt-1">
                  Selecting a client will automatically fill the fields below. All fields remain fully editable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Client Name *</label>
                  <input type="text" value={invoice.client_name} onChange={e => setInvoice({...invoice, client_name: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none" placeholder="e.g. Ramesh Sharma" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Company Name</label>
                  <input type="text" value={invoice.client_company} onChange={e => setInvoice({...invoice, client_company: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none" placeholder="e.g. Sharma Pvt Ltd" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                  <input type="email" value={invoice.client_email} onChange={e => setInvoice({...invoice, client_email: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none" placeholder="client@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
                  <input type="text" value={invoice.client_phone} onChange={e => setInvoice({...invoice, client_phone: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00AEEF] outline-none" placeholder="+91 9876543210" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-400 mb-1">Billing Address</label>
                  <textarea rows="2" value={invoice.client_address || ''} onChange={e => setInvoice({...invoice, client_address: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-xs focus:border-[#00AEEF] outline-none resize-none" placeholder="Street, City, State, Pincode, GSTIN" />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Line Items</h3>
              <div className="space-y-4">
                {invoice.items.map((item, index) => (
                  <div key={index} className="bg-gray-950/50 p-4 rounded-xl border border-gray-800">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-7">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Service</label>
                        <input type="text" placeholder="e.g. Website Development" value={item.service_name} onChange={e => handleItemChange(index, 'service_name', e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-white text-sm focus:border-[#00AEEF] outline-none" />
                      </div>
                      <div className="col-span-8 md:col-span-3">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Rate ({invoice.currency})</label>
                        <input type="number" min="0" step="0.01" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-white text-sm focus:border-[#00AEEF] outline-none" />
                      </div>
                      <div className="col-span-12 md:col-span-2 flex justify-end md:justify-center items-end pb-1.5">
                         {invoice.items.length > 1 && (
                            <button type="button" onClick={() => removeItem(index)} className="text-red-400 hover:text-red-300 p-2">
                              <FaTrash size={12} />
                            </button>
                         )}
                      </div>
                      
                      <div className="col-span-12">
                        <input type="text" placeholder="Description (optional)" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-1.5 text-gray-300 text-xs focus:border-[#00AEEF] outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addItem} className="mt-4 flex items-center gap-2 text-sm text-[#00AEEF] hover:text-[#0095CC] font-medium transition-colors">
                <FaPlus size={12} /> Add Item
              </button>
            </div>

            {/* Totals & Discounts */}
            <div className="flex flex-col md:flex-row justify-end border-t border-gray-800 pt-6">
              <div className="w-full md:w-64 space-y-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                </div>

                
                {settings?.gst_enabled && (
                   <div className="flex justify-between items-center text-sm text-gray-400">
                     <span>Tax Rate (%)</span>
                     <input type="number" min="0" step="0.1" value={invoice.tax_rate} onChange={e => setInvoice({...invoice, tax_rate: Number(e.target.value)})} className="w-24 bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white text-right text-xs focus:border-[#00AEEF] outline-none" />
                   </div>
                )}

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-gray-800">
                  <span>Total Amount</span>
                  <span className="text-white">{formatCurrency(invoice.total_amount, invoice.currency)}</span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 pt-2 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <span>Advance Payment</span>
                  </div>
                  <input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    value={invoice.advance_payment} 
                    onChange={e => setInvoice({...invoice, advance_payment: Number(e.target.value)})} 
                    className="w-24 bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white text-right text-xs focus:border-[#00AEEF] outline-none" 
                  />
                </div>

                {(Number(invoice.advance_payment) > 0 || invoice.status === 'Paid') && (
                  <div className="flex justify-between items-center text-sm text-gray-400 pt-2 border-t border-gray-800">
                    <span>Payment Date</span>
                    <input 
                      type="date" 
                      value={invoice.payment_date || ''} 
                      onChange={e => setInvoice({...invoice, payment_date: e.target.value})} 
                      className="w-32 bg-gray-950 border border-gray-800 rounded px-2 py-1 text-white text-xs focus:border-[#00AEEF] outline-none" 
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold text-[#00AEEF] pt-2 border-t border-gray-800">
                  <span>Balance Due</span>
                  <span>{formatCurrency(invoice.balance_due, invoice.currency)}</span>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Notes to Client</label>
                  <textarea rows="4" value={invoice.notes} onChange={e => setInvoice({...invoice, notes: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-xs focus:border-[#00AEEF] outline-none resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Terms & Conditions</label>
                  <textarea rows="4" value={invoice.terms} onChange={e => setInvoice({...invoice, terms: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-xs focus:border-[#00AEEF] outline-none resize-none"></textarea>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* PREVIEW STICKY SECTION */}
        <div className={`xl:sticky top-6 ${isPreview ? 'block w-full' : 'hidden xl:block'}`}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl w-full flex flex-col items-center overflow-hidden">
            <h3 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-6 text-center">Live PDF Preview</h3>
            {/* Proper scaling container for fixed 210mm A4 page */}
            <div className="relative origin-top" style={{ transform: 'scale(0.55)', width: '210mm', height: '297mm', marginBottom: '-60%' }}>
              <InvoicePreview invoice={invoice} settings={settings} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoiceEditor;
