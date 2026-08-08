import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Billing = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    taxRate: 18, // Default 18% GST for example
    notes: 'Thank you for your business!'
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

  const generatePDF = async (e) => {
    e.preventDefault();
    if (!formData.clientId) {
      alert("Please select a client.");
      return;
    }

    const client = clients.find(c => c.id === formData.clientId);
    if (!client) return;

    const doc = new jsPDF();
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    // Brand Colors
    const primaryColor = [0, 174, 239]; // #00AEEF

    // Header
    doc.setFontSize(24);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("KrGo", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Digital Consultancy Services", 14, 28);
    
    // Invoice details (Right aligned)
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("INVOICE", 150, 22);
    
    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoiceNumber}`, 150, 30);
    doc.text(`Date: ${formData.invoiceDate}`, 150, 35);
    doc.text(`Due Date: ${formData.dueDate || 'N/A'}`, 150, 40);

    // Bill To
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text("Bill To:", 14, 50);
    doc.setFontSize(10);
    doc.text(`${client.name}`, 14, 56);
    if (client.company) doc.text(`${client.company}`, 14, 61);
    doc.text(`${client.email}`, 14, 66);
    if (client.phone) doc.text(`${client.phone}`, 14, 71);

    // Table Data
    const tableColumn = ["Description", "Quantity", "Price (₹)", "Total (₹)"];
    const tableRows = [];
    
    let subtotal = 0;
    formData.items.forEach(item => {
      const total = item.quantity * item.price;
      subtotal += total;
      tableRows.push([
        item.description,
        item.quantity.toString(),
        item.price.toFixed(2),
        total.toFixed(2)
      ]);
    });

    const tax = subtotal * (formData.taxRate / 100);
    const grandTotal = subtotal + tax;

    autoTable(doc, {
      startY: 80,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: primaryColor, textColor: 255 },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      }
    });

    const finalY = doc.lastAutoTable.finalY || 80;

    // Totals
    doc.setFontSize(10);
    doc.text(`Subtotal:`, 140, finalY + 10);
    doc.text(`₹${subtotal.toFixed(2)}`, 170, finalY + 10, { align: 'right' });
    
    doc.text(`Tax (${formData.taxRate}%):`, 140, finalY + 18);
    doc.text(`₹${tax.toFixed(2)}`, 170, finalY + 18, { align: 'right' });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Total:`, 140, finalY + 28);
    doc.text(`₹${grandTotal.toFixed(2)}`, 170, finalY + 28, { align: 'right' });

    // Notes
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    if (formData.notes) {
      doc.text("Notes:", 14, finalY + 10);
      doc.text(formData.notes, 14, finalY + 15, { maxWidth: 100 });
    }

    // Signature Line
    doc.setDrawColor(0);
    doc.line(14, finalY + 50, 64, finalY + 50);
    doc.text("Authorized Signature", 14, finalY + 55);
    
    // Simulate digital signature (cursive font)
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(0, 50, 150);
    doc.text("KrGo Admin", 20, finalY + 45);

    // Save PDF
    doc.save(`${client.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_invoice_${invoiceNumber}.pdf`);

    // Optionally save bill record to Supabase
    try {
      await supabase.from('bills').insert([{
        client_id: client.id,
        invoice_number: invoiceNumber,
        amount: grandTotal,
        status: 'generated'
      }]);
    } catch (err) {
      console.log("Supabase save optional/failed");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Bill Generator</h1>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <form onSubmit={generatePDF} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Due Date</label>
              <input 
                type="date" 
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF]"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-lg font-medium text-white mb-4">Invoice Items</h3>
            
            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-end bg-gray-950/50 p-4 rounded-xl border border-gray-800/50">
                  <div className="flex-1 w-full">
                    <label className="block text-gray-500 text-xs mb-1">Description</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Service or product description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-gray-500 text-xs mb-1">Qty</label>
                    <input 
                      type="number" 
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                  <div className="w-full md:w-40">
                    <label className="block text-gray-500 text-xs mb-1">Price (₹)</label>
                    <input 
                      type="number" 
                      min="0"
                      step="0.01"
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

          <div className="border-t border-gray-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Notes</label>
              <textarea 
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF] resize-none"
              ></textarea>
            </div>
            
            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex flex-col justify-center">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Tax Rate (%)</span>
                <input 
                  type="number" 
                  min="0" max="100" 
                  value={formData.taxRate} 
                  onChange={(e) => setFormData({...formData, taxRate: Number(e.target.value)})}
                  className="w-20 bg-gray-900 border border-gray-700 rounded text-right px-2 py-1 text-white text-sm"
                />
              </div>
              
              <button 
                type="submit"
                className="mt-6 w-full py-3 bg-[#00AEEF] hover:bg-[#0095CC] text-white font-semibold rounded-xl transition-colors shadow-[0_0_15px_rgba(0,174,239,0.3)] flex justify-center items-center gap-2"
              >
                Generate & Download PDF
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">Your digital signature will be automatically attached.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Billing;
