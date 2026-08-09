import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../config/supabaseClient';
import BillingDashboard from './BillingDashboard';
import InvoiceEditor from './InvoiceEditor';
import BillingSettings from './BillingSettings';
import InvoicePreview from './InvoicePreview';
import { FaFileInvoice, FaCog, FaChartBar } from 'react-icons/fa';

const STORAGE_KEY_INVOICES = 'krgo_invoices_fallback';
const STORAGE_KEY_SETTINGS = 'krgo_billing_settings';

const BillingApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, create, edit, settings
  const [invoices, setInvoices] = useState([]);
  const [settings, setSettings] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref for hidden printing
  const printRef = useRef(null);
  const [printingInvoice, setPrintingInvoice] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    // Load Settings (try DB first, then local storage)
    let loadedSettings = null;
    try {
      const { data, error } = await supabase.from('billing_settings').select('*').limit(1).single();
      if (data && !error) {
        loadedSettings = data;
      } else {
        throw new Error("Table doesn't exist or empty");
      }
    } catch (err) {
      const local = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (local) loadedSettings = JSON.parse(local);
    }
    setSettings(loadedSettings || getDefaultSettings());

    // Load Invoices (try DB first, then local storage)
    try {
      const { data, error } = await supabase.from('invoices').select('*, invoice_items(*)').order('created_at', { ascending: false });
      if (data && !error) {
        setInvoices(data);
      } else {
        throw new Error("Table doesn't exist");
      }
    } catch (err) {
      const local = localStorage.getItem(STORAGE_KEY_INVOICES);
      if (local) setInvoices(JSON.parse(local));
    }
    
    setIsLoading(false);
  };

  const getDefaultSettings = () => ({
    business_name: 'KrGo Technology Solutions',
    business_address: '',
    business_email: '',
    business_phone: '',
    business_website: 'https://krgo.vercel.app/',
    invoice_prefix: 'KRGO-INV-2026-',
    default_currency: 'INR',
    default_notes: 'Thank you for choosing KrGo Technology Solutions.',
    default_terms: 'Payment is due by the stated due date. Services are provided according to the agreed scope of work.',
  });

  const handleSaveSettings = async (newSettings) => {
    try {
      const { error } = await supabase.from('billing_settings').upsert(newSettings);
      if (error) throw error;
    } catch (err) {
      // Fallback to local
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
    }
    setSettings(newSettings);
    alert('Settings saved successfully!');
  };

  const handleSaveInvoice = async (invoiceData) => {
    let savedInvoice = { ...invoiceData };
    
    // 1. Try to save to Supabase
    try {
      if (!savedInvoice.id) {
        // Create new
        const { items, ...invoiceMeta } = savedInvoice;
        const { data: insertedInv, error: err1 } = await supabase.from('invoices').insert([invoiceMeta]).select().single();
        if (err1) throw err1;
        
        savedInvoice.id = insertedInv.id;
        
        if (items && items.length > 0) {
          const itemsToInsert = items.map(item => ({ ...item, invoice_id: insertedInv.id }));
          await supabase.from('invoice_items').insert(itemsToInsert);
        }
      } else {
        // Update existing
        const { items, ...invoiceMeta } = savedInvoice;
        const { error: updateErr } = await supabase.from('invoices').update(invoiceMeta).eq('id', invoiceMeta.id);
        if (updateErr) throw updateErr;
        
        // Very basic replace items strategy for simple updates
        const { error: delErr } = await supabase.from('invoice_items').delete().eq('invoice_id', invoiceMeta.id);
        if (delErr) throw delErr;

        if (items && items.length > 0) {
           const itemsToInsert = items.map(item => ({ ...item, invoice_id: invoiceMeta.id, id: undefined }));
           const { error: insErr } = await supabase.from('invoice_items').insert(itemsToInsert);
           if (insErr) throw insErr;
        }
      }
      // Re-fetch all data to ensure sync
      loadData();
    } catch (err) {
      console.log('Falling back to local storage for invoices.', err.message);
      // Fallback: update local state & local storage
      if (!savedInvoice.id) {
        savedInvoice.id = Date.now().toString(); // Generate fake UUID for local
        const newInvoices = [savedInvoice, ...invoices];
        setInvoices(newInvoices);
        localStorage.setItem(STORAGE_KEY_INVOICES, JSON.stringify(newInvoices));
      } else {
        const newInvoices = invoices.map(i => i.id === savedInvoice.id ? savedInvoice : i);
        setInvoices(newInvoices);
        localStorage.setItem(STORAGE_KEY_INVOICES, JSON.stringify(newInvoices));
      }
    }

    setActiveTab('dashboard');
    setEditingInvoice(null);
  };

  const handleDeleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    
    try {
      const { error } = await supabase.from('invoices').delete().eq('id', id);
      if (error) throw error;
      loadData();
    } catch (err) {
      const newInvoices = invoices.filter(i => i.id !== id);
      setInvoices(newInvoices);
      localStorage.setItem(STORAGE_KEY_INVOICES, JSON.stringify(newInvoices));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase.from('invoices').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      loadData();
    } catch (err) {
      const newInvoices = invoices.map(i => i.id === id ? { ...i, status: newStatus } : i);
      setInvoices(newInvoices);
      localStorage.setItem(STORAGE_KEY_INVOICES, JSON.stringify(newInvoices));
    }
  };

  const handlePrint = (invoice) => {
    setPrintingInvoice(invoice);
    // Allow React to render the hidden component before calling print
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintingInvoice(null), 1000); // clear after printing
    }, 200);
  };

  if (isLoading) {
    return <div className="text-white">Loading Billing System...</div>;
  }

  return (
    <div className="min-h-screen relative">
      
      {/* Navigation Tabs - Hidden when printing */}
      <div className="print:hidden mb-8 flex flex-wrap gap-2 border-b border-gray-800 pb-4">
        <button 
          onClick={() => { setActiveTab('dashboard'); setEditingInvoice(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <FaChartBar /> Dashboard
        </button>
        <button 
          onClick={() => { setActiveTab('create'); setEditingInvoice(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'create' || activeTab === 'edit' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <FaFileInvoice /> {activeTab === 'edit' ? 'Edit Invoice' : 'Create Invoice'}
        </button>
        <button 
          onClick={() => { setActiveTab('settings'); setEditingInvoice(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <FaCog /> Settings
        </button>
      </div>

      {/* Main Content Area - Hidden when printing */}
      <div className="print:hidden">
        {activeTab === 'dashboard' && (
          <BillingDashboard 
            invoices={invoices} 
            onNavigate={setActiveTab}
            onEdit={(inv) => { setEditingInvoice(inv); setActiveTab('edit'); }}
            onDuplicate={(inv) => { 
              const duplicate = { ...inv, id: undefined, invoice_number: settings?.invoice_prefix + Date.now().toString().slice(-4), status: 'Draft' };
              setEditingInvoice(duplicate); 
              setActiveTab('create'); 
            }}
            onDelete={handleDeleteInvoice}
            onPrint={handlePrint}
            onStatusChange={handleStatusChange}
          />
        )}

        {(activeTab === 'create' || activeTab === 'edit') && (
          <InvoiceEditor 
            initialData={editingInvoice} 
            settings={settings}
            onSave={handleSaveInvoice}
            onCancel={() => { setActiveTab('dashboard'); setEditingInvoice(null); }}
          />
        )}

        {activeTab === 'settings' && (
          <BillingSettings 
            settings={settings} 
            onSave={handleSaveSettings}
          />
        )}
      </div>

      {/* Hidden Print Container - Only visible during window.print() */}
      <div className="hidden print:flex print:justify-center print:w-full print:bg-white print:m-0 print:p-0">
        {printingInvoice && <InvoicePreview ref={printRef} invoice={printingInvoice} settings={settings} />}
      </div>
    </div>
  );
};

export default BillingApp;
