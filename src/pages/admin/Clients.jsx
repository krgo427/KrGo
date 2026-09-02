import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaPlus, FaTrash, FaEdit, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const initialForm = {
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [clientToDelete, setClientToDelete] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .or('is_deleted.is.null,is_deleted.eq.false')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setClients(data || []);
    }
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingClient(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      company: client.company || '',
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      pincode: client.pincode || '',
      gstin: client.gstin || '',
      notes: client.notes || ''
    });
    setShowModal(true);
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    
    if (editingClient) {
      // Update Client
      const { error } = await supabase
        .from('clients')
        .update(formData)
        .eq('id', editingClient.id);

      if (error) {
        console.error("Error updating client:", error);
        alert("Failed to update client profile.");
      } else {
        setShowModal(false);
        fetchClients();
      }
    } else {
      // Add New Client
      const { error } = await supabase
        .from('clients')
        .insert([{ ...formData, is_deleted: false }]);

      if (error) {
        console.error("Error adding client:", error);
        alert("Failed to add client. Check console or Supabase setup.");
      } else {
        setShowModal(false);
        fetchClients();
      }
    }
  };

  const confirmDelete = (client) => {
    setClientToDelete(client);
  };

  const handleSoftDelete = async () => {
    if (!clientToDelete) return;
    
    const { error } = await supabase
      .from('clients')
      .update({ is_deleted: true })
      .eq('id', clientToDelete.id);

    if (error) {
      console.error("Error deleting client:", error);
      alert("Failed to move client to Trash.");
    } else {
      setClientToDelete(null);
      fetchClients();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Client Directory</h1>
          <p className="text-gray-400 text-sm mt-1">Manage complete client profiles for billing and invoicing</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#00AEEF] hover:bg-[#0095CC] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-lg shadow-[#00AEEF]/20"
        >
          <FaPlus /> Add New Client
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading client profiles...</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 border-b border-gray-800 text-gray-400 uppercase text-xs tracking-wider">
                  <th className="p-4 font-medium">Client Name</th>
                  <th className="p-4 font-medium">Company</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Location / GSTIN</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {clients.length > 0 ? clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-medium text-base">{client.name}</div>
                      {client.notes && <div className="text-xs text-gray-500 truncate max-w-xs">{client.notes}</div>}
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <FaBuilding className="text-[#00AEEF] text-xs" />
                        <span>{client.company || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 text-sm space-y-0.5">
                      {client.email && (
                        <div className="flex items-center gap-1.5">
                          <FaEnvelope className="text-gray-500 text-xs" />
                          <span>{client.email}</span>
                        </div>
                      )}
                      {client.phone && (
                        <div className="flex items-center gap-1.5">
                          <FaPhone className="text-gray-500 text-xs" />
                          <span>{client.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {(client.city || client.state) ? (
                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                          <FaMapMarkerAlt className="text-red-400" />
                          <span>{[client.city, client.state, client.pincode].filter(Boolean).join(', ')}</span>
                        </div>
                      ) : <span className="text-gray-600 text-xs">No address set</span>}
                      {client.gstin && (
                        <div className="text-[11px] font-mono text-emerald-400 mt-1">GSTIN: {client.gstin}</div>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(client)} 
                          className="p-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="Edit Profile"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => confirmDelete(client)} 
                          className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Move to Trash"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-gray-500">
                      No active clients found. Add a client manually or accept incoming contact requests.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-white mb-2">
              {editingClient ? 'Edit Client Profile' : 'Add New Client'}
            </h2>
            <p className="text-gray-400 text-xs mb-6">
              Complete client information will be used for auto-filling invoices.
            </p>

            <form onSubmit={handleSaveClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">Client / Contact Name *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g. Ramesh Sharma" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">Company / Business Name</label>
                  <input 
                    type="text" 
                    value={formData.company} 
                    onChange={e => setFormData({...formData, company: e.target.value})} 
                    placeholder="e.g. Sharma Enterprises" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    placeholder="client@example.com" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    placeholder="+91 9876543210" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-xs font-medium mb-1">Billing Street Address</label>
                  <textarea 
                    rows="2" 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                    placeholder="Suite / Plot / Street Address" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF] resize-none" 
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">City</label>
                  <input 
                    type="text" 
                    value={formData.city} 
                    onChange={e => setFormData({...formData, city: e.target.value})} 
                    placeholder="e.g. Mumbai" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">State / Pincode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      value={formData.state} 
                      onChange={e => setFormData({...formData, state: e.target.value})} 
                      placeholder="State" 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                    />
                    <input 
                      type="text" 
                      value={formData.pincode} 
                      onChange={e => setFormData({...formData, pincode: e.target.value})} 
                      placeholder="Pincode" 
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-xs font-medium mb-1">GSTIN / Tax ID (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.gstin} 
                    onChange={e => setFormData({...formData, gstin: e.target.value})} 
                    placeholder="e.g. 27AAAAA0000A1Z5" 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF]" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-xs font-medium mb-1">Internal Notes</label>
                  <textarea 
                    rows="2" 
                    value={formData.notes} 
                    onChange={e => setFormData({...formData, notes: e.target.value})} 
                    placeholder="Specific project preferences or requirements..." 
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00AEEF] resize-none" 
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2.5 bg-[#00AEEF] hover:bg-[#0095CC] text-white rounded-lg transition-colors font-medium text-sm shadow-lg shadow-[#00AEEF]/20"
                >
                  {editingClient ? 'Save Profile Changes' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {clientToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Move Client to Trash?</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Client profile for <strong className="text-white">{clientToDelete.name}</strong> will be moved to the Admin Trash Bin. You can restore it anytime.
            </p>
            
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={() => setClientToDelete(null)} 
                className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSoftDelete}
                className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium text-sm"
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

export default Clients;
