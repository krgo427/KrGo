import React from 'react';
import { formatCurrency, numberToWordsIndian } from '../../../utils/currency';
import logoUrl from '../../../assets/logo.png';

const InvoicePreview = React.forwardRef(({ invoice, settings }, ref) => {
  if (!invoice) return null;

  const { items = [] } = invoice;
  const subtotal = invoice.subtotal || 0;
  const discount = invoice.discount || 0;
  const total = invoice.total_amount || 0;
  const advance = invoice.advance_payment || 0;
  const isPaid = invoice.status?.toLowerCase() === 'paid';
  const balance = isPaid ? 0 : (invoice.balance_due || 0);
  
  // Format dates safely
  const formatDate = (d) => {
    if (!d) return '';
    try {
      const date = new Date(d);
      return isNaN(date) ? d : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return d;
    }
  };

  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          #printable-invoice {
            width: 210mm; min-height: 297mm;
            margin: 0; padding: 15mm; background-color: white !important;
            color: black !important;
            box-sizing: border-box;
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
      
      {/* Wrapper to allow preview scaling in UI */}
      <div className="bg-white shadow-2xl mx-auto print:shadow-none print:rounded-none" style={{ width: '210mm', minWidth: '210mm', minHeight: '297mm' }}>
        <div id="printable-invoice" ref={ref} className="bg-white text-gray-900 font-sans p-[15mm] md:p-[20mm] box-border w-[210mm] min-h-[297mm] flex flex-col mx-auto relative overflow-hidden">
          
          {/* HEADER */}
          <div className="flex justify-between items-start mb-12">
            <div className="flex flex-col">
              <div className="mb-6">
                <img src={logoUrl} alt="KrGo Logo" className="h-16 w-auto max-w-[200px] object-contain" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase mb-1">
                {settings?.business_name || 'KrGo Technology Solutions'}
              </h1>
              <p className="text-xs font-bold text-[#00AEEF] tracking-widest uppercase mb-6">
                Software • Data • AI • Cloud • Business Intelligence
              </p>
              <div className="text-sm text-gray-700 leading-relaxed">
                {settings?.business_address && <p className="whitespace-pre-wrap">{settings.business_address}</p>}
                <p className="mt-1">
                  {settings?.business_email && <span>{settings.business_email}</span>}
                  {settings?.business_phone && <span> | {settings.business_phone}</span>}
                </p>
                {settings?.business_website && <p>{settings.business_website}</p>}
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-4xl font-light tracking-widest text-gray-300 uppercase mb-8">
                Invoice
              </h2>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800 text-right">
                <span className="font-semibold text-gray-500">Invoice No.</span>
                <span className="font-bold">{invoice.invoice_number || 'DRAFT'}</span>
                
                <span className="font-semibold text-gray-500">Invoice Date</span>
                <span className="font-medium">{formatDate(invoice.invoice_date)}</span>
                

                {invoice.terms && (
                  <>
                    <span className="font-semibold text-gray-500">Terms</span>
                    <span className="font-medium">{invoice.terms}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-200 mb-8" />

          {/* BILL TO */}
          <div className="mb-12">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Bill To</h3>
            <div className="text-sm text-gray-800 leading-relaxed">
              <p className="font-bold text-xl text-gray-900 mb-1">{invoice.client_name || 'Client Name'}</p>
              {invoice.client_company && <p className="font-semibold text-gray-700">{invoice.client_company}</p>}
              <p className="mt-2 text-gray-600">
                {invoice.client_email && <span>{invoice.client_email}</span>}
                {invoice.client_phone && <span> | {invoice.client_phone}</span>}
              </p>
            </div>
          </div>

          {/* BUSINESS NAME */}
          {invoice.project_name && (
            <div className="flex gap-12 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Business Name</p>
                <p className="text-sm font-medium text-gray-900">{invoice.project_name}</p>
              </div>
            </div>
          )}

          {/* ITEMS TABLE */}
          <div className="mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900 text-gray-900 text-xs uppercase tracking-widest">
                  <th className="py-3 px-2 font-bold w-[65%]">Description</th>
                  <th className="py-3 px-2 font-bold text-right w-[15%]">Rate</th>
                  <th className="py-3 px-2 font-bold text-right w-[20%]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400 text-sm border-b border-gray-200">No items added.</td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 text-sm">
                      <td className="py-4 px-2">
                        <p className="font-semibold text-gray-900">{item.service_name || 'Service'}</p>
                        {item.description && <p className="text-gray-500 mt-1 text-xs whitespace-pre-wrap leading-relaxed">{item.description}</p>}
                      </td>
                      <td className="py-4 px-2 text-right text-gray-700">{formatCurrency(item.rate, invoice.currency)}</td>
                      <td className="py-4 px-2 text-right font-semibold text-gray-900">{formatCurrency(item.amount, invoice.currency)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* TOTALS & WORDS */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            {/* Amount in words */}
            <div className="w-full md:w-1/2 pt-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount in Words</p>
              <p className="text-sm font-semibold text-gray-800 italic">
                {numberToWordsIndian(total)}
              </p>
            </div>

            {/* Totals Box */}
            <div className="w-full md:w-[40%] bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between py-2 text-sm text-gray-600">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal, invoice.currency)}</span>
              </div>

              {invoice.tax_amount > 0 && (
                <div className="flex justify-between py-2 text-sm text-gray-600">
                  <span className="font-medium">{invoice.tax_type || 'Tax'}</span>
                  <span className="font-medium">{formatCurrency(invoice.tax_amount, invoice.currency)}</span>
                </div>
              )}
              <div className="flex justify-between py-4 mt-2 text-base font-bold text-gray-900 border-t border-gray-300">
                <span className="uppercase tracking-widest text-sm self-center">Total Amount</span>
                <span>{formatCurrency(total, invoice.currency)}</span>
              </div>

              {isPaid ? (
                <div className="flex justify-between py-2 text-sm text-gray-600">
                  <span className="font-medium">Amount Paid</span>
                  <span className="font-medium text-green-600">-{formatCurrency(total, invoice.currency)}</span>
                </div>
              ) : advance > 0 && (
                <div className="flex justify-between py-2 text-sm text-gray-600">
                  <span className="font-medium">Advance Received</span>
                  <span className="font-medium text-green-600">-{formatCurrency(advance, invoice.currency)}</span>
                </div>
              )}

              <div className="flex justify-between py-4 mt-2 text-xl font-extrabold text-[#00AEEF] border-t-2 border-[#00AEEF]">
                <span className="uppercase tracking-widest text-sm self-center text-gray-900">Balance Due</span>
                <span>{formatCurrency(balance, invoice.currency)}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 mb-8" />

          {/* PAYMENT & NOTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-600 mb-12">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-widest text-xs border-b border-gray-200 pb-2">Payment Details</h3>
              <div className="space-y-1.5 mt-4">
                {settings?.bank_name && <p><span className="font-semibold text-gray-800">Bank:</span> {settings.bank_name}</p>}
                {settings?.account_holder && <p><span className="font-semibold text-gray-800">Account Name:</span> {settings.account_holder}</p>}
                {settings?.account_number && <p><span className="font-semibold text-gray-800">Account No:</span> {settings.account_number}</p>}
                {settings?.ifsc_code && <p><span className="font-semibold text-gray-800">IFSC Code:</span> {settings.ifsc_code}</p>}
                {settings?.upi_id && <p className="mt-2 pt-2 border-t border-gray-100"><span className="font-semibold text-gray-800">UPI ID:</span> {settings.upi_id}</p>}
              </div>
            </div>

            <div>
              {invoice.notes && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-widest text-xs border-b border-gray-200 pb-2">Notes</h3>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed mt-4">{invoice.notes}</p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-widest text-xs border-b border-gray-200 pb-2">Terms & Conditions</h3>
                  <p className="whitespace-pre-wrap text-xs text-gray-500 leading-relaxed mt-4">{invoice.terms}</p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER SIGNATURE - Pushed to bottom naturally without overlap */}
          <div className="mt-auto pt-16 flex justify-end">
            <div className="w-64 text-center">
               {/* Signature Image (Loaded from public folder) */}
               <img src="/signature.png" alt="Signature" className="h-16 w-full object-contain mx-auto mb-2" />
               <div className="w-full border-t border-gray-300 pt-3 text-[10px] font-bold text-gray-900 uppercase tracking-widest">
                 For {settings?.business_name || 'KrGo Technology Solutions'}
                 <br />
                 <span className="font-medium text-gray-500">Authorized Signatory</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
});

export default InvoicePreview;
