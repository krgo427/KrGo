import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { FaUsers, FaEnvelope, FaFileInvoiceDollar } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({ clients: 0, requests: 0, bills: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // In a real scenario, you would fetch actual counts from Supabase tables
      const { count: clientsCount } = await supabase.from('clients').select('*', { count: 'exact', head: true });
      const { count: requestsCount } = await supabase.from('contact_requests').select('*', { count: 'exact', head: true });
      const { count: billsCount } = await supabase.from('bills').select('*', { count: 'exact', head: true });

      setStats({
        clients: clientsCount || 0,
        requests: requestsCount || 0,
        bills: billsCount || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Clients', value: stats.clients, icon: <FaUsers className="text-[#00AEEF] text-3xl" />, color: 'border-[#00AEEF]' },
    { title: 'New Requests', value: stats.requests, icon: <FaEnvelope className="text-emerald-400 text-3xl" />, color: 'border-emerald-400' },
    { title: 'Invoices Generated', value: stats.bills, icon: <FaFileInvoiceDollar className="text-purple-400 text-3xl" />, color: 'border-purple-400' },
  ];

  if (loading) return <div className="text-white text-center mt-10">Loading Dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((stat, index) => (
          <div key={index} className={`bg-gray-900 border ${stat.color}/20 rounded-2xl p-6 shadow-lg relative overflow-hidden group hover:border-${stat.color}/50 transition-colors`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${stat.color.split('-')[1]}/10 to-transparent rounded-bl-full -mr-10 -mt-10 opacity-50`}></div>
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h3 className="text-gray-400 font-medium">{stat.title}</h3>
              {stat.icon}
            </div>
            <div className="text-4xl font-bold text-white relative z-10">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to KrGo Admin Portal</h2>
        <p className="text-gray-400 mb-4">
          This portal allows you to manage your client database, view incoming contact requests, and generate customized bills with your digital signature.
        </p>
        <div className="bg-gray-950 rounded-xl p-4 border border-gray-800 text-sm text-gray-500">
          <p><strong>Note:</strong> Ensure your Supabase credentials are correctly set in the `.env.local` file for live data synchronization.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
