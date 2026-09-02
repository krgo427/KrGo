import React from 'react';
import { formatCurrency } from '../../../utils/currency';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserAlt, 
  FaBriefcase, FaCheckCircle, FaFileAlt, FaHandshake, FaFileInvoiceDollar 
} from 'react-icons/fa';

const InvoicePreview = React.forwardRef(({ invoice, settings }, ref) => {
  if (!invoice) return null;

  const { items = [] } = invoice;
  const subtotal = invoice.subtotal || 0;
  const advance = invoice.advance_payment || 0;
  const total = invoice.total_amount || 0;
  const isPaid = invoice.status?.toLowerCase() === 'paid';
  const balance = isPaid ? 0 : (invoice.balance_due || 0);
  
  // Format dates safely
  const formatDate = (d) => {
    if (!d) return '';
    try {
      const date = new Date(d);
      return isNaN(date) ? d : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch {
      return d;
    }
  };

  // Brand Colors aligned with KrGo #00AEEF
  const blueBrand = '#00AEEF'; // KrGo Cyan
  const blueLightBorder = '#bce6f8'; // Light cyan for borders
  const blueBg = '#eef9fe'; // Very light cyan background

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          #printable-invoice {
            width: 210mm; min-height: 297mm;
            margin: 0; padding: 10mm; background-color: white !important;
            color: black !important;
            box-sizing: border-box;
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        .clip-tab {
          clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
        }
      `}</style>
      
      {/* Wrapper to allow preview scaling in UI */}
      <div className="bg-white shadow-2xl mx-auto print:shadow-none print:rounded-none" style={{ width: '210mm', minWidth: '210mm', minHeight: '297mm' }}>
        <div id="printable-invoice" ref={ref} className="bg-white text-gray-900 font-sans p-[12mm] box-border w-[210mm] min-h-[297mm] flex flex-col mx-auto relative overflow-hidden">
          
          {/* HEADER */}
          <div className="flex justify-between items-stretch mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-bold text-4xl" style={{ backgroundColor: blueBrand }}>
                KG
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-black uppercase tracking-wide leading-none" style={{ color: blueBrand }}>
                  KRGO
                </h1>
                <h2 className="text-xl font-black uppercase tracking-wide text-black mt-1">
                  SOFTWARE SOLUTIONS
                </h2>
                <p className="font-semibold text-sm mt-1" style={{ color: blueBrand }}>
                  Web Development & Digital Solutions
                </p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-3 border-l-2 pl-6" style={{ borderColor: blueLightBorder }}>
              {settings?.business_phone && (
                <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: blueBrand }}><FaPhoneAlt /></div>
                  {settings.business_phone}
                </div>
              )}
              {settings?.business_email && (
                <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: blueBrand }}><FaEnvelope /></div>
                  {settings.business_email}
                </div>
              )}
              {settings?.business_address && (
                <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: blueBrand }}><FaMapMarkerAlt /></div>
                  {settings.business_address}
                </div>
              )}
            </div>
          </div>

          {/* INVOICE DIVIDER */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-[2px] flex-1 relative" style={{ backgroundColor: blueLightBorder }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: blueBrand }}></div>
            </div>
            <h2 className="text-3xl font-extrabold px-6 tracking-wider" style={{ color: blueBrand }}>INVOICE</h2>
            <div className="h-[2px] flex-1 relative" style={{ backgroundColor: blueLightBorder }}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: blueBrand }}></div>
            </div>
          </div>

          {/* INVOICE DETAILS */}
          <div className="border rounded-lg flex mb-6" style={{ borderColor: blueLightBorder }}>
            <div className="flex-1 p-3 pl-6">
              <p className="font-bold text-xs" style={{ color: blueBrand }}>Invoice No.</p>
              <p className="font-bold text-lg text-gray-900">{invoice.invoice_number || 'DRAFT'}</p>
            </div>
            <div className="w-[1px]" style={{ backgroundColor: blueLightBorder }}></div>
            <div className="flex-1 p-3 pl-6">
              <p className="font-bold text-xs" style={{ color: blueBrand }}>Date</p>
              <p className="font-medium text-lg text-gray-900">{formatDate(invoice.invoice_date)}</p>
            </div>
          </div>

          {/* BILL TO */}
          <div className="border rounded-xl mb-8 relative overflow-hidden flex" style={{ borderColor: blueLightBorder }}>
            <div className="absolute top-0 left-0 text-white px-6 py-1.5 font-bold text-sm rounded-br-2xl clip-tab" style={{ backgroundColor: blueBrand, width: '120px' }}>
              BILL TO
            </div>
            
            <div className="flex-1 p-6 pt-12 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 text-lg shadow-sm" style={{ backgroundColor: blueBrand }}>
                  <FaUserAlt />
                </div>
                <div>
                  <p className="font-bold text-xs mb-0.5" style={{ color: blueBrand }}>Client Name</p>
                  <p className="font-bold text-base text-gray-900">{invoice.client_name || 'Client Name'}</p>
                </div>
              </div>
              
              {invoice.project_name && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 text-lg shadow-sm" style={{ backgroundColor: blueBrand }}>
                    <FaBriefcase />
                  </div>
                  <div>
                    <p className="font-bold text-xs mb-0.5" style={{ color: blueBrand }}>Business Name</p>
                    <p className="font-bold text-base text-gray-900">{invoice.project_name}</p>
                  </div>
                </div>
              )}
              
              {invoice.client_phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 text-lg shadow-sm" style={{ backgroundColor: blueBrand }}>
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="font-bold text-xs mb-0.5" style={{ color: blueBrand }}>Phone</p>
                    <p className="font-bold text-base text-gray-900">{invoice.client_phone}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-1/3 flex items-center justify-center p-6 relative">
              <div className="w-full h-full max-h-32 bg-contain bg-center bg-no-repeat opacity-10 flex items-center justify-center">
                 <FaFileInvoiceDollar size={120} style={{ color: blueBrand }} />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mb-8 rounded-lg overflow-hidden border border-collapse" style={{ borderColor: blueLightBorder }}>
            <table className="w-full text-left">
              <thead className="text-white text-sm" style={{ backgroundColor: blueBrand }}>
                <tr>
                  <th className="py-3 px-4 font-bold text-center w-16 border-r border-white/20">Sr. No.</th>
                  <th className="py-3 px-6 font-bold border-r border-white/20">Description of Services</th>
                  <th className="py-3 px-6 font-bold text-center w-40">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-6 text-center text-gray-500 font-medium border-b" style={{ borderColor: blueLightBorder }}>No items added.</td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={index} className="border-b text-sm bg-white" style={{ borderColor: blueLightBorder }}>
                      <td className="py-4 px-4 font-bold text-gray-900 text-center border-r" style={{ borderColor: blueLightBorder }}>
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 border-r" style={{ borderColor: blueLightBorder }}>
                        <p className="font-semibold text-gray-900">{item.service_name || 'Service'}</p>
                        {item.description && <p className="text-gray-600 mt-1 text-xs">{item.description}</p>}
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-gray-900">
                        {formatCurrency(item.amount, invoice.currency)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAYMENT SUMMARY */}
          <div className="border rounded-xl mb-8 relative overflow-hidden flex" style={{ borderColor: blueLightBorder }}>
            <div className="absolute top-0 left-0 text-white px-6 py-2 font-bold text-sm rounded-br-2xl clip-tab" style={{ backgroundColor: blueBrand, width: '220px' }}>
              PAYMENT SUMMARY
            </div>
            
            <div className="flex-[2] p-6 pt-14 flex flex-col gap-3 justify-center">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-800 border-b pb-3" style={{ borderColor: blueLightBorder }}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal, invoice.currency)}</span>
              </div>
              
              {isPaid ? (
                <div className="flex justify-between items-center text-sm font-semibold text-gray-800 border-b pb-3" style={{ borderColor: blueLightBorder }}>
                  <span>Amount Paid</span>
                  <span>{formatCurrency(total, invoice.currency)}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center text-sm font-semibold text-gray-800 border-b pb-3" style={{ borderColor: blueLightBorder }}>
                  <span>Advance Received</span>
                  <span>{formatCurrency(advance, invoice.currency)}</span>
                </div>
              )}

              <div className="flex justify-between items-center font-extrabold text-[#d32f2f] pt-1 text-lg">
                <span>Balance Amount Payable</span>
                <span>{formatCurrency(balance, invoice.currency)}</span>
              </div>
            </div>
            
            <div className="flex-[1] border-l flex flex-col items-center justify-center p-6 text-center" style={{ borderColor: blueLightBorder, backgroundColor: blueBg }}>
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border" style={{ borderColor: blueLightBorder }}>
                <FaFileInvoiceDollar className="text-2xl" style={{ color: blueBrand }} />
              </div>
              <p className="font-bold text-xs mb-1" style={{ color: blueBrand }}>Payment Status</p>
              <h3 className="font-black text-lg tracking-wider uppercase" style={{ color: blueBrand }}>
                {isPaid ? 'PAID' : (advance > 0 ? 'PARTIALLY PAID' : 'PENDING')}
              </h3>
            </div>
          </div>

          {/* NOTES & TERMS */}
          <div className="grid grid-cols-2 gap-6 mb-8 mt-auto">
            <div className="border rounded-xl p-5" style={{ borderColor: blueLightBorder }}>
              <div className="flex items-center gap-2 font-bold text-sm mb-3 uppercase tracking-wide" style={{ color: blueBrand }}>
                <FaCheckCircle className="text-lg" /> INCLUDED IN PACKAGE
              </div>
              <ul className="text-xs text-gray-800 font-medium space-y-2 leading-relaxed">
                {invoice.terms ? (
                  invoice.terms.split('\n').map((term, i) => term.trim() && (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="shrink-0 mt-0.5" style={{ color: blueBrand }} /> {term}
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="shrink-0 mt-0.5" style={{ color: blueBrand }} /> As per agreed scope of work
                  </li>
                )}
              </ul>
            </div>
            
            <div className="border rounded-xl p-5" style={{ borderColor: blueLightBorder }}>
              <div className="flex items-center gap-2 font-bold text-sm mb-3 uppercase tracking-wide" style={{ color: blueBrand }}>
                <FaFileAlt className="text-lg" /> NOTES
              </div>
              <ul className="text-xs text-gray-800 font-medium space-y-2 leading-relaxed list-disc pl-4">
                {invoice.notes ? (
                  invoice.notes.split('\n').map((note, i) => note.trim() && (
                    <li key={i}>{note}</li>
                  ))
                ) : (
                  <li>Thank you for choosing KrGo Technology Solutions.</li>
                )}
              </ul>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t-[3px] pt-4 flex justify-between items-end mt-auto" style={{ borderColor: blueLightBorder }}>
            <div className="flex items-center gap-4 pl-2">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl shadow-md" style={{ backgroundColor: blueBrand }}>
                <FaHandshake />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold italic text-2xl" style={{ color: blueBrand, fontFamily: "Georgia, serif" }}>Thank you</h3>
                <p className="font-bold text-sm text-gray-800">for your business!</p>
              </div>
            </div>
            
            <div className="text-right flex gap-8 items-end pr-2">
              <div className="text-left">
                <p className="font-bold text-xs" style={{ color: blueBrand }}>Prepared By</p>
                <p className="font-bold text-sm text-gray-900">{settings?.business_name || 'KRGO Software Solutions'}</p>
              </div>
              <div className="w-40 text-center flex flex-col items-center border-l pl-8" style={{ borderColor: blueLightBorder }}>
                 <img src="/signature.png" alt="Signature" className="h-10 w-full object-contain mx-auto mb-1 opacity-80" />
                 <div className="w-full border-t border-gray-400 pt-1 text-[10px] font-bold text-gray-800 uppercase tracking-widest">
                   Authorized Signature
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
});

export default InvoicePreview;

