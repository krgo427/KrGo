import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleMarkRead = async (id, currentStatus) => {
    const { error } = await supabase.from('contact_requests').update({ status: currentStatus === 'read' ? 'unread' : 'read' }).eq('id', id);
    if (!error) {
      fetchRequests();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this request?')) {
      const { error } = await supabase.from('contact_requests').delete().eq('id', id);
      if (!error) {
        fetchRequests();
      }
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
                    onClick={() => handleMarkRead(req.id, req.status)}
                    className={`p-2 rounded-lg transition-colors ${req.status === 'read' ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
                    title={req.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    onClick={() => handleDelete(req.id)}
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
    </div>
  );
};

export default Requests;
