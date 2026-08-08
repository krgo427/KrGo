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

  const loadBase64Image = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return null;
    }
  };

  const generatePDF = async (e) => {
    e.preventDefault();
    if (!formData.clientId) {
      alert("Please select a client.");
      return;
    }

    const client = clients.find(c => c.id === formData.clientId);
    if (!client) return;

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth(); // 210
    const margin = 15;
    
    // Format Date: e.g., "18 June 2026"
    const dateObj = new Date(formData.invoiceDate);
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const invoiceNumber = `INV-${dateObj.getFullYear()}-${Date.now().toString().slice(-4)}`;

    // Brand Colors
    const primaryBlue = [11, 66, 164];    // #0B42A4
    const bgBlue = [238, 245, 255];       // Light Blue for boxes
    const borderBlue = [180, 200, 235];   // Box borders
    const textGray = [80, 80, 80];        // Standard text
    const textDark = [30, 30, 30];        // Headings
    const redAccent = [217, 48, 37];      // Red text

    let y = margin + 5;

    // ==========================================
    // 1. HEADER SECTION
    // ==========================================
    // Left: KG Logo Box
    doc.setFillColor(...primaryBlue);
    doc.roundedRect(margin, y, 22, 22, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("KG", margin + 11, y + 15, { align: "center" });

    // Left: Company Info
    doc.setTextColor(...primaryBlue);
    doc.setFontSize(20);
    doc.text("KRGO", margin + 28, y + 8);
    doc.setTextColor(...textDark);
    doc.setFontSize(14);
    doc.text("SOFTWARE SOLUTIONS", margin + 28, y + 15);
    doc.setTextColor(...primaryBlue);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Web Development & Digital Solutions", margin + 28, y + 21);

    // Right: Contact Info (Placeholder circles for icons)
    const contactX = pageWidth - margin - 45;
    doc.setFontSize(9);
    doc.setTextColor(...textDark);
    
    // Phone
    doc.setFillColor(...primaryBlue);
    doc.circle(contactX - 5, y + 4, 3, 'F');
    doc.text("+91 9325791196", contactX, y + 5);
    // Email
    doc.circle(contactX - 5, y + 12, 3, 'F');
    doc.text("krgo427@gmail.com", contactX, y + 13);
    // Location
    doc.circle(contactX - 5, y + 20, 3, 'F');
    doc.text("India", contactX, y + 21);

    // Separator Line
    y += 30;
    doc.setDrawColor(...primaryBlue);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);

    // ==========================================
    // 2. TITLE "INVOICE"
    // ==========================================
    y += 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...primaryBlue);
    doc.text("INVOICE", pageWidth / 2, y, { align: "center" });
    // Decorative lines next to INVOICE
    doc.line(pageWidth / 2 - 40, y - 2, pageWidth / 2 - 25, y - 2);
    doc.circle(pageWidth / 2 - 23, y - 2, 1, 'F');
    doc.circle(pageWidth / 2 + 23, y - 2, 1, 'F');
    doc.line(pageWidth / 2 + 25, y - 2, pageWidth / 2 + 40, y - 2);

    // ==========================================
    // 3. INVOICE META BOX
    // ==========================================
    y += 8;
    doc.setDrawColor(...borderBlue);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 18, 2, 2, 'FD');
    doc.line(pageWidth / 2, y, pageWidth / 2, y + 18); // Center divider

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...primaryBlue);
    doc.text("Invoice No.", margin + 5, y + 6);
    doc.text("Date", pageWidth / 2 + 5, y + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...textDark);
    doc.text(invoiceNumber, margin + 5, y + 13);
    doc.text(formattedDate, pageWidth / 2 + 5, y + 13);

    // ==========================================
    // 4. BILL TO BOX
    // ==========================================
    y += 24;
    doc.setDrawColor(...borderBlue);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 38, 2, 2, 'FD');
    
    // "BILL TO" Blue Tab
    doc.setFillColor(...primaryBlue);
    doc.roundedRect(margin - 0.5, y - 0.5, 45, 8, 2, 2, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("BILL TO", margin + 5, y + 5);

    // Client Details
    doc.setTextColor(...primaryBlue);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    
    // Icons (Circles)
    doc.setFillColor(...primaryBlue);
    doc.circle(margin + 10, y + 15, 4, 'F');
    doc.circle(margin + 10, y + 25, 4, 'F');
    doc.circle(margin + 10, y + 35, 4, 'F');

    doc.text("Client Name", margin + 18, y + 13);
    doc.text("Business Name", margin + 18, y + 23);
    doc.text("Phone", margin + 18, y + 33);

    doc.setTextColor(...textDark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(client.name, margin + 18, y + 18);
    doc.text(client.company || 'N/A', margin + 18, y + 28);
    doc.text(client.phone || 'N/A', margin + 18, y + 38);

    // Right side graphic placeholder (Receipt with Rs symbol)
    doc.setDrawColor(...borderBlue);
    doc.setFillColor(...bgBlue);
    doc.roundedRect(pageWidth - margin - 40, y + 8, 25, 30, 2, 2, 'F');
    doc.roundedRect(pageWidth - margin - 35, y + 5, 25, 30, 2, 2, 'FD');
    // Lines on receipt
    doc.line(pageWidth - margin - 30, y + 12, pageWidth - margin - 15, y + 12);
    doc.line(pageWidth - margin - 30, y + 16, pageWidth - margin - 15, y + 16);
    doc.line(pageWidth - margin - 30, y + 20, pageWidth - margin - 15, y + 20);
    // Rupee circle
    doc.setFillColor(255, 255, 255);
    doc.circle(pageWidth - margin - 35, y + 20, 6, 'FD');
    doc.setTextColor(...primaryBlue);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Rs.", pageWidth - margin - 38, y + 21);

    // ==========================================
    // 5. TABLE SECTION
    // ==========================================
    y += 48;
    const tableColumn = ["Sr. No.", "Description of Services", "Amount (Rs.)"];
    const tableRows = [];
    
    let subtotal = 0;
    formData.items.forEach((item, index) => {
      const total = item.quantity * item.price;
      subtotal += total;
      tableRows.push([
        (index + 1).toString(),
        item.description,
        `Rs. ${total.toLocaleString('en-IN')}`
      ]);
    });

    const advance = Number(formData.advanceReceived) || 0;
    const balance = subtotal - advance;

    autoTable(doc, {
      startY: y,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: primaryBlue, textColor: 255, fontStyle: 'bold', halign: 'center' },
      bodyStyles: { textColor: textDark, fontSize: 9, cellPadding: 6 },
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 },
        1: { halign: 'left' },
        2: { halign: 'right', cellWidth: 40 }
      },
      alternateRowStyles: { fillColor: [255, 255, 255] }
    });

    let finalY = doc.lastAutoTable.finalY || y + 30;

    // ==========================================
    // 6. PAYMENT SUMMARY
    // ==========================================
    finalY += 10;
    doc.setDrawColor(...borderBlue);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, finalY, pageWidth - margin * 2, 35, 2, 2, 'FD');
    
    // "PAYMENT SUMMARY" Blue Tab
    doc.setFillColor(...primaryBlue);
    // Draw polygon for the slant tab
    doc.lines([[60, 0], [-5, 8], [-55, 0], [0, -8]], margin - 0.5, finalY - 0.5, [1, 1], 'F', true);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("PAYMENT SUMMARY", margin + 5, finalY + 5);

    // Left Side (Calculations)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...textDark);
    
    doc.text("Subtotal", margin + 8, finalY + 16);
    doc.text(`Rs. ${subtotal.toLocaleString('en-IN')}`, pageWidth / 2, finalY + 16, { align: 'right' });

    doc.text("Advance Received", margin + 8, finalY + 24);
    doc.text(`Rs. ${advance.toLocaleString('en-IN')}`, pageWidth / 2, finalY + 24, { align: 'right' });

    // Dotted line
    doc.setDrawColor(...borderBlue);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(margin + 5, finalY + 28, pageWidth / 2 + 5, finalY + 28);
    doc.setLineDashPattern([], 0); // reset

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...redAccent);
    doc.text("Balance Amount Payable", margin + 8, finalY + 33);
    doc.text(`Rs. ${balance.toLocaleString('en-IN')}`, pageWidth / 2, finalY + 33, { align: 'right' });

    // Right Side (Payment Status)
    doc.setFillColor(...bgBlue);
    doc.roundedRect(pageWidth / 2 + 10, finalY + 2, (pageWidth / 2) - margin - 12, 31, 2, 2, 'F');
    
    doc.circle(pageWidth * 0.75, finalY + 12, 8, 'S'); // Fake icon
    doc.setFontSize(9);
    doc.setTextColor(...primaryBlue);
    doc.setFont("helvetica", "normal");
    doc.text("Payment Status", pageWidth * 0.75, finalY + 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const paymentStatusText = balance <= 0 ? "FULLY PAID" : (advance > 0 ? "PARTIALLY PAID" : "UNPAID");
    doc.text(paymentStatusText, pageWidth * 0.75, finalY + 30, { align: 'center' });


    // ==========================================
    // 7. INCLUDED IN PACKAGE & NOTES
    // ==========================================
    finalY += 45;
    const boxWidth = (pageWidth - margin * 2 - 10) / 2;
    
    // Left Box (Included)
    doc.setDrawColor(...borderBlue);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, finalY, boxWidth, 40, 2, 2, 'FD');
    doc.setFillColor(...primaryBlue);
    doc.circle(margin + 8, finalY + 8, 3, 'F');
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("INCLUDED IN PACKAGE", margin + 14, finalY + 9);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textDark);
    const includedItems = formData.includedInPackage.split('\n');
    includedItems.forEach((item, idx) => {
      if (item.trim()) {
        doc.setTextColor(...primaryBlue);
        doc.circle(margin + 6, finalY + 16 + (idx * 5), 1.5, 'F'); // Bullet
        doc.setTextColor(...textDark);
        doc.text(item.trim(), margin + 10, finalY + 17 + (idx * 5));
      }
    });

    // Right Box (Notes)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin + boxWidth + 10, finalY, boxWidth, 40, 2, 2, 'FD');
    doc.setFillColor(...primaryBlue);
    doc.circle(margin + boxWidth + 18, finalY + 8, 3, 'F');
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("NOTES", margin + boxWidth + 24, finalY + 9);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textDark);
    const noteItems = formData.notes.split('\n');
    let noteY = finalY + 16;
    noteItems.forEach((item) => {
      if (item.trim()) {
        doc.circle(margin + boxWidth + 15, noteY - 1, 1, 'F');
        const splitText = doc.splitTextToSize(item.trim(), boxWidth - 15);
        doc.text(splitText, margin + boxWidth + 18, noteY);
        noteY += splitText.length * 4 + 2;
      }
    });

    // ==========================================
    // 8. FOOTER & SIGNATURE
    // ==========================================
    finalY += 50;
    doc.setDrawColor(...primaryBlue);
    doc.setLineWidth(1);
    doc.line(margin, finalY, pageWidth - margin, finalY);
    
    // Footer Text
    doc.setFillColor(...primaryBlue);
    doc.circle(margin + 8, finalY + 10, 6, 'F'); // Handshake placeholder
    
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(...primaryBlue);
    doc.text("Thank you", margin + 20, finalY + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...textDark);
    doc.text("for your business!", margin + 20, finalY + 15);

    // Separator
    doc.setDrawColor(...borderBlue);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 10, finalY + 5, pageWidth / 2 - 10, finalY + 18);

    doc.setFontSize(8);
    doc.setTextColor(...primaryBlue);
    doc.text("Prepared By", pageWidth / 2, finalY + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...textDark);
    doc.text("KRGO Software Solutions", pageWidth / 2, finalY + 15);

    // Signature Area
    const sigX = pageWidth - margin - 40;
    
    // Try to load user signature from public folder
    const signatureBase64 = await loadBase64Image('/signature.png');
    if (signatureBase64) {
      try {
        doc.addImage(signatureBase64, 'PNG', sigX + 5, finalY + 2, 30, 15);
      } catch(e) {
        // Fallback cursive text if image fails to add
        doc.setFont("times", "italic");
        doc.setFontSize(16);
        doc.setTextColor(0, 50, 150);
        doc.text("KrGo Admin", sigX + 5, finalY + 15);
      }
    } else {
      // Fallback cursive text
      doc.setFont("times", "italic");
      doc.setFontSize(16);
      doc.setTextColor(0, 50, 150);
      doc.text("KrGo Admin", sigX + 5, finalY + 15);
    }
    
    doc.setDrawColor(...textDark);
    doc.line(sigX, finalY + 18, sigX + 40, finalY + 18);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signature", sigX + 5, finalY + 22);

    // ==========================================
    // SAVE PDF
    // ==========================================
    doc.save(`${client.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_invoice_${invoiceNumber}.pdf`);

    // Optionally save bill record to Supabase
    try {
      await supabase.from('bills').insert([{
        client_id: client.id,
        invoice_number: invoiceNumber,
        amount: balance,
        status: paymentStatusText.toLowerCase()
      }]);
    } catch (err) {
      console.log("Supabase save optional/failed");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Premium Bill Generator</h1>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <form onSubmit={generatePDF} className="space-y-8">
          
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
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Due Date</label>
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
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
                  <div className="w-full md:w-24 hidden">
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
                  Generate PDF
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">Place signature at public/signature.png</p>
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
  );
};

export default Billing;
