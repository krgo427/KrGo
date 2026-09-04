import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaTrash, FaCheck } from 'react-icons/fa';
import { getCachedData, setCachedData, invalidateCacheKey } from '../../utils/adminCache';

const Requests = () => {
  const cachedRequests = getCachedData('requests');
  const [requests, setRequests] = useState(cachedRequests || []);
  const [loading, setLoading] = useState(!cachedRequests);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    if (!cachedRequests) setLoading(true);
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .or('is_deleted.is.null,is_deleted.eq.false')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      const freshData = data || [];
      setRequests(freshData);
      setCachedData('requests', freshData);
    }
    setLoading(false);
  };

  const handleAcceptRequest = async (req) => {
    const isCurrentlyUnread = req.status !== 'read';
    const newStatus = isCurrentlyUnread ? 'read' : 'unread';
    
    // Optimistic state update
    const updatedRequests = requests.map(r => r.id === req.id ? { ...r, status: newStatus } : r);
    setRequests(updatedRequests);
    setCachedData('requests', updatedRequests);

    const { error } = await supabase.from('contact_requests').update({ status: newStatus }).eq('id', req.id);
    if (!error && isCurrentlyUnread) {
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
          company: companyName,
          notes: req.message || '',
          is_deleted: false
        }]);
        invalidateCacheKey('clients');
      }
    } else if (error) {
      // Revert if error
      fetchRequests();
    }
  };

  const confirmDelete = (request) => {
    setRequestToDelete(request);
    setDeleteConfirmationText('');
  };

  const executeDelete = async () => {
    if (!requestToDelete) return;

    const targetId = requestToDelete.id;
    // Optimistic removal
    const updatedRequests = requests.filter(r => r.id !== targetId);
    setRequests(updatedRequests);
    setCachedData('requests', updatedRequests);
    invalidateCacheKey('trash');
    setRequestToDelete(null);

    // Perform Soft Delete in DB
    const { error } = await supabase
      .from('contact_requests')
      .update({ is_deleted: true })
      .eq('id', targetId);
      
    if (error) {
      console.error("Error deleting request:", error);
      fetchRequests();
    }
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
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Move to Trash?</h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Move contact request from <strong className="text-white">{requestToDelete.name}</strong> to Trash? You can restore it anytime from the Admin Trash Bin.
            </p>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setRequestToDelete(null)} 
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeDelete}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all"
              >
                Move to Trash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
