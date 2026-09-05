import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaTrash, FaUndo, FaLock, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import { getCachedData, setCachedData, invalidateCacheKey, safeSupabaseQuery } from '../../utils/adminCache';

const Trash = () => {
  const cachedTrash = getCachedData('trash');
  const [activeSubTab, setActiveSubTab] = useState('requests'); // 'requests', 'clients', 'invoices'
  const [deletedRequests, setDeletedRequests] = useState(cachedTrash?.requests || []);
  const [deletedClients, setDeletedClients] = useState(cachedTrash?.clients || []);
  const [deletedInvoices, setDeletedInvoices] = useState(cachedTrash?.invoices || []);
  const [loading, setLoading] = useState(!cachedTrash);

  // Security Auth Modal State
  const [itemToPurge, setItemToPurge] = useState(null); // { type: 'request'|'client'|'invoice', item: obj }
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const ADMIN_SECURITY_PASSCODE = 'ADMIN123';

  useEffect(() => {
    fetchTrashData();
  }, []);

  const fetchTrashData = async () => {
    if (!cachedTrash) setLoading(true);

    try {
      const result = await safeSupabaseQuery(() =>
        Promise.all([
          supabase.from('contact_requests').select('*').eq('is_deleted', true).order('created_at', { ascending: false }),
          supabase.from('clients').select('*').eq('is_deleted', true).order('created_at', { ascending: false }),
          supabase.from('invoices').select('*').eq('is_deleted', true).order('created_at', { ascending: false })
        ]),
        800
      );

      if (result.data) {
        const [reqsRes, clsRes, invsRes] = result.data;
        const reqs = reqsRes.data || [];
        const cls = clsRes.data || [];
        const invs = invsRes.data || [];

        setDeletedRequests(reqs);
        setDeletedClients(cls);
        setDeletedInvoices(invs);
        setCachedData('trash', { requests: reqs, clients: cls, invoices: invs });
      }
    } catch (error) {
      console.error("Error fetching trash data:", error);
    } finally {
      setLoading(false);
    }
  };

  // RESTORE ACTION
  const handleRestore = async (type, item) => {
    let tableName = '';
    if (type === 'request') {
      tableName = 'contact_requests';
      const updated = deletedRequests.filter(r => r.id !== item.id);
      setDeletedRequests(updated);
      invalidateCacheKey('requests');
    }
    if (type === 'client') {
      tableName = 'clients';
      const updated = deletedClients.filter(c => c.id !== item.id);
      setDeletedClients(updated);
      invalidateCacheKey('clients');
    }
    if (type === 'invoice') {
      tableName = 'invoices';
      const updated = deletedInvoices.filter(i => i.id !== item.id);
      setDeletedInvoices(updated);
      invalidateCacheKey('invoices');
    }
    invalidateCacheKey('dashboard_stats');

    const { error } = await supabase
      .from(tableName)
      .update({ is_deleted: false })
      .eq('id', item.id);

    if (error) {
      alert(`Failed to restore ${type}: ${error.message}`);
      fetchTrashData();
    }
  };

  // PERMANENT DELETE PASSCODE VERIFICATION
  const initiatePermanentDelete = (type, item) => {
    setItemToPurge({ type, item });
    setPasscode('');
    setAuthError('');
  };

  const executePermanentDelete = async (e) => {
    e.preventDefault();
    if (passcode !== ADMIN_SECURITY_PASSCODE) {
      setAuthError('Invalid Security Passcode. Permanent deletion denied.');
      return;
    }

    const { type, item } = itemToPurge;
    let tableName = '';
    if (type === 'request') {
      tableName = 'contact_requests';
      setDeletedRequests(deletedRequests.filter(r => r.id !== item.id));
    }
    if (type === 'client') {
      tableName = 'clients';
      setDeletedClients(deletedClients.filter(c => c.id !== item.id));
    }
    if (type === 'invoice') {
      tableName = 'invoices';
      setDeletedInvoices(deletedInvoices.filter(i => i.id !== item.id));
    }
    setItemToPurge(null);

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', item.id);

    if (error) {
      alert(`Failed to permanently delete: ${error.message}`);
      fetchTrashData();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">Recycle Bin & Trash</h1>
            <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <FaShieldAlt /> Protected Storage
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Restore deleted items back to active views or permanently purge them with admin security passcode.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-4 mb-6">
        <button
          onClick={() => setActiveSubTab('requests')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeSubTab === 'requests'
              ? 'bg-[#00AEEF]/20 text-[#00AEEF] border border-[#00AEEF]/30'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Deleted Requests ({deletedRequests.length})
        </button>
        <button
          onClick={() => setActiveSubTab('clients')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeSubTab === 'clients'
              ? 'bg-[#00AEEF]/20 text-[#00AEEF] border border-[#00AEEF]/30'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Deleted Clients ({deletedClients.length})
        </button>
        <button
          onClick={() => setActiveSubTab('invoices')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeSubTab === 'invoices'
              ? 'bg-[#00AEEF]/20 text-[#00AEEF] border border-[#00AEEF]/30'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          Deleted Invoices ({deletedInvoices.length})
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading trash bin items...</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          {/* TAB 1: REQUESTS */}
          {activeSubTab === 'requests' && (
            <div className="divide-y divide-gray-800">
              {deletedRequests.length > 0 ? (
                deletedRequests.map((req) => (
                  <div key={req.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-800/40 transition-colors">
                    <div>
                      <h3 className="text-lg font-bold text-white">{req.name}</h3>
                      <p className="text-sm text-[#00AEEF]">{req.email} {req.phone && `| ${req.phone}`}</p>
                      <p className="text-xs text-gray-500 mt-1">Deleted at: {new Date(req.created_at).toLocaleString()}</p>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2 bg-gray-950 p-2.5 rounded-lg border border-gray-800">{req.message}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleRestore('request', req)}
                        className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-xl font-medium text-xs flex items-center gap-2 transition-all border border-emerald-500/30"
                      >
                        <FaUndo /> Restore
                      </button>
                      <button
                        onClick={() => initiatePermanentDelete('request', req)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-medium text-xs flex items-center gap-2 transition-all border border-red-500/20"
                      >
                        <FaTrash /> Permanent Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">No trashed requests found.</div>
              )}
            </div>
          )}

          {/* TAB 2: CLIENTS */}
          {activeSubTab === 'clients' && (
            <div className="divide-y divide-gray-800">
              {deletedClients.length > 0 ? (
                deletedClients.map((client) => (
                  <div key={client.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-800/40 transition-colors">
                    <div>
                      <h3 className="text-lg font-bold text-white">{client.name}</h3>
                      <p className="text-sm text-gray-400">{client.company ? `${client.company} | ` : ''}{client.email || client.phone}</p>
                      {client.address && <p className="text-xs text-gray-500 mt-1">{client.address}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleRestore('client', client)}
                        className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-xl font-medium text-xs flex items-center gap-2 transition-all border border-emerald-500/30"
                      >
                        <FaUndo /> Restore
                      </button>
                      <button
                        onClick={() => initiatePermanentDelete('client', client)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-medium text-xs flex items-center gap-2 transition-all border border-red-500/20"
                      >
                        <FaTrash /> Permanent Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">No trashed clients found.</div>
              )}
            </div>
          )}

          {/* TAB 3: INVOICES */}
          {activeSubTab === 'invoices' && (
            <div className="divide-y divide-gray-800">
              {deletedInvoices.length > 0 ? (
                deletedInvoices.map((inv) => (
                  <div key={inv.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-800/40 transition-colors">
                    <div>
                      <h3 className="text-lg font-bold text-white">{inv.invoice_number}</h3>
                      <p className="text-sm text-gray-400">Client: {inv.client_name} ({inv.client_company || 'N/A'})</p>
                      <p className="text-xs text-emerald-400 mt-1">Amount: ₹{inv.total_amount?.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleRestore('invoice', inv)}
                        className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-xl font-medium text-xs flex items-center gap-2 transition-all border border-emerald-500/30"
                      >
                        <FaUndo /> Restore
                      </button>
                      <button
                        onClick={() => initiatePermanentDelete('invoice', inv)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-medium text-xs flex items-center gap-2 transition-all border border-red-500/20"
                      >
                        <FaTrash /> Permanent Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">No trashed invoices found.</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SECURITY PASSCODE AUTHENTICATION MODAL */}
      {itemToPurge && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-900 border border-red-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 text-red-500 mb-2">
              <FaLock className="text-2xl" />
              <h2 className="text-2xl font-bold">Security Passcode Required</h2>
            </div>

            <p className="text-gray-300 text-xs mb-4 leading-relaxed">
              Permanent deletion will completely purge this record from your Supabase database. This action cannot be restored.
            </p>

            <form onSubmit={executePermanentDelete} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1">
                  Enter Admin Passcode (Default: <code className="text-amber-400">ADMIN123</code>)
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Security Passcode"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 text-sm tracking-widest"
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <FaExclamationTriangle className="flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setItemToPurge(null)}
                  className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors font-medium text-xs shadow-lg shadow-red-600/30"
                >
                  Confirm Permanent Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trash;
