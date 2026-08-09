import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaChartPie, FaUsers, FaEnvelope, FaFileInvoiceDollar, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple auth for now since Supabase auth can be added later
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'krgoadmin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('krgo_admin_auth', 'true');
    } else {
      alert('Invalid Password');
    }
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem('krgo_admin_auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('krgo_admin_auth');
    setIsAuthenticated(false);
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaChartPie />, exact: true },
    { name: 'Clients', path: '/admin/clients', icon: <FaUsers /> },
    { name: 'Requests', path: '/admin/requests', icon: <FaEnvelope /> },
    { name: 'Bill Generator', path: '/admin/billing', icon: <FaFileInvoiceDollar /> },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400">Enter your password to access the KrGo admin area.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin Password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#00AEEF] hover:bg-[#0095CC] text-white font-semibold rounded-xl transition-colors shadow-[0_0_15px_rgba(0,174,239,0.4)]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden font-sans print:h-auto print:bg-white print:block">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col print:hidden ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-800">
          {sidebarOpen && <span className="text-2xl font-bold text-white tracking-wider">Kr<span className="text-[#00AEEF]">Go</span><span className="text-sm text-gray-400 ml-2">Admin</span></span>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
          >
            <FaBars size={20} />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20 shadow-[inset_0_0_10px_rgba(0,174,239,0.1)]'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <div className="flex-shrink-0 text-lg">{item.icon}</div>
              {sidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className={`flex items-center text-red-400 hover:text-red-300 hover:bg-red-400/10 w-full p-3 rounded-xl transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}
          >
            <FaTimes size={18} />
            {sidebarOpen && <span className="ml-4 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-950 relative print:static print:bg-white print:overflow-visible print:w-full print:p-0">
        <div className="p-8 max-w-7xl mx-auto print:p-0 print:max-w-none print:m-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
