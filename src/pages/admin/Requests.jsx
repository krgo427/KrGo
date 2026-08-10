import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const handleAcceptRequest = async (req) => {
    const isCurrentlyUnread = req.status !== 'read';
    const newStatus = isCurrentlyUnread ? 'read' : 'unread';
    
    const { error } = await supabase.from('contact_requests').update({ status: newStatus }).eq('id', req.id);
    if (!error) {
      if (isCurrentlyUnread) {
        let companyName = 'Website Lead';
        if (req.message && req.message.includes('Project Type:')) {
           const match = req.message.match(/Project Type:\s*([^\n]*)/);
           if (match && match[1]) companyName = match[1].trim();
        }

        const { data: existing } = await supabase
          .from('clients')
          .select('id')
          .eq('name', req.name || '')
          .eq('phone', req.phone || '');
          
        if (!existing || existing.length === 0) {
          await supabase.from('clients').insert([{
            name: req.name || 'Unknown',
            email: req.email || '',
            phone: req.phone || '',
            company: companyName
          }]);
        }
      }
      fetchRequests();
    }
  };

  const confirmDelete = (request) => {
    setRequestToDelete(request);
    setDeleteConfirmationText('');
  };

  const executeDelete = async () => {
    if (!requestToDelete) return;
    const { error } = await supabase.from('contact_requests').delete().eq('id', requestToDelete.id);
    if (!error) {
      fetchRequests();
    }
    setRequestToDelete(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Contact Requests</h1>
      
      {loading ? (
        <div className="text-gray-400">Loading requests...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.length > 0 ? requests.map((req) => (
            <div key={req.id} className={`bg-gray-900 border ${req.status === 'read' ? 'border-gray-800 opacity-70' : 'border-[#00AEEF]/50 shadow-lg'} rounded-xl p-6 transition-all`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{req.name}</h3>
                  <p className="text-[#00AEEF] text-sm">{req.email} {req.phone && `| ${req.phone}`}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(req.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAcceptRequest(req)}
                    className={`p-2 rounded-lg transition-colors ${req.status === 'read' ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
                    title={req.status === 'read' ? 'Un-accept Request' : 'Accept & Add to Clients'}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    onClick={() => confirmDelete(req)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="bg-gray-950 p-4 rounded-lg text-gray-300 whitespace-pre-wrap border border-gray-800">
                {req.message}
              </div>
            </div>
          )) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-500">
              No contact requests found.
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {requestToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Delete Request?</h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              This action cannot be undone. You are about to permanently delete the contact request from <strong className="text-white">{requestToDelete.name}</strong>.
            </p>
            
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Type <span className="font-mono text-red-400 font-bold bg-red-900/20 px-2 py-0.5 rounded">DELETE</span> to confirm
              </label>
              <input 
                type="text" 
                value={deleteConfirmationText} 
                onChange={e => setDeleteConfirmationText(e.target.value)} 
                placeholder="DELETE"
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none transition-colors"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setRequestToDelete(null)} 
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeDelete}
                disabled={deleteConfirmationText !== 'DELETE'}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
