import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setClients(data || []);
    }
    setLoading(false);
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('clients').insert([formData]);
    if (error) {
      console.error("Error adding client:", error);
      alert("Failed to add client. Check console or Supabase setup.");
    } else {
      setShowModal(false);
      setFormData({ name: '', email: '', company: '', phone: '' });
      fetchClients();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) {
        console.error("Error deleting client:", error);
      } else {
        fetchClients();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Client Management</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#00AEEF] hover:bg-[#0095CC] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-[#00AEEF]/20"
        >
          <FaPlus /> Add Client
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading clients...</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 uppercase text-xs tracking-wider">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Company</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {clients.length > 0 ? clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-white font-medium">{client.name}</td>
                    <td className="p-4 text-gray-300">{client.company}</td>
                    <td className="p-4 text-gray-400">{client.email}</td>
                    <td className="p-4 text-gray-400">{client.phone}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(client.id)} className="text-red-400 hover:text-red-300 p-2">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">No clients found. Add one to get started!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Client</h2>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Company</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Phone</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00AEEF]" />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#00AEEF] hover:bg-[#0095CC] text-white rounded-lg transition-colors shadow-lg shadow-[#00AEEF]/20">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
