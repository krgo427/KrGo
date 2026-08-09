import React from 'react';
import { formatCurrency } from '../../../utils/currency';
import { FaFileInvoice, FaCheckCircle, FaClock, FaExclamationCircle, FaPlus, FaEye, FaEdit, FaPrint, FaTrash, FaCopy } from 'react-icons/fa';

const BillingDashboard = ({ invoices, onNavigate, onEdit, onDuplicate, onDelete, onPrint }) => {
  // Calculate Stats
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status.toLowerCase() === 'paid');
  const pendingInvoices = invoices.filter(i => i.status.toLowerCase() === 'pending');
  const overdueInvoices = invoices.filter(i => i.status.toLowerCase() === 'overdue');

  const totalRevenue = paidInvoices.reduce((acc, inv) => acc + (inv.total_amount || 0), 0);
  const outstandingAmount = invoices
    .filter(i => ['pending', 'overdue'].includes(i.status.toLowerCase()))
    .reduce((acc, inv) => acc + (inv.total_amount || 0), 0);

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === 'paid') return <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-medium">Paid</span>;
    if (s === 'overdue') return <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium">Overdue</span>;
    if (s === 'draft') return <span className="px-3 py-1 bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded-full text-xs font-medium">Draft</span>;
    return <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-xs font-medium">Pending</span>;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Invoices</h2>
          <p className="text-gray-400 text-sm">Manage your billing and payments.</p>
        </div>
        <button 
          onClick={() => onNavigate('create')}
          className="flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0095CC] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-[0_0_15px_rgba(0,174,239,0.3)]"
        >
          <FaPlus size={14} /> New Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">
              <FaFileInvoice />
            </div>
            <span className="text-2xl font-bold text-white">{totalInvoices}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Total Invoices</h3>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center text-xl">
              <FaCheckCircle />
            </div>
            <span className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Total Revenue</h3>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-xl">
              <FaClock />
            </div>
            <span className="text-2xl font-bold text-white">{formatCurrency(outstandingAmount)}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Outstanding Amount</h3>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-xl">
              <FaExclamationCircle />
            </div>
            <span className="text-2xl font-bold text-white">{overdueInvoices.length}</span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Overdue Invoices</h3>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Recent Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-950/50 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Invoice No.</th>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No invoices found. Create your first invoice!
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">{inv.invoice_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{inv.client_name}</div>
                      <div className="text-xs text-gray-500">{inv.client_company}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(inv.invoice_date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {formatCurrency(inv.total_amount, inv.currency)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(inv.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 text-gray-400">
                        <button onClick={() => onPrint(inv)} className="hover:text-white transition-colors" title="Print/PDF">
                          <FaPrint />
                        </button>
                        <button onClick={() => onEdit(inv)} className="hover:text-[#00AEEF] transition-colors" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => onDuplicate(inv)} className="hover:text-green-400 transition-colors" title="Duplicate">
                          <FaCopy />
                        </button>
                        <button onClick={() => onDelete(inv.id)} className="hover:text-red-400 transition-colors" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard;
